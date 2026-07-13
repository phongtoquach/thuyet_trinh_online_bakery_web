let cartEmpty = document.getElementById("cartEmpty");

let cartShop = document.getElementById("cartShop");

// Hàm hiển thị sản phẩm ra HTML
function renderCart() {
  let bakeryShopCartLs =
    JSON.parse(localStorage.getItem("bakeryShopCartLs")) || [];

  if (bakeryShopCartLs.length == 0) {
    cartEmpty.style.display = "block";
    cartShop.style.display = "none";
    return;
  }
  cartEmpty.style.display = "none";
  cartShop.style.display = "block";

  // Vòng lặp for để duyệt giỏ hàng
  let html = "";
  for (let i = 0; i < bakeryShopCartLs.length; i++) {
    html += `
        <tr class="cart-item" data-product-id="${bakeryShopCartLs[i].productId}">
                  <td>
                    <div class="cart-product">
                      <img
                        src="${bakeryShopCartLs[i].image}"
                        alt="Classic Chocolate Layer Cake"
                      />
                      <div class="cart-product-info">
                        <h4>${bakeryShopCartLs[i].name}</h4>
                        <span>Category: Chocolate</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="cart-unit-price">${bakeryShopCartLs[i].unitPrice}</span></td>
                  <td>
                    <div class="cart-quantity">
                      <div class="quantity-controls">
                        <button type="button" class="btn-minus">
                          <i class="fas fa-minus"></i>
                        </button>
                        <input
                          
                          type="number"
                          class="cart-qty-input"
                          value="${bakeryShopCartLs[i].quantity}"
                          min="0"
                          max="99"
                        />
                        <button type="button"  class="btn-plus">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td><span class="cart-total-price">${(bakeryShopCartLs[i].quantity * bakeryShopCartLs[i].unitPrice).toLocaleString("vi-VN")}đ</span></td>
                  <td>
                    <button class="remove-cart-item" title="Remove item">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
    `;
  }

  //   Tính tổng đơn hàng
  let total = 0;

  for (let i = 0; i < bakeryShopCartLs.length; i++) {
    total += bakeryShopCartLs[i].quantity * bakeryShopCartLs[i].unitPrice;
  }

  let summaryRow = document.getElementById("summaryRow");

  function DeliveryShip(total) {
    let ship = 30000;
    if (total >= 500000) {
      ship = 0;
    } else {
      ship = 30000;
    }
    return ship;
  }

  summaryRow.innerHTML = `
    <h3><i class="fas fa-receipt"></i> Tóm tắt</h3>

            <div class="summary-row">
              <span>Tạm tính</span>
              <span id="cartSubtotal">${total.toLocaleString("vi-VN")}đ</span>
            </div>

            <div class="summary-row">
              <span>Vận chuyển</span>
              <span id="cartShipping">${DeliveryShip(total) > 0 ? DeliveryShip(total).toLocaleString("vi-VN") + "đ" : "Miễn phí"}</span>
            </div>

            <div class="summary-row total">
              <span>Tổng:</span>
              <span id="cartGrandTotal">${(total + DeliveryShip(total)).toLocaleString("vi-VN")}đ</span>
            </div>

            <a href="checkout.html" class="btn btn-primary" id="checkoutBtn">
              <i class="fas fa-lock"></i> Thanh Toán
            </a>

            <p
              style="
                text-align: center;
                margin-top: var(--space-md);
                font-size: 0.8rem;
                color: var(--color-text-muted);
              "
            >
              <i class="fas fa-shield-alt"></i> Secure checkout &bull; SSL
              encrypted
            </p>

            <div
              style="
                margin-top: var(--space-lg);
                padding-top: var(--space-lg);
                border-top: 1px solid var(--color-border);
                text-align: center;
              "
            >
              <p
                style="
                  font-size: 0.8rem;
                  color: var(--color-text-muted);
                  margin-bottom: var(--space-sm);
                "
              >
                We accept
              </p>
              <div
                style="
                  display: flex;
                  justify-content: center;
                  gap: var(--space-md);
                  color: var(--color-text-light);
                  font-size: 1.5rem;
                "
              >
                <i class="fab fa-cc-visa"></i>
                <i class="fab fa-cc-mastercard"></i>
                <i class="fab fa-cc-amex"></i>
                <i class="fab fa-cc-paypal"></i>
              </div>
            </div>
  `;

  let carList = (document.getElementById("cartBody").innerHTML = html);
}

// Chạy hàm khi lần đầu tải trang
renderCart();

// Bắt sự kiện khi click vào nút tăng, giảm số lượng
document.getElementById("cartBody").addEventListener("click", function (e) {
  let target = e.target; // tìm xem nút được bấm đang thuộc class nào

  // Tìm thẻ tr gần nhất chứa sản phẩm để lấy productId
  let row = target.closest(".cart-item");
  if (!row) return;
  let productId = parseInt(row.getAttribute("data-product-id")); //productID = 124

  // lấy mảng dữ liệu hiện tại từ LocalStorage
  let bakeryShopCartLs =
    JSON.parse(localStorage.getItem("bakeryShopCartLs")) || [];

  // Tìm vị trí index sản phẩm đó trong mảng
  let itemIndex = bakeryShopCartLs.findIndex(
    (item) => item.productId == productId,
  );

  // xử lý nút tăng số lượng (+)
  if (target.closest(".btn-plus")) {
    if (bakeryShopCartLs[itemIndex].quantity <= maxCartItemQuantity - 1) {
      bakeryShopCartLs[itemIndex].quantity++;
    } else {
      bakeryShopCartLs[itemIndex].quantity = 100;
      showToastBox("error", "Có lỗi xảy ra!", "Giới hạn tối đa là 100!");
    }
    localStorage.setItem("bakeryShopCartLs", JSON.stringify(bakeryShopCartLs));
    renderCart();
  }
  // Xử lý nút giảm số lượng (-)
  if (target.closest(".btn-minus")) {
    if (bakeryShopCartLs[itemIndex].quantity > 1) {
      bakeryShopCartLs[itemIndex].quantity--;
    } else if (confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      bakeryShopCartLs.splice(itemIndex, 1);
      showToastBox("success", "Thành công!", "Đã xóa sản phẩm khỏi giỏ hàng!");
    }
    localStorage.setItem("bakeryShopCartLs", JSON.stringify(bakeryShopCartLs));

    renderCart();
  }

  // Xử lý nút xóa sản phẩm
  if (target.closest(".remove-cart-item")) {
    bakeryShopCartLs.splice(itemIndex, 1);
    localStorage.setItem("bakeryShopCartLs", JSON.stringify(bakeryShopCartLs));
    renderCart();
    showToastBox("success", "Thành công!", "Đã xóa sản phẩm khỏi giỏ hàng!");
  }
});

let clearCartBtn = document.getElementById("clearCartBtn");

clearCartBtn.addEventListener("click", function () {
  localStorage.removeItem("bakeryShopCartLs");
  renderCart();
  showToastBox("success", "Thành công!", "Đã xóa khỏi giỏ hàng!");
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
