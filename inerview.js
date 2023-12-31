const shim = require("fabric-shim");

async function iterateResults(iterator) {
  const allResults = [];
  while (true) {
    const res = await iterator.next();
    if (res.value && res.value.value.toString()) {
      const Key = res.value.key;
      let Record;
      try {
        Record = JSON.parse(res.value.value.toString('utf8'));
      } catch (err) {
        console.log(err);
        Record = res.value.value.toString('utf8');
      }
      allResults.push({ Key, Record });
    }
    if (res.done) {
      await iterator.close();
      console.info(allResults);
      return JSON.stringify(allResults);
    }
  }
}

var Chaincode = class {
  async Init(stub) {
    console.info("Intialized");
    return shim.success();
  }

  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    let method = this[ret.fcn];
    if (!method) {
      return shim.success();
    }

    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }

// In 1st case when we are checking wheather the key present are not in ledger
  async check(stub, args) {
    try {
      let ret = stub.getFunctionAndParameters();
      let checkInfoAsJson = JSON.parse(args[0]);
      if (!checkInfoAsJson || checkInfoAsJson.toString().length <= 0) {
        throw new Error("Input in request is invalid.");
      }

      // Hash is generated by FRontend Developers using ipfs
      // If we store data based on generated hash
      var hashId = rewardsInfoAsJson.hashId;

      let isCheckInfoAsBytesExisting = await stub.getState(hashId).catch(err => console.log(err));

      if (isCheckInfoAsBytesExisting.length !== 0) {
        throw new Error("hashId already exists");
      } else {
        let checkInfoAsBytes = Buffer.from(JSON.stringify(checkInfoAsJson));
        await stub.putState(hashId, checkInfoAsBytes);
      }

    } catch (error) {
      console.error(error);
      let jsonResp = {};
      jsonResp.error = error;
      throw new Error(jsonResp.error);
    }

  }

  //In this case we are passing a query and checking data is present are not
  async checkSecond(stub, args) {
    try {
      let ret = stub.getFunctionAndParameters();
      let checkInfoAsJson = JSON.parse(args[0]);
      if (!checkInfoAsJson || checkInfoAsJson.toString().length <= 0) {
        throw new Error("Input in request is invalid.");
      }

      // Passing query to ledger
      let query = {
        "selector": {
          "$and": [
            { "Atribute": { "$eq": checkInfoAsJson.atribute } },
            { "value": { "$eq": checkInfoAsJson.value } },
            { "hash": { "$eq": checkInfoAsJson.hash } },
          ]
        }
      }
      let queryString = JSON.stringify(query);
      let iterator = await stub.getQueryResult(queryString);
      var data = await iterateResults(iterator)
      var resultdata = JSON.parse(data)
      for (let i = 0; i < resultdata.length; i++) {
        var result = resultdata[i].Key;
      }
      if (result) {
        throw new Error("Already Record Present in DB");
      } else {

        let checkInfoAsBytes = Buffer.from(JSON.stringify(checkInfoAsJson));
        await stub.putState(Key, checkInfoAsBytes);
      }

    } catch (error) {
      console.error(error);
      let jsonResp = {};
      jsonResp.error = error;
      throw new Error(jsonResp.error);
    }
  }

  //In 3rd case passing key and checking generated hash and presented blockchain hash
  async checkThird(stub, args) {
    try {
      let ret = stub.getFunctionAndParameters();
      let checkInfoAsJson = JSON.parse(args[0]);
      if (!checkInfoAsJson || checkInfoAsJson.toString().length <= 0) {
        throw new Error("Input in request is invalid.");
      }

      var key = rewardsInfoAsJson.key;
      let isCheckInfoAsBytesExisting = await stub.getState(key).catch(err => console.log(err));
      var isCheckIdInfoAsJSON = JSON.parse(isCheckInfoAsBytesExisting.toString());
      if (isCheckIdInfoAsJSON.keyhash == checkInfoAsJson.keyhash) {
        // No changes Made in certificate

        let returnMessage = "No changes Made in certificate";
        return Buffer.from(JSON.stringify(returnMessage));

      } else {
        // Changes are in certificate
        let returnMessage = "Changes are in certificate";
        return Buffer.from(JSON.stringify(returnMessage));
      }


    } catch (error) {
      console.error(error);
      let jsonResp = {};
      jsonResp.error = error;
      throw new Error(jsonResp.error);
    }
  }
};

shim.start(new Chaincode());