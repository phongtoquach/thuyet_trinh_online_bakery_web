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


/**
 * Ham xu ly add 1 product vao cart dua theo productId truyen vao ham
*/
function addProductToCart(proId, quantity=1) {
    console.log("[addProductToCart] chuan bi add vao cart - product ID : " + proId + " ; quantity : " + quantity);

    let cart = JSON.parse(localStorage.getItem("bakeryShopCartLs")) || [];

    let cartItemObj = null;
    // check product voi ID nay da co trong mang cart hay chua
    let foundInCart = 0;
    for (let i=0; i < cart.length; i++) {
        if (proId == cart[i].productId) {
            console.log("[addProductToCart] Product co ID " + proId + " da co trong cart voi index = " + i + "; Quantity hien la " + cart[i].quantity + ". Nen gio chi can tang quantity them " + quantity);
            foundInCart = 1;
            
            // tang quantity theo param quantity
            cart[i].quantity += quantity;

            // copy cart[i] ra 1 ban cho cartItemObj
            cartItemObj = { ...cart[i] };

            console.log("[addProductToCart] cart[" + i + "] hien gio sau khi update quantity:")
            console.log(cart[i]);
            break;
        }
    }

    if (foundInCart == 0) {
        console.log("[addProductToCart] Product co ID " + proId + " chua co trong cart. Bat dau add vao trong cart voi quantity = 1 !");
        // tim product voi ID nay trong array productsList
        let isFoundInProductsList = 0;
        for (let i=0; i < productsList.length; i++) {
            if (proId == productsList[i].id) {
                console.log("[addProductToCart] Product co ID " + proId + " co trong mang productsList : index " + i);
                console.log(productsList[i]);

                isFoundInProductsList = 1;

                // lay vai attribute can thiet tu product object
                cartItemObj = {
                    productId: productsList[i].id,
                    name: productsList[i].name,
                    image: productsList[i].images[0],
                    unitPrice: productsList[i].price,
                    quantity: quantity
                };
                
                // add cartItemObj vao mang cart
                cart.push(cartItemObj);

                break;
            }
        }

        if (isFoundInProductsList == 0) {
            alert("Sản phẩm có ID " + proId + " không tồn tại trong danh sách sản phẩm của shop !");
            return false;
        }
    }

    console.log("Data cua cartItemObj sau cung : ");
    console.log(cartItemObj);

    // set cart vao local storage
    localStorage.setItem("bakeryShopCartLs", JSON.stringify(cart));

    showToastNotiBox(cartItemObj.name + " đã được thêm vào giỏ hàng ! Số lượng hiện tại trong giỏ hàng : " + cartItemObj.quantity);

    console.log("Data cua cart hien tai : ");
    console.log(cart);
}


function showToastNotiBox(messageContent) {
    let toast = document.getElementById('toastNotiBox');

    document.getElementById("toastMessageSection").innerHTML = messageContent;

    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 4000);
}


// Ham de xoa het cac item trong cart
function clearCart() {
    localStorage.removeItem("bakeryShopCartLs");
    console.log("[clearCart] Da xoa item bakeryShopCartLs khoi Local Storage !");
}
//clearCart();