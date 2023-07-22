<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include './Database/DB.php';
include './Models/Product.php';
include './Models/Book.php';
include './Models/DVDdisc.php';
include './Models/Furniture.php';


function handleRequest($database)
{
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {

        case "GET":
            $products = $database->getAllProducts();
            echo json_encode($products);
            break;

        case "POST":
            $data = json_decode(file_get_contents('php://input'), true);
            $productType = $data['type'];
            $product = new $productType($database);
            $product->addProduct($data);
            break;

        case "DELETE":
            $data = json_decode(file_get_contents('php://input'), true);
            $products = $database->deleteProducts($data);
    }
}

echo 'hello';

handleRequest(new MySQLDatabase());
define("NAME", "MOKHTAR");

?>

<!DOCTYPE html>
<html>

<head>
</head>

<body>
    <h1><?php echo NAME ?></h1>
</body>

</html>