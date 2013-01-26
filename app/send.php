<?php
	$to = 'gaurav@jassal.me';
	$subject = 'Message from CV@Jassal';
	$from = 'CV Jassal';
	$fromEmail = 'cv@jassal.me';
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