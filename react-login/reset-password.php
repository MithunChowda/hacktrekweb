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
$newPassword = $data['newPassword'];
$securityAnswer = $data['securityAnswer'];

if (empty($email) || empty($newPassword) || empty($securityAnswer)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

// Check if the email exists and the security answer is correct
$stmt = $conn->prepare("SELECT security_answer FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    if ($row['security_answer'] === $securityAnswer) {
        // Security answer matches, update the password
        $stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
        $stmt->bind_param("ss", $newPassword, $email);
        
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Password reset successful."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error during password reset."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect security answer."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Email not found."]);
}

$stmt->close();
$conn->close();
?>
