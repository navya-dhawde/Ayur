import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ITEM_PER_PAGE } from "../../../app/constants";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  EyeIcon,
  PencilIcon,
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/solid";
import Pagination from "../../common/pagination";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [sort, setSort] = useState("");

  const handleShow = (e, item) => {
    e.preventDefault();
  };
  const handleEdit = (e, order) => {
    e.preventDefault();
    setEditableOrderId(order.id);
  };
  const handleUpdate = (e, order) => {
    e.preventDefault();
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  };
  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (value) => {
    setSort(value);
  };
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEM_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination, sort }));
  }, [dispatch, page, sort]);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full">
            total Orders : {totalOrders}
            <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
              <table className="min-w-max w-full table-auto">
                {/* Table headers */}
                <thead>
                  {/* Header rows */}
                  {/* Include responsive classes for table headers */}
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-center md:table-cell">
                      Order No.{" "}
                    </th>
                    <th className="py-3 px-6 text-center md:table-cell">
                      Item
                    </th>
                    <th className="py-3 px-6 text-center md:table-cell">
                      Shipping Address
                    </th>
                    <th className="py-3 px-6 text-center md:table-cell">
                      Total Amount
                      {
                        <>
                          {sort?._sort !== "totalAmount" ? (
                            <ArrowUpCircleIcon
                              className="w-6 h-6 ml-1 inline cursor-pointer"
                              onClick={(e) =>
                                handleSort({ _sort: "totalAmount" })
                              }
                            />
                          ) : (
                            <ArrowDownCircleIcon
                              className="w-6 h-6 ml-1 inline  cursor-pointer"
                              onClick={(e) =>
                                handleSort({ _sort: "-totalAmount" })
                              }
                            />
                          )}
                        </>
                      }
                    </th>

                    <th className="py-3 px-6 text-center md:table-cell">
                      Status
                    </th>
                    <th className="py-3 px-6 text-center md:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-gray-600 text-sm font-light">
                  {/* Loop through orders */}
                  {orders &&
                    orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        {/* Order details */}
                        {/* Include responsive classes for table cells */}
                        <td className="py-3 px-6 text-left md:table-cell">
                          <div className="flex items-center">
                            <div className="mr-2"></div>
                            <span className="font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left md:table-cell">
                          {/* Item details */}
                          {order.items.map((item) => (
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src={item.thumbnail}
                                />
                              </div>
                              <span>
                                {item.title} - Total Items:{item.quantity}
                                <div>
                                  Rs:{item.discountPrice} + Shipping:{" "}
                                  {item.shippingCost ? item.shippingCost : 0}{" "}
                                  rs.
                                </div>
                              </span>
                            </div>
                          ))}
                        </td>
                        {/* Shipping address */}
                        {/* Include responsive classes for table cells */}
                        <td className="py-3 px-6 text-center md:table-cell">
                          <div className="">
                            <div>
                              <strong className="text-gray-900 text-sm">
                                {order.selectedAddress.name}
                              </strong>
                              ,
                            </div>
                            <div>{order.selectedAddress.street},</div>
                            <div>
                              {order.selectedAddress.city},
                              {order.selectedAddress.state},
                              {order.selectedAddress.pinCode},{" "}
                            </div>
                            <div>{order.selectedAddress.phone}, </div>
                          </div>
                        </td>
                        {/* Total amount */}
                        {/* Include responsive classes for table cells */}
                        <td className="py-3 px-6 text-center md:table-cell">
                          <div className="flex items-center justify-center">
                            Rs:{order.totalAmount}
                          </div>
                        </td>
                        {/* Status */}
                        {/* Include responsive classes for table cells */}
                        <td className="py-3 px-6 text-center md:table-cell">
                          <div className="inline-flex rounded-md bg-white text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            {order.id === editableOrderId ? (
                              <select
                                className="appearance-none outline-none border-none bg-transparent focus:ring-0"
                                onChange={(e) => handleUpdate(e, order)}
                              >
                                <option value="pending">Pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span
                                className={`${chooseColor(
                                  order.status
                                )} py-1 px-3 rounded-md text-xs`}
                              >
                                {order.status}
                              </span>
                            )}
                          </div>
                        </td>
                        {/* Actions */}
                        {/* Include responsive classes for table cells */}
                        <td className="py-3 px-6 text-center md:table-cell">
                          <div className="flex item-center justify-center">
                            <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                              <EyeIcon
                                className="w-6 h-6"
                                onClick={(e) => handleShow(e, order)}
                              ></EyeIcon>
                            </div>
                            <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                              <PencilIcon
                                className="w-6 h-6"
                                onClick={(e) => handleEdit(e, order)}
                              ></PencilIcon>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        ></Pagination>
      </div>
    </>
  );
};

export default AdminOrders;
