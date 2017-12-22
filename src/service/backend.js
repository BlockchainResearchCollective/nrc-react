var exports = module.exports = {};

var server = "http://188.166.190.168:3001/";

exports.checkLogin = function(callback){
  console.log("hello")
  var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(xhttp.responseText);
      callback(JSON.parse(xhttp.responseText));
		}
	}
	xhttp.open('GET', server + 'user', true);
	xhttp.send();
}
