"use client";
import React, { useEffect, useState } from "react";
import { Form, Formik, useFormikContext } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import Link from "next/link";

interface FormValues {
  type: string;
}

const FormObserver = ({ setType }: { setType: any }) => {
  const { values } = useFormikContext<FormValues>();

  useEffect(() => {
    setType(values.type);
  }, [values.type]);
  return null;
};

const Page = () => {
  const router = useRouter();
  const [type, setType] = useState();
  return (
    <div className="px-5 sm:px-12">
      <div className="pt-10 pb-16">
        <Formik
          initialValues={{
            SKU: "",
            name: "",
            price: "",
            type: "",
            size: "",
            weight: "",
            height: "",
            width: "",
            length: "",
          }}
          validationSchema={yup.object({
            SKU: yup.string().trim().required("SKU is required"),
            name: yup.string().required("Name is required"),
            price: yup.number().required("Price is required"),
            type: yup
              .string()
              .oneOf(["DVDdisc", "Furniture", "Book"], "Invalid product type")
              .required("Required"),
          })}
          onSubmit={async (values) => {
            try {
              const response = await axios.post(
                "https://backend-php-oop.vercel.app",
                values
              );
              console.log(response.data);
              router.push("/");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Form id="product_form" className="w-full">
            <FormObserver setType={setType} />
            <div className="flex justify-between">
              <p className="text-2xl font-medium">Product list</p>
              <div className="space-x-3">
                <button
                  type="submit"
                  className="bg-gray-300 hover:bg-gray-200 py-1 px-4 rounded-md"
                >
                  Save
                </button>
                <Link
                  href="../"
                  className="bg-gray-300 hover:bg-gray-200 py-1 px-4 rounded-md"
                >
                  Cancel
                </Link>
              </div>
            </div>
            <div className="border my-5 border-black"></div>
            <div className="w-80">
              <CustomInput
                id="sku"
                label="SKU"
                name="SKU"
                type="text"
                placeholder="#SKU"
              />
              <CustomInput
                id="name"
                label="Name"
                name="name"
                type="text"
                placeholder="#Name"
              />
              <CustomInput
                id="price"
                label="Price($)"
                name="price"
                type="number"
                placeholder="#Price"
              />
            </div>
            <CustomSelect label="Type" name="type" placeholder="#type">
              <option id="productType" disabled value="">
                Select a type
              </option>
              <option value="DVDdisc">DVD</option>
              <option value="Book">Book</option>
              <option value="Furniture">Furniture</option>
            </CustomSelect>
            {type === "DVDdisc" ? (
              <>
                <CustomInput
                  id="size"
                  label="Size(MB)"
                  name="size"
                  type="number"
                  placeholder="#Size"
                />
                <p className="mt-3 font-semibold">
                  Please, provide disk space in MB
                </p>
              </>
            ) : type === "Book" ? (
              <>
                <CustomInput
                  id="weight"
                  label="Weight(KG)"
                  name="weight"
                  type="number"
                  placeholder="#Weight"
                />
                <p className="mt-3 font-semibold">
                  Please, provide weight in Kg
                </p>
              </>
            ) : type === "Furniture" ? (
              <div>
                <CustomInput
                  id="height"
                  label="Height(CM)"
                  name="height"
                  type="number"
                  placeholder="#Height"
                />
                <CustomInput
                  id="width"
                  label="Width(CM)"
                  name="width"
                  type="number"
                  placeholder="#Width"
                />
                <CustomInput
                  id="length"
                  label="Length(CM)"
                  name="length"
                  type="number"
                  placeholder="#Length"
                />
                <p className="mt-3 font-semibold">Please, provide dimensions</p>
              </div>
            ) : (
              ""
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Page;
