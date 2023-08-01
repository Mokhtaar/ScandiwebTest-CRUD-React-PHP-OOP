<?php
// require_once('../Database/DBInterface.php');
require_once(__DIR__ . '/../Database/DBInterface.php');
abstract class Product 
{
    private $db;
    public function __construct(DBInterface $db)
    {
        $this->db = $db;
    }
    protected function getDB()
    {
        return $this->db;
    }
    abstract function addProduct(array $data);
}
