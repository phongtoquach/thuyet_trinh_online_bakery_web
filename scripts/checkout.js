let input_check = document.getElementById("input_check");
let divInformation__container = document.getElementById(
  "information__container",
);

input_check.addEventListener("change", function () {
  if (input_check.checked) {
    divInformation__container.classList.add("actived");
  } else {
    divInformation__container.classList.remove("actived");
  }
});

let nameElement = document.getElementById('name');
let phoneElement = document.getElementById('phone');

let nameValue = document.getElementById('nameValue');
let phoneValue = document.getElementById('phoneValue');

nameElement.addEventListener('keyup', function () {
  nameValue.innerHTML = nameElement.value.trim();
});

phoneElement.addEventListener('keyup', function () {
  phoneValue.innerHTML = phoneElement.value.trim();
});



function renderCart() {
  let bakeryShopCartLs =
    JSON.parse(localStorage.getItem("bakeryShopCartLs")) || [];
  let html = "";
  let total = 0;

  for (let i = 0; i < bakeryShopCartLs.length; i++) {
    html += `
    <div class="cash__cart--item flex items-center gap-2">
                  <div class="item__img">
                    <img src="${bakeryShopCartLs[i].image}" alt="" />
                  </div>
                  <div class="item__desc">
                    <div class="item__name--container">
                      <h3 class="item__name">${bakeryShopCartLs[i].name}</h3>
                    </div>

                    <div class="item__quantity flex item-center gap-2">
                      <div class="item__quantity--span--container">
                        <span class="item__quantity--span">SL</span>
                      </div>

                      <input
                        class="input--quantity"
                        type="number"
                        value="${bakeryShopCartLs[i].quantity}"
                        min="1"
                      />

                      <div class="totalPriceTemp--container">
                        <span class="totalPriceTemp"> ${(bakeryShopCartLs[i].quantity * bakeryShopCartLs[i].unitPrice).toLocaleString("vi-VN")} đ </span>
                      </div>
                    </div>
                  </div>
                </div>
    `;
    total += bakeryShopCartLs[i].quantity * bakeryShopCartLs[i].unitPrice;
  }

  let cashCartList = document.getElementById("cashCartList");
  cashCartList.innerHTML = html;

  document.querySelector(".tempTotal--price").innerHTML =
    total.toLocaleString("vi-VN") + "đ";

  // Tính tiền ship
  function DeliveryShip(total) {
    let ship = 30000;
    if (total >= 500000) {
      ship = 0;
    } else {
      ship = 30000;
    }
    return ship;
  }

  if (DeliveryShip(total) > 0) {
    document.querySelector("#tempTotalShip").innerHTML =
      DeliveryShip(total).toLocaleString("vi-VN") + "đ";
  } else {
    document.querySelector("#tempTotalShip").innerHTML = "Miễn Phí";
  }

  let sum = total + DeliveryShip(total);
  document.querySelector("#primaryTotalPrice").innerHTML =
    sum.toLocaleString("vi-VN") + "đ";
}

// Render Cart khi lần đầu tải trang
renderCart();

let checkOutForm = document.getElementById('checkOutForm');
checkOutForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('hello');
});