import React, { useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectedProductById,
  updateProductAsync,
} from "../../product/productSlice";
import { set, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductForm = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const params = useParams();
  const selectedProduct = useSelector(selectedProductById);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const handleDelete =()=>{
    const product = {...selectedProduct}
    product.deleted = true
    dispatch(updateProductAsync(product));
  }

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.title);
      setValue("price", selectedProduct.price);
      setValue("discountPrice", selectedProduct.discountPrice);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("stock", selectedProduct.stock);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("shippingCost", selectedProduct.shippingCost);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
    }
  }, [selectedProduct, params.id, setValue]);

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = { ...data };
          product.images = [product.image1, product.image2, product.image3];
          product.shippingCost = +product.shippingCost;
          product.price = +product.priced;
          product.discountPrice = +product.discountPrice;
          product.stock = +product.stock;
          delete product.image1;
          delete product.image2;
          delete product.image3;

          console.log(product);
          if (params.id) {
            product.id = params.id;
            product.rating = +selectedProduct.rating || 0;
            dispatch(updateProductAsync(product));
            reset();

            toast.success("Product updated successfully");
          } else {
            dispatch(createProductAsync(product));
          }
        })}
      >
        <div className="space-y-12 p-10">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-8">
              {/* ===========Product Name */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("title", { required: "title is required" })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Product Name"
                    />
                  </div>
                </div>
              </div>
              {/* ===========Product Desription */}
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about Product.
                </p>
              </div>
              {/* ===========Product Price */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="flex mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset overflow-hidden  focus-within:ring-indigo-600 max-w-44">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      Rs:
                    </span>
                    <input
                      type="number"
                      {...register("price", { required: "price is required" })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 overflow-hidden  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="MRP in number only"
                    />
                  </div>
                </div>
              </div>
              {/* ===========Product discountPrice*/}
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPrice"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sell Price
                </label>
                <div className="flex mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 max-w-44">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      Rs:
                    </span>
                    <input
                      type="number"
                      {...register("discountPrice", {
                        required: "sell price is required",
                        min: 0,
                      })}
                      id="discountPrice"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 overflow-hidden  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Sell price in number only"
                    />
                  </div>
                </div>
              </div>
              {/* ===========Product stocks */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="flex mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 max-w-44">
                    <input
                      type="number"
                      {...register("stock", {
                        required: "stock is required",
                        min: 0,
                      })}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 overflow-hidden  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Stock in number only"
                    />
                  </div>
                </div>
              </div>
              {/* ===========Product shipping cost */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="shippingCost"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Shipping Cost
                </label>
                <div className="flex mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 max-w-44">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      Rs:
                    </span>
                    <input
                      type="number"
                      {...register("shippingCost", {
                        required: "shippingCost is required",
                        min: 0,
                      })}
                      id="shippingCost"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1  overflow-hidden text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Shipping cost in number only"
                    />
                  </div>
                </div>
              </div>
              {/* ===========Product thumbnail*/}
              <div className="sm:col-span-2">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="flex mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 max-w-44">
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "thumbnail is required",
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 overflow-hidden text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Main pic of Product"
                    />
                  </div>
                </div>
              </div>
              {/* ===========Product image1*/}
              <div className="sm:col-span-2">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  image1
                </label>
                <div className="flex mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 max-w-44">
                    <input
                      type="text"
                      {...register("image1")}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 overflow-hidden text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="image1 link"
                    />
                  </div>
                </div>
              </div>
              {/* ===========Product image2*/}
              <div className="sm:col-span-2">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  image2
                </label>
                <div className="flex mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 max-w-44">
                    <input
                      type="text"
                      {...register("image2")}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 overflow-hidden text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="image2 link"
                    />
                  </div>
                </div>
              </div>
              {/* ===========Product image3*/}
              <div className="sm:col-span-2">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  image3
                </label>
                <div className="flex mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 max-w-44">
                    <input
                      type="text"
                      {...register("image3")}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 overflow-hidden text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="image3 link"
                    />
                  </div>
                </div>
              </div>
              {/* ===========Brands */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-1">
                  <select {...register("brand")}>
                    <option value="">Choose Brand</option>
                    {brands &&
                      brands.map((brand) => (
                        <option value={brand.value}>{brand.label}</option>
                      ))}
                  </select>
                </div>
              </div>
              {/* ===========Categories */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-1">
                  <select {...register("categories")}>
                    <option value="">Choose Category</option>
                    {categories &&
                      categories.map((category) => (
                        <option value={category.value}>{category.label}</option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
         {selectedProduct && <button
            onClick={handleDelete}
            type="submit"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
