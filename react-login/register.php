<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$conn = new mysqli('localhost', 'root', '', 'userDB');

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed."]));
}

$data = json_decode(file_get_contents('php://input'), true);

// Get the data from the frontend
$email = $data['email'];
$password = $data['password'];
$security_question = $data['security_question'];  // Security question
$security_answer = $data['security_answer'];      // Security answer

// Check if email and password are empty
if (empty($email) || empty($password) || empty($security_question) || empty($security_answer)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

// Check if the email already exists in the database
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already exists."]);
    exit;
}

// Insert the new user into the database with the security question and answer
$stmt = $conn->prepare("INSERT INTO users (email, password, security_question, security_answer) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $email, $password, $security_question, $security_answer); // Insert the data
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Registration successful!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error during registration."]);
}

$stmt->close();
$conn->close();
?>
