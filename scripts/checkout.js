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

let nameElement = document.getElementById("name");
let phoneElement = document.getElementById("phone");

let nameValue = document.getElementById("nameValue");
let phoneValue = document.getElementById("phoneValue");

nameElement.addEventListener("keyup", function () {
  nameValue.innerHTML = nameElement.value.trim();
});

phoneElement.addEventListener("keyup", function () {
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
                        disabled
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
  if (cashCartList) {
    cashCartList.innerHTML =
      html ||
      `<p class="text-center py-4 text-gray-500">Giỏ hàng của bạn đang trống</p>`;
  }

  const tempTotalVal = document.querySelector(".tempTotal--price");
  if (tempTotalVal) {
    tempTotalVal.innerHTML = total.toLocaleString("vi-VN") + "đ";
  }

  // Tính tiền ship
  function DeliveryShip(totalPrice) {
    if (totalPrice === 0) return 0;
    let ship = 30000;
    if (totalPrice >= 500000) {
      ship = 0;
    } else {
      ship = 30000;
    }
    return ship;
  }

  const tempTotalShip = document.querySelector("#tempTotalShip");
  if (tempTotalShip) {
    if (DeliveryShip(total) > 0) {
      tempTotalShip.innerHTML =
        DeliveryShip(total).toLocaleString("vi-VN") + "đ";
    } else {
      tempTotalShip.innerHTML = "Miễn Phí";
    }
  }

  let sum = total + DeliveryShip(total);
  const primaryTotalPrice = document.querySelector("#primaryTotalPrice");
  if (primaryTotalPrice) {
    primaryTotalPrice.innerHTML = sum.toLocaleString("vi-VN") + "đ";
  }

  // Cập nhật số lượng món ở phần tóm tắt đơn hàng
  let quantityOrder = document.getElementById("quantityOrder");
  if (quantityOrder) {
    quantityOrder.innerHTML = bakeryShopCartLs.length;
  }

  // update header cart
  updateHeaderCartBadge();
}

// Render Cart khi lần đầu tải trang
renderCart();

// Validate Form
let checkOutForm = document.getElementById("checkOutForm");
checkOutForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let is_valid = true;

  // Reset các thông báo lỗi trước khi kiểm tra lại
  document.getElementById("nameMessageError").innerHTML = "";
  document.getElementById("phoneMessageError").innerHTML = "";
  document.getElementById("texetAreaMessageError").innerHTML = "";

  // Kiểm tra họ tên người đặt:
  let name = document.getElementById("name").value.trim();
  if (name == "") {
    is_valid = false;
    document.getElementById("nameMessageError").innerHTML =
      "Vui lòng nhập họ tên người đặt hàng!";
  }

  // Kiểm tra số điện thoại người đặt
  let phone = document.getElementById("phone").value.trim();
  if (phone == "") {
    is_valid = false;
    document.getElementById("phoneMessageError").innerHTML =
      "Vui lòng nhập số điện thoại người đặt hàng!";
  } else {
    const regex =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (!regex.test(phone)) {
      is_valid = false;
      document.getElementById("phoneMessageError").innerHTML =
        "Số điện thoại không hợp lệ!";
    }
  }

  // Kiểm tra Tỉnh/TP và Phường/Xã:
  let citySelect = document.getElementById("select_cities");
  let districtSelect = document.getElementById("select_districts");
  if (citySelect.value == "") {
    is_valid = false;
    document.getElementById("cityMessageError").innerHTML =
      "Vui lòng chọn Tỉnh/TP!";
  }
  if (districtSelect.value == "") {
    is_valid = false;
    document.getElementById("districtMessageError").innerHTML =
      "Vui lòng chọn Phường/Xã!";
  }

  let texetArea = document.getElementById("texetArea").value.trim();
  if (texetArea == "") {
    is_valid = false;
    document.getElementById("texetAreaMessageError").innerHTML =
      "Vui lòng nhập địa chỉ giao hàng!";
  }

  if (is_valid == true) {
    // 1. Lấy phương thức nhận hàng (Giao hàng / Ghé lấy)
    let deliveryMethod = "Giao hàng";
    const activeDeliveryBtn = document.querySelector(
      ".cart__chooseMethod--button .btn--cart.active",
    );
    if (activeDeliveryBtn) {
      deliveryMethod = activeDeliveryBtn.innerText.trim();
    }

    // 2. Lấy Tỉnh/TP và Phường/Xã từ các Dropdown
    const citySelect = document.querySelector(
      ".select__Address--City--dropdown",
    );
    const city = citySelect
      ? citySelect.options[citySelect.selectedIndex].text
      : "";

    const districtSelect = document.querySelector(
      ".select__Address--district--dropdown",
    );
    const district = districtSelect
      ? districtSelect.options[districtSelect.selectedIndex].text
      : "";

    // 3. Lấy Ngày giao hàng được chọn
    let deliveryDate = "";
    const selectedDateBox = document.querySelector(
      ".date__main.selected, .date__main--time.selected",
    );
    if (selectedDateBox) {
      if (selectedDateBox.id === "custom-date-btn") {
        const customDatePicker = document.getElementById("custom-date-picker");
        deliveryDate = customDatePicker ? customDatePicker.value : "";
      } else {
        const dateContent = selectedDateBox.querySelector(
          ".date__content--days",
        );
        deliveryDate = dateContent ? dateContent.innerText.trim() : "";
      }
    }

    // 4. Lấy Phương thức thanh toán (COD / Chuyển khoản)
    let paymentMethod = "COD"; // Mặc định
    if (document.getElementById("transfer").classList.contains("active")) {
      paymentMethod = "Chuyển Khoản";
    }

    // 5. Lấy danh sách giỏ hàng hiện tại và tính toán tổng tiền
    const cartItems =
      JSON.parse(localStorage.getItem("bakeryShopCartLs")) || [];
    let cartTotal = 0;
    cartItems.forEach((item) => {
      cartTotal += item.quantity * item.unitPrice;
    });

    let shippingFee = 0;
    if (deliveryMethod === "Giao hàng") {
      shippingFee = cartTotal >= 500000 ? 0 : 30000;
    }
    let finalTotal = cartTotal + shippingFee;

    // 6. Gom tất cả thông tin đơn hàng cùng giỏ hàng lại thành một Object
    const orderInfo = {
      name: name,
      phone: phone,
      deliveryMethod: deliveryMethod,
      address: texetArea,
      city: city,
      district: district,
      deliveryDate: deliveryDate,
      paymentMethod: paymentMethod,
      cartItems: cartItems, // Đẩy giỏ hàng vào thông tin đặt hàng
      finalTotal: finalTotal, // Tổng tiền thanh toán cuối cùng
      createdAt: new Date().toISOString(),
    };

    // 7. Đẩy toàn bộ đối tượng dữ liệu lên LocalStorage dưới dạng chuỗi JSON
    localStorage.setItem("customerOrderInfo", JSON.stringify(orderInfo));

    // 8. Xóa giỏ hàng hiện tại sau khi đặt hàng thành công để làm trống giỏ hàng
    localStorage.removeItem("bakeryShopCartLs");

    // 9. Cập nhật lại giao diện (sẽ hiển thị giỏ hàng trống và reset badge)
    renderCart();

    // Hiển thị thông báo thành công
    showToastBox(
      "success",
      "Thành công!",
      "Bạn đã đặt hàng thành công! Giỏ hàng đã được lưu vào thông tin đặt hàng.",
    );

    // Xóa toàn bộ HTML và hiện dòng chữ 'Cảm ơn bạn đã đặt hàng!'

    let mainHTML = document.getElementById("mainHTML");
    mainHTML.style.display = "none";

    let thankYou = document.getElementById("thankYou");
    thankYou.style.display = "block";
  } else {
    showToastBox(
      "error",
      "Có lỗi xảy ra!",
      "Bạn hãy kiểm tra lại bước đặt hàng!",
    );
  }
});

