/**
 * Ham tao HTML danh sach product dua theo array productsData truyen vao
 * Ham nay se xai chung cho tat ca cac section can show danh sach product
 */
function showOrGetProductsGrid(productsData, actionName="show", containerId="") {
    let productsHtml = '<div class="product-grid">';

    // console.log("Ta co products data :");
    // console.log(productsData);

    for (let i=0; i < productsData.length; i++) {
        // open div product-card
        productsHtml += '<div class="product-card">';

        // check mang images co rong hay ko 
        let productImageSrc = "";
        if (productsData[i].images.length > 0) {
            // neu mang images co phan tu thi lay phan tu dau tien (index 0) show ra
            productImageSrc = productsData[i].images[0];
        }
        else {
            // neu mang images rong thi lay image mac dinh show ra
            productImageSrc = defaultProductImageSrc;
        }

        productsHtml += '<div class="product-card-image"><img src="' + productImageSrc + '" alt="' + productsData[i].name + '"><span class="product-card-tag">Nổi bật</span></div>';
        
        // open div product-card-body
        productsHtml += '<div class="product-card-body"><h3>' + productsData[i].name + '</h3>';
        productsHtml += '<div class="short-desc">' + productsData[i].shortDescription + '</div>';
        productsHtml += '<div class="product-card-footer"><span class="product-price">' + productsData[i].price.toLocaleString("vi-VN") + 'đ</span></div>';
        
        // generate buttons : Add to cart, xem chi tiet
        productsHtml += '<div class="product-card-actions">';
        productsHtml += '<button class="add-to-cart-btn" onclick="addProductToCart(' + productsData[i].id + ')"><i class="fas fa-cart-plus"></i> Thêm vào giỏ</button>';
        productsHtml += '<a href="product_details.html?product_id=' + productsData[i].id + '" class="view-details-btn" target="_blank"><i class="fas fa-eye"></i> Xem chi tiết</a>';
        productsHtml += "</div>";

        // close div product-card-body
        productsHtml += "</div>";

        // close div product-card
        productsHtml += "</div>";
    }

    productsHtml += '</div>';

    if (actionName == "show") {
        console.log("[showOrGetProductsGrid] action la : " + actionName + ". Set content cho container " + containerId);
        document.getElementById(containerId).innerHTML = productsHtml;
        return "";
    }
    else {
        console.log("[showOrGetProductsGrid] action la : " + actionName + ". Chi return content !");
        return productsHtml;
    }
}

/**
 * Ham lay ra object product (tu trong array productList) dua theo productId truyen vao
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
 * Ham lay ra cac object product dua theo cac filter
 * Tuc la day la ham search product theo filter
 * param filtersData la 1 object co cau truc nhu sau :
 * {
 *      keyword: "",
 *      onlyFeatured: 0,
 *      onlyInStock: 0,
 *      minPrice: null,
 *      maxPrice: null
 * }
 * 
 */
