<?PHP

/* This file is to be placed on the server to store and send the data being used to control the screen
 *
 * All Code by Matt DePero
 */

if(isset($_REQUEST['set'])){
	$myfile = fopen("test.txt", "w") or die("Unable to open file!");
	fwrite($myfile, $_REQUEST['color']);
	fclose($myfile);
}

if(isset($_REQUEST['get'])){
	$myfile = fopen("test.txt", "r") or die("Unable to open file!");
	echo fread($myfile,filesize("test.txt"));
	fclose($myfile);
}


?>