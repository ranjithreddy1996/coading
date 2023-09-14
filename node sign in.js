const {
    getMsgFormat,
    isEmpty,
    getLogger,
    returnAuthPayload,
    returnEndConsumerAuthPayload,
  } = require("../utils/helpers");
  const redis = require("redis");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const jwt_decode = require("jwt-decode");
  
  // create and connect redis client to local instance.
  const redisHost = process.env.REDIS_HOST || "localhost";
  const redisPort = process.env.REDIS_PORT || "6379";
  
  const client = redis.createClient(redisPort, redisHost);
  
  //load user validation
  const validateAddUserData = require("../validation/addUserValidation");
  
  //load email modules
  const sendSignUpLink = require("../emails/sendSignUpLink");
  const emailVerificationValidation = require("../validation/emailverification");
  const sendEmailVerification = require("../emails/sendEmailVerificationEmail");
  const sendAccountActivationMail = require("../emails/sendAccountActivationEmail");
  
  //load input validation for register route
  const validateRegisterInput = require("../validation/register");
  
  //load input validation for login route
  const validateLoginInput = require("../validation/login");
  
  //load input validation for end consumer forgot password
  const endConsumerForgotPasswordValidation = require("../validation/endConsumerForgotPasswordValidation");
  const endConsumerEmailOTPValidation = require("../validation/endConsumerEmailOTPValidation");
  const validateEndConsumerUpdatePassword = require("../validation/validateEndConsumerUpdatePassword");
  
  var SECRET_OR_KEY = process.env.SECRET_OR_KEY;
  var TOKEN_EXPIRY_TIME = process.env.TOKEN_EXPIRY_TIME;
  
  //signup user
  const signUpUser = async (req, res) => {
    const returnMessage = getMsgFormat();
  
    let logger = getLogger("signUp");
  
    const { errors, isValid } = validateRegisterInput(req.body);
  
    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const User = req.db.model("User");
  
    User.findOne({ email: req.body.email, emailverified: "yes" })
      .then((user) => {
        if (user) {
          errors.email = "Email already exist/verified, Please signin!";
          return res.status(400).json(errors);
        } else {
          const User = req.db.model("User");
          User.findOne({ email: req.body.email })
            .then((user) => {
              if (!user) {
                errors.email = "Email doesn't exist";
                return res.status(400).json(errors);
              } else {
                // remove the passkey
                // update the password
                // send email
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.passkey = "";
  
                    user
                      .save()
                      .then((user) => {
                        sendEmailVerification.sendEmailVerificationEmail(
                          user.id,
                          req
                        );
                        console.log(user.id);
                        user = user.toObject();
                        delete user.password;
                        return res.json(user);
                      })
                      .catch((err) => {
                        logger.error(err);
                        return res.status(400).json(err);
                      });
                  });
                });
              }
            })
            .catch((error) => {
              logger.error(error);
              return res.status(400).json(error);
            });
        }
      })
      .catch((error) => {
        logger.error(error);
        return res.status(400).json(error);
      });
  };
  
  const consumerSignUp = async (req, res) => {
    const returnMessage = getMsgFormat();
  
    let logger = getLogger("consumer_signUp");
    const User = req.db.model("User");
  
    try {
      let foundUser = await User.findOne({
        email: req.body.email,
        userType: req.body.userType,
      }).lean(true);
  
      if (!isEmpty(foundUser)) {
        returnMessage.message = "User Already Exists";
         return res.status(400).send(returnMessage);
      }
    } catch (error) {
      returnMessage.errors = error;
      logger.error(error);
      return res.status(400).json(returnMessage);
    }
    try {
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) {
            returnMessage.errors = err;
            logger.error(err);
            return res.status(500).json(returnMessage);
          } else {
            req.body.password = hash;
            req.body.passkey = "";
            req.body.emailverified = "yes";
            req.body.userType = req.body.userType;
            const savedUser = await new User({ ...req.body }).save().then((user) => {
              sendEmailVerification.sendEmailVerificationEmail(
                user.id,
                req
              );
              returnMessage.message = "OTP is sent, please check the mail to confirm";
            })
            .catch((error) => {
              logger.error(error);
              return res.status(400).json(error);
            });
            returnMessage.isError = false;
            returnMessage.message = "New User has been created successfully!";
            returnMessage.data = savedUser;
  
            return res.json(returnMessage);
          }
        });
      });
    } catch (error) {
      returnMessage.errors = error;
      logger.error(error);
      return res.status(500).json(returnMessage);
    }
  };
  
  const endConsumerSignin = async (req, res) => {
    const returnMessage = getMsgFormat();
    const { errors, isValid } = validateLoginInput(req.body);
  
    let logger = getLogger("endConsumer_login");
    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
    const userType = req.body.userType;
    const User = req.db.model("User");
    console.log(userType);
    // Find user by email
    User.findOne({ email, emailverified: "yes", userType: userType })
      .then(async (user) => {
        // check for user
        if (!user) {
          errors.email = "User does not exists";
          return res.status(400).json(errors);
        }
        console.log("user info:" + user);
        //Check for Password
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            // console.log(isMatch);
            if (!isMatch) {
              returnMessage.message = "Password incorrect";
              // errors.password = "Password incorrect";
              returnMessage.errors = errors;
              res.status(400).json(returnMessage);
            } else {
              //User matched Create JWT Payload
              let payload = returnEndConsumerAuthPayload(user);
              jwt.sign(
                payload,
                SECRET_OR_KEY,
                { expiresIn: TOKEN_EXPIRY_TIME },
                (err, token) => {
                  if (err) {
                    throw Error("Error occured while creating token!");
                  } else {
                    console.log("token" + token);
                    return res.json({
                      success: true,
                      token: token,
                    });
                  }
                }
              );
            }
          })
          .catch((err) => {
            console.log(err);
            returnMessage.message =
              "Error occured while trying to Login from end consumer!";
            return res.status(500).json(returnMessage);
          });
      })
      .catch((err) => {
        logger.error(err);
        console.log(err);
        returnMessage.message =
          "Error in server side while fetching user Details!";
        return res.status(400).json(returnMessage);
      });
  };
  
  //signin user
  const signin = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
  
    let logger = getLogger("login");
    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
    const User = req.db.model("User");
  
    // Find user by email
    User.findOne({ email, emailverified: "yes" })
      .populate("roleId", "name")
      .populate("organizationId")
      .then(async (user) => {
        // check for user
        if (!user) {
          errors.email = "User does not exists";
          return res.status(400).json(errors);
        }
        var category;
        if (user.categoryName === "Manufacturer") {
          category = "RegionalCenter";
        } else if (user.categoryName === "RegionalCenter") {
          category = "Warehouse";
        } else if (user.categoryName === "Warehouse") {
          category = "Retailer";
        }
        else {
          category = user.categoryName;
        }
        let assignedModal = await req.db.model(category);
  
        let assignData = await assignedModal.findOne(
          { _id: user.assignTo },
          { "basicDetails.emailId": 1, _id: 0 }
        );
  
        //Check for Password
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            // console.log(isMatch);
            if (!isMatch) {
              errors.password = "Password incorrect";
              res.status(400).json(errors);
            } else {
              if (user.emailverified !== "yes") {
                errors.email = "Please verify your email!";
                // Send Email verification email
                sendEmailVerification.sendEmailVerificationEmail(user.id, req);
  
                res.status(400).json(errors);
              } else {
                //User matched Create JWT Payload
                let payload = returnAuthPayload(user, assignData);
                jwt.sign(
                  payload,
                  SECRET_OR_KEY,
                  { expiresIn: TOKEN_EXPIRY_TIME },
                  (err, token) => {
                    if (err) {
                      throw Error("Error occured while creating token!");
                    } else {
                      console.log("token" + token);
                      return res.json({
                        success: true,
                        token: token,
                      });
                    }
                  }
                );
              }
            }
          })
          .catch((err) => {
            console.log(err);
            throw Error("Error occured while trying to update the password!");
          });
      })
      .catch((err) => {
        logger.error(err);
        return res.status(400).json("Error occured!");
      });
  };
  
  //verify the email
  const verifyEmail = async (req, res) => {
    const resultObject = {
      error: true,
      message: "Error occured!",
      data: {},
    };
  
    const { errors, isValid } = emailVerificationValidation(req.body);
  
    // check validation
    if (!isValid) {
      resultObject.message = errors.message;
      return res.status(400).json(errors);
    }
  
    const User = req.db.model("User");
    const Reward = await req.db.model("Reward");
    const Earn = req.db.model("Earn");
    User.findOne({
      verificationkey: req.body.verificationkey,
      email: req.body.email,
    })
      .then((user) => {
        if (!user) {
          resultObject.message =
            "Verification key is invalid! (or) User not found!";
          return res.status(400).json(resultObject);
        } else {
          if (user.emailverified !== "yes") {
            //update user
            user.emailverified = "yes";
            user.accountactivated = "yes";
            user.save().then((user) => {
              // Send Email verified and account activated email.
              sendAccountActivationMail.sendAccountActivationEmail(user, req);
              // rewards -start
              Reward.findOne({
                status: "Active", rewardType: "Points",
                'points.functionType': "Signup", availableRedemptions: { $gt: 0 }
              }).then((reward) => {
                if (!reward) {
                  console.log("no eligible reward ");
                }
                else {
                  console.log("rewardData:" + reward.points.pointsToRedeem);
                  user.points = user.points + reward.points.pointsToRedeem;
                  console.log("earned rewards:" + user.earnedRewards);
                  user.earnedRewards = parseInt(user.earnedRewards) + 1;
                  const filter = { email: req.body.email };
                  const update = {
                    points: user.points,
                    earnedRewards: user.earnedRewards,
                  };
                  User.findOneAndUpdate(filter, update).then((userUpdate) => {
                    if (!userUpdate) {
                      console.log("failed userUpdate ");
                    }
                    else {
                      // update reward info
                      const filterReward = { _id: reward._id };
                      const updateReward = {
                        availableRedemptions: parseInt(reward.availableRedemptions) - 1,
                      };
  
                      Reward.findOneAndUpdate(filterReward, updateReward).then((rewardUpdate) => {
  
                        if (!rewardUpdate) {
                          console.log("failed rewardUpdate ");
                        }
                        else {
                          // update reward info
                          var earnActivities =new Earn();
                          earnActivities.activity   = "Signup";
                          earnActivities.email = req.body.email;
                          earnActivities.reward =  reward._id ;
                          earnActivities.save();
                          console.log(" success rewardUpdate ");
                        };
                      }
                      );
                      // add points end 
                    }
                  });
  
                }
              })
              // rewards points end
  
  
              resultObject.error = false;
              resultObject.message =
                "Your account was activated successfully! Please Login";
              return res.json(resultObject);
            });
          } else {
            resultObject.error = false;
            resultObject.message =
              "Your account was activated successfully! Please Login";
            return res.json(resultObject);
          }
        }
      })
      .catch((error) => {
        logger.error(error);
        return res.status(400).json(resultObject);
      });
  };
  
  //fetch current user details
  const currentUserDetails = async (req, res) => {
    let logger = getLogger("Users/currentUserDetails");
  
    var authToken = req.headers["authorization"].split("Bearer ")[1];
  
    var decodeValue = jwt_decode(authToken);
    console.log(decodeValue);
  
    if (decodeValue.exp < new Date().getTime() / 1000) {
      return res.send("Token Expire");
    }
  
    res.json(returnAuthPayload(decodeValue));
  };
  
  //get profile of the current user
  const profile = async (req, res) => {
    let logger = getLogger("Users/profile");
    var authToken = req.headers["authorization"].split("Bearer ")[1];
  
    var decodeValue = jwt_decode(authToken);
    if (!decodeValue.id) {
      errors.message = "User information not found!";
      return res.status(400).json(errors);
    }
    const User = req.db.model("User");
    User.findById(decodeValue.id, "-password")
      .populate("organizationId")
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        logger.error(error);
        return res.status(400).json(error);
      });
  };
  
  /** Logout/Signout user */
  const signoutUser = async (req, res) => {
    const returnMessage = getMsgFormat();
    let logger = getLogger("Users/logout_user");
  
    if (req.headers["authorization"]) {
      let authorizationToken = req.headers["authorization"].split("Bearer ")[1];
      let existedTokens = [];
  
      try {
        client.get("JWTBlockList", function (err, result) {
          if (!isEmpty(result)) {
            existedTokens = JSON.parse(result);
          }
  
          const currentDate = new Date();
  
          existedTokens.push({ date: currentDate, token: authorizationToken });
  
          client.set(
            "JWTBlockList",
            JSON.stringify(existedTokens),
            function (err, reply) {
              if (reply === "OK") {
                returnMessage.isError = false;
                returnMessage.message = "You have successfully logged out!";
  
                return res.json(returnMessage);
              } else {
                returnMessage.message = "Something went wrong! Please try again.";
  
                return res.status(400).json(returnMessage);
              }
            }
          );
        });
      } catch (error) {
        logger.error(error);
        returnMessage.message = "Something went wrong! Please try again.";
  
        return res.status(400).json(returnMessage);
      }
    } else {
      returnMessage.message =
        "Authorization token not found. You need to be logged in to log out!";
  
      return res.status(400).json(returnMessage);
    }
  };
  
  //Create New Admin  User
  const addAdminUser = async (req, res) => {
    const returnMessage = getMsgFormat();
    let logger = getLogger("User/add_Admin_user");
    const errors = {};
  
    try {
      const User = req.db.model("User");
      let foundUser = await User.find({
        email: req.body.email,
      }).lean();
  
      if (!isEmpty(foundUser)) {
        returnMessage.message = "Email already exists ";
        errors.message = returnMessage.message;
  
        returnMessage.errors = { ...errors };
  
        return res.status(400).json(returnMessage);
      } else {
        const role = req.db.model("Role");
        let adminRoleData = await role.findOne({ name: "Admin" }).lean();
        if (isEmpty(adminRoleData)) {
          returnMessage.message =
            "Roles are not Present. please Add Role adn Try to add User";
          errors.message = returnMessage.message;
  
          returnMessage.errors = { ...errors };
  
          return res.status(400).json(returnMessage);
        } else {
          console.log(adminRoleData);
          req.body.roleId = adminRoleData._id;
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
              if (err) throw err;
              delete req.body.confirmPassword;
              req.body.password = hash;
  
              req.body.passkey = "";
              await new User({ ...req.body })
                .save()
                .then((user) => {
                  sendEmailVerification.sendEmailVerificationEmail(user.id, req);
                  console.log(user.id);
                  user = user.toObject();
                  delete user.password;
                  return res.json(user);
                })
                .catch((err) => {
                  logger.error(err);
                  return res.status(400).json(err);
                });
            });
          });
        }
      }
    } catch (error) {
      logger.error(error);
      returnMessage.message = "Database error" + error;
  
      return res.status(400).json(returnMessage);
    }
  };
  //Create New User
  const addUser = async (req, res) => {
    const returnMessage = getMsgFormat();
    let logger = getLogger("User/add_user");
  
    const { errors, isValid } = validateAddUserData(req.body);
  
    if (!isValid) {
      returnMessage.message = "Validation failed";
      returnMessage.errors = { ...errors };
      return res.status(400).json(returnMessage);
    }
  
    try {
      const User = req.db.model("User");
      let foundUser = await User.find({
        email: req.body.email,
        //emailverified: "yes",
      }).lean();
  
      if (!isEmpty(foundUser)) {
        returnMessage.message = "Email already exists ";
        errors.message = returnMessage.message;
  
        returnMessage.errors = { ...errors };
  
        return res.status(400).json(returnMessage);
      } else {
        var authToken = req.headers["authorization"].split("Bearer ")[1];
        var decodeValue = jwt_decode(authToken);
  
        console.log(decodeValue);
  
        if (!isEmpty(decodeValue) && !isEmpty(decodeValue.id)) {
          req.body.createdBy = decodeValue.id;
        }
        const savedUser = await new User({ ...req.body }).save();
  
        sendSignUpLink.sendSignUpLink(savedUser.organizationId, savedUser.email);
  
        returnMessage.isError = false;
        returnMessage.message = "New User has been created successfully!";
        returnMessage.data = savedUser;
  
        return res.json(returnMessage);
      }
    } catch (error) {
      logger.error(error);
      returnMessage.message = "Database error";
  
      return res.status(400).json(returnMessage);
    }
  };
  
  //Fetch All Users
  const listUsers = async (req, res) => {
    const returnMessage = getMsgFormat();
    let logger = getLogger("User/list_users");
  
    try {
      var authToken = req.headers["authorization"].split("Bearer ")[1];
  
      var decodeValue = jwt_decode(authToken);
  
      const findQuery = { userType: "ApplicantUsers" };
      if (!isEmpty(decodeValue) && !isEmpty(decodeValue.id)) {
        findQuery.createdBy = decodeValue.id;
      }
  
      const User = req.db.model("User");
      let foundUsers = await User.find(findQuery)
        .populate("organizationId")
        .sort({ created: -1 });
  
      returnMessage.isError = false;
  
      if (isEmpty(foundUsers)) {
        returnMessage.message = "No Records found";
      } else {
        returnMessage.message = "Records found";
        returnMessage.data = foundUsers;
      }
  
      return res.json(returnMessage);
    } catch (error) {
      logger.error(
        "Error occured while trying to fetch list of users. Error:",
        error
      );
  
      return res.status(400).json(returnMessage);
    }
  };
  
  //Update the User
  const updateUser = async (req, res) => {
    const userId = req.params.id;
    const returnMessage = getMsgFormat();
    let logger = getLogger("User/update_user");
  
    if (isEmpty(userId)) {
      returnMessage.message = "User id is not available";
  
      return res.status(400).json(returnMessage);
    }
  
    const { errors, isValid } = validateAddUserData(req.body);
  
    if (!isValid) {
      returnMessage.message = "Validation failed";
      returnMessage.errors = { ...errors };
  
      return res.status(400).json(returnMessage);
    }
  
    try {
      const User = req.db.model("User");
      let foundUser = await User.findOne({
        _id: userId,
      }).lean();
  
      if (isEmpty(foundUser)) {
        returnMessage.message =
          "There is no User with this id. Please create one!";
  
        return res.status(400).json(returnMessage);
      }
    } catch (error) {
      logger.error(error);
  
      returnMessage.message = `User with ID ${userId} could not be found due to DB error. Please try again.`;
  
      return res.status(400).json(returnMessage);
    }
  
    try {
      const User = req.db.model("User");
      req.body.update = new Date();
  
      await User.findOneAndUpdate({ _id: userId }, { $set: req.body });
  
      returnMessage.isError = false;
      returnMessage.message = "User has been updated successfully!";
  
      return res.json(returnMessage);
    } catch (error) {
      logger.error(error);
  
      returnMessage.message = `User with ID ${userId} could not be updated, due to DB error. Please try again.`;
  
      return res.status(400).json(returnMessage);
    }
  };
  
  //Delete user dependencies before deleting the user
  const _checkUserDependencies = (UserId) =>
    new Promise((resolve, reject) => {
      // TODO: check User dependencies
      reject(
        "User could not be deleted as user dependencies has not been checked!"
      );
    });
  
  //Delete Users
  const deleteUser = async (req, res) => {
    const userId = req.params.id;
  
    const returnMessage = getMsgFormat();
    let logger = getLogger("User/delete_User");
  
    if (isEmpty(userId)) {
      returnMessage.message = "User id is not available";
      return res.status(400).json(returnMessage);
    }
  
    try {
      // await _checkUserDependencies(userId);
    } catch (error) {
      logger.error(error);
  
      returnMessage.message = `
          Error deleting User! User has more dependencies!
          Please delete dependent records first.
        `;
  
      return res.status(400).json(returnMessage);
    }
  
    try {
      const User = req.db.model("User");
      let foundUser = await User.findOne({ _id: userId });
  
      if (isEmpty(foundUser)) {
        returnMessage.message =
          "There is no User with this id. Please create one!";
  
        return res.status(400).json(returnMessage);
      }
    } catch (error) {
      logger.error(error);
  
      returnMessage.message = `User with ID ${userId} could not be found due to DB error. Please try again.`;
  
      return res.status(400).json(returnMessage);
    }
  
    try {
      const User = req.db.model("User");
      await User.findOneAndRemove({ _id: userId });
  
      returnMessage.isError = false;
  
      returnMessage.message = "User has been deleted successfully!";
  
      return res.json(returnMessage);
    } catch (error) {
      logger.error(error);
  
      returnMessage.message = "Error deleting User Please try again!";
  
      return res.status(400).json(returnMessage);
    }
  };
  
  //Fetch All Categories
  const listCategories = async (req, res) => {
    const returnMessage = getMsgFormat();
    let logger = getLogger("Category/list_categories");
  
    try {
      const Category = await req.db.model("Category");
      let foundCategories = await Category.find({});
  
      returnMessage.isError = false;
  
      if (isEmpty(foundCategories)) {
        returnMessage.message = "No Records found";
      } else {
        returnMessage.message = "Records found";
        returnMessage.data = foundCategories;
      }
  
      return res.json(returnMessage);
    } catch (error) {
      logger.error(
        "Error occured while trying to out fetch list of categories. Error:",
        error
      );
  
      return res.status(400).json(returnMessage);
    }
  };
  
  const resendOtp = (req, res) => {
    let logger = getLogger("User/resendOtp");
    // check validation
    if (!req.body.email) {
      let errors = {};
      errors.email = "Email is required";
      return res.status(400).json(errors);
    }
    const User = req.db.model("User");
    User.findOne({ email: req.body.email })
      .then((user) => {
        sendEmailVerification.sendEmailVerificationEmail(user.id, req);
  
        return res.json({ message: "OTP is reset, please check the mail" });
      })
      .catch((error) => {
        logger.error(error);
        return res.status(400).json(error);
      });
  };
  
  const tokenRegeneration = (req, res) => {
    let logger = getLogger("User/Token_Regeneration");
    var authToken = req.headers["authorization"].split("Bearer ")[1];
  
    var decodeValue = jwt_decode(authToken);
    console.log(decodeValue);
  
    let payload = returnAuthPayload(decodeValue);
    jwt.sign(
      payload,
      SECRET_OR_KEY,
      { expiresIn: TOKEN_EXPIRY_TIME },
      (err, token) => {
        if (err) {
          throw Error("Error occured while creating token!");
        } else {
          console.log("token" + token);
          return res.json({
            success: true,
            token: token,
          });
        }
      }
    );
  };
  
  // forgot password
  const endConsumerForgotPassword = async (req, res) => {
    let logger = getLogger("User/End_Consumer_Forgot_Password");
    const returnMessage = getMsgFormat();
    const { errors, isValid } = endConsumerForgotPasswordValidation(req.body);
    const { email } = req.body;
    //const { userType } = req.body;
    let foundUser = null;
  
    // check validation
    if (!isValid) {
      returnMessage.message = "Validation error";
      returnMessage.errors = errors;
      return res.status(400).json(returnMessage);
    }
  
    const User = await req.db.model("User");
  
    try {
      foundUser = await User.findOne({
        email,
        userType: req.body.userType,
      });
  
      if (isEmpty(foundUser)) {
        errors.email = "Email address does not exists";
        returnMessage.errors = errors;
        return res.status(404).json(returnMessage);
      } else {
        // Send Forgot password email.
        sendEmailVerification.sendEmailVerificationEmail(foundUser._id, req);
        returnMessage.isError = false;
        returnMessage.message =
          "Password recovery email has been sent to your email address! Please follow the instruction in the email.";
        return res.json(returnMessage);
      }
    } catch (error) {
      logger.error(error);
      returnMessage.message = "Password recovery email could not be sent.";
      return res.status(500).json(returnMessage);
    }
  };
  
  // Verify OTP for end consumer
  const verifyEndConsumerOtp = async (req, res) => {
    let logger = getLogger("User/Verify_End_Consumer_OTP");
    const returnMessage = getMsgFormat();
  
    const { errors, isValid } = endConsumerEmailOTPValidation(req.body);
  
    // check validation
    if (!isValid) {
      returnMessage.message = "Validation error";
      returnMessage.errors = errors;
      return res.status(400).json(returnMessage);
    }
  
    const User = await req.db.model("User");
    const Reward = await req.db.model("Reward");
  
    User.findOne({
      verificationkey: req.body.verificationkey,
      email: req.body.email,
      userType: req.body.userType,
    })
      .then((user) => {
        if (!user) {
          returnMessage.message =
            "Verification key is invalid! (or) User not found!";
          return res.status(400).json(returnMessage);
        } else {
          // add points start
          Reward.findOne({
            status: "Active", rewardType: "Points",
            'points.functionType': "Signup", availableRedemptions: { $gt: 0 }
          }).then((reward) => {
            if (!reward) {
              console.log("no eligible reward ");
            }
            else {
              console.log("rewardData:" + reward.points.pointsToRedeem);
              user.points = user.points + reward.points.pointsToRedeem;
              console.log("earned rewards:" + user.earnedRewards);
              user.earnedRewards = parseInt(user.earnedRewards) + 1;
              const filter = { email: req.body.email };
              const update = {
                points: user.points,
                earnedRewards: user.earnedRewards,
              };
              User.findOneAndUpdate(filter, update).then((userUpdate) => {
                if (!userUpdate) {
                  console.log("failed userUpdate ");
                }
                else {
                  // update reward info
                  const filterReward = { _id: reward._id };
                  const updateReward = {
                    availableRedemptions: parseInt(reward.availableRedemptions) - 1,
                  };
  
                  Reward.findOneAndUpdate(filterReward, updateReward).then((rewardUpdate) => {
  
                    if (!rewardUpdate) {
                      console.log("failed rewardUpdate ");
                    }
                    else {
                      // update reward info
                      console.log(" success rewardUpdate ");
                    };
                  }
                  );
                  // add points end 
                }
              });
  
            }
          });
  
  
          returnMessage.error = false;
          returnMessage.message = "Your OTP is verified successfully!";
          return res.json(returnMessage);
        }
      })
      .catch((error) => {
        logger.error(error);
        return res.status(400).json(resultObject);
      });
  };
  
  // Update end consumer password for forgot password page
  const updateEndConsumerPassword = async (req, res) => {
    let logger = getLogger("User/End_Consumer_Update_Password");
    const returnMessage = getMsgFormat();
  
    const { errors, isValid } = validateEndConsumerUpdatePassword(req.body);
  
    // check validation
    if (!isValid) {
      returnMessage.message = "Validation error";
      returnMessage.errors = errors;
      return res.status(400).json(returnMessage);
    }
  
    const User = await req.db.model("User");
  
    User.findOne({ email: req.body.email, userType: req.body.userType })
      .then((user) => {
        if (!user) {
          errors.email = "Email doesn't exist";
          return res.status(400).json(errors);
        } else {
          // update the password
          // send email
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user.passkey = "";
              user.emailverified = "yes";
              user.update = new Date();
              user
                .save()
                .then((user) => {
                  // sendPasswordUpdateEmail.sendPasswordUpdateEmail(user, req);
                  returnMessage.error = false;
                  returnMessage.message =
                    "You new password was updated successfully! Please login!";
                  return res.json(returnMessage);
                })
                .catch((err) => logger.error(err));
            });
          });
        }
      })
      .catch((error) => {
        logger.error(error);
        return res.status(400).json(error);
      });
  };
  
  //Fetch All Users
  const SearchVendor = async (req, res) => {
    //const VendorName = req.params.vendor;
    const reqQuery = req.query;
    const returnMessage = getMsgFormat();
    let logger = getLogger("User/Search_Vendor");
    const qry = reqQuery.vendorName;
    const type = reqQuery.type;
    //const vendorNamedetails = basicDetails.name;
    console.log(type);
    try {
      let foundVendors;
      const Retailer = req.db.model("Retailer");
      const Warehouse = req.db.model("Warehouse");
  
      if (!isEmpty(reqQuery.vendorName)) {
        if (type == "Retailers") {
          foundVendors = await Retailer.find({
            "basicDetails.name": { $regex: ".*" + qry + ".*" },
          });
        }
        if (type == "Distributors") {
          foundVendors = await Warehouse.find({
            "basicDetails.name": { $regex: ".*" + qry + ".*" },
          });
        }
      }
  
      //else {
      //foundVendors = await User.find({}).sort({ created: -1 }).lean();
      //}
      //.populate("organizationId")
      //.sort({ created: -1 });
  
      returnMessage.isError = false;
  
      if (isEmpty(foundVendors)) {
        returnMessage.message = "No Records found";
      } else {
        returnMessage.message = "Records found";
        returnMessage.data = foundVendors;
      }
  
      return res.json(returnMessage);
    } catch (error) {
      logger.error(
        "Error occured while trying to fetch list of users. Error:",
        error
      );
  
      return res.status(400).json(returnMessage);
    }
  };
  const customers = async (req, res) => {
    const returnMessage = getMsgFormat();
    let logger = getLogger("User/Customer_lists");
  
    try {
      const User = await req.db.model("User");
      let foundCustomer = await User.find({ earnedRewards: { $gte: 1 } });
      returnMessage.isError = false;
  
      if (isEmpty(foundCustomer)) {
        returnMessage.message = "No Records found";
      } else {
        returnMessage.message = "Records found";
        returnMessage.data = foundCustomer;
      }
  
      return res.json(returnMessage);
    } catch (error) {
      logger.error(
        "Error occured while trying to fetch list of Customer lists. Error:",
        error
      );
  
      return res.status(400).json(returnMessage);
    }
  };
  
  // Verify Vendor
  const verifyVendor = async (req, res) => {
  
    const reqQuery = req.query;
    const returnMessage = getMsgFormat();
    let logger = getLogger("User/verify_Vendor");
    const qry = reqQuery.vendorEmail;
    const type = reqQuery.type;
  
    try {
      let foundVendor;
      const retailer = req.db.model("Retailer");
      const distributor = req.db.model("Warehouse");
      const user = req.db.model("User");
  
      if (!isEmpty(reqQuery.vendorEmail)) {
        if (type == "Retailer") {
          foundVendor = await retailer.find({
            "basicDetails.emailId": qry,
          });
        }
        else if (type == "Distributor") {
          foundVendor = await distributor.find({
            "basicDetails.emailId": qry,
          });
        }
        else {
          foundVendor = await user.find({
            "email": qry,
          });
        }
      }
  
      returnMessage.isError = false;
  
      if (isEmpty(foundVendor)) {
        returnMessage.message = "No vendor found";
      } else {
        returnMessage.message = "Vendor found";
        returnMessage.data = foundVendor;
      }
  
      return res.json(returnMessage);
    } catch (error) {
      logger.error(
        "Error occured while trying to fetch verify vendor. Error:",
        error
      );
  
      return res.status(400).json(returnMessage);
    }
  };
  
  module.exports = {
    signUpUser,
    signin,
    verifyEmail,
    currentUserDetails,
    profile,
    signoutUser,
    addUser,
    listUsers,
    updateUser,
    deleteUser,
    listCategories,
    addAdminUser,
    resendOtp,
    tokenRegeneration,
    consumerSignUp,
    endConsumerSignin,
    endConsumerForgotPassword,
    verifyEndConsumerOtp,
    updateEndConsumerPassword,
    SearchVendor,
    customers,
    verifyVendor
  };
  