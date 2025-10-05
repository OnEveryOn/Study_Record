import { makeDOMwithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";

const MAX_PRICE = Number.MAX_VALUE;

const minPriceFilter = document.getElementById("price-min-filter");
const maxPriceFilter = document.getElementById("price-max-filter");
const discountFilter = document.getElementById("discount-filter");
const filterButton =
  document.getElementsByClassName("product-filter-con")[0]?.lastElementChild;

// filter 버튼 클릭 > min, max, discount 값을 받아와서 값을 이용하여 물품 추출 >  다시 화면에 나타냄

export const setButtonEvent = (productList) => {
  filterButton.onclick = () => {
    const maxPrice = convertPriceToNumber(maxPriceFilter.value) || MAX_PRICE;
    const minPrcie = convertPriceToNumber(minPriceFilter.value) || 0;
    const discountRate = convertPercentToNumber(discountFilter.value) || 0;

    const newProductList = productList.filter((productInfo) => {
      const { price, discountPercent } = productInfo;
      return (
        price >= minPrcie &&
        price <= maxPrice &&
        discountRate <= discountPercent
      );
    });
    const sectionDOM = document.getElementsByTagName("section")[0];
    const originalProductListDOM =
      document.getElementsByClassName("product-list-con")[0];
    sectionDOM.removeChild(originalProductListDOM);

    if (newProductList.length > 0) {
      const productListDOM = getProductList(newProductList);
      sectionDOM.appendChild(productListDOM);
    } else {
      const emptyProductListDOM = makeDOMwithProperties("div", {
        className: "product-list-con empty",
        innerHTML: "조건에 해당하는 상품이 없습니다.",
      });

      sectionDOM.appendChild(emptyProductListDOM);
    }
  };
};

const convertPriceToNumber = (originalValue) => {
  const formattedStr = originalValue.replace("원", "").replace(",", "");
  const formattedNum = Number(formattedStr);
  return isNaN(formattedNum) ? 0 : formattedNum;
};

const convertPriceToString = (event) => {
  const value = event.target.value;
  const result = Number(value);
  if (isNaN(result)) {
    alert("숫자를 입력해주세요");
  }

  event.target.value = `${result.toLocaleString()}원`;
};

const convertPercentToNumber = (originalValue) => {
  const formattedStr = String(originalValue).replace("%", "");
  const formattedNum = Number(formattedStr);
  return isNaN(formattedNum) ? 0 : formattedNum;
};

// 필터 Dom들이 이벤트 핸들러를 구현
export const setFilterEvent = () => {
  // filter 입력창 > 사용자가 클릭 >  숫자
  // filter 이외의 부분 > 입력창에서 벗어남 > '원', '%'가 붙은 format된 형태
  minPriceFilter.onfocus = (event) => {
    event.target.value = convertPriceToNumber(event.target.value);
  };
  minPriceFilter.onblur = convertPriceToString;
  maxPriceFilter.onfocus = (event) => {
    event.target.value = convertPriceToNumber(event.target.value);
  };
  maxPriceFilter.onblur = convertPriceToString;
  discountFilter.onfocus = (event) => {
    event.target.value = convertPercentToNumber(event.target.value);
  };
  discountFilter.onblur = (event) => {
    const value = event.target.value;
    const result = Number(value);
    if (isNaN(result)) {
      alert("숫자를 입력해주세요");
      event.target.value = 0;
      return;
    }

    if (result > 100 || result < 0) {
      alert("0 이상 100 이하의 숫자를 입력해주세요");
      event.target.value = 0;
      return;
    }

    event.target.value = `${result}%`;
  };
};
