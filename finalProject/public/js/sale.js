const buyButtons = document.querySelectorAll(".buy-button");

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const loginType = urlParams.get('loginType');
  
  if (loginType) {
    sessionStorage.setItem('loginType', loginType);

    window.history.replaceState({}, document.title, window.location.pathname);
  }
});

const clickHandler = async (e) => {
  try {
    const container = e.target.closest(".product-container");
    const name = container.dataset.name;
    const price = container.dataset.price;

    const orderData = {
      product: { name: name, price: parseInt(price) },
    };

    const encoded = encodeURIComponent(JSON.stringify(orderData));
    window.location.href = `http://localhost:1010/sale/sample/order?data=${encoded}`;
  } catch (error) {
    console.log("주문 실패:", error);
  }
};

buyButtons.forEach((button) => {
  button.addEventListener("click", clickHandler);
});
