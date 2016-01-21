<?php
define('DB_SERVER', '127.0.0.1');
define('DB_USERNAME', 'l9000265_eventWF');
define('DB_PASSWORD', 'piPOba65be');
define('DB_DATABASE', 'l9000265_eventWF');

//$db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
$db = mysqli_connect('localhost', 'l9000265_eventWF', 'piPOba65be', 'l9000265_eventWF');

if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}else{
}
function closeConnection(){
	global $db;
	mysqli_close($db);
}
?>