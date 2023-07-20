<?php

interface Database
{
    public function connect();
    public function getAllProducts();
    public function deleteProducts(array $data);
    public function addDVD(array $data);
    public function addBook(array $data);
    public function addFurniture(array $data);
}
