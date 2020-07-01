const functions = require("./functions")

var printResults = (result)=>{
  console.log("------------------------------------------")
  console.log("STATUS CODE: " +result.statusCode)
  console.log(result.body)
  console.log("------------------------------------------")
}


functions.runbm(null,null,printResults)

functions.data_transfer(null,null,printResults)
