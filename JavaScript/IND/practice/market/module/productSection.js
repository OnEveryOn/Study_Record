import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";

export const getProductSection = (sectionName, productInfoList) => {
  const productListSection = makeDOMwithProperties("div", {
    className: "product-list-section",
  });

  const sectionTitie = makeDOMwithProperties("div", {
    className: "section-title",
  });

  const titleHighliter = makeDOMwithProperties("span", {
    className: "section-title-highlight",
    innerHTML: "",
  });

  const title = makeDOMwithProperties("span", {
    innerHTML: sectionName,
  });

  appendChildrenList(sectionTitie, [titleHighliter, title]);
  const productListContainer = getProductList(productInfoList);

  appendChildrenList(productListSection, [sectionTitie, productListContainer]);

  return productListSection;
};
