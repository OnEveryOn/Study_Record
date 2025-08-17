import { CART_COOKIE_KEY } from "../constants/cart.js";
import { makeDOMwithProperties } from "../utils/dom.js";

const isInCart = ({ id }) => {
  // 현재 해당 상품이 장바구니 안에 있는지를 확인하여 결과를 반환
  const originalCartInfo =
    JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];
  const inCart = originalCartInfo.find((cartInfo) => cartInfo.id === id);
  // !! 부정 연산자를 사용해서도 가능
  return Boolean(inCart);
};

const removeCartInfo = ({ id }) => {
  const originalCartInfo =
    JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];
  const newCartInfo = originalCartInfo.filter((cartInfo) => cartInfo.id !== id);
  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify(newCartInfo));
};

const addCartInfo = (productInfo) => {
  // 장바구니에 해당 물품의 정보를 저장
  const originalCartInfo =
    JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];

  if (originalCartInfo.findIndex((cartInfo) => cartInfo.id === productInfo.id) !==-1) return;

  localStorage.setItem(
    CART_COOKIE_KEY,
    JSON.stringify([...originalCartInfo, productInfo])
  );
};

export const getCartToggleButton = (productInfo) => {
  let inCart = isInCart(productInfo);
  const cartToggleBtn = makeDOMwithProperties("button", {
    className: "cart-toggle-btn",
    type: "button",
    onclick: () => {
      if (inCart) {
        const result = confirm(
          `${productInfo.name} 상품을 장바구니에서 삭제하시겠습니까?`
        );
        if (!result) return;
        removeCartInfo(productInfo);
        cartImage.src = "/public/assets/cart.png";
      } else {
        addCartInfo(productInfo);
        cartImage.src = "public/assets/cartDisabled.png";
        const result = confirm(
          "장바구니에 담았습니다. 장바구니 페이지로 이동하시겠습니까?"
        );
        if (!result) return;  // early return 
        location.href = "/cart.html";
      }
      inCart = !inCart;
    },
  });

  const cartImage = makeDOMwithProperties("img", {
    src: inCart ? "/public/assets/cartDisabled.png" : "/public/assets/cart.png",
    className: "cart-image",
  });

  cartToggleBtn.appendChild(cartImage);

  return cartToggleBtn;
};
