/* JavaScript for Game Controller
 *
 * All code by Matt DePero
 */

// URL to folder that contains serverfile.php, including '/' on the end
var serverRootURL = "http://107.10.18.206/";


var xmlhttp;
if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari

	xmlhttp=new XMLHttpRequest();
}else{// code for IE6, IE5

	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}



// +----------------------------------------+
// |          Controller Methods            |
// +----------------------------------------+

var ax=0,ay=0,az=0;

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {


		ax = e.accelerationIncludingGravity.x;
		ay = e.accelerationIncludingGravity.y;
		az = e.accelerationIncludingGravity.z;



		// if ( e.rotationRate ) {
		// 	e.rotationRate.alpha;
		// 	b.rotationRate.beta;
		// 	e.rotationRate.gamma;
		// }		
	}
}

function runSetter(){
	getAndSendValues();
}

var data;
function getAndSendValues(){
	data = "["+ax+","+ay+","+az+"]";
	document.getElementById('consol').innerHTML = data;
	setData(data);
}

function setData( data ){
	var url = serverRootURL+"serverfile.php?set="+data+"&t=" + Math.random();
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}


// +----------------------------------------+
// |              Game Methods              |
// +----------------------------------------+

function getData(){
	var url = serverRootURL+"serverfile.php?get&t=" + Math.random();
	xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function runGame(){
	
	document.getElementById('consol').innerHTML = getData();
}


