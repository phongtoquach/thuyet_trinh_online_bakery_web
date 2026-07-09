// // Mã giả lưu giỏ hàng

// let cart = [
//   {
//     productId: 124,
//     name: "Bánh Mousse Thanh Nhãn",
//     image: "./images/mousse-thanh-nhan.jpg",
//     unitPrice: 261000,
//     quantity: 3,
//   },
//   {
//     productId: 125,
//     name: "Bánh Mousse Ngọc Nhãn",
//     image: "./images/mousse-ngoc-nhan.jpg",
//     unitPrice: 565000,
//     quantity: 4,
//   },
// ];

// // Chuyển giỏ Object thàng chuỗi JSON
// let cartString = JSON.stringify(cart);

// // Đẩy chuỗi này lên LocalStorage
// localStorage.setItem("bakeryShopCartLs", cartString);

// Kết thúc mã giả lưu giỏ hàng

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
              <span id="cartShipping">${(DeliveryShip(total) > 0) ? DeliveryShip(total).toLocaleString('vi-VN')+'đ' : "Miễn phí"}</span>
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
    bakeryShopCartLs[itemIndex].quantity++;
    localStorage.setItem("bakeryShopCartLs", JSON.stringify(bakeryShopCartLs));
    renderCart();
  }
  // Xử lý nút giảm số lượng (-)
  if (target.closest(".btn-minus")) {
    if (bakeryShopCartLs[itemIndex].quantity > 1) {
      bakeryShopCartLs[itemIndex].quantity--;
    } else if (confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      bakeryShopCartLs.splice(itemIndex, 1);
    }
    localStorage.setItem("bakeryShopCartLs", JSON.stringify(bakeryShopCartLs));
    renderCart();
  }

  // Xử lý nút xóa sản phẩm
  if (target.closest(".remove-cart-item")) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      bakeryShopCartLs.splice(itemIndex, 1);
      localStorage.setItem(
        "bakeryShopCartLs",
        JSON.stringify(bakeryShopCartLs),
      );
      renderCart();
    }
  }
});
