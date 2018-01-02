var exports = module.exports = {};

exports.searchImage = function(keyword, callback){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			callback(JSON.parse(xhttp.responseText).url)
		}
	}
	xhttp.open('GET', 'http://188.166.190.168:3001/image/search/' + keyword, true);
  xhttp.send();
}

exports.checkUrlStatus = function(url){
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

exports.timeConverter = function(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  if (a.getMinutes() < 10){
    var min = '0' + a.getMinutes();
  } else {
    var min = a.getMinutes();
  }
  if (a.getSeconds() < 10){
    var sec = '0' + a.getSeconds();
  } else {
    var sec = a.getSeconds();
  }
  var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
