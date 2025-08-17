import { getProductCard } from "./module/productCard.js";
import { getProductList } from "./module/productList.js";
import { getProductSection } from "./module/productSection.js";

const productCardList = getProductSection("인기 상품",[
  {
    id: 1,
    imgSrc: "/public/assets/파프리카.jpg",
    name: "파프리카 2입",
    discountPercent: 20,
    price: 2000,
    originalPrice: 2500,
  },
  {
    id: 2,
    imgSrc: "/public/assets/단호박.jpg",
    name: "단호박 3입",
    discountPercent: 10,
    price: 2700,
    originalPrice: 3000,
  },
  {
    id: 3,
    imgSrc: "/public/assets/바나나.jpg",
    name: "바나나 1개",
    discountPercent: 20,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 4,
    imgSrc: "/public/assets/식빵.jpg",
    name: "식빵 1봉지",
    discountPercent: 10,
    price: 2700,
    originalPrice: 3000,
  },
]);

document.body.appendChild(productCardList);
