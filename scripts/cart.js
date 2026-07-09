let cart = JSON.parse(localStorage.getItem('cart')) || [];

let cartEmpty = document.getElementById('cartEmpty');

let cartShop = document.getElementById('cartShop');

// if (cart.length == 0) {
//     cartEmpty.style.display = 'block';
//     cartShop.style.display = 'none';
// }

document.querySelectorAll('.btn-plus').forEach(button => {
    button.addEventListener('click', function () {
        const cartItem = this.closest('.cart-item');
        const input = cartItem.querySelector('.cart-qty-input');

        input.value++;
    });
});

document.querySelectorAll('.btn-minus').forEach(button => {
    button.addEventListener('click', function () {
        const cartItem = this.closest('.cart-item');
        const input = cartItem.querySelector('.cart-qty-input');

        input.value--;
    });
});

