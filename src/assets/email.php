<?php

header('Content-type: application/json');

$errors = '';

if(empty($errors))
{

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

  if (strlen($request->uid) > 0) { //honey pot
    return;
  }
	$to_email = $request->emailto;
	$from_email = $request->emailfrom;
  $subject = $request->subject;
	$message = $request->message;
	$from_name = $request->namefrom;

	$email_body = '<html><body>';
	$email_body .= "<p>$message</p>";
	$email_body .= '</body></html>';

	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
	$headers .= "From: $from_email\n";
	$headers .= "Reply-To: $from_email";

	mail($to_email,$subject,$email_body,$headers);

	$response_array['status'] = 'success';
	echo json_encode($response_array);
	header($response_array);
	return $from_email;
} else {
	$response_array['status'] = 'error';
	echo json_encode($response_array);
	header('Location: /error.html');
}
?>
