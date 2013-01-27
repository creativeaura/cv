<?php
	$to = 'name@email.com';
	$subject = 'Message from CV@Site';
	$from = 'CV Terminal';
	$fromEmail = 'name@email.com';
	$header = 'From: ' . $from . '<' . $fromEmail . '>';

	if($_POST) {
		$message = $_POST['message'];
		if(!mail($to, $subject, $message, $header)){
		  die('Error sending your message. Try again.');
		}else{
		  die('You message has been sent.');
		}
	}
?>
