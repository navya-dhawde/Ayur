import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  updateUserAsync,
} from "../features/auth/authSlice";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { toast } from "react-toastify";
import { selectUserInfo } from "../features/user/userSlice";

const CheckOut = () => {
  const [open, setOpen] = useState(true);

  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const currentOrder = useSelector(selectCurrentOrder);
  const dispatch = useDispatch();

  const totalItems = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const [selectedAddress, setSeletedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleAddress = (e) => {
    setSeletedAddress(user.addresses[e.target.value]);
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalItems,
        user,
        paymentMethod,
        selectedAddress,
        status : "pending", //need to be changed as delivered,received
 
      };
      dispatch(createOrderAsync(order));
      //need to redirect from here to new order succcess page
    } else {
      toast.error("Enter Address and Payment Method");
    }
  };
  
  const totalAmount = items.reduce((amount, item) => {
    const price = item.discountPrice ? item.discountPrice : item.price;
    return price * item.quantity + item.shippingCost + amount;
  }, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
  
    dispatch(deleteItemFromCartAsync(id));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && currentOrder.paymentMethod ==='cash' && <Navigate to={`/orderSuccess/${currentOrder.id}`} replace={true}></Navigate>}
      {currentOrder &&  currentOrder.paymentMethod ==='card' && (
        <Navigate
          to={`/stripe-checkout/`}
          replace={true}
        ></Navigate>
      )}
      <div className="bg-customGrey mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="bg-customWhite mt-20 p-10"
              noValidate
              onSubmit={handleSubmit((data, e) => {
                e.preventDefault();
                console.log({ ...user, addresses: [data] });
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 mt-15 pb-12">
                  <h2 className="cart-title text-3xl font-bold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="cart-desc mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="cart-head mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customGreen sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customGreen sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="tel"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone No.
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "Phone no is required",
                          })}
                          type="tel"
                          maxLength={10}
                          className="inline w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customGreen sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          {...register("country", {
                            required: "Country is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-customGreen sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>India</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "Address is required",
                          })}
                          id="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customGreen sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "City is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customGreen sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="region"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customGreen sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "Postal Code is required",
                          })}
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customGreen sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="cart-head mt-10 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-m font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-customSage px-3 py-2 text-m font-semibold text-white shadow-sm hover:bg-customMint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customGreen"
                    >
                      Add Address
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="cart-head text-base font-semibold leading-7 text-gray-900">
                    Address
                  </h2>
                  <p className="cart-desc mt-1 text-sm leading-6 text-gray-600">
                    Choose From Existing Address
                  </p>
                  <ul role="list" className="cart-desc divide-y divide-gray-100">
                    {user.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 py-5 px-50"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <input
                            type="radio"
                            name="address"
                            onChange={handleAddress}
                            value={index}
                            className="focus:ring-customGreen"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-800">
                              {address.phone}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.city}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {address.email}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="cart-head text-sm font-semibold leading-6 text-gray-900">
                        Payment Method
                      </legend>
                      <p className="cart-desc mt-1 text-sm leading-6 text-gray-600">
                        These are delivered via SMS to your mobile phone.
                      </p>
                      <div className="mt-4 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={handlePayment}
                            id="cash"
                            value="cash"
                            name="payments"
                            type="radio"
                            disabled
                            className="cart-desc h-4 w-4 border-gray-300 text-customGreen focus:ring-customGreen"
                          />
                          <label
                            htmlFor="push-everything"
                            className="cart-desc block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                          <p className="cart-desc truncate text-xs leading-5 text-gray-500">
                            Sorry Your Order is not eligible for Cash Payment
                          </p>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            onChange={handlePayment}
                            value="card"
                            name="payments"
                            type="radio"
                            checked={paymentMethod === "card"}
                            className="h-4 w-4 border-gray-300 text-customGreen focus:ring-customGreen"
                          />
                          <label
                            htmlFor="push-email"
                            className="cart-head block text-sm font-medium leading-6 text-gray-900"
                          >
                            Online Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto mt-20 bg-white max-w-7xl p-10 sm:p-6 lg-px-8">
              <h1 className="cart-title text-4xl font-bold tracking-tight text-gray-900">
                {" "}
                Shopping Cart
              </h1>
              <div className="cart-desc mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.thumbnail}
                            alt={item.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.href}>{item.title}</a>
                              </h3>
                              {item.discountPrice && (
                                <p className="line-through text-gray-700">
                                  Rs.{item.price}
                                </p>
                              )}
                              {item.discountPrice ? (
                                <p className="ml-2">Rs. {item.discountPrice}</p>
                              ) : (
                                <p className="ml-2 strike-through">
                                  Rs.{item.price}
                                </p>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500 mx-50">
                              <label
                                htmlFor="password"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Quantity
                              </label>
                              <select
                                onChange={(e) => handleQuantity(e, item)}
                                value={item.quantity}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) => handleRemove(e, item.id)}
                                type="button"
                                className="font-medium text-customGreen hover:text-customSage"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="cart-head flex justify-between text-base font-semibold text-gray-900">
                  <p>Shipping Cost</p>
                  <p>Rs. {items[0]?.shippingCost}</p>
                </div>
                <div className="cart-head flex justify-between text-base font-semibold text-gray-900">
                  <p>Subtotal</p>
                  <p>Rs. {totalAmount}</p>
                </div>
                <div className="cart-head flex justify-between text-base font-semibold text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{totalItems} items</p>
                </div>
                <p className="cart-desc mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="cart-head flex cursor-pointer items-center justify-center border border-transparent bg-customSage px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-customMint"
                  >
                    Pay and Order
                  </div>
                </div>
                <div className="cart-head mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-customGreen hover:text-customSage"
                        onClick={() => setOpen(false)}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
