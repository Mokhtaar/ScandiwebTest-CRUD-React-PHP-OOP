<?php
require_once('DBInterface.php');
require_once(__DIR__ . '/../../vendor/autoload.php');

use Dotenv\Dotenv as Dotenv;

class MySQLDatabase implements DBInterface
{
    private $conn;
    private $dbhost, $dbname, $userName, $password, $port;
    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
        $dotenv->load();
        $this->dbhost = $_ENV["DB_HOST"];
        $this->dbname = $_ENV["DB_NAME"];
        $this->userName = $_ENV["DB_USERNAME"];
        $this->password = $_ENV["DB_PASSWORD"];
        $this->port = $_ENV["DB_PORT"];
        $this->conn = $this->connect();
    }

    public function connect()
    {
        try {
            $dsn = 'mysql:host=' . $this->dbhost . ';port=' . $this->port . ';dbname=' . $this->dbname;
            $conn = new PDO($dsn, $this->userName, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }

    public function getAllProducts()
    {
        $sql = "SELECT * FROM productList";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function deleteProducts(array $productsToDelete)
    {
        $skus = implode("','", $productsToDelete);
        $stmt = $this->conn->prepare("DELETE FROM productList WHERE SKU IN ('$skus')");
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
        try {
            $sql = "INSERT INTO productList(id, SKU, name, price, type, created_at, weight) VALUES (null, :SKU, :name, :price, :type, :created_at, :weight)";
            $stmt = $this->conn->prepare($sql);
            $this->bindCommonProductProperties($stmt, $data);

            $stmt->bindParam(':weight', $data['weight']);
            $stmt->execute();
            $this->handleAddProductResponse("Success");
        } catch (PDOException $e) {
            $this->handleCatchError($e);
        }
    }
    public function addFurniture(array $data)
    {
        try {
            $sql = "INSERT INTO productList(id, SKU, name, price, type, created_at, height, width, length) VALUES (null, :SKU, :name, :price, :type, :created_at, :height, :width, :length)";
            $stmt = $this->conn->prepare($sql);
            $this->bindCommonProductProperties($stmt, $data);

            $stmt->bindParam(':height', $data['height']);
            $stmt->bindParam(':width', $data['width']);
            $stmt->bindParam(':length', $data['length']);
            $stmt->execute();
            $this->handleAddProductResponse("Success");
        } catch (PDOException $e) {
            $this->handleCatchError($e);
        }
    }
    public function addDVD(array $data)
    {
        try {
            $sql = "INSERT INTO productList(id, SKU, name, price, type, created_at, size) VALUES (null, :SKU, :name, :price, :type, :created_at, :size)";
            $stmt = $this->conn->prepare($sql);
            $this->bindCommonProductProperties($stmt, $data);
            $stmt->bindParam(':size', $data['size']);
            $stmt->execute();
            $this->handleAddProductResponse("Success");
        } catch (PDOException $e) {
            $this->handleCatchError($e);
        }
    }

    public function handleAddProductResponse($message)
    {
        if ($message === "Success") {
            $res = ['status' => 1, 'message' => 'Record created successfully'];
            echo json_encode($res);
            return;
        }

        $responseMessage = $message;
        if ($message === "Unique constraint violation") {
            $responseMessage = 'SKU already exists';
        }

        $res = ['status' => 0, 'message' => $responseMessage];
        echo json_encode($res);
    }

    public function handleCatchError($e)
    {
        if ($e->getCode() === "23000") {
            $this->handleAddProductResponse("Unique constraint violation");
        } else {
            $this->handleAddProductResponse("Failed to create record");
        }
    }
}
