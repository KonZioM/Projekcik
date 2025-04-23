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
    die(json_encode(['success' => false, 'message' => 'Błąd połączenia z bazą danych']));
}

$sqlGainers = "SELECT ticker, price, change_percentage FROM market_data WHERE type='gain'";
$sqlLosers  = "SELECT ticker, price, change_percentage FROM market_data WHERE type='loss'";
$resultGainers = $conn->query($sqlGainers);
$resultLosers  = $conn->query($sqlLosers);

if (!$resultGainers || !$resultLosers) {
    echo json_encode(['success' => false]);
} else {
    echo json_encode([
        "gainers" => mysqli_fetch_all($resultGainers),
        "losers"  => mysqli_fetch_all($resultLosers)
    ]);
}
?>
