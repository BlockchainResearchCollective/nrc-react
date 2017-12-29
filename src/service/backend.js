var exports = module.exports = {};

exports.writeHistory = function(userId, record, callback){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
      if (this.status == 200){
        callback(true);
      } else {
        callback(false);
      }
		}
	}
	xhttp.open('POST', 'http://188.166.190.168:3001/history/user/' + userId, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(record));
}

exports.readHistory = function(userId, pageNum, callback){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
      if (this.status == 200) {
        callback(JSON.parse(xhttp.responseText));
      } else {
        callback({"currentPage":pageNum,"txHistory":[]});
      }
		}
	}
	xhttp.open('GET', 'http://188.166.190.168:3001/history/user/' + userId + '/' + pageNum, true);
  xhttp.send();
}
