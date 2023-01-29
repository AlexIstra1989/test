<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'user@example.com';                     //SMTP username
    $mail->Password   = 'secret';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('from@example.com', 'Mailer');
    $mail->addAddress('joe@example.net', 'Joe User');     //Add a recipient
    $mail->addAddress('ellen@example.com');               //Name is optional
    $mail->addReplyTo('info@example.com', 'Information');
    $mail->addCC('cc@example.com');
    $mail->addBCC('bcc@example.com');

    //Attachments
    $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}




// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require 'phpmailer/src/Exception.php';
// require 'phpmailer/src/PHPMailer.php';

// $mail = new PHPMailer(true);
// $mail =>CharSet = 'UTF-8';
// $mail->setLanguage('ru', 'phpmailer/language/');
// $mail->IsHTML(true);

// $mail->setFrom('info@alex888fcsm@gmail.com')
// $mail->addAddress('code@alex888fcsm@gmail.com');
// $mail->Subject = 'Hello';

// $hand = "Правая";
// if($_POST['hand'] == "left"){
//  $hand = "Левая";
// }

// $body = '<h1>Встречайте письмо</h1>';

// if(trim(!empty($_POST['name']))){
//  $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
// }
// if(trim(!empty($_POST['email']))){
//  $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
// }
// if(trim(!empty($_POST['hand']))){
//  $body.='<p><strong>Рука:</strong> '.$hand.'</p>';
// }
// if(trim(!empty($_POST['age']))){
//  $body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
// }

// if(!empty($_FILES['images']['tmp_name'])) {
//  $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
//  if(copy($_FILES['image']['tmp_name'], $filePath)) {
//   $fileAttach = $filePath;
//   $body.='<p><strong>Фото в приложении</strong></p>';
//   $mail->addAttachment($fileAttach);
//  }
// }

// $mail->Body = $body;

// if(!$mail->send()) {
//  $message = 'Ошибка';
// } else {
//  $message = "Отправлено";
// }

// $response = ['message' => $message];

// header('Content-type: application/json');
// echo json_encode($response);