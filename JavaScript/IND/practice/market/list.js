import { fetchSectionListData } from "./module/fetch.js";
import { setButtonEvent, setFilterEvent } from "./module/productFilter.js";
import { getProductList } from "./module/productList.js";

const minPriceFilter = document.getElementById("price-min-filter");
const maxPriceFilter = document.getElementById("price-max-filter");
const discountFilter = document.getElementById("discount-filter");

// 상품 목록을 모두 불러와서 페이지에 띄우기 > productList.js getProductList 사용
const sectionInfoList = await fetchSectionListData();

// prev + curr.productList
const productList = sectionInfoList.reduce(
  (prev, curr) => [...prev, ...curr.productList],
  []
);

const section = document.getElementsByTagName("section")[0];
const productListDOM = getProductList(productList);
section.appendChild(productListDOM);

setFilterEvent();

setButtonEvent(productList);
