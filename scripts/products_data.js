let productsList = [
    {
        id: 123,
        name: "Bánh Mousse Dưa Lưới Minty",
        price: 545000,
        images: [
            "images/mousese-dua-luoi-minty-1.jpg",
            "images/mousese-dua-luoi-minty-2.jpg",
            "images/mousese-dua-luoi-minty-3.jpg",
            "images/mousese-dua-luoi-minty-4.jpg"
        ],
        shortDescription: "Mousse Dưa Lưới là sự kết hợp hài hòa giữa bạt vani mềm nhẹ và mousse dưa lưới thanh mát quyện cùng cream cheese béo dịu. Điểm nhấn nằm ở lớp nhân bạc hà the mát, mang đến cảm giác tươi mới đầy thú vị trong từng muỗng bánh, tạo nên hương vị tươi mát và tinh tế cho những ngày hè.",
        description: "<p><strong>Hương vị:</strong> Thanh mát - Ngọt dịu - Béo nhẹ</p><p><strong>Cấu trúc bánh:</strong></p><p>Phần thân bánh gồm 3 lớp xen kẽ các lớp:</p><ul><li><p>Bạt bông lan vani truyền thống.</p></li><li><p>Mousse dưa lưới kết hợp với cream cheese béo nhẹ.</p></li><li><p>Nhân bạc hà tươi mát.</p></li></ul><p>Phần trang trí: Kết hợp decor dưa lưới tươi mát, mousse sữa chua, kem trang trí tuyền thống và chocolate tạo hình.</p><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 dao cắt bánh</p></li><li><p>1 bộ dĩa và muỗng</p></li><li><p>Hộp nến nhỏ</p></li></ul>",
        isFeatured: true,
        relatedProductIds: [12, 36, 57],
        inStock: true
    },
    {
        id: 124,
        name: "Bánh Mousse Thanh Nhãn",
        price: 261000,
        images: [
            "images/mousse-thanh-nhan.jpg",
            "images/mousse-thanh-nhan-2.jpg",
            "images/mousse-thanh-nhan-3.jpg",
            "images/mousse-thanh-nhan-4.jpg",
            "images/mousse-thanh-nhan-5.jpg"
        ],
        shortDescription: "Mousse Thanh Nhãn là sự giao thoa giữa cốt choco đậm đà và mousse nhãn ngọt thanh, mát mịn. Nhân bánh gây ấn tượng với thịt nhãn giòn sần sật quyện cùng hạt dẻ béo bùi lạ miệng, thơm ngậy. Vẻ ngoài chỉn chu với nhãn tươi và hoa thủ công, mang đến trải nghiệm vị giác tinh tế, thanh mát cho ngày hè",
        description: "<p><strong>Hương vị:</strong>&nbsp;Thanh mát - Ngọt dịu - Béo nhẹ</p><p><strong>Cấu trúc bánh:</strong></p><p>Phần thân bánh gồm 3 lớp xen kẽ các lớp:</p><ul><li><p>Bạt bông lan choco.</p></li><li><p>Mousse nhãn mềm mát mịn vị ngọt thanh.</p></li><li><p>Lớp nhân nhãn có thịt nhãn giòn sần sật, lớp nhân hạt dẻ béo bùi.</p></li></ul><p>Phần trang trí: Trên mặt bánh decor kem topping, nhãn lon, hoa gumpaste, lá húng lủi, choco.</p><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 dao cắt bánh</p></li><li><p>1 bộ dĩa và muỗng</p></li><li><p>Hộp nến nhỏ</p></li></ul><p></p>",
        isFeatured: true,
        relatedProductIds: [393, 126, 129],
        inStock: true
    },
    {
        id: 125,
        name: "Bánh Mousse Ngọc Nhãn",
        price: 565000,
        images: [
            "images/mousse-ngoc-nhan.jpg",
            "images/mousse-ngoc-nhan-2.jpg",
            "images/mousse-ngoc-nhan-3.jpg",
            "images/mousse-ngoc-nhan-4.jpg",
            "images/mousse-ngoc-nhan-5.jpg"
        ],
        shortDescription: "Mousse Ngọc Nhãn gây ấn tượng với lớp thạch trong veo bao bọc nhãn độc đáo. Cấu trúc bánh kết hợp hài hòa giữa bạt chocolate đắng nhẹ, mousse nhãn mịn mượt ngọt thanh và điểm nhấn nhân nhãn giòn sần sật quyện cùng hạt dẻ béo bùi. Sự đối lập thú vị giữa các tầng kết cấu và vị trái cây thanh mát mang đến một trải nghiệm tinh tế",
        description: "<p><strong>Hương vị:</strong>&nbsp;Thanh mát - Ngọt dịu - Béo nhẹ</p><p><strong>Cấu trúc bánh:</strong></p><p>Phần thân bánh gồm 3 lớp xen kẽ các lớp:</p><ul><li><p>Bạt bông lan choco.</p></li><li><p>Mousse nhãn mềm mát mịn vị ngọt thanh.</p></li><li><p>Lớp nhân nhãn có thịt nhãn giòn sần sật, lớp nhân hạt dẻ béo bùi.</p></li></ul><p>Phần trang trí: Trên mặt bánh decor kem topping, nhãn lon, hoa gumpaste, lá húng lủi, choco.</p><p><strong>Bảo quản:</strong> Bánh nên được dùng trong ngày và ngon hơn khi bảo quản lạnh trước khi thưởng thức.</p><p><strong>Phụ kiện tặng kèm:</strong></p><ul><li><p>1 dao cắt bánh</p></li><li><p>1 bộ dĩa và muỗng</p></li><li><p>Hộp nến nhỏ</p></li></ul><p></p>",
        isFeatured: true,
        relatedProductIds: [12, 36, 57],
        inStock: true
    },
    // {
    //     id: 0,
    //     name: "",
    //     price: 565000,
    //     images: [
            
    //     ],
    //     shortDescription: "",
    //     description: "",
    //     isFeatured: true,
    //     relatedProductIds: [],
    //     inStock: true
    // }
];