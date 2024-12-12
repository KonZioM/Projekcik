<?php
$hash = '$2y$10$c0rVDjdJM9hdbfiOiGLji.a3nOJ48Aunz6XtV1Kxcw4v/gs.S6PcS';  // Przykładowy hash
$password = 'KonZioM';  // Przykładowe hasło

if (password_verify($password, $hash)) {
    echo "Hasło jest poprawne!";
} else {
    echo "Hasło jest niepoprawne!";
}
?>