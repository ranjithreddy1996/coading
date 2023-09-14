

// var fs = require('fs'),
//     request = require('request');

// var download = function(uri, filename, callback){
//   request.head(uri, function(err, res, body){
//     console.log('content-type:', res.headers['content-type']);
//     console.log('content-length:', res.headers['content-length']);

//     request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//   });
// };

// download('https://www.google.com//images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', 'google.png', function(){
//   console.log('done');
// });



// const axios = require('axios');

// (async () => {
//   try {
//     const [response1, response2] = await axios.all([
//       axios.get('https://www.google.com//images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'),
//       axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2020-03-17')
//     ]);

//     // console.log(response1.data);


//     console.log(JSON.stringify(response1));
//     // console.log(response2.data.explanation);
//   } catch (error) {
//     console.log(error.response.body);
//   }
// })();

// console.log(0.1+0.2);
// console.log(false ==='0');
// console.log(false =='0');
// var str = "Java script is fun"
// var out = str.split("").reverse().join("")
// console.log(out);
// var arr = [1,2,4,5];
// var b= arr.reduce((a,i)=>{return a+i})
// console.log(b);


// function outerFcn() {
//   function innerfcn() {
//     console.log(variable)
//   }
//   return innerfcn;
//   var variable = 'qwerty'
// }
// let result = outerFcn();
// result()

// var express = require('express')
// var app = express()
// app.listen(6000, ()=>console.log("server started"))

// app.use('/test', (req, res) => {
//   let value = "Hello World"
//   console.log(value);
//   res.send(value)
// })

// await at root level
// const data = { name: "Example" }
// var arr =[1,2,3,4]
// let data = [...arr]

// const express = require('express')
// const app = express()

// const session = require('express-session')
// const passport = require('passport')

// const GoogleStrategy = require('passport-google-oauth2').Strategy;

// //Middleware
// app.use(session({
//   secret: "secret",
//   resave: false,
//   saveUninitialized: true,
// }))

// app.use(passport.initialize()) // init passport on every route call
// app.use(passport.session())    //allow passport to use "express-session"


// //Get the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from Google Developer Console
// const GOOGLE_CLIENT_ID = "3184701-tn6finlstvgcgvte2381.apps.googleusercontent.com"
// const GOOGLE_CLIENT_SECRET = "XyLuTLHX6Ov_93IP"

// authUser = (request, accessToken, refreshToken, profile, done) => {
//   return done(null, profile);
// }

// //Use "GoogleStrategy" as the Authentication Strategy
// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:3001/auth/google/callback",
//   passReqToCallback: true
// }, authUser));


// passport.serializeUser((user, done) => {
//   console.log(`\n--------> Serialize User:`)
//   console.log(user)
//   // The USER object is the "authenticated user" from the done() in authUser function.
//   // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  

//   done(null, user)
// })


// passport.deserializeUser((user, done) => {
//   console.log("\n--------- Deserialized User:")
//   console.log(user)
//   // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
//   // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

//   done(null, user)
// })


// //Start the NODE JS server
// app.listen(3001, () => console.log(`Server started on port 3001...`))


// //console.log() values of "req.session" and "req.user" so we can see what is happening during Google Authentication
// let count = 1
// showlogs = (req, res, next) => {
//   console.log("\n==============================")
//   console.log(`------------>  ${count++}`)

//   console.log(`\n req.session.passport -------> `)
//   console.log(req.session.passport)

//   console.log(`\n req.user -------> `)
//   console.log(req.user)

//   console.log("\n Session and Cookie")
//   console.log(`req.session.id -------> ${req.session.id}`)
//   console.log(`req.session.cookie -------> `)
//   console.log(req.session.cookie)

//   console.log("===========================================\n")

//   next()
// }

// app.use(showlogs)


// app.get('/auth/google',
//   passport.authenticate('google', {
//     scope:
//       ['email', 'profile']
//   }
//   ));

// app.get('/auth/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/login'
//   }));

// //Define the Login Route
// app.get("/login", (req, res) => {
//   res.render("login.ejs")
// })


// //Use the req.isAuthenticated() function to check if user is Authenticated
// checkAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) { return next() }
//   res.redirect("/login")
// }

// //Define the Protected Route, by using the "checkAuthenticated" function defined above as middleware
// app.get("/dashboard", checkAuthenticated, (req, res) => {
//   res.render("dashboard.ejs", { name: req.user.displayName })
// })

// //Define the Logout
// app.post("/logout", (req, res) => {
//   req.logOut()
//   res.redirect("/login")
//   console.log(`-------> User Logged out`)
// })
