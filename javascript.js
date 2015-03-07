/* JavaScript for Game Controller
 *
 * All code by Matt DePero
 */

// URL to folder that contains serverfile.php, including '/' on the end
var rootURL = "http://107.10.18.206/";


var xmlhttp;
if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari

	xmlhttp=new XMLHttpRequest();
}else{// code for IE6, IE5

	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

function setData( data ){
	var url = rootURL+"serverfile.php?set="+data+"&t=" + Math.random();
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

function getData(){
	var url = rootURL+"serverfile.php?get&t=" + Math.random();
	xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function run(){
	document.getElementById("tester").style.backgroundColor = "#" + getColor();
}



window.setInterval(function () {run();}, 500);