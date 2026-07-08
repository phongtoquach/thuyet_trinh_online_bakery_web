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
                            <input type="text" id="productQuantity" value="1">
                            <button type="button" class="btn-plus" id="btnQuantityPlus">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="product-detail-actions">
                        <button class="add-to-cart-btn" id="addToCartBtn" data-product-id="1">
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
							<button class="tab-btn active" data-tab="description">Description</button>
							<button class="tab-btn" data-tab="ingredients">Ingredients</button>
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

    // set toan bo productHtml vao cho div productDetailsSection
    document.getElementById("productDetailsSection").innerHTML = productHtml;
}

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