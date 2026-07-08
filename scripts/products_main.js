/**
 * Ham tao HTML danh sach product dua theo array productsData truyen vao
 * Ham nay se xai chung cho tat ca cac section can show danh sach product
 */
function showProductsList(productsData, containerId) {
    let productsHtml = "";

    // console.log("Ta co products data :");
    // console.log(productsData);

    for (let i=0; i < productsData.length; i++) {
        // open div product-card
        productsHtml += '<div class="product-card">';

        productsHtml += '<div class="product-card-image"><img src="' + productsData[i].images[0] + '" alt="' + productsData[i].name + '"><span class="product-card-tag">Nổi bật</span></div>';
        
        // open div product-card-body
        productsHtml += '<div class="product-card-body"><h3>' + productsData[i].name + '</h3>';
        productsHtml += '<div class="short-desc">' + productsData[i].shortDescription + '</div>';
        productsHtml += '<div class="product-card-footer"><span class="product-price">' + productsData[i].price.toLocaleString("vi-VN") + 'đ</span></div>';
        
        // generate buttons : Add to cart, xem chi tiet
        productsHtml += '<div class="product-card-actions">';
        productsHtml += '<button class="add-to-cart-btn" onclick="addToCart(' + productsData[i].id + ')"><i class="fas fa-cart-plus"></i> Add to Cart</button>';
        productsHtml += '<a href="product_details.html?product_id=' + productsData[i].id + '" class="view-details-btn" target="_blank"><i class="fas fa-eye"></i> Details</a>';
        productsHtml += "</div>";

        // close div product-card-body
        productsHtml += "</div>";

        // close div product-card
        productsHtml += "</div>";
    }

    document.getElementById(containerId).innerHTML = productsHtml;
}

/**
 * Ham lay ra object product tu array productList dua theo productId truyen vao
*/

function getProductDetailsById(productId) {
    let productObj = null;

    for(let i=0; i < productsList.length; i++) {
        if (productsList[i].id == productId) {
            console.log("[getProductDetailsById] Da tim thay product co id " + productId);
            console.log(productsList[i]);

            productObj = structuredClone(productsList[i]);
            //productObj = { ...productsList[i] };

            // productObj.name = "bánh quế Cosy mùi dâu";
            // productObj.price = 315000;
            // productObj.relatedProductIds = [233, 543];

            // console.log("[getProductDetailsById] productObj sau khi thay doi cac attribute :");
            // console.log(productObj);

            // console.log("[getProductDetailsById] productsList[" + i + "] hien tai :");
            // console.log(productsList[i]);

            break;
        }
    }

    return productObj;
}