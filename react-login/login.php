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
$password = $data['password'];

if (empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Email and password are required."]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Compare the entered password as plain text (consider using hashed password in production)
    if ($password === $user['password']) {
        // Check if the logged-in user is admin
        $isAdmin = ($email === 'admin@gmail.com') ? true : false;
        
        echo json_encode([
            "status" => "success", 
            "message" => "Login successful!", 
            "isAdmin" => $isAdmin, 
            "userEmail" => $user['email']
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid password."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found."]);
}

$stmt->close();
$conn->close();
?>
