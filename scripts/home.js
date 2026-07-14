/*============ Lay cac Newest Product (product moi nhat) ============*/
console.log("Bat dau load Newest products!");
// chuan bi filter de get Newest product
let newestProductFiltersData = {
    keyword: "",
    onlyFeatured: 0,
    minPrice: "",
    maxPrice: ""
};

// goi ham lay danh sach product theo filter newestProductFiltersData
let homeNewestProductsList = getProductsByFilters(newestProductFiltersData);
console.log("Data cua homeNewestProductsList : ");
console.log(homeNewestProductsList);

if (homeNewestProductsList.length > 0) {
    // thuc hien sort
    let sortedHomeNewestProductsList = sortProductsByType(homeNewestProductsList, "default");

    console.log("Data cua sortedHomeNewestProductsList : ");
    console.log(sortedHomeNewestProductsList);

    // thuc hien slice tren mang sortedHomeNewestProductsList
    let limit_sortedHomeNewestProductsList = sortedHomeNewestProductsList.slice(0, 6);
    console.log("Data cua limit_sortedHomeNewestProductsList (sau khi slice) : ");
    console.log(limit_sortedHomeNewestProductsList);

    console.log("Data cua homeNewestProductsList luc nay : ");
    console.log(homeNewestProductsList);
    console.log("Data cua productsList luc nay : ");
    console.log(productsList);

    showOrGetProductsGrid(limit_sortedHomeNewestProductsList, "show", "newestProductsGridSection");
}
else {
    console.log("Khong co newest product nao het ! Hide section nay !");
    document.getElementById("newestProductsGridSection").style.display = "none";
}



/*============ Lay cac Featured Product (product noi bat) ============*/
console.log("Bat dau load featured products!");
// chuan bi filter de get Featured Product
let featuredProductFiltersData = {
    keyword: "",
    onlyFeatured: 1,
    minPrice: "",
    maxPrice: ""
};

// goi ham lay danh sach product theo filter featuredProductFiltersData
let homeFeaturedProductsList = getProductsByFilters(featuredProductFiltersData);
console.log("Data cua homeFeaturedProductsList : ");
console.log(homeFeaturedProductsList);

if (homeFeaturedProductsList.length > 0) {
    // thuc hien sort
    let sortedHomeFeaturedProductsList = sortProductsByType(homeFeaturedProductsList, "default");

    console.log("Data cua sortedHomeFeaturedProductsList : ");
    console.log(sortedHomeFeaturedProductsList);

    // thuc hien slice tren mang sortedHomeFeaturedProductsList
    let limit_sortedHomeFeaturedProductsList = sortedHomeFeaturedProductsList.slice(0, 6);
    console.log("Data cua limit_sortedHomeFeaturedProductsList (sau khi slice) : ");
    console.log(limit_sortedHomeFeaturedProductsList);

    console.log("Data cua homeFeaturedProductsList luc nay : ");
    console.log(homeFeaturedProductsList);
    console.log("Data cua productsList luc nay : ");
    console.log(productsList);

    showOrGetProductsGrid(limit_sortedHomeFeaturedProductsList, "show", "featuredProductsGridSection");
}
else {
    console.log("Khong co featured product nao het ! Hide section nay !");
    document.getElementById("featuredProductsSection").style.display = "none";
}


// khi vua load page, update headerCartBadgeText bang so luong item trong cart (bakeryShopCartLs)
updateHeaderCartBadgeByCurrentCart();