function getProductsByFilters(filtersData={}) {
    console.log("[getProductsByFilters] filtersData ban dau :");
    console.log(filtersData);

    // truoc het, goi ham handleFiltersData() de format cac filter lai cho chuan
    let newFiltersData = handleFiltersData(filtersData);
    console.log("[getProductsByFilters] newFiltersData sau khi xu ly bang ham handleFiltersData() :");
    console.log(newFiltersData);

    let lowerCaseKeyword = newFiltersData.keyword.toLocaleLowerCase();
    // neu cac filter trong newFiltersData deu rong, null : lay tat ca product trong mang productsList
    if (lowerCaseKeyword == "" && newFiltersData.onlyFeatured == 0 && newFiltersData.onlyInStock == 0 && newFiltersData.minPrice === null && newFiltersData.maxPrice === null) {
        console.log("[getProductsByFilters] Khong co filter nao trong newFiltersData. Lay tat ca product trong mang productsList !");
        return structuredClone(productsList);
    }
    
    // duyet qua tung phan tu trong array productsList de check theo filter
    let searchResults = [];
    for(let i=0; i < productsList.length; i++) {
        let productIsMatched = true;
        console.log("[getProductsByFilters] Dang check product " + productsList[i].id + " : " + productsList[i].name + " ; price : " + productsList[i].price);

        // check newFiltersData.keyword
        if (lowerCaseKeyword != "") {
            console.log("[getProductsByFilters] Keyword khac rong : " + lowerCaseKeyword);
            if (!productsList[i].name.toLocaleLowerCase().includes(lowerCaseKeyword)) {
                productIsMatched = false;
                console.log("[getProductsByFilters] Product " + productsList[i].id + " : NOT MATCHED with keyword !");
                continue;
            }
            else {
                console.log("[getProductsByFilters] Product " + productsList[i].id + " : MATCHED with keyword !");
            }
        }
        else {
            console.log("[getProductsByFilters] Keyword rong ! Bo qua filter nay !");
        }
        
        // check newFiltersData.minPrice
        if (newFiltersData.minPrice !== null) {
            console.log("[getProductsByFilters] Min price khac null : " + newFiltersData.minPrice);
            if (productsList[i].price < newFiltersData.minPrice) {
                productIsMatched = false;
                console.log("[getProductsByFilters] Product " + productsList[i].id + " : NOT MATCHED with min price !");
                continue;
            }
            else {
                console.log("[getProductsByFilters] Product " + productsList[i].id + " : MATCHED with min price !");
            }
        }
        else {
            console.log("[getProductsByFilters] Min price null ! Bo qua filter nay !");
        }

        // check newFiltersData.maxPrice
        if (newFiltersData.maxPrice !== null) {
            console.log("[getProductsByFilters] Max price khac null : " + newFiltersData.maxPrice);
            if (productsList[i].price > newFiltersData.maxPrice) {
                productIsMatched = false;
                console.log("[getProductsByFilters] Product " + productsList[i].id + " : NOT MATCHED with max price !");
                continue;
            }
            else {
                console.log("[getProductsByFilters] Product " + productsList[i].id + " : MATCHED with max price !");
            }
        }
        else {
            console.log("[getProductsByFilters] Max price null ! Bo qua filter nay !");
        }

        if (productIsMatched == true) {
            console.log("[getProductsByFilters] Product " + productsList[i].id + " da PASS ! Add vao mang searchResults !");
            let clonedProductObj = structuredClone(productsList[i]);
            searchResults.push(clonedProductObj);
        }
    }

    return searchResults;
}


function handleFiltersData(filtersData) {
    let finalFilters = {
        keyword: "",
        onlyFeatured: 0,
        onlyInStock: 0,
        minPrice: null,
        maxPrice: null
    };

    // check keyword
    if (Object.hasOwn(filtersData, "keyword")) {
        console.log("[handleFiltersData] filtersData co attr keyword ! Value : " + filtersData.keyword);
        finalFilters.keyword = filtersData.keyword.trim();
    }
    else {
        console.log("[handleFiltersData] filtersData KHONG CO attr keyword !");
    }

    // check onlyFeatured
    if (Object.hasOwn(filtersData, "onlyFeatured")) {
        console.log("[handleFiltersData] filtersData co attr onlyFeatured ! Value : " + filtersData.onlyFeatured);
        // check co phai number ko
        let onlyFeaturedVal = Number(filtersData.onlyFeatured);
        if (Number.isNaN(onlyFeaturedVal)) {
            onlyFeaturedVal = 0;
        }
        // chi chap nhan 0 hoac 1
        if (onlyFeaturedVal != 0 && onlyFeaturedVal != 1) {
            onlyFeaturedVal = 0;
        }

        finalFilters.onlyFeatured = onlyFeaturedVal;
    }
    else {
        console.log("[handleFiltersData] filtersData KHONG CO attr onlyFeatured !");
    }

    // check onlyInStock
    if (Object.hasOwn(filtersData, "onlyInStock")) {
        console.log("[handleFiltersData] filtersData co attr onlyInStock ! Value : " + filtersData.onlyInStock);
        // check co phai number ko
        let onlyInStockVal = Number(filtersData.onlyInStock);
        if (Number.isNaN(onlyInStockVal)) {
            onlyInStockVal = 0;
        }
        // chi chap nhan 0 hoac 1
        if (onlyInStockVal != 0 && onlyInStockVal != 1) {
            onlyInStockVal = 0;
        }

        finalFilters.onlyInStock = onlyInStockVal;
    }
    else {
        console.log("[handleFiltersData] filtersData KHONG CO attr onlyInStock !");
    }

    // check minPrice
    if (Object.hasOwn(filtersData, "minPrice")) {
        console.log("[handleFiltersData] filtersData co attr minPrice ! Value : " + filtersData.minPrice);

        if (filtersData.minPrice === "") {
            console.log("[handleFiltersData] minPrice rong ! Set thanh null !");
            finalFilters.minPrice = null;
        }
        else {
            // check co phai number ko
            let minPrice_int = Number(filtersData.minPrice);
            if (Number.isNaN(minPrice_int)) {
                console.log("[handleFiltersData] minPrice khong phai number ! Set thanh null !");
                finalFilters.minPrice = null;
            }
            else {
                console.log("[handleFiltersData] minPrice la number : " + minPrice_int);
                finalFilters.minPrice = minPrice_int;
            }
        }
    }
    else {
        console.log("[handleFiltersData] filtersData KHONG CO attr minPrice !");
    }

    // check maxPrice
    if (Object.hasOwn(filtersData, "maxPrice")) {
        console.log("[handleFiltersData] filtersData co attr maxPrice ! Value : " + filtersData.maxPrice);

        if (filtersData.maxPrice === "") {
            console.log("[handleFiltersData] maxPrice rong ! Set thanh null !");
            finalFilters.maxPrice = null;
        }
        else {
            // check co phai number ko
            let maxPrice_int = Number(filtersData.maxPrice);
            if (Number.isNaN(maxPrice_int)) {
                console.log("[handleFiltersData] maxPrice khong phai number ! Set thanh null !");
                finalFilters.maxPrice = null;
            }
            else {
                console.log("[handleFiltersData] maxPrice la number : " + maxPrice_int);
                finalFilters.maxPrice = maxPrice_int;
            }
        }
    }
    else {
        console.log("[handleFiltersData] filtersData KHONG CO attr maxPrice !");
    }

    return finalFilters;
}


