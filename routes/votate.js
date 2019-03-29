var express = require("express");
var router = express.Router();

var bodyParser = require('body-parser');
var ethers = require('ethers');

var config = require("../config");

var ethProvider = new ethers.providers.InfuraProvider("ropsten","63682f8fa4f14e7f8bd17448232e84fd");
/*let path = "/home/garvaz/.ethereum/testnet/geth.ipc";
let ethProvider = new ethers.providers.IpcProvider(path);*/

// -----------------------------------
//wallet para transacciones
var wallet = new ethers.Wallet(config.ethereum.privateKey,ethProvider);
var contract_sign = new ethers.Contract(config.ethereum.contractAddress, config.ethereum.abi, wallet);

router.post("/", function(req, res){

    console.log("Invocacion recibida");

    var results = [];

    try{    

        var _candidateId = req.body.candidate;
        
        console.log('invoca funcion del smart conract');

        var sendPromise = contract_sign.vote(_candidateId);

        console.log('Gestiona la respuesta');
        sendPromise.then(function(transaction){
            results.push({
                result: "OK",
                tx_hash: transaction.hash
            });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            console.log('Voto registrado' + transaction.hash);
            res.status(200).send(results); 

    }).catch((error) =>{

            results.push({
                result: "error",
                mensaje: error
            });
            console.log('Voto no registrado');
            res.status(500).send(results);
        });                                                                                                                                                                                                                 
    } 
    catch(error)
    {
        results.push({
            result: "ERROR",
            error: error
        });
        console.log(error);
        res.status(500).send(results); 
    }

})

function stringToBytes32(text) {
    var data = ethers.utils.toUtf8Bytes(text);
    if (data.length > 32) { throw new Error('too long'); }
    data = ethers.utils.padZeros(data, 32);
    return ethers.utils.hexlify(data);
}

router.get("/", function(req, res) {

    res.status(200).send("Hola Ethereum"); 

});

module.exports = router;