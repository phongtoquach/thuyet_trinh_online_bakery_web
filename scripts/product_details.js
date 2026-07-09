/**
 * Ham tao HTML section Product Details (trong trang product details)
 */
function showProductDetailsById(productData) {
    let productHtml = "";

    // open div product details layout
    productHtml = '<div class="product-details-layout">';

    // open div : product gallery
    productHtml += '<div class="product-gallery" id="productGallery">';
    productHtml += '<div class="main-image"><img src="' + productData.images[0] + '" alt=""></div>';
    productHtml += '<div class="gallery-thumbnails" id="galleryThumbnails">';

    for(let i=0; i < productData.images.length; i++) {
        let imgHtml = '<img src="' + productData.images[i] + '" alt=""';
        if (i == 0) {
            imgHtml += ' class="active">';
        }
        else {
            imgHtml += '>';
        }
        productHtml += imgHtml;
    }

    productHtml += '</div>';

    // close div : product gallery
    productHtml += '</div>';

    // open div : product info
    productHtml += '<div class="product-info" id="productInfo">';
    productHtml += '<h1 id="productName">' + productData.name + '</h1>';
    productHtml += '<div class="product-details-price" id="productPrice">' + productData.price.toLocaleString("vi-VN") + 'đ</div>';
    productHtml += '<div class="product-description" id="productShortDescription">' + productData.shortDescription + '</div>';

    // section : add to cart
    productHtml += `<div class="quantity-selector">
                        <label>Quantity:</label>
                        <div class="quantity-controls">
                            <button type="button" class="btn-minus" id="btnQuantityMinus">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="text" id="txtProductQuantity" value="1">
                            <button type="button" class="btn-plus" id="btnQuantityPlus">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="quantity-error-box" id="quantityErrorBox"></div>
                    
                    <div class="product-detail-actions">
                        <button class="add-to-cart-btn" id="addToCartBtn" onclick="handleAddProductToCart(` + productData.id + `)">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="btn btn-secondary" id="wishlistBtn">
                        <i class="far fa-heart"></i> Wishlist
                        </button>
                    </div>
                    `;

    // section : product meta data
    productHtml += `<div style="padding-top: 1.5rem; border-top: 1px solid var(--color-border); margin-top: var(--space-md);">
                        <p style="font-size: 0.9rem; color: var(--color-text-light); margin-bottom: var(--space-sm);">
                            <i class="fas fa-box" style="color: var(--color-gold); margin-right: 0.5rem;"></i>
                            <strong>Availability:</strong> <span style="color: var(--color-success);">In Stock</span>
                        </p>
                        <p style="font-size: 0.9rem; color: var(--color-text-light);">
                            <i class="fas fa-truck" style="color: var(--color-gold); margin-right: 0.5rem;"></i>
                            <strong>Delivery:</strong> Same-day for orders before 2 PM
                        </p>
                    </div>`;

    // close div : product info
    productHtml += '</div>';

    // close div : product details layout
    productHtml += '</div>';

    // section : product tabs (bao gom : Product Description, Thanh phan)
    productHtml += `<div class="product-tabs">
                        <div class="tab-buttons">
							<button class="tab-btn active" data-tab="description">Mô tả</button>
							<button class="tab-btn" data-tab="ingredients">Thành phần</button>
						</div>

                        <div class="tab-content active" id="tab-description">`+ productData.description +`</div>

						<div class="tab-content" id="tab-ingredients">
							<ul>
								<li>Organic All-Purpose Flour</li>
								<li>Belgian Dark Cocoa Powder (72%)</li>
								<li>Farm-Fresh Free-Range Eggs</li>
								<li>Unsalted European-Style Butter</li>
								<li>Pure Cane Sugar</li>
								<li>Madagascar Bourbon Vanilla Extract</li>
								<li>Premium Dark Chocolate (Ganache)</li>
								<li>Heavy Whipping Cream</li>
								<li>Baking Powder &amp; Baking Soda</li>
								<li>Fine Sea Salt</li>
								<li>Whole Milk</li>
							</ul>
							<p style="margin-top: var(--space-md); font-size: 0.85rem; color: var(--color-text-muted);">
								<i class="fas fa-info-circle"></i> Contains: Wheat, Eggs, Dairy, Soy. Produced in a facility that handles tree nuts and peanuts.
							</p>
						</div>
                    </div>`;

    // section : cac san pham lien quan

    // set toan bo productHtml vao cho div productDetailsSection
    document.getElementById("productDetailsSection").innerHTML = productHtml;

    // bind event input cho textbox quantity
    document.getElementById("txtProductQuantity").addEventListener("input", checkQuantityInput);
    // bind event click cho button +
    document.getElementById("btnQuantityPlus").addEventListener("click", increaseQuantityForAddToCart);
    // bind event click cho button -
    document.getElementById("btnQuantityMinus").addEventListener("click", decreaseQuantityForAddToCart); 
}