/**
 * Sort
 */
function sortProductsByType(productsData, sortType="") {
    // neu mang productsData rong thi return ngay
    if (productsData.length <= 0) {
        return [];
    }
    
    console.log("[sortProductsByType] param sortType : " + sortType);
    if (sortType == "" || sortType == "default") {
        console.log("[sortProductsByType] sortType rong hoac default. Set lai thanh from_newest_to_oldest");
        sortType = "from_newest_to_oldest";
    }

    let clonedProductsData = structuredClone(productsData);

    switch (sortType) {
        case "name_asc":
            console.log("[sortProductsByType] sortType = " + sortType + ". Sort theo name A-Z !");

            clonedProductsData.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
            return clonedProductsData;

            break;
        case "name_desc":
            console.log("[sortProductsByType] sortType = " + sortType + ". Sort theo name Z-A !");

            clonedProductsData.sort(function(a, b) {
                return b.name.localeCompare(a.name);
            });
            return clonedProductsData;

            break;
        case "price_asc":
            console.log("[sortProductsByType] sortType = " + sortType + ". Sort theo price tu thap den cao !");

            clonedProductsData.sort(function(a, b) {
                return a.price - b.price;
            });
            return clonedProductsData;

            break;
        case "price_desc":
            console.log("[sortProductsByType] sortType = " + sortType + ". Sort theo price tu cao den thap !");

            clonedProductsData.sort(function(a, b) {
                return b.price - a.price;
            });
            return clonedProductsData;

            break;
        case "from_newest_to_oldest":
            console.log("[sortProductsByType] sortType = " + sortType + ". Sort theo Product ID tu lon den nho !");

            for (let i=0; i < clonedProductsData.length; i++) {
                for (let j=i+1; j < clonedProductsData.length; j++) {
                    if (clonedProductsData[i].id < clonedProductsData[j].id) {
                        let tempObj = clonedProductsData[i];
                        clonedProductsData[i] = clonedProductsData[j];
                        clonedProductsData[j] = tempObj;
                    }
                }
            }

            return clonedProductsData;

            break;
        default:
            console.log("[sortProductsByType] Khong co sort type phu hop! Return mang goc !");
            return clonedProductsData;
    }
}



/**
 * Ham get cac object product theo array cac product Id truyen vao
 */
