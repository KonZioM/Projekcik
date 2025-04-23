<?php
header('Content-Type: application/json');

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'login_app';

$conn = new mysqli($host, $user, $password, $database);

$result = $conn->query("
    SELECT username, message, created_at 
    FROM comments 
    ORDER BY created_at DESC 
    LIMIT 50
");

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
