<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DB.php';
include 'Product.php';
include 'Book.php';
include 'DVDdisc.php';
include 'Furniture.php';


function handleRequest()
{
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {

        case "GET":
            $productList = new MySQLDatabase();
            $products = $productList->getAllProducts();
            echo json_encode($products);
            break;

        case "POST":
            $data = json_decode(file_get_contents('php://input'), true); 
            $productType = $data['type'];
            $product = new $productType(new MySQLDatabase());
            $product->addProduct($data);
            break;

        case "DELETE":
            $data = json_decode(file_get_contents('php://input'), true);
            $products = new MySQLDatabase();
            $products->deleteProducts($data);
    }
}

handleRequest();
