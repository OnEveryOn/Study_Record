import { getProductCard } from "./module/productCard.js";

const section = document.getElementsByClassName("product-list-section")[0];

const productCard = getProductCard({
  id: 1,
  imgSrc: "/public/assets/파프리카.jpg",
  name: "파프리카 2입",
  discountPercent: 20,
  price: 2000,
  originalPrice: 2500,
});

const productCard2 = getProductCard({
  id: 3,
  imgSrc: "/public/assets/바나나.jpg",
  name: "바나나 1개",
  discountPercent: 20,
  price: 4000,
  originalPrice: 5000,
});

section.appendChild(productCard);
section.appendChild(productCard2);

