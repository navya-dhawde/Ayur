import React, { useState, Fragment, useEffect } from "react";
import "./ProductList.css";
import Pagination from "../../common/pagination";
import AyuLogo from "../../../assets/images/AyuLogo.png";
import productLogo from "../../../assets/images/productLogo.png";
import productplant1 from "../../../assets/images/productplant1.png";
import media from "../../../assets/images/media.png";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  fetchProductsByFilterAsync,
  selectTotalItems,
  selectBrands,
  selectCategories,
  fetchBrandsAsync,
  fetchCategoriesAsync,
} from "../productSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { ITEM_PER_PAGE } from "../../../app/constants";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "-price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);


  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log(newFilter);
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort }; //sorting on behalf of regular price not on discount price
    setSort(sort);
  };

  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  };

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.val) {
      const type = location.state.val;
      location.state.val = null;
      const newFilter = { ...filter };
      if (newFilter[0]) {
        newFilter["category"].push(type);
      } else {
        newFilter["category"] = [type];
      }
      setFilter(newFilter);
    }
  }, [location, filter]);

  useEffect(() => {
    // Fetch products whenever filter,sort or  page changes
    const pagination = { _page: page, _per_page: ITEM_PER_PAGE };
    dispatch(fetchProductsByFilterAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div>
      <div className="bg-customWhite">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            handleFilter={handleFilter}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filters={filters}
          />

          <main className="mx-auto max-w-7xl">
            <div className={`product-logo-parent ${fadeIn ? "fade-in" : ""}`}>
              <img
                src={productLogo}
                className="ayu-logo"
                style={{ width: "100%", height: "100%" }}
              />
              <div className="overlay-text">
                <h1 className="product-image-text">
                  Discover Natural Excellence
                </h1>
              </div>
            </div>
            <div className="product-rec-box">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="flex-grow items-centre bg-customGreen py-4">
                  <h2
                    className="product-rec-text"
                    style={{ fontSize: "2rem", textAlign: "center" }}
                  >
                    Natural
                  </h2>
                </div>
                <div className="flex-grow items-centre  bg-customGreen py-4">
                  <h3
                    className="product-rec-text"
                    style={{ fontSize: "2rem", textAlign: "center" }}
                  >
                    Vegan
                  </h3>
                </div>
                <div className="flex-grow items-centre bg-customGreen py-4">
                  <h5
                    className="product-rec-text"
                    style={{ fontSize: "2rem", textAlign: "center" }}
                  >
                    Ecofriendly
                  </h5>
                </div>
              </div>
            </div>
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5 px-10">
              <h1 className=" product-head-text">New Arrivals</h1>
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={(e) => handleSort(e, option)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                {/*================================================================================= mobile filter button starts here */}
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section
              aria-labelledby="products-heading"
              className="pb-24 pt-6 px-10"
            >
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-4">
                <DesktopFilter handleFilter={handleFilter} filters={filters} />
                {/*=====================================================================================Web page Filters */}

                {/* Product grid --------------------------------------------------*/}
                <div className="lg:col-span-3">
                  {" "}
                  {/* //Product page Mobile */}
                  <ProductGrid data={products} />
                </div>
              </div>
            </section>

            {/*------------ Section of product filter ------------------------- */}

            {/*this is pagination  */}
            <Pagination
              handlePage={handlePage}
              page={page}
              setPage={setPage}
              totalItems={totalItems}
            />
            <div className="product-plant-box">
              <img
                src={productplant1}
                className="plant-img"
                style={{ width: "100%", height: "100%" }}
              />
              <div
                className="product-plant-text"
                style={{
                  justifyItems: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <h1
                  className="pro-plant-head "
                  style={{ fontSize: "4vw", textAlign: "center" }}
                >
                  Explore our range of plants
                </h1>
                <h2 className="product-text">
                  Take a tour through our wide-ranging plant collection.
                </h2>
                <Link to="/plant-identification">
                  <div className="explore-button mt-5 mb-5">
                    <span>EXPLORE</span>
                  </div>
                </Link>
              </div>
            </div>
            <div
              className="home-footer bg-customGreen py-4"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="Ayurveda-logo mb-3">
                <img
                  src={AyuLogo}
                  className="Ayulogoimg"
                  style={{ width: "150px", height: "100%" }}
                />
              </div>
              <div className="flex mb-5 px-10" style={{ width: "100%" }}>
                <div className="ml-14" style={{ width: "33.33%" }}>
                  <h1
                    className="home-footer-head mr-24"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {" "}
                    CONTACT US{" "}
                  </h1>
                  <p
                    className="home-footer-text mt-2"
                    style={{ fontSize: "0.6rem" }}
                  >
                    +91 9752356347 <br />
                    +91 7238743826
                  </p>
                </div>
                <div className="ml-14" style={{ width: "33.33%" }}>
                  <h2
                    className="home-footer-head mr-24"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {" "}
                    ADDRESS{" "}
                  </h2>
                  <p
                    className="home-footer-text mt-2"
                    style={{ fontSize: "0.6rem" }}
                  >
                    Girls' Hostel, IIIT <br />
                    Bongora, Guwahati, <br />
                    781015
                  </p>
                </div>
                <div className="ml-14" style={{ width: "33.33%" }}>
                  <h3
                    className="home-footer-head mr-24 "
                    style={{ fontSize: "0.7rem" }}
                  >
                    {" "}
                    EMAIL{" "}
                  </h3>
                  <p
                    className="home-footer-text mt-2 "
                    style={{ fontSize: "0.6rem" }}
                  >
                    navya.dhawde21b@iiitg.ac.in
                  </p>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <h4
                  className="home-footer-head py-2 mt-1"
                  style={{ fontSize: "0.7rem", textAlign: "center" }}
                >
                  CONNECT WITH US
                </h4>
              </div>
              <div
                className="social-media-img py-2"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={media}
                  className="socialimg"
                  style={{ width: "100px", height: "100%" }}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/*================================================================================= Mobile Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {/* ==================================================================================this is for mobile section */}
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onClick={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-customGreen focus:ring-customSage"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopFilter({ handleFilter, filters }) {
  return (
    <>
      <form className="hidden lg:block">
        <h3 className="sr-only">Categories</h3>

        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-5 "
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="product-text px-3 text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          onChange={(e) => handleFilter(e, section, option)}
                          className="h-4 w-4 rounded border-gray-300 text-customGreen focus:ring-customSage"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </>
  );
}

function ProductGrid({ data }) {
  if (!data) {
    return <div>No products available</div>;
  }
  return (
    <div className="bg-customGrey">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-2 gap-x-6 lg:gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {data.map((product) => (
            <Link to={`/productDetailsPage/${product.id}`} key={product.id}>
              <div className="group relative">
                <span className="mx-2 my-2  inline-flex z-40 items-center rounded-md bg-customMint px-2 py-1 text-xs font-medium text-gray-500 ring-1 ring-inset ring-gray-500/10">
                  {product.discountPrice
                    ? `Discount ${Math.round(
                        (1 - product.discountPrice / product.price) * 100
                      )}%`
                    : "Fresh Arrival"}
                </span>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-700 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-6 flex justify-between px-3">
                  <div>
                    <h2
                      className="text-sm text-gray-700"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <div href={product.thumbnail}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </div>
                    </h2>
                    <div className="mt-1">
                      <h3 className="sr-only">Reviews</h3>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                product.ratingAverage > rating
                                  ? "text-gray-900"
                                  : "text-gray-200",
                                "h-2 w-3 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                          <p className="ml-2 text-xs font-medium text-customGreen hover:text-customSage">
                            {product.totalCount}
                            {/* reviews */}
                          </p>
                        </div>

                        {/* <p className="sr-only">{product.ratingAverage} out of 5 stars</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="text-base">
                    <p
                      className="text-sm font-medium text-gray-900"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {product.discountPrice
                        ? `Rs. ${product.discountPrice}`
                        : ""}
                    </p>
                    <p
                      className={
                        product.discountPrice
                          ? "text-sm font-medium text-gray-400 line-through"
                          : "text-sm font-medium text-gray-900"
                      }
                      style={{ fontSize: "0.85rem" }}
                    >
                      Rs. {product.price}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
