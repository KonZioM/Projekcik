<?php
session_start();

if (isset($_SESSION['user_id'])) {
    $host = 'localhost';
    $user = 'root';
    $password = '';
    $database = 'login_app';

    $conn = new mysqli($host, $user, $password, $database);

    if ($conn->connect_error) {
        die("Błąd połączenia z bazą danych: " . $conn->connect_error);
    }

    $userId = $_SESSION['user_id'];
    $action = "Wylogowanie";

    $sql_activity = "INSERT INTO user_activity (user_id, action) VALUES (?, ?)";
    $stmt_activity = $conn->prepare($sql_activity);
    $stmt_activity->bind_param("is", $userId, $action);
    $stmt_activity->execute();
    $stmt_activity->close();
    
    $conn->close();
}

session_unset();
session_destroy();
header("Location: index.html");
exit();
?>
