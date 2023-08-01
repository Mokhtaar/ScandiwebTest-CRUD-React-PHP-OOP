<?php
require_once('Product.php');
class Book extends Product
{
    public function addProduct(array $data)
    {
       $this->getDB()->addBook($data);
    }
}
