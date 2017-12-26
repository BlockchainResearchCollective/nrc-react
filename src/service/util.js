var exports = module.exports = {};

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
