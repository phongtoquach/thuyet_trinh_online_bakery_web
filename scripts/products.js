function searchAndSortProducts(event) {
    let elementId = event.target.id;
    console.log("[searchAndSortProducts] Element dang phat event la : " + event.target.tagName + " ; id : " + elementId);

    let productsGridSectionId = "productsGridSection";

    let selectedSortType = "";
    // check element dang phat event la button Sort hay textbox trong khu vuc Filter
    if (event.target.tagName == "BUTTON" && event.target.classList.contains("sort-toggle-btn")) {
        // Neu element dang phat event la 1 button Sort
        console.log("[searchAndSortProducts] Element dang phat event la button sort : " + elementId + " - sort type : " + event.target.dataset.sorttype);
        
        // truoc het : xoa CSS class "active" cua tat ca button co class sort-toggle-btn
        document.querySelectorAll('.sort-toggle-btn').forEach(function(sortBtnEle) {
            console.log("[searchAndSortProducts] Xoa CSS class 'active' cua button : " + sortBtnEle.id);
            sortBtnEle.classList.remove('active');
        });

        // sau do : add CSS class "active" cho button Sort dang phat event nay
        event.target.classList.add("active");

        // lay ra sort type dang duoc chon
        if (event.target.hasAttribute("data-sorttype")) {
            console.log("[searchAndSortProducts] sorttype cua button nay la : " + event.target.dataset.sorttype);
            selectedSortType = event.target.dataset.sorttype;
        }
    }
    else {
        console.log("[searchAndSortProducts] Element dang phat event la Input TextBox / CheckBox : " + elementId);

        // check xem button Sort nao dang duoc chon (tuc la co CSS class 'active')
        document.querySelectorAll('.sort-toggle-group .sort-toggle-btn').forEach(function(sortBtnEle) {
            if (sortBtnEle.classList.contains("active")) {
                console.log("[searchAndSortProducts] Button Sort dang co CSS class 'active' la : " + sortBtnEle.id + " - sorttype : " + sortBtnEle.dataset.sorttype);
                selectedSortType = sortBtnEle.dataset.sorttype;
            }
        });
    }
    console.log("[searchAndSortProducts] selectedSortType sau cung la : " + selectedSortType);


    // hide div thong bao loi nhap price
    let priceErrorMsgDiv = document.getElementById("priceErrorMsg");
    priceErrorMsgDiv.innerHTML = "";
    priceErrorMsgDiv.style.display = "none";

    // lay value cua textbox keyword
    let searchedKeyword = document.getElementById("searchKeywordTextBox").value.trim();
    // lay value cua 2 textbox gia
    let minPriceVal = document.getElementById("minPriceTextBox").value.trim();
    let maxPriceVal = document.getElementById("maxPriceTextBox").value.trim();

    // check checkbox chkOnlyFeatured co duoc check ko
    let onlyFeaturedVal = 0;
    if (document.getElementById("chkOnlyFeatured").checked) {
        console.log("[searchAndSortProducts] checkbox chkOnlyFeatured dang duoc check !");
        onlyFeaturedVal = 1;
    }
    else {
        console.log("[searchAndSortProducts] checkbox chkOnlyFeatured khong duoc check !");
    }

    console.log("[searchAndSortProducts] keyword ten product : " + searchedKeyword);
    console.log("[searchAndSortProducts] min price str : " + minPriceVal);
    console.log("[searchAndSortProducts] max price str : " + maxPriceVal);
    
    // Neu khong co filter nao thi co nghia la show het tat ca product, nhung van sort theo sort option dang duoc chon
    // if (searchedKeyword == "" && minPriceVal == "" && maxPriceVal == "") {
    //     console.log("[searchAndSortProducts] Khong co search filter. Show het tat ca product trong mang productsList, nhung van apply sort option dang duoc chon !");

    //     // goi ham sort
    //     let sortedProductsList = sortProductsByType(productsList, selectedSortType);

    //     console.log("[searchAndSortProducts] Data cua sortedProductsList : ");
    //     console.log(sortedProductsList);
    //     console.log("[searchAndSortProducts] Data cua productsList luc nay : ");
    //     console.log(productsList);

    //     if (sortedProductsList.length > 0) {
    //         showOrGetProductsGrid(sortedProductsList, "show", productsGridSectionId);
    //     }
    //     else {
    //         showNoSearchResultMessage(productsGridSectionId);
    //     }
        
    //     return false;
    // }

    // convert min price thanh number
    let minPrice = 0;
    let minPriceIsValid = 0;
    if (minPriceVal != "") {
        minPrice = Number(minPriceVal);
        console.log("[searchAndSortProducts] min price number : " + minPrice);
        // check min price co phai so hop le khong
        if (Number.isNaN(minPrice) || minPrice < 0) {
            priceErrorMsgDiv.style.display = "block";
            priceErrorMsgDiv.innerHTML = "Giá min cần phải là số và phài từ 0 trở lên !";
            return false;
        }
        else {
            minPriceIsValid = 1;
        }
    }
    

    // convert max price thanh number
    let maxPrice = 0;
    let maxPriceIsValid = 0;
    if (maxPriceVal != "") {
        maxPrice = Number(maxPriceVal);
        console.log("[searchAndSortProducts] max price number : " + maxPrice);
        // check max price co phai so hop le khong
        if (Number.isNaN(maxPrice) || maxPrice < 0) {
            priceErrorMsgDiv.style.display = "block";
            priceErrorMsgDiv.innerHTML = "Giá max cần phải là số và phải từ 0 trở lên !";
            return false;
        }
        else {
            maxPriceIsValid = 1;
        }
    }
    
    // sau khi min price va max price deu valid, check max price can phai >= min price
    if (minPriceIsValid == 1 && maxPriceIsValid == 1) {
        if (maxPrice < minPrice) {
            priceErrorMsgDiv.style.display = "block";
            priceErrorMsgDiv.innerHTML = "Giá max cần phải lớn hơn hoặc bằng giá min !";
            return false;
        }
    }

    console.log("[searchAndSortProducts] Cac filter da validate ok ! Bat dau search !");
    // bat dau goi ham getProductsByFilters()
    let filtersData = {
        keyword: searchedKeyword,
        onlyFeatured: onlyFeaturedVal,
        minPrice: minPriceVal,
        maxPrice: maxPriceVal
    };
    let searchedProductResults = getProductsByFilters(filtersData);
    console.log("[searchAndSortProducts] Data cua searchedProductResults : ");
    console.log(searchedProductResults);

    // update text products count tren page
    document.getElementById("productsCountText").innerHTML = searchedProductResults.length;

    if (searchedProductResults.length > 0) {
        // thuc hien sort dua tren mang searchedProductResults
        let sortedSearchedProductResults = sortProductsByType(searchedProductResults, selectedSortType);

        console.log("[searchAndSortProducts] Data cua sortedSearchedProductResults : ");
        console.log(sortedSearchedProductResults);
        console.log("[searchAndSortProducts] Data cua searchedProductResults luc nay : ");
        console.log(searchedProductResults);
        console.log("[searchAndSortProducts] Data cua productsList luc nay : ");
        console.log(productsList);

        // show len
        showOrGetProductsGrid(sortedSearchedProductResults, "show", productsGridSectionId);
    }
    else {
        console.log("[searchAndSortProducts] mang searchedProductResults rong ! Show message no product found !");
        showNoSearchResultMessage(productsGridSectionId);
    }
}


