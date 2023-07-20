<?php
require_once('DBInterface.php');
class MySQLDatabase implements Database
{
    private $conn;
    public function __construct()
    {
        $this->conn = $this->connect();
    }
    private $dbhost = "localhost";
    private  $dbname = "products";
    private  $userName = "mokhtar";
    private $password = "php@123";

    public function connect()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->dbhost . ';dbname=' . $this->dbname, $this->userName, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
    public function getAllProducts()
    {
        $sql = "SELECT * FROM `product-list`";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function deleteProducts(array $productsToDelete)
    {
        $skus = implode("','", $productsToDelete);
        $stmt = $this->conn->prepare("DELETE FROM `product-list` WHERE SKU IN ('$skus')");
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            echo "Record(s) deleted successfully.";
        } else {
            echo "No record found to delete.";
        }
    }
    private function bindCommonProductProperties($stmt, array $data)
    {
        $created_at = date('Y-m-d');
        $stmt->bindParam(':SKU', $data['SKU']);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':price', $data['price']);
        $stmt->bindParam(':type', $data['type']);
        $stmt->bindParam(':created_at', $created_at);
    }
    public function addBook(array $data)
    {
        $sql = "INSERT INTO `product-list`(id, SKU, name, price, type, created_at, weight) VALUES (null, :SKU, :name, :price, :type, :created_at, :weight)";
        $stmt = $this->conn->prepare($sql);
        $this->bindCommonProductProperties($stmt, $data);

        $stmt->bindParam(':weight', $data['weight']);

        $stmt->execute();
        $this->execute($stmt);
    }
    public function addFurniture(array $data)
    {
        $sql = "INSERT INTO `product-list`(id, SKU, name, price, type, created_at, height, width, length) VALUES (null, :SKU, :name, :price, :type, :created_at, :height, :width, :length)";
        $stmt = $this->conn->prepare($sql);
        $this->bindCommonProductProperties($stmt, $data);
        $stmt->bindParam(':height', $data['height']);
        $stmt->bindParam(':width', $data['width']);
        $stmt->bindParam(':length', $data['length']);
        $stmt->execute();
        $this->execute($stmt);
    }
    public function addDVD(array $data)
    {
        $sql = "INSERT INTO `product-list`(id, SKU, name, price, type, created_at, size) VALUES (null, :SKU, :name, :price, :type, :created_at, :size)";
        $stmt = $this->conn->prepare($sql);
        $this->bindCommonProductProperties($stmt, $data);
        $stmt->bindParam(':size', $data['size']);
        $stmt->execute();
        $this->execute($stmt);
    }
    public function execute($stmt)
    {
        if ($stmt) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
    }
}
