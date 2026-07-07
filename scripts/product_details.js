/**
 * Ham tao HTML section Product Details (trong trang product details)
 */
function showProductDetailsById(productId) {
    
}

let urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("product_id") && urlParams.get("product_id") !== "") {
    console.log("Co URL param product_id : " + urlParams.get("product_id"));
    let productId_val = urlParams.get("product_id").trim();
    let productId_int = Number(productId_val);
    if (Number.isNaN(productId_int)) {
        console.log("param product_id khong phai number!");
    }
    else {
        console.log("param product_id la number! Goi ham showProductDetailsById() !");
    }

}
else {
    console.log("Khong ton tai URL param product_id hoac product_id rong!");
}