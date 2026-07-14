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
        console.log("[searchAndSortProducts] Element dang phat event la Input TextBox : " + elementId);

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
        onlyFeatured: 0,
        onlyInStock: 0,
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


document.getElementById("searchKeywordTextBox").addEventListener("input", searchAndSortProducts);
document.getElementById("minPriceTextBox").addEventListener("input", searchAndSortProducts);
document.getElementById("maxPriceTextBox").addEventListener("input", searchAndSortProducts);


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
    document.getElementById("priceErrorMsg").style.display = "none";

    // chuan bi filter de get product
    let filtersData = {
        keyword: "",
        onlyFeatured: 0,
        onlyInStock: 0,
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


// vua load page thi get all product tu mang productsList voi sort type "default"
let sortedAllProductsList = sortProductsByType(productsList, "default");

console.log("Data cua sortedAllProductsList : ");
console.log(sortedAllProductsList);
console.log("Data cua productsList luc nay : ");
console.log(productsList);

// update text products count tren page
document.getElementById("productsCountText").innerHTML = sortedAllProductsList.length;

if (sortedAllProductsList.length > 0) {
    showOrGetProductsGrid(sortedAllProductsList, "show", "productsGridSection");
}
else {
    showNoSearchResultMessage("productsGridSection");
}


// khi vua load page, update headerCartBadgeText bang so luong item trong cart (bakeryShopCartLs)
updateHeaderCartBadgeByCurrentCart();