/* JavaScript for Game Controller
 *
 * All code by Matt DePero
 */

var xmlhttp;
if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari

	xmlhttp=new XMLHttpRequest();
}else{// code for IE6, IE5

	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

function setColor(){
	var color = document.getElementById('color').value;
	var url = "http://107.10.18.206/serverfile.php?set&color="+color+"&t=" + Math.random();
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

function getColor(){
	var url = "http://107.10.18.206/serverfile.php?get&t=" + Math.random();
	xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            alert(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


// function run(){
// 	document.getElementById("tester").style.backgroundColor = "#" + getColor();
// }



// window.setInterval(function () {run();}, 500);