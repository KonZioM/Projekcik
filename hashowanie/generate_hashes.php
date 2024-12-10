<?php
$passwords = [
    'KonZioM',
    'Krysztal',
    'ZAQ!2wsx',
    '12345678'
];

foreach ($passwords as $password) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    echo "Hasło: $password<br>";
    echo "Hash: $hashedPassword<br><br>";
}
?>