function getProductsByProductIds(productIds) {
    if (productIds.length <= 0) {
        console.log("[getProductsByProductIds] array productIds rong! stop ham nay ngay!");
        return [];
    }

    let productsArr = [];
    for (let i=0; i < productIds.length; i++) {
        let productId = productIds[i];
        let productId_int = Number(productId);

        // if (Number.isNaN(productId_int)) {
        //     console.log("[getProductsByProductIds] product id " + productId + " khong phai number! Bo qua!");
        //     continue;
        // }
        // if (productId_int <= 0) {
        //     console.log("[getProductsByProductIds] product id " + productId_int + " nho hon hoac bang 0! Bo qua!");
        //     continue;
        // }

        if (Number.isNaN(productId_int) || productId_int <= 0) {
            console.log("[getProductsByProductIds] product id " + productId + " is not valid! Bo qua!");
            continue;
        }

        let foundInProductsList = false;
        for(let j=0; j < productsList.length; j++) {
            if (productId_int == productsList[j].id) {
                foundInProductsList = true;
                console.log("[getProductsByProductIds] product id " + productId_int + " co trong mang productsList!");
                let proObj = structuredClone(productsList[j]);
                console.log(proObj);

                productsArr.push(proObj);
                break;
            }
        }

        if (foundInProductsList == false) {
            console.log("[getProductsByProductIds] product id " + productId_int + " khong ton tai trong mang productsList!");
        }
    }

    return productsArr;
}


