<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include __DIR__ . '/Database/DB.php';
include __DIR__ . '/Models/Product.php';
include __DIR__ . '/Models/Book.php';
include __DIR__ . '/Models/DVDdisc.php';
include __DIR__ . '/Models/Furniture.php';
include __DIR__ . '/../vendor/autoload.php';


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

handleRequest(new MySQLDatabase());