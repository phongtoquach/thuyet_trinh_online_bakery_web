/**
 * Ham tao HTML section Product Details (trong trang product details) dua theo object Product duoc truyen vao ham
 */
function showProductDetailsById(productData) {
    let productHtml = "";

    // set title cho page
    document.title = productData.name + " | " + websiteName;

    // set breadcrumb
    document.getElementById("breadcrumbProduct").innerHTML = productData.name;

    // open div product details layout
    productHtml = '<div class="product-details-layout">';

    // check mang images co rong hay ko 
    let mainImageSrc = "";
    if (productData.images.length > 0) {
        // neu mang images co phan tu thi lay phan tu dau tien (index 0) lam main image
        mainImageSrc = productData.images[0];
    }
    else {
        // neu mang images rong thi lay image mac dinh lam main image
        mainImageSrc = defaultProductImageSrc;
    }

    // open div : product gallery
    productHtml += '<div class="product-gallery" id="productGallery">';
    productHtml += '<div class="main-image"><img src="' + mainImageSrc + '" alt=""></div>';

    // neu mang images co phan tu thi moi generate thumbnails
    if (productData.images.length > 0) {
        productHtml += '<div class="gallery-thumbnails" id="productGalleryThumbnails">';
        for(let i=0; i < productData.images.length; i++) {
            let imgHtml = '<img src="' + productData.images[i] + '" alt="image thumbnail"';
            if (i == 0) {
                imgHtml += ' class="product-image-thumbnail active">';
            }
            else {
                imgHtml += ' class="product-image-thumbnail">';
            }
            productHtml += imgHtml;
        }
        productHtml += '</div>';
    }

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
                        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                        </button>
                    </div>
                    `;

    // section : product meta data
    productHtml += `<div style="padding-top: 1.5rem; border-top: 1px solid var(--color-border); margin-top: var(--space-md);">
                        <p style="font-size: 0.9rem; color: var(--color-text-light);">
                            <i class="fas fa-truck" style="color: var(--color-gold); margin-right: 0.5rem;"></i>
                            <strong>Giao hàng:</strong> Giao trong ngày trước 2h chiều
                        </p>
                    </div>`;

    // close div : product info
    productHtml += '</div>';

    // close div : product details layout
    productHtml += '</div>';

    // section : product tabs (bao gom : Product Description, Thanh phan)
    productHtml += `<div class="product-tabs">
                        <div class="tab-buttons">
							<button class="tab-btn active" data-tab="description">Mô tả sản phẩm</button>
						</div>

                        <div class="tab-content active" id="tab-description">`+ productData.description +`</div>
                    </div>`;

    // Section : cac san pham lien quan
    if (productData.relatedProductIds.length > 0) {
        let relatedProductsList = getProductsByProductIds(productData.relatedProductIds);
        console.log("[showProductDetailsById] Related products list :");
        console.log(relatedProductsList);

        // neu mang relatedProductsList co it nhat 1 phan tu thi moi generate noi dung section
        if (relatedProductsList.length > 0) {
            let relatedProductsGridHtml = showOrGetProductsGrid(relatedProductsList, "get");

            productHtml += `<div class="section" style="padding-bottom: 0;">
                                <div class="section-title">
                                    <h2>Sản phẩm liên quan</h2>
                                    <p>Khám phá thêm những hương vị được tuyển chọn dành cho bạn.</p>
                                </div>
                                <div id="relatedProductsGridSection">` + relatedProductsGridHtml + `</div>
                            </div>`;
        }
    }


    // set toan bo productHtml vao cho div productDetailsSection
    document.getElementById("productDetailsSection").innerHTML = productHtml;

    // bind event input cho textbox quantity
    document.getElementById("txtProductQuantity").addEventListener("input", checkQuantityInput);
    // bind event click cho button +
    document.getElementById("btnQuantityPlus").addEventListener("click", increaseQuantityForAddToCart);
    // bind event click cho button -
    document.getElementById("btnQuantityMinus").addEventListener("click", decreaseQuantityForAddToCart); 

    // Neu mang images co phan tu thi : bind event click cho cac image thumbnail
    if (productData.images.length > 0) {
        let imgThumbnails = document.querySelectorAll("#productGalleryThumbnails img.product-image-thumbnail");
        imgThumbnails.forEach(imgThumb => {
            imgThumb.addEventListener("click", function() {
                console.log("[showProductDetailsById] image thumb duoc click la : " + this.src);

                // set source cho image lon bang src cua thumb image nay
                document.querySelector("#productGallery .main-image img").src = this.src;

                // remove CSS class active cua tat ca thumb image
                document.querySelectorAll("#productGalleryThumbnails .product-image-thumbnail").forEach(imageThumb => {
                    imageThumb.classList.remove("active");
                });

                // add CSS class active cho thumb image nay
                this.classList.add("active");
            }); 
        });
    }
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


function showNoProductMessage() {
    // set content cho div productDetailsSection : thong bao khong tim thay product
    document.getElementById("productDetailsSection").innerHTML = `<div style="text-align: center;">
                                                                    <h3 style="margin-bottom: 15px;">Không tìm thấy sản phẩm</h3>
                                                                    <p>Xin vui lòng đi đến trang sản phẩm để chọn sản phẩm khác.</p>
                                                                    <a href="products.html" class="btn btn-primary"><i class="fas fa-shopping-bag"></i> Đi đến trang sản phẩm</a>
                                                                </div>`;

    // hide breadcrumb
    document.getElementById("breadcrumb").style.display = "none";

    // set title cua page
    document.title = "Sản phẩm | " + websiteName;
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
        showNoProductMessage();
    }
    else {
        console.log("param product_id la number! Goi ham getProductDetailsById() !");
        let producItemObj = getProductDetailsById(productId_int);
        console.log("Product details cua product Id " + productId_int + " : ");
        console.log(producItemObj);

        if (producItemObj !== null) {
            // truyen producItemObj vao ham showProductDetailsById()
            showProductDetailsById(producItemObj);
        }
        else {
            // neu producItemObj null, tuc la khong co product details data
            showNoProductMessage();
        }
    }

}
else {
    console.log("Khong ton tai URL param product_id hoac product_id rong!");
    showNoProductMessage();
}


// khi vua load page, update headerCartBadgeText bang so luong item trong cart (bakeryShopCartLs)
updateHeaderCartBadgeByCurrentCart();