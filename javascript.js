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
	xmlhttp.open("GET","http://107.10.18.206/serverfile.php?get&t=" + Math.random(),true);
	xmlhttp.send();
	document.getElementById("test").innerHTML=xmlhttp.responseText;
}


// function run(){
// 	document.getElementById("tester").style.backgroundColor = "#" + getColor();
// }



// window.setInterval(function () {run();}, 500);