// =========== Xử lý ô chọn ngày ===========

function formatDayMonth(DateObj) {
  let d = DateObj.getDate();
  let m = DateObj.getMonth() + 1;
  return (d < 10 ? "0" + d : d) + "/" + (m < 10 ? "0" + m : m);
}

function getWeekDay(DateObj, index) {
  if (index == 0) return "Hôm nay";
  if (index == 1) return "Ngày mai";
  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  return weekDays[DateObj.getDay()];
}

// Tạo mảng chứa 4 ngày liên tiếp gồm: Hôm nay, ngày mai, T2, T3...
const dateList = [];
const today = new Date();

for (let i = 0; i < 4; i++) {
  let nextDate = new Date();
  nextDate.setDate(today.getDate() + i);

  dateList.push({
    label: getWeekDay(nextDate, i),
    value: formatDayMonth(nextDate),
  });
}

// Đẩy code vào HTML
const container = document.getElementById("date-container");
let html = "";

dateList.forEach(function (item) {
  html += `
    <div class="date__main rounded-lg">
                      <p class="date__content--Weekdays text">${item.label}</p>
                      <p class="date__content--days text">${item.value}</p>
                    </div>
  `;
});

// Bổ sung ô ngày khác chứa input = date
html += `
  <div class="date__main--time rounded-lg" id="custom-date-btn">
                      <img class="date__content--img" src="CartImgs/time.png" alt="">
                      <p class="date__content--days text">Ngày khác</p>
                      <input type="date" id="custom-date-picker">
                    </div>
`;

