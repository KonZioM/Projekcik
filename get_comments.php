<?php
header('Content-Type: application/json');
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'login_app';

$conn = new mysqli($host, $user, $password, $database);

$symbol = $_GET['symbol'] ?? 'WIG';
$symbol = htmlspecialchars($symbol, ENT_QUOTES, 'UTF-8');

$stmt = $conn->prepare("SELECT username, message, created_at FROM comments WHERE symbol = ? ORDER BY created_at DESC LIMIT 50");
$stmt->bind_param("s", $symbol);
$stmt->execute();
$result = $stmt->get_result();

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = [
        'username' => htmlspecialchars($row['username']),
        'message' => htmlspecialchars($row['message']),
        'created_at' => date('H:i d.m.Y', strtotime($row['created_at']))
    ];
}

echo json_encode($comments);
$conn->close();
?>