/**
 * Ham xu ly add 1 product vao cart dua theo productId truyen vao ham
*/
function addProductToCart(proId, quantity=1) {
    console.log("[addProductToCart] chuan bi add vao cart - product ID : " + proId + " ; quantity : " + quantity);

    // truoc tien, check quantity phai >= 1
    if (quantity <= 0) {
        showToastBox("error", "Có lỗi xảy ra!", "<span>Số lượng thêm vào giỏ hàng cần phải từ 1 trở lên.</span>");
        return false;
    }

    let cart = JSON.parse(localStorage.getItem("bakeryShopCartLs")) || [];

    let cartItemObj = null;
    // check product voi ID nay da co trong mang cart hay chua
    let foundInCart = 0;
    for (let i=0; i < cart.length; i++) {
        if (proId == cart[i].productId) {
            console.log("[addProductToCart] Product co ID " + proId + " da co trong cart voi index = " + i + "; Quantity hien la " + cart[i].quantity + ". Nen gio chi can tang quantity them " + quantity);
            foundInCart = 1;
            
            // tang quantity theo param quantity
            let newCartItemQty = cart[i].quantity + quantity;

            // can check quantity moi duoc cong them có vuot qua so luong cho phep cua 1 item trong cart hay ko
            if (newCartItemQty > maxCartItemQuantity) {
                console.log("[addProductToCart] Neu tang them " + quantity + ", quantity hien tai trong cart cua product " + proId + " se la " + newCartItemQty + ". Vuot qua " + maxCartItemQuantity + ". Stop update quantity cua product nay trong cart !");
                showToastBox("error", "Có lỗi xảy ra!", "Số lượng của sản phẩm này trong giỏ hàng chỉ được phép tối đa là " + maxCartItemQuantity);
                return false;
            }

            // sau khi check ok thi moi update cho quantity cua item nay trong mang cart
            cart[i].quantity = newCartItemQty;

            // copy cart[i] ra 1 ban cho cartItemObj
            cartItemObj = { ...cart[i] };

            console.log("[addProductToCart] cart[" + i + "] hien gio sau khi update quantity:")
            console.log(cart[i]);
            break;
        }
    }

    if (foundInCart == 0) {
        console.log("[addProductToCart] Product co ID " + proId + " chua co trong cart. Bat dau add vao trong cart voi quantity = " + quantity);
        // tim product voi ID nay trong array productsList
        let isFoundInProductsList = 0;
        for (let i=0; i < productsList.length; i++) {
            if (proId == productsList[i].id) {
                console.log("[addProductToCart] Product co ID " + proId + " co trong mang productsList : index " + i);
                console.log(productsList[i]);

                isFoundInProductsList = 1;

                // can check quantity them vao cart có vuot qua so luong cho phep cua 1 item trong cart hay ko
                if (quantity > maxCartItemQuantity) {
                    console.log("[addProductToCart] quantity chuan bi add vao cart cho product " + proId + " la " + quantity + ". Vuot qua " + maxCartItemQuantity + ". Stop add to cart !");
                    showToastBox("error", "Có lỗi xảy ra!", "Số lượng của sản phẩm này trong giỏ hàng chỉ được phép tối đa là " + maxCartItemQuantity);
                    return false;
                }

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
            console.log("[addProductToCart] Product co ID " + proId + " khong ton tai trong array productsList !");
            showToastBox("error", "Có lỗi xảy ra!", "<span>Sản phẩm này không tồn tại trong danh sách sản phẩm của shop.</span>");
            return false;
        }
    }

    console.log("Data cua cartItemObj sau cung : ");
    console.log(cartItemObj);

    // set cart vao local storage
    localStorage.setItem("bakeryShopCartLs", JSON.stringify(cart));

    console.log("Data cua cart hien tai : ");
    console.log(cart);

    let toastMsg = `<span>` + cartItemObj.name + `</span><br>
                    <span>Số lượng trong giỏ: ` + cartItemObj.quantity + `</span><br>
                    <a href="cart.html">Xem giỏ hàng</a>`;
    showToastBox("success", "Đã thêm vào giỏ hàng", toastMsg);
}


let hideToastTimer = null;
// Ham start timer dem x giay de thuc hien hide Toast Box
function startHideToastTimer() {
    console.log("[startHideToastTimer] Bat dau set timer dem nguoc de hide Toast Box!")
    clearTimeout(hideToastTimer);

    hideToastTimer = setTimeout(() => {
        hideToastBox();
    }, 4000);
}


// Ham thuc hien show Toast Box (new)
// toastType : success / error
function showToastBox(toastType, title, messageContent) {
    let toastBox = document.getElementById('toastBox');
    toastBox.classList.remove("toast-success", "toast-error", "show");

    // check toastType de quyet dinh add CSS class toast-success hay toast-error
    if (toastType == "success") {
        toastBox.classList.add("toast-success");
    }
    else {
        toastBox.classList.add("toast-error");
    }

    // set title
    toastBox.querySelector(".toast-title").innerHTML = title;
    // set message content
    toastBox.querySelector(".toast-message").innerHTML = messageContent;

    // set icon
    if (toastType == "success") {
        toastBox.querySelector(".toast-icon i").className = "fa-solid fa-circle-check";
    }
    else {
        toastBox.querySelector(".toast-icon i").className = "fa-solid fa-circle-xmark";
    }

    toastBox.classList.add('show');

    // sau x giay thi hide Toast Box nay di
    startHideToastTimer();
}


// Ham hide toast box
function hideToastBox() {
    clearTimeout(hideToastTimer);

    let toast_box = document.getElementById('toastBox');
    toast_box.classList.remove("show");

    console.log("[hideToastBox] Da hide toast box roi!");
}
// bind event "click" cho nut close de hide Toast Box
let toastBoxCloseButton = document.getElementById('toastBox').querySelector(".toast-box .toast-close");
toastBoxCloseButton.addEventListener("click", hideToastBox);


// Hover vao Toast Box -> stop auto hide
document.getElementById('toastBox').addEventListener("mouseenter", () => {
    console.log("Xay ra event mouseenter, user dang hover vao Toast box ! Stop auto hide Toast Box!");
    clearTimeout(hideToastTimer);
});

// Re chuot ra khoi Toast Box -> start lai timer hide Toast Box
document.getElementById('toastBox').addEventListener("mouseleave", () => {
    let toast_box = document.getElementById('toastBox');
    if (toast_box.classList.contains("show") == true) {
        console.log("[ToastBox - mouseleave] toastBox dang co CSS class 'show', nen can goi ham startHideToastTimer()!");
        startHideToastTimer();
    }
    else {
        console.log("[ToastBox - mouseleave] toastBox khong co CSS class 'show', nen KHONG CAN goi ham startHideToastTimer()!");
    }
});


// Ham de xoa het cac item trong cart
function clearCart() {
    localStorage.removeItem("bakeryShopCartLs");
    console.log("[clearCart] Da xoa item bakeryShopCartLs khoi Local Storage !");
}
//clearCart();