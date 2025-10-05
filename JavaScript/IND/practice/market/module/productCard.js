import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";
import { getCartToggleButton } from "./cartToggleButton.js";

export const getProductCard = (productInfo, removeCartCallback) => {
  const { imgSrc, name, discountPercent, price, originalPrice } = productInfo;
  const section = document.getElementsByClassName("product-list-section")[0];

  const productCard = makeDOMwithProperties("div", {
    className: "product-card",
  });

  // -- product-image-container
  const productImageCon = makeDOMwithProperties("div", {
    className: "product-image-con",
  });

  const productImage = makeDOMwithProperties("img", {
    src: imgSrc,
    alt: name,
  });

  const cartToggleBtn = getCartToggleButton(productInfo, removeCartCallback);

  appendChildrenList(productImageCon, [productImage, cartToggleBtn]);
  // Node.insertBefore
  // Node.appendChild

  // --- product-description ---
  const productDesc = makeDOMwithProperties("div", {
    className: "product-description",
  });

  const productName = makeDOMwithProperties("div", {
    className: "product-name",
    innerHTML: name,
  });

  // --- product-price-container ---
  const productPriceCon = makeDOMwithProperties("div", {
    className: "product-price-con",
  });

  const productDiscount = makeDOMwithProperties("div", {
    className: "product-discount-percent",
    innerHTML: `${discountPercent}%`,
  });

  const productDiscountPrice = makeDOMwithProperties("div", {
    className: "product-price",
    innerHTML: `${price.toLocaleString()}원`,
  });

  const productOringalPrice = makeDOMwithProperties("div", {
    className: "product-original-price",
    innerHTML: `${originalPrice.toLocaleString()}원`,
  });

  appendChildrenList(productPriceCon, [productDiscount, productDiscountPrice]);
  appendChildrenList(productDesc, [
    productName,
    productPriceCon,
    productOringalPrice,
  ]);

  appendChildrenList(productCard, [productImageCon, productDesc]);

  return productCard;
};