function showNoSearchResultMessage(containerId="productsGridSection") {
    document.getElementById(containerId).innerHTML = `<h3>Không có sản phẩm nào được tìm thấy.</h3>`;
}

// bind event cho cac input trong Filters
document.getElementById("searchKeywordTextBox").addEventListener("input", searchAndSortProducts);
document.getElementById("minPriceTextBox").addEventListener("input", searchAndSortProducts);
document.getElementById("maxPriceTextBox").addEventListener("input", searchAndSortProducts);
document.getElementById("chkOnlyFeatured").addEventListener("change", searchAndSortProducts);


// bind event click cho cac button Sort
sortToggleBtns = document.querySelectorAll('.sort-toggle-btn');
sortToggleBtns.forEach(function(sortBtn) {
    // sortBtn.addEventListener('click', function() {
    //     // truoc het : xoa CSS class "active" cua tat ca button co class sort-toggle-btn
    //     sortToggleBtns.forEach(function(sortButton) { sortButton.classList.remove('active'); });

    //     //console.log("button sort dang duoc click : ");
    //     //console.log(sortBtn);

    //     // sau do : add class "active" cho button dang duoc click
    //     sortBtn.classList.add('active');

    //     // thuc hien search product theo cac filter truoc
    // });

    sortBtn.addEventListener('click', searchAndSortProducts);
});

