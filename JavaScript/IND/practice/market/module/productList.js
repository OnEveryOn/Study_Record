import { makeDOMwithProperties } from "../utils/dom.js";
import { getProductCard } from "./productCard.js";

export const getProductList = (productInfoList, removeCartCallback) => {
    if(productInfoList === null || !Array.isArray(productInfoList)) return;

  const productListCon = makeDOMwithProperties("div", {
    className: "product-list-con",
  });

  productInfoList.forEach((productInfo) => {
    productListCon.appendChild(
      getProductCard({
        ...productInfo, // spread 문법
      }, removeCartCallback)
    );
  });

  return productListCon;
};
