document.getElementById("txtHeaderSearch").addEventListener("keydown", function(event){
    console.log("[txtHeaderSearch] phim da bam la : " + event.key);

    if (event.key === "Enter") {
        event.preventDefault();
        let keywordStr = this.value.trim();

        console.log("[txtHeaderSearch] keyword da nhap : " + keywordStr);

        if (keywordStr == "") {
            showToastBox("error", "Có lỗi xảy ra!", "<span>Vui lòng nhập từ khóa.</span>");
            return false;
        }

        window.location.href = "products.html?keyword=" + keywordStr;
    }
});