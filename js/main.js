'use strict';
// const products = [
//     {id: 1, title: 'Notebook', price: 2000, image: 'img/notebook.jpg'},
//     {id: 2, title: 'Mouse', price: 20, image: 'img/mouse.jpg'},
//     {id: 3, title: 'Keyboard', price: 200, image: 'img/keyboard.jpg'},
//     {id: 4, title: 'Gamepad', price: 50, image: 'img/gamepad.jpg'},
// ];
// //Функция для формирования верстки каждого товара
// //Добавить в выводе изображение
// const renderProduct = (item) => {
//     return `<div class="product-item">
//                 <h3>${item.title}</h3>
//                 <img class="product-img" src="${item.image}" alt="photo">
//                 <p>${item.price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };
// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item));
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList.join(' ');
// };

// renderPage(products);

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.sumOrder = 0;
        this._fetchProducts();
        this.render();
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000, image: 'img/notebook.jpg' },
            { id: 2, title: 'Mouse', price: 20, image: 'img/mouse.jpg' },
            { id: 3, title: 'Keyboard', price: 200, image: 'img/keyboard.jpg' },
            { id: 4, title: 'Gamepad', price: 50, image: 'img/gamepad.jpg' },
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', item.render());
            this.sumOrder += product.price;
        }
    }
}
class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.image = product.image;
    }
    render() {
        return `<div class="product-item">
                   <h3>${this.title}</h3>
                   <img class="product-img" src="${this.image}" alt="photo">
                   <p>${this.price}</p>
                     <button class="buy-btn">Купить</button>
                </div>`
    }
}
class Basket extends ProductsList {
    constructor(sumOrder) {
        super(sumOrder)
        this.showSumOrder();
    }
    showSumOrder() {
        console.log(`Общая сумма товаров: ${this.sumOrder}`);
    }
    sumItemInBasket() {

    }
    deleteItem() {

    }
}
let basketList = new Basket();
let list = new ProductsList();