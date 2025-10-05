import { getCartInfo } from "./cartToggleButton.js";

const originalPriceDOM = document.getElementById("original-price");
const discountPriceDOM = document.getElementById("discount-price");
const deliveryPriceDOM = document.getElementById("delivery-price");
const totalPriceDOM = document.getElementById("total-price");

const DELIVERY_FREE_PRICE = 20000;
const DELIVERY_PRICE = 3000;

export const setPayInfo = () => {
  // 1. 장바구니에서 물품 정보 얻어오기
  // 2. 물품 정보들을 순회하면서 총 가격, 할인된 가격, 배송비, 결제 금액을 계산하기
  // 3. 2번에서 계산된 금액들을 DOM.innerHTML로 할당하기
  const cartInfoList = getCartInfo();

  let deliveryPrice = 0; // 2만 원 미만 구매 시 3000원, 이상 구매 시 0원
  let totalPrice = 0;

  const { originalPrice, discountPrice } = cartInfoList.reduce(
    (prev, curr) => {
      return {
        originalPrice: prev.originalPrice + curr.originalPrice,
        discountPrice: prev.discountPrice + (curr.originalPrice - curr.price),
      };
    },
    {
      originalPrice: 0,
      discountPrice: 0,
    }
  );

  const payPrice = originalPrice - discountPrice;
  if (payPrice < DELIVERY_FREE_PRICE) {
    deliveryPrice = DELIVERY_PRICE;
  }

  totalPrice += payPrice + deliveryPrice;

  originalPriceDOM.innerHTML = `${originalPrice.toLocaleString()}원`;
  discountPriceDOM.innerHTML = discountPrice ? `-${discountPrice.toLocaleString()}원` : '0원';
  deliveryPriceDOM.innerHTML = deliveryPrice ? `+${deliveryPrice.toLocaleString()}원`: '0원';
  totalPriceDOM.innerHTML = `${totalPrice.toLocaleString()}원`;
};
