<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$conn = new mysqli('localhost', 'root', '', 'userDB');

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed."]));
}

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];

if (empty($email)) {
    echo json_encode(["status" => "error", "message" => "Email is required."]);
    exit;
}

// Check if the email exists in the database
$stmt = $conn->prepare("SELECT security_question FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Fetch the security question
    $row = $result->fetch_assoc();
    echo json_encode([
        "status" => "success",
        "security_question" => $row['security_question'],
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Email not found."]);
}

$stmt->close();
$conn->close();
?>
