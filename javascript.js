
var url = "ws://107.10.18.206:8000/"

  function init()
  {
	// document.myform.url.value = "ws://localhost:8000/"
	// document.myform.inputtext.value = "Hello World!"
	// document.myform.disconnectButton.disabled = true;
	doConnect();
  }

  function doConnect()
  {
    websocket = new WebSocket(url);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };

  }

  function onOpen(evt)
  {
 //    writeToScreen("connected\n");
	// document.myform.connectButton.disabled = true;
	// document.myform.disconnectButton.disabled = false;

	startSetter();
  }

  function onClose(evt)
  {
 //    writeToScreen("disconnected\n");
	// document.myform.connectButton.disabled = false;
	// document.myform.disconnectButton.disabled = true;

  }

  function onMessage(evt)
  {
    // writeToScreen("response: " + evt.data + '\n');
  }

  function onError(evt)
  {
    //writeToScreen('error: ' + evt.data + '\n');

	websocket.close();

	// document.myform.connectButton.disabled = false;
	// document.myform.disconnectButton.disabled = true;

  }

  function doSend(message)
  {
    // writeToScreen("sent: " + message + '\n'); 
    websocket.send(message);
  }

  function writeConsol(message)
  {
    document.getElementById('consol').innerHTML = message;

  }

  window.addEventListener("load", init, false);


   function sendText() {
		doSend( document.myform.inputtext.value );
   }

  function clearText() {
		// document.myform.outputtext.value = "";
   }

   function doDisconnect() {
		websocket.close();
   }













// +----------------------------------------+
// |          Controller Methods            |
// +----------------------------------------+
var fps = 10;
var turnRadius = 10;//Bigger turn radius = wider turns

var ay=0;
turnRadius = 1.0/turnRadius;

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {


		// ax = e.accelerationIncludingGravity.x;
		ay = e.accelerationIncludingGravity.y;
		// az = e.accelerationIncludingGravity.z;

		if(ay==null){
			doDisconnect();
			if(document.getElementById('consol').innerHTML != null)
				writeConsol("Sorry, your computer does not support the accelerometer.");
		}

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
	data = ay*turnRadius;
	writeConsol("Value Sent: "+data);
	doSend(data);
}

function startSetter(){
	window.setInterval(function () {runSetter();}, 1000/fps);
}