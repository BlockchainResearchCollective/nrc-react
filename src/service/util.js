const GoogleImages = require('google-images');

var exports = module.exports = {};

const client = new GoogleImages('013844413201672951539:mks7ril9cvg', 'AIzaSyDPKa7D_mCCplLNOXGn1I7D3Cxz9SQLRI8');

exports.searchImage = function(input, callback){
  client.search(input).then(images => {
    callback(images[0].url);
  })
}


exports.checkUrlStatus = function(url, cb){
	if (url.match('https://www.google.com.sg/maps/place/')){
		return true;
	} else {
		return false;
	}
}

exports.getStoreNameFromUrl = function(url){
	var results = url.split("/");
	return decodeURIComponent(results[5].split('+').join(' '));
}

exports.getStoreIdFromUrl = function(url){
	var results = url.split("/");
	var storeLatLng = results[7].split('!');
	return results[5].split('+').join('') + "--" + storeLatLng[storeLatLng.length - 2].slice(2).match(/[0-9]+\.[0-9]{3}/g) + "--" + storeLatLng[storeLatLng.length - 1].slice(2).match(/[0-9]+\.[0-9]{3}/g);
}
