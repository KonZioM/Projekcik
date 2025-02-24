<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'login_app';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Błąd połączenia z bazą danych: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$marketData = $data['data'];
$type = $data['type'];

if (empty($marketData) || !in_array($type, ['gain', 'loss'])) {
    echo json_encode(['success' => false, 'message' => 'Nieprawidłowe dane.']);
    exit();
}

// Przygotuj zapytanie SQL
$sql = "INSERT INTO market_data (ticker, price, change_percentage, type) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Błąd przygotowania zapytania SQL.']);
    exit();
}

foreach ($marketData as $item) {
    $ticker = $item['ticker'];
    $price = $item['price'];
    $changePercentage = str_replace('%', '', $item['change_percentage']); // Usuń znak %

    $stmt->bind_param("sdds", $ticker, $price, $changePercentage, $type);
    $stmt->execute();
}

$stmt->close();
$conn->close();

echo json_encode(['success' => true, 'message' => 'Dane zostały zapisane.']);
?>