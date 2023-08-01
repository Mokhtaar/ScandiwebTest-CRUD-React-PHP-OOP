<?php
require_once('Product.php');
class Furniture extends Product
{
    public function addProduct(array $data)
    {
        $this->getDB()->addFurniture($data);
    }
}
