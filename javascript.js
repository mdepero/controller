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
	data = ""+ax+","+ay+","+az+"";
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

var direction = 0,speed=1.5,fps=20;

var returnedData = "0,0,0",accX=0,accY=0,accZ=0,x = 50,y = 50;
	
function fetchData(){
	var url = serverRootURL+"serverfile.php?get&t=" + Math.random();
	xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            returnedData = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getData(){
	fetchData();
	var parsedData = returnedData.split(",");
	accX = parsedData[0]*1.0;
	accY = parsedData[1]*1.0;
	accZ = parsedData[2]*1.0;
}

function runGame(){
	getData();
	direction += accY/15.0;

	x += Math.cos(direction)*speed;
	y += Math.sin(direction)*speed;

	document.getElementById('consol').innerHTML = x + " "+y;
	

	draw();
}

function draw(){
	document.getElementById('test').style.left = x+"vw";
	document.getElementById('test').style.top = y+"vh";
}


