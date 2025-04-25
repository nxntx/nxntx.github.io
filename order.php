<?php
// Перевірка, чи форма відправлена
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Отримання даних з форми
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $product_id = intval($_POST['product_id']);

    // Валідація даних
    if (empty($name) || empty($phone)) {
        die("Будь ласка, заповніть усі поля");
    }

    // Збереження в базу даних (приклад з MySQL)
    $servername = "localhost";
    $username = "username";
    $password = "password";
    $dbname = "autoking";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Помилка підключення: " . $conn->connect_error);
    }

    $sql = "INSERT INTO orders (name, phone, product_id) VALUES ('$name', '$phone', $product_id)";
    if ($conn->query($sql) === TRUE) {
        // Відправка на пошту
        $to = "order@autoking.com";
        $subject = "Нове замовлення";
        $message = "Клієнт: $name\nТелефон: $phone\nID товару: $product_id";
        mail($to, $subject, $message);
    
        echo "Замовлення прийнято! Очікуйте дзвінка.";
    } else {
        echo "Помилка: " . $conn->error;
    }

    $conn->close();
} else {
    // Якщо хтось спробував відкрити order.php без форми
    header("Location: index.html");
}
$stmt = $conn->prepare("INSERT INTO orders (name, phone, product_id) VALUES (?, ?, ?)");
$stmt->bind_param("ssi", $name, $phone, $product_id);
$stmt->execute();
$stmt->close();
$conn->close();
?>