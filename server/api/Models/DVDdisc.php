<?php
require_once('Product.php');
class DVDdisc extends Product
{
    public function addProduct(array $data)
    {
        $this->getDB()->addDVD($data);
    }
}
