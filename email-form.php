<?php
$to = "tudirecciondeemail@example.com";
$subject = "Prueba de correo electrónico";
$message = "Este es un correo de prueba enviado desde PHP.";
$headers = "From: sender@example.com";

if (mail($to, $subject, $message, $headers)) {
    echo "Correo electrónico enviado correctamente.";
} else {
    echo "Error al enviar el correo electrónico.";
}
?>