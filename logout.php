<?php
session_start();
session_unset();
session_destroy();

echo '<script>localStorage.removeItem("username"); window.location.href = "index.html";</script>';
exit();
?>