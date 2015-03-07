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



// Set Methods

var ax,ay,az;

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {

		ax = e.accelerationIncludingGravity.x;
		ay = e.accelerationIncludingGravity.y;
		az = e.accelerationIncludingGravity.z;

		if ( e.rotationRate ) {
			document.getElementById("rotationAlpha").innerHTML = e.rotationRate.alpha;
			document.getElementById("rotationBeta").innerHTML = e.rotationRate.beta;
			document.getElementById("rotationGamma").innerHTML = e.rotationRate.gamma;
		}		
	}
}

function runSetter(){
	getAndSendValues();
}

function getAndSendValues(){

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


function runGame(){
	var array = "[23,45,000]";
	alert(array[1]);
}








window.setInterval(function () {runGame();}, 20000);