/**
 * Ham check value do user nhap vao textbox quantity
 * Ham duoc goi ngay moi khi user nhap value vao textbox quantity
 */
function checkQuantityInput(event) {
    // clear content cua quantityErrorBox
    document.getElementById("quantityErrorBox").innerHTML = "";

    // Ngoai this.value, cung co the dung event.target.value de lay value cua input
    console.log("[checkQuantityInput] Da bat duoc event input cua textbox quantity! Value : " + event.target.value);
    
    // dung regex de bat buoc user chi duoc phep nhap cac ky tu so tu 0 -> 9
    // Neu user nhap ky tu nao khac 0 -> 9 thi se bi xoa ngay
    let quantityVal = event.target.value.replace(/[^0-9]/g, '');
    if (quantityVal != "") {
        console.log("[checkQuantityInput] user nhap quantity : " + quantityVal);

        quantityVal = Number(quantityVal);
        if (quantityVal <= 0) {
            // Neu user nhap quantity = 0 thi set quantity lai thanh 1
            console.log("[checkQuantityInput] user nhap quantity = " + quantityVal + ". Set lai thanh 1 !");
            quantityVal = 1;

            showQuantityErrorBox("Nhập số lượng phải từ 1 trở lên");
        }
        else if (quantityVal > maxEnteredQuantity) {
            // Neu user nhap quantity > 99 thi set quantity lai thanh 99
            console.log("[checkQuantityInput] user nhap quantity = " + quantityVal + ", lon hon muc cho phep. Set lai thanh " + maxEnteredQuantity + " !");
            quantityVal = maxEnteredQuantity;

            showQuantityErrorBox("Nhập số lượng không được vượt quá " + maxEnteredQuantity);
        }

        console.log("[checkQuantityInput] quantity sau cung : " + quantityVal);
    }
    else {
        console.log("[checkQuantityInput] user nhap quantity rong. Bo qua !");
    }

    event.target.value = quantityVal;
}


/**
 * Ham tang quantity trong textbox Quantity them 1
 * Ham nay duoc goi moi khi user click button +
 */
function increaseQuantityForAddToCart() {
    // clear content cua quantityErrorBox
    document.getElementById("quantityErrorBox").innerHTML = "";

    let qtyInputVal = document.getElementById("txtProductQuantity").value.trim();
    
    let currentQty = 0;
    if (qtyInputVal == "") {
        console.log("[increaseQuantityForAddToCart] textbox quantity hien dang rong. currentQty = 0");
        currentQty = 0;
    }
    else {
        currentQty = Number(qtyInputVal);
        console.log("[increaseQuantityForAddToCart] currentQty = " + currentQty);
    }

    let newQty = currentQty + 1;
    console.log("[increaseQuantityForAddToCart] newQty = " + newQty);
    // check newQty co valid hay ko
    let resultValidateQuantity = validateQuantity(newQty);
    console.log("[increaseQuantityForAddToCart] Ket qua ham validateQuantity() : ");
    console.log(resultValidateQuantity);

    if (resultValidateQuantity.isValid == true) {
        console.log("[increaseQuantityForAddToCart] newQty = " + newQty + " la HOP LE! Update cho textbox Quantity!");
        // update value moi cho textbox Quantity
        document.getElementById("txtProductQuantity").value = newQty;
    }
    else {
        console.log("[increaseQuantityForAddToCart] newQty = " + newQty + " KHONG HOP LE! Show error msg!");
        showQuantityErrorBox(resultValidateQuantity.errorMsg);
    }
}


/**
 * Ham giam quantity trong textbox Quantity di 1
 * Ham nay duoc goi moi khi user click button -
 */
