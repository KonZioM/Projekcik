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
    die(json_encode(['success' => false, 'message' => 'Błąd połączenia z bazą danych: ' . $conn->connect_error]));
}

$sqlGainers = "SELECT ticker, price, change_percentage FROM market_data WHERE type = 'gain' ORDER BY timestamp DESC LIMIT 5";
$sqlLosers = "SELECT ticker, price, change_percentage FROM market_data WHERE type = 'loss' ORDER BY timestamp DESC LIMIT 5";

$resultGainers = $conn->query($sqlGainers);
$resultLosers = $conn->query($sqlLosers);

if (!$resultGainers || !$resultLosers) {
    echo json_encode(['success' => false, 'message' => 'Błąd pobierania danych z bazy danych.']);
    exit();
}

$gainers = [];
$losers = [];

while ($row = $resultGainers->fetch_assoc()) {
    $gainers[] = $row;
}

while ($row = $resultLosers->fetch_assoc()) {
    $losers[] = $row;
}

$conn->close();

echo json_encode([
    'success' => true,
    'gainers' => $gainers,
    'losers' => $losers
]);
?>