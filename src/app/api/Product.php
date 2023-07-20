<?php
require_once('DBInterface.php');
require_once('DB.php');
abstract class Product 
{
    private $db;
    public function __construct(Database $db)
    {
        $this->db = $db;
    }
    protected function getDB()
    {
        return $this->db;
    }
    abstract function addProduct(array $data);
}
