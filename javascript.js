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
	color = document.getElementById('color').value;
	xmlhttp.open("GET","http://107.10.18.206/?set&color="+color+"&t=" + Math.random(),true);
	xmlhttp.send();
}

function getColor(){
	xmlhttp.open("GET","http://107.10.18.206/?get&t=" + Math.random(),true);
	xmlhttp.send();
	document.getElementById("test").innerHTML=xmlhttp.responseText;
}