function decreaseQuantityForAddToCart() {
    // clear content cua quantityErrorBox
    document.getElementById("quantityErrorBox").innerHTML = "";

    let qtyInputVal = document.getElementById("txtProductQuantity").value.trim();
    
    let currentQty = 0;
    if (qtyInputVal == "") {
        console.log("[decreaseQuantityForAddToCart] textbox quantity hien dang rong. Update textbox quantity thanh 1 ngay !");
        document.getElementById("txtProductQuantity").value = 1;
        //currentQty = 0;

        return false;
    }
    else {
        currentQty = Number(qtyInputVal);
        console.log("[decreaseQuantityForAddToCart] currentQty = " + currentQty);
    }

    let newQty = currentQty - 1;
    console.log("[decreaseQuantityForAddToCart] newQty = " + newQty);
    // check newQty co valid hay ko
    let resultValidateQuantity = validateQuantity(newQty);
    console.log("[decreaseQuantityForAddToCart] Ket qua ham validateQuantity() : ");
    console.log(resultValidateQuantity);

    if (resultValidateQuantity.isValid == true) {
        console.log("[decreaseQuantityForAddToCart] newQty = " + newQty + " la HOP LE! Update cho textbox Quantity!");
        // update value moi cho textbox Quantity
        document.getElementById("txtProductQuantity").value = newQty;
    }
    else {
        console.log("[decreaseQuantityForAddToCart] newQty = " + newQty + " KHONG HOP LE! Show error msg!");
        showQuantityErrorBox(resultValidateQuantity.errorMsg);
    }
}


/**
 * Ham validate quantity truyen vao co hop le hay ko
 */
function validateQuantity(quantity) {
    let isValid = true;
    let errorMsg = "";

    if (quantity <= 0) {
        console.log("[validateQuantity] quantity = " + quantity + ". Not valid !");
        errorMsg = "Số lượng phải từ 1 trở lên";
        isValid = false;
    }
    else if (quantity > maxEnteredQuantity) {
        console.log("[validateQuantity] quantity = " + quantity + ". Vuot qua " + maxEnteredQuantity + ". Not valid !");
        errorMsg = "Số lượng không được vượt quá " + maxEnteredQuantity;
        isValid = false;
    }
    else {
        console.log("[validateQuantity] quantity = " + quantity + ". Valid !");
    }

    return {
        "isValid": isValid,
        "errorMsg": errorMsg
    };
}

let quantityErrorTimeOut;
function showQuantityErrorBox(errorMessage) {
    clearTimeout(quantityErrorTimeOut);

    document.getElementById("quantityErrorBox").innerHTML = errorMessage;

    quantityErrorTimeOut = setTimeout(() => {
        document.getElementById("quantityErrorBox").innerHTML = "";
    }, 3000);
}


/**
 * Ham xu ly check quantity do user nhap va thuc hien add to cart
 * Ham duoc goi khi user click nut Add To Cart trong khu vuc product details
 */
function handleAddProductToCart(productId) {
    // clear content cua quantityErrorBox
    document.getElementById("quantityErrorBox").innerHTML = "";

    let quantityInputVal = document.getElementById("txtProductQuantity").value.trim();
    let currentQty = 0;

    if (quantityInputVal == "") {
        console.log("[handleAddProductToCart] textbox quantity hien dang rong. Set currentQty = 1. Va update textbox quantity thanh 1 !");
        currentQty = 1;
        document.getElementById("txtProductQuantity").value = currentQty;
    }
    else {
        currentQty = Number(quantityInputVal);
        console.log("[handleAddProductToCart] textbox quantity co value. currentQty = " + currentQty);
    }

    // check currentQty co valid hay ko
    let resultValidateQuantity = validateQuantity(currentQty);
    console.log("[handleAddProductToCart] Ket qua ham validateQuantity() : ");
    console.log(resultValidateQuantity);

    if (resultValidateQuantity.isValid == true) {
        console.log("[handleAddProductToCart] currentQty = " + currentQty + " la HOP LE! Goi ham addProductToCart() voi productId " + productId);
        
        // goi ham addProductToCart()
        addProductToCart(productId, currentQty);
    }
    else {
        console.log("[handleAddProductToCart] currentQty = " + currentQty + " KHONG HOP LE! Show error msg!");
        showQuantityErrorBox(resultValidateQuantity.errorMsg);
    }
}


// kiem tra param product_id trong URL
// param product_id hop le thi lay ra product details data theo product_id do
let urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("product_id") && urlParams.get("product_id") !== "") {
    console.log("Co ton tai URL param product_id : " + urlParams.get("product_id"));
    let productId_val = urlParams.get("product_id").trim();
    let productId_int = Number(productId_val);
    if (Number.isNaN(productId_int)) {
        console.log("param product_id khong phai number!");
    }
    else {
        console.log("param product_id la number! Goi ham getProductDetailsById() !");
        let producItemObj = getProductDetailsById(productId_int);
        console.log("Product details cua product " + productId_int + " : ");
        console.log(producItemObj);

        // truyen producItemObj vao ham showProductDetailsById()
        showProductDetailsById(producItemObj);
    }

}
else {
    console.log("Khong ton tai URL param product_id hoac product_id rong!");
}