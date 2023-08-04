"use client";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

interface ProductList {
  id: number;
  SKU: string;
  name: string;
  type: string;
  price: number;
  size: number | null;
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
}
export default function Home() {
  const [products, setProducts] = useState<ProductList[]>([]);
  const [checkedProducts, setCheckedProducts] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://backend-php-oop-mokhtaar.vercel.app"
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (checkedProducts: string[]) => {
    try {
      const response = await axios.delete(
        "https://backend-php-oop-mokhtaar.vercel.app",
        { data: checkedProducts }
      );
      console.log("res", response);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = (
    event: ChangeEvent<HTMLInputElement>,
    productSKU: string
  ) => {
    if (event.target.checked) {
      setCheckedProducts((prevCheckedProducts) => [
        ...prevCheckedProducts,
        productSKU,
      ]);
    } else {
      setCheckedProducts((prevCheckedProducts) =>
        prevCheckedProducts.filter(
          (checkedProduct) => checkedProduct !== productSKU
        )
      );
    }
  };

  return (
    <div className="px-5 sm:px-12">
      <div className="pt-10 pb-16">
        <div className="flex justify-between">
          <p className="text-2xl font-medium">Product list</p>
          <div className="space-x-3">
            <Link
              href="./NewProduct/"
              className="bg-gray-300 hover:bg-gray-200 py-1 px-4 rounded-md"
            >
              ADD
            </Link>
            <button
              onClick={() => handleDelete(checkedProducts)}
              id="delete-product-btn"
              className="bg-gray-300 hover:bg-gray-200 py-1 px-4 rounded-md"
            >
              MASS DELETE
              {/* {checkedProducts.length > 1 ? "Mass Delete" : "Delete"} */}
            </button>
          </div>
        </div>
        <div className="border my-5 border-black"></div>
        <div
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {products.map((product: ProductList) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 1.2 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              key={product.SKU}
              className="rounded-lg relative p-12 bg-white text-center shadow"
            >
              <div>
                <div className="absolute top-8 left-8">
                  <input
                    onChange={(event) => handleCheck(event, product.SKU)}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 delete-checkbox"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  {product.SKU}
                </h3>
                <h3 className="text-sm font-medium text-gray-900">
                  {product.name}
                </h3>
                <h3 className="text-sm font-medium text-gray-900">
                  {product.price} $
                </h3>
                {product.type === "Furniture" ? (
                  <h3 className="text-sm font-medium text-gray-900">
                    Dimensions: {product.height}x{product.length}x
                    {product.width}
                  </h3>
                ) : product.type === "Book" ? (
                  <h3 className="text-sm font-medium text-gray-900">
                    Weight: {product.weight}KG
                  </h3>
                ) : (
                  <h3 className="text-sm font-medium text-gray-900">
                    Size: {product.size} MB
                  </h3>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
