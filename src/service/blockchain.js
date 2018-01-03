const Web3 = require('web3');

var exports = module.exports = {};

var ethAccountAddress;
var isConnected;
var web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io'));
if (web3){
	console.log('Blockchain connected (via Infura Kovan node)');
	isConnected = true;
}
else{
	console.log('Blockchain not connected(failed to use Infura Kovan testnet node)');
	isConnected = false;
}

const store_registry_abi =
[{"constant":true,"inputs":[],"name":"escrowAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_placeID","type":"string"}],"name":"addStore","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"registry","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_placeID","type":"string"}],"name":"getStoreAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_placeID","type":"string"}],"name":"storeExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"store_address","type":"address"}],"name":"LogStoreCreated","type":"event"}]
const escrow_abi =
[{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"activeVettingIndexListByUser","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_claimer","type":"address"}],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"credibility","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_reviewer","type":"address"}],"name":"settle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"storeRegistry","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_store","type":"address"},{"name":"_reviewer","type":"address"},{"name":"_comment","type":"string"},{"name":"_score","type":"uint256"}],"name":"noVettingReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_reviewer","type":"address"}],"name":"noMaturedVetting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_store","type":"address"},{"name":"_voter","type":"address"},{"name":"_reviewer","type":"address"},{"name":"_is_upvote","type":"bool"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"vettingIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"settlements","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_store","type":"address"},{"name":"_reviewer","type":"address"},{"name":"_comment","type":"string"},{"name":"_score","type":"uint256"}],"name":"review","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"vettings","outputs":[{"name":"store","type":"address"},{"name":"reviewer","type":"address"},{"name":"deposit","type":"uint256"},{"name":"last_update","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_registry","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]
const store_abi =
[{"constant":true,"inputs":[],"name":"totalReviewAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"escrowAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"reviewIndexPlusOneByReviewer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"placeID","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_voter","type":"address"},{"name":"_reviewer","type":"address"},{"name":"_is_upvote","type":"bool"},{"name":"_credibility","type":"uint256"}],"name":"voteReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"voted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_comment","type":"string"},{"name":"_score","type":"uint256"},{"name":"_uploader","type":"address"}],"name":"addReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalScore","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_reviewer","type":"address"}],"name":"getImpact","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allReviews","outputs":[{"name":"comment","type":"string"},{"name":"score","type":"uint256"},{"name":"uploader","type":"address"},{"name":"upvote","type":"uint256"},{"name":"downvote","type":"uint256"},{"name":"last_update","type":"uint256"},{"name":"positive_impact","type":"uint256"},{"name":"negative_impact","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_placeID","type":"string"},{"name":"_escrowAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"voter","type":"address"},{"indexed":true,"name":"reviewer","type":"address"},{"indexed":false,"name":"is_upvote","type":"bool"}],"name":"LogVoteAdded","type":"event"}]

const store_registry_address = "0xe49e57bF010d4C1E591e292854bB57020c07506F";
const escrow_address = "0xaeade1dc5fb3b39e7a95e1ad631fcc63a309c9ff";

const store_registry_instance = new web3.eth.Contract(store_registry_abi, store_registry_address);
const escrow_instance = new web3.eth.Contract(escrow_abi, escrow_address);

exports.web3IsConnected = function(){
	return isConnected;
}

exports.decryptPrivateKey = function(encrypted, password){
	try {
		return web3.eth.accounts.decrypt(encrypted, password).privateKey;
	}
	catch(err) {
		return "";
	}
}

exports.addPrivateKey = function(address, privateKey){
	if (privateKey){
		if (web3.eth.accounts.privateKeyToAccount(privateKey).address === address){
			web3.eth.accounts.wallet.add(privateKey);
			ethAccountAddress = address;
			return true;
		} else {
			return false;
		}
	}
	return false;
}

exports.getBalance = (address) => {
	return web3.eth.getBalance(address)
}

/*
	Blockchain Write
*/

const createStore = (storeId, cb) => {
	console.log(web3.eth.accounts.wallet)
	console.log(ethAccountAddress)
	console.log(storeId)
	store_registry_instance.methods.addStore(storeId).send({
	    from: ethAccountAddress,
	    gas: 4000000,
	    gasPrice: '10000000000'
	}, cb);
}
exports.createStore = createStore;
//End of createStore function

const writeReview = (storeId, content, score, cb) => {
	store_registry_instance.methods.getStoreAddress(storeId).call().then(store_address => {
		console.log("You are writing review to: " + store_address);
    escrow_instance.methods.review(store_address, ethAccountAddress, content, score).send({
	    from: ethAccountAddress,
	    gas: 4000000,
	    gasPrice: '10000000000',
			value: 10000000000000000
		}, cb);
	}).catch(
    // Log the rejection reason
   (reason) => {
      console.log('Handle rejected promise ('+reason+') here.');
      writeReview(storeId, content, score, cb);
    }
  );
}
exports.writeReview = writeReview;
//End of writeReview function

const voteReview = (storeId, reviewer, isUpvote, cb) => {
	store_registry_instance.methods.getStoreAddress(storeId).call().then(store_address => {
		console.log('Voting to store: ' + store_address);
	  escrow_instance.methods.vote(store_address, ethAccountAddress, reviewer, isUpvote).send({
	    from: ethAccountAddress,
	    gas: 4000000,
	    gasPrice: '10000000000'
		}, cb);
	}).catch(
		// Log the rejection reason
	 (reason) => {
			console.log('Handle rejected promise ('+reason+') here.');
			voteReview(storeId, reviewer, isUpvote, cb);
		}
	);
}
exports.voteReview = voteReview;
//End of addVote function

/*
	Blockchain Read
*/

const storeExist = (storeId, cb) => {
  store_registry_instance.methods.getStoreAddress(storeId).call().then(result => {
    console.log('store address: '+result);
    var is_exist;
    if (result == 0x0){
      console.log('Store doesn\'t exist.');
      is_exist = false;
			cb(false);
    }
    else{
      console.log('Store does exist.');
      is_exist = true;
			cb(true);
    }
  }).catch(
    // Log the rejection reason
   (reason) => {
      console.log('Handle rejected promise ('+reason+') here.');
      storeExist(storeId, cb);
    }
  )
}
exports.storeExist = storeExist;
//End of storeExist function

const readCredibility = (address, cb) => {
	escrow_instance.methods.credibility(address).call().then(credibility => {
		console.log('raw credibility: ' + credibility);
		cb(credibility);
	}).catch(
		// Log the rejection reason
	 (reason) => {
			console.log('Handle rejected promise ('+reason+') here.');
			readCredibility(address, cb);
		}
	);
}
exports.readCredibility = readCredibility;
//End of readCredibility function

const readReview = (storeId, index, cb) => {
	store_registry_instance.methods.getStoreAddress(storeId).call().then(store_address => {
		var store_contract_instance = new web3.eth.Contract(store_abi, store_address);
    store_contract_instance.methods.allReviews(index).call().then(review => {
			cb({
				'content': review[0],
				'score': review[1],
				'reviewerAddress': review[2],
				'upvote': review[3],
				'downvote': review[4],
				'timestamp': review[5]
			});
		}).catch(
			// Log the rejection reason
		 (reason) => {
				console.log('Handle rejected promise ('+reason+') here.');
				readReview(storeId, index, cb);
			}
		);
	}).catch(
		// Log the rejection reason
	 (reason) => {
			console.log('Handle rejected promise ('+reason+') here.');
			readReview(storeId, index, cb);
		}
	);
}
exports.readReview = readReview;
//End of readReview function

const readOverallScore = (storeId, cb) => {
	store_registry_instance.methods.getStoreAddress(storeId).call().then(store_address => {
		if (store_address){
			var store_contract_instance = new web3.eth.Contract(store_abi, store_address);
	    store_contract_instance.methods.totalScore().call().then(totalScore => {
				store_contract_instance.methods.totalReviewAmount().call().then(totalReviewAmount => {
					cb(parseFloat(totalScore)/parseFloat(totalReviewAmount), totalReviewAmount);
				}).catch(
					// Log the rejection reason
				 (reason) => {
						console.log('Handle rejected promise ('+reason+') here.');
						readOverallScore(storeId, cb);
					}
				);
			}).catch(
				// Log the rejection reason
			 (reason) => {
					console.log('Handle rejected promise ('+reason+') here.');
					readOverallScore(storeId, cb);
				}
			);
		}
	}).catch(
		// Log the rejection reason
	 (reason) => {
			console.log('Handle rejected promise ('+reason+') here.');
			readOverallScore(storeId, cb);
		}
	);
}
exports.readOverallScore = readOverallScore;
// End of readOverallScore function

const readVoted = (storeId, voter, reviewer, cb) => {
	store_registry_instance.methods.getStoreAddress(storeId).call().then(store_address => {
		if (store_address){
			var store_contract_instance = new web3.eth.Contract(store_abi, store_address);
	    store_contract_instance.methods.voted(voter, reviewer).call().then(result => {
				cb(result)
			}).catch(
				// Log the rejection reason
			 (reason) => {
					console.log('Handle rejected promise ('+reason+') here.');
					readVoted(storeId, voter, reviewer, cb);
				}
			);
		}
	}).catch(
		// Log the rejection reason
	 (reason) => {
			console.log('Handle rejected promise ('+reason+') here.');
			readVoted(storeId, voter, reviewer, cb);
		}
	);
}
exports.readVoted = readVoted
