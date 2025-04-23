<?php
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'login_app';
$conn = new mysqli($host, $user, $password, $database);

$email = $_GET['email'] ?? '';
$code = $_GET['code'] ?? '';

if (!$email || !$code) {
    die('Brak danych do aktywacji.');
}

$sql = "SELECT id FROM users WHERE email = ? AND activation_code = ? AND is_active = 0";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $code);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows == 1) {
    $stmt->close();
    $sql_update = "UPDATE users SET is_active = 1, activation_code = NULL WHERE email = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("s", $email);
    $stmt_update->execute();
    $stmt_update->close();
    echo "Konto zostało aktywowane! Możesz się zalogować.";
} else {
    echo "Nieprawidłowy link aktywacyjny lub konto już aktywne.";
}
$conn->close();
?>