// bind event click cho button "Xoa bo loc"
document.getElementById("btnClearFilters").addEventListener("click", function(event){
    document.getElementById("searchKeywordTextBox").value = "";
    document.getElementById("minPriceTextBox").value = "";
    document.getElementById("maxPriceTextBox").value = "";
    document.getElementById("chkOnlyFeatured").checked = false;

    document.getElementById("priceErrorMsg").style.display = "none";

    // chuan bi filter de get product
    let filtersData = {
        keyword: "",
        onlyFeatured: 0,
        minPrice: "",
        maxPrice: ""
    };
    let allProductResults = getProductsByFilters(filtersData);
    console.log("[btnClearFilters] Data cua allProductResults : ");
    console.log(allProductResults);

    // update text products count tren page
    document.getElementById("productsCountText").innerHTML = allProductResults.length;

    if (allProductResults.length > 0) {
        // check xem button Sort nao dang duoc chon (tuc la co CSS class 'active')
        let selectedSortTypeStr = "";
        document.querySelectorAll('.sort-toggle-group .sort-toggle-btn').forEach(function(sortBtnEle) {
            if (sortBtnEle.classList.contains("active")) {
                console.log("[btnClearFilters] Button Sort dang co CSS class 'active' la : " + sortBtnEle.id + " - sorttype : " + sortBtnEle.dataset.sorttype);
                selectedSortTypeStr = sortBtnEle.dataset.sorttype;
            }
        });

        // thuc hien sort dua tren mang allProductResults
        let sortedAllProductResults = sortProductsByType(allProductResults, selectedSortTypeStr);

        console.log("[btnClearFilters] Data cua sortedAllProductResults : ");
        console.log(sortedAllProductResults);
        console.log("[btnClearFilters] Data cua allProductResults luc nay : ");
        console.log(allProductResults);
        console.log("[btnClearFilters] Data cua productsList luc nay : ");
        console.log(productsList);

        // show len
        showOrGetProductsGrid(sortedAllProductResults, "show", "productsGridSection");
    }
    else {
        showNoSearchResultMessage("productsGridSection");
    }
});


// check cac param trong URL
let urlParams = new URLSearchParams(window.location.search);

// chuan bi filter de get product
let productFiltersData = {
    keyword: "",
    onlyFeatured: 0,
    minPrice: "",
    maxPrice: ""
};

// kiem tra trong URL co param keyword khong
if (urlParams.has("keyword") && urlParams.get("keyword") !== "") {
    let keywordParam = urlParams.get("keyword").trim();
    console.log("Co URL param keyword : " + keywordParam);
    // set cho keyword trong productFiltersData
    productFiltersData.keyword = keywordParam;

    // set value cho textbox keyword trong khu vuc Filters
    document.getElementById("searchKeywordTextBox").value = keywordParam;
    // set value cho textbox keyword tren Header
    document.getElementById("txtHeaderSearch").value = keywordParam;
}

// kiem tra trong URL co param onlyFeatured khong
if (urlParams.has("onlyFeatured") && urlParams.get("onlyFeatured") !== "") {
    console.log("Co ton tai URL param onlyFeatured : " + urlParams.get("onlyFeatured"));
    let onlyFeatured_val = urlParams.get("onlyFeatured").trim();
    let finalOnlyFeatured = Number(onlyFeatured_val);
    if (Number.isNaN(finalOnlyFeatured)) {
        console.log("param onlyFeatured khong phai number! Set thanh 0 !");
        finalOnlyFeatured = 0;
    }
    
    // chi chap nhan 0 hoac 1
    console.log("finalOnlyFeatured = " + finalOnlyFeatured);
    if (finalOnlyFeatured != 0 && finalOnlyFeatured != 1) {
        console.log("param onlyFeatured khac 0 & 1 ! Set thanh 0 !");
        finalOnlyFeatured = 0;
    }
    console.log("finalOnlyFeatured sau cung = " + finalOnlyFeatured);

    // set cho keyword trong productFiltersData
    productFiltersData.onlyFeatured = finalOnlyFeatured;

    // neu finalOnlyFeatured = 1 : check checkbox chkOnlyFeatured
    if (finalOnlyFeatured == 1) {
        console.log("finalOnlyFeatured = 1 ! Check checkbox chkOnlyFeatured !");
        document.getElementById("chkOnlyFeatured").checked = true;
    }
}

// goi ham lay danh sach product theo filter productFiltersData
let filteredProductsList = getProductsByFilters(productFiltersData);
console.log("Data cua filteredProductsList (sau khi filter) : ");
console.log(filteredProductsList);

// update text products count tren page
document.getElementById("productsCountText").innerHTML = filteredProductsList.length;

if (filteredProductsList.length > 0) {
    // thuc hien sort
    let sortedFilteredProductsList = sortProductsByType(filteredProductsList, "default");

    console.log("Data cua sortedFilteredProductsList (sau khi sort) : ");
    console.log(sortedFilteredProductsList);
    console.log("Data cua filteredProductsList luc nay : ");
    console.log(filteredProductsList);
    console.log("Data cua productsList luc nay : ");
    console.log(productsList);

    showOrGetProductsGrid(sortedFilteredProductsList, "show", "productsGridSection");
}
else {
    showNoSearchResultMessage("productsGridSection");
}


// khi vua load page, update headerCartBadgeText bang so luong item trong cart (bakeryShopCartLs)
updateHeaderCartBadgeByCurrentCart();