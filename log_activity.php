<?php
function logActivity($userId, $action, $conn) {
    $sql = "INSERT INTO user_activity (user_id, action) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $userId, $action);
    $stmt->execute();
    $stmt->close();
}
?>
