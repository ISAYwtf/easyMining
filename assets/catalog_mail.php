<?php

    require_once('phpmailer/PHPMailerAutoload.php');
    $mail = new PHPMailer;
    $mail->CharSet = 'utf-8';

    // if (isset($_POST['submit'])) {
        $name = $_POST['name'];
        $phone = $_POST['phone'];

        if ($_POST['lastName']) {
            $lastName = $_POST['lastName'];
        } else {
            $lastName = 'нет';
        }

        if (isset($_POST['modalFormSMS'])) {
            $modalFormSMS = $_POST['modalFormSMS'];
        }

        //$mail->SMTPDebug = 3;                               // Enable verbose debug output

        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'iskander.aydynov@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
        $mail->Password = 'Dervin1998'; // Ваш пароль от почты с которой будут отправляться письма
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

        $mail->setFrom('iskander.aydynov@mail.ru'); // от кого будет уходить письмо?
        $mail->addAddress('29023051.140749@parser.amocrm.ru');     // Кому будет уходить письмо
        //$mail->addAddress('ellen@example.com');               // Name is optional
        //$mail->addReplyTo('info@example.com', 'Information');
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');
        //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        $mail->isHTML(true);                                  // Set email format to HTML

        $mail->Subject = 'Заявка из каталога';
        $mail->Body = 'Имя:&emsp;'.$name
                    .'<br>Фамилия:&emsp;'.$lastName
                    .'<br>Номер телефона:&emsp;'.$phone
                                .'<br>Почта:&emsp; нет';

        if ($modalFormSMS) {
            $mail->Body = $mail->Body.'<br>Связаться по смс:&emsp;Да';
        } else {
            $mail->Body = $mail->Body.'<br>Связаться по смс:&emsp;Нет';
        }

        $mail->AltBody = '';

        if(!$mail->send()) {
            echo '0';
        } else {
            // header('location: thank-you.html');
            echo '1';
        }
    // }

?>