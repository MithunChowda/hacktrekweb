<?php
// Database connection parameters
$servername = "localhost";
$username = "root"; // Default username for XAMPP
$password = ""; // Default password for XAMPP (empty)
$dbname = "userdb"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch users
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

// Check if there are any results
if ($result->num_rows > 0) {
    // Output data of each row
    $users = [];
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users); // Return the users as a JSON array
} else {
    echo "0 results";
}

// Close connection
$conn->close();
?>
