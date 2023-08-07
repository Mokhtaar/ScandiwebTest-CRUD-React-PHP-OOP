"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import ValidationSchema from "../components/ValidationSchema";

const Page = () => {
  const router = useRouter();
  const [skuIsUnique, setSkuIsUnique] = useState(true);

  return (
    <div className="px-5 sm:px-12">
      <div className="pt-10 pb-16">
        <Formik
          initialValues={{
            SKU: "",
            name: "",
            price: "",
            type: "",
            size: null,
            weight: null,
            height: null,
            width: null,
            length: null,
          }}
          validationSchema={ValidationSchema}
          onSubmit={async (values) => {
            try {
              const response = await axios.post(
                "https://backend-php-oop-mokhtaar.vercel.app",
                values
              );
              response.data.status === 1
                ? (router.push("/"), console.log(response.data))
                : response.data.message === "SKU already exists"
                ? setSkuIsUnique(false)
                : console.log(response.data);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ values }) => (
            <Form id="product_form" className="w-full">
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
              <div className="w-80 space-y-5">
                <CustomInput
                  id="sku"
                  skuIsUnique={skuIsUnique}
                  setSkuIsUnique={setSkuIsUnique}
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
                  type="text"
                  placeholder="#Price"
                />
              </div>
              <CustomSelect
                id="productType"
                label="Type switcher"
                name="type"
                placeholder="#type"
              >
                <option disabled value="">
                  Select a type
                </option>
                <option value="DVDdisc">DVD</option>
                <option value="Book">Book</option>
                <option value="Furniture">Furniture</option>
              </CustomSelect>
              <div className="w-80">
                {values.type === "DVDdisc" ? (
                  <>
                    <CustomInput
                      id="size"
                      label="Size(MB)"
                      name="size"
                      type="text"
                      placeholder="#Size"
                    />
                    <p className="pt-7 font-semibold">
                      Please, provide disk space in MB
                    </p>
                  </>
                ) : values.type === "Book" ? (
                  <>
                    <CustomInput
                      id="weight"
                      label="Weight(KG)"
                      name="weight"
                      type="text"
                      placeholder="#Weight"
                    />
                    <p className="pt-7 font-semibold">
                      Please, provide weight in Kg
                    </p>
                  </>
                ) : values.type === "Furniture" ? (
                  <div className="space-y-4">
                    <CustomInput
                      id="height"
                      label="Height(CM)"
                      name="height"
                      type="text"
                      placeholder="#Height"
                    />
                    <CustomInput
                      id="width"
                      label="Width(CM)"
                      name="width"
                      type="text"
                      placeholder="#Width"
                    />
                    <CustomInput
                      id="length"
                      label="Length(CM)"
                      name="length"
                      type="text"
                      placeholder="#Length"
                    />
                    <p className="pt-7 font-semibold">
                      Please, provide dimensions in HxWxL
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Page;
