<?php

$senderName = $_POST['senderName'];
$senderEmail = $_POST['senderEmail'];
$senderPhone = $_POST['senderPhone'];
$senderMessage = $_POST['senderMessage'];
$formCheckbox = $_POST['formCheckbox'];

if(isset($senderName, $senderEmail, $senderPhone, $senderMessage, $formCheckbox) && !empty($senderName) && filter_var($senderEmail, FILTER_VALIDATE_EMAIL) && !empty($senderPhone) && !empty($senderMessage) && !empty($formCheckbox)) {

	$toEmail = "linardsramza@gmail.com";
	$mailHeaders = "From: " . $_POST["senderName"] . "<". $_POST["senderEmail"] .">\r\n";

	if(mail($toEmail, $_POST["senderPhone"], $_POST["senderMessage"], $mailHeaders)) {
		print "<p class='message-success'><b>Message sent</b></p>";
	} else {
		print "<p class='message-error'><b>Error occured, try again</b></p>";
	}
}