container.innerHTML = html;

// Xử lý sự kiện click cho các ô
const allDateBox = document.querySelectorAll(".date__main, .date__main--time");
const customDatePicker = document.getElementById("custom-date-picker");
const customDateText = document.querySelector(
  "#custom-date-btn .date__content--days",
);

allDateBox.forEach(function (box) {
  box.addEventListener("click", function () {
    // clear class selected ở tất cả
    allDateBox.forEach(function (item) {
      item.classList.remove("selected");
    });

    // Thêm class selected cho ô được click
    this.classList.add("selected");

    // Xử lý cho ô ngày khác
    if (this.id == "custom-date-btn") {
      customDatePicker.showPicker();
    } else {
      const selectedDate = this.querySelector(".date__content--days").innerText;
    }
  });
});

// Xử lý sự kiện người dùng chọn ngày trong lịch

customDatePicker.addEventListener("change", function () {
  if (this.value) {
    // this.value có định dạng yyyy-mm-dd, ta cắt lấy dd/mm
    const dateParts = this.value.split("-");
    const formattedCustomDate = dateParts[2] + "/" + dateParts[1];
    customDateText.innerText = formattedCustomDate;
  }
});

let cod = document.getElementById("cod");
let transfer = document.getElementById("transfer");

cod.addEventListener("click", function () {
  cod.classList.add("active");
  transfer.classList.remove("active");
});

transfer.addEventListener("click", function () {
  transfer.classList.add("active");
  cod.classList.remove("active");
});

// =================== TOAST BOX ===================
// Ham thuc hien show Toast Box
// toastType : success / error
function showToastBox(toastType, title, messageContent) {
  let toastBox = document.getElementById("toastBox");
  toastBox.classList.remove("toast-success", "toast-error", "show");

  // check toastType de quyet dinh add CSS class toast-success hay toast-error
  if (toastType == "success") {
    toastBox.classList.add("toast-success");
  } else {
    toastBox.classList.add("toast-error");
  }

  // set title
  toastBox.querySelector(".toast-title").innerHTML = title;
  // set message content
  toastBox.querySelector(".toast-message").innerHTML = messageContent;

  // set icon
  if (toastType == "success") {
    toastBox.querySelector(".toast-icon i").className =
      "fa-solid fa-circle-check";
  } else {
    toastBox.querySelector(".toast-icon i").className =
      "fa-solid fa-circle-xmark";
  }

  toastBox.classList.add("show");

  // sau x giay thi hide Toast Box nay di
  startHideToastTimer();
}

let hideToastTimer = null;
// Ham start timer dem x giay de thuc hien hide Toast Box
function startHideToastTimer() {
  console.log(
    "[startHideToastTimer] Bat dau set timer dem nguoc de hide Toast Box!",
  );
  clearTimeout(hideToastTimer);

  hideToastTimer = setTimeout(() => {
    hideToastBox();
  }, 4000);
}

// Ham hide toast box
function hideToastBox() {
  clearTimeout(hideToastTimer);

  let toast_box = document.getElementById("toastBox");
  toast_box.classList.remove("show");

  console.log("[hideToastBox] Da hide toast box roi!");
}

// bind event "click" cho nut close de hide Toast Box
let toastBoxCloseButton = document
  .getElementById("toastBox")
  .querySelector(".toast-close");
toastBoxCloseButton.addEventListener("click", hideToastBox);

// Hover vao Toast Box -> stop auto hide
document.getElementById("toastBox").addEventListener("mouseenter", () => {
  console.log(
    "Xay ra event mouseenter, user dang hover vao Toast box ! Stop auto hide Toast Box!",
  );
  clearTimeout(hideToastTimer);
});

// Re chuot ra khoi Toast Box -> start lai timer hide Toast Box
document.getElementById("toastBox").addEventListener("mouseleave", () => {
  let toast_box = document.getElementById("toastBox");
  if (toast_box.classList.contains("show") == true) {
    console.log(
      "[ToastBox - mouseleave] toastBox dang co CSS class 'show', nen can goi ham startHideToastTimer()!",
    );
    startHideToastTimer();
  } else {
    console.log(
      "[ToastBox - mouseleave] toastBox khong co CSS class 'show', nen KHONG CAN goi ham startHideToastTimer()!",
    );
  }
});


// Ham de update headerCartBadgeText bang so luong item trong cart (bakeryShopCartLs)
function updateHeaderCartBadge() {
    let currentCart = JSON.parse(localStorage.getItem("bakeryShopCartLs")) || [];
    console.log("[updateHeaderCartBadge] Update header cart badge thanh : " + currentCart.length);
    
    document.getElementById("headerCartBadgeText").innerHTML = currentCart.length;
}
