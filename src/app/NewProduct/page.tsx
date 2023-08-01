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
          // const fetchData = async () => {
          //   try {
          //     const response = await axios.get(
          //       "https://backend-php-oop.vercel.app"
          //     );
          //     setProducts(response.data);
          //   } catch (error) {
          //     console.log(error);
          //   }
          // };
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
          <Form className="w-full">
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
                label="SKU"
                name="SKU"
                type="text"
                placeholder="#SKU"
              />
              <CustomInput
                label="Name"
                name="name"
                type="text"
                placeholder="#Name"
              />
              <CustomInput
                label="Price($)"
                name="price"
                type="number"
                placeholder="#Price"
              />
            </div>
            <CustomSelect label="Type" name="type" placeholder="#type">
              <option disabled value="">
                Select a type
              </option>
              <option value="DVDdisc">DVD-disc</option>
              <option value="Book">Book</option>
              <option value="Furniture">Furniture</option>
            </CustomSelect>
            {type === "DVDdisc" ? (
              <>
                <CustomInput
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
                  label="Height(CM)"
                  name="height"
                  type="number"
                  placeholder="#Height"
                />
                <CustomInput
                  label="Width(CM)"
                  name="width"
                  type="number"
                  placeholder="#Width"
                />
                <CustomInput
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
