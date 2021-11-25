'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'
const APIBASKET = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'
class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.sumOrder = 0;
        this._getProducts()
            .then(data => {
                this.goods = data;
                this.render();
                this.calcSum();
            });
    }
    _getProducts() {
            return fetch(`${API}/catalogData.json`)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                });
        }
        //_fetchProducts() {
        //    this.goods = [
        //        { id: 1, title: 'Notebook', price: 2000, image: 'img/notebook.jpg' },
        //        { id: 2, title: 'Mouse', price: 20, image: 'img/mouse.jpg' },
        //        { id: 3, title: 'Keyboard', price: 200, image: 'img/keyboard.jpg' },
        //        { id: 4, title: 'Gamepad', price: 50, image: 'img/gamepad.jpg' },
        //    ];
        //}
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }
    calcSum() {
        for (let sumPrice of this.goods) {
            this.sumOrder += sumPrice.price;
        }
        console.log(`Общая сумма товаров: ${this.sumOrder}`);
    }
}
class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.product_name = product.product_name;
        this.price = product.price;
        //this.image = product.image;
    }
    render() {
        return `<div class="product-item">
                   <h3>${this.product_name}</h3>
                   <img class="product-img" src="img/noPhoto.jpg" alt="photo">
                   <p class="product-price">${this.price}</p>
                     <button class="buy-btn">Купить</button>
                </div>`
    }
}

class Basket {
    constructor(basketContent = '.basket', btnBasket = '.btn_basket') {
        this.basketContent = basketContent;
        this.btnBasket = btnBasket;
        this.goodsBasket = [];
        this._getBasket()
            .then(data => {
                this.goodsBasket = data.contents;
                this._openBasket();
                this.renderBasket();
            });
        //this.sumItemInBasket();
        //this.deleteItem();
        //this.sumItem();
    }
    _getBasket() {
        return fetch(`${APIBASKET}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    _openBasket() {
        let showBasket = document.querySelector(this.btnBasket)
        showBasket.addEventListener('click', () => {
            let basket = document.querySelector('.basket');
            basket.style.visibility = (basket.style.visibility != 'hidden') ? 'hidden' : 'visible';
        });
    }
    renderBasket() {
        let basketBlock = document.querySelector(this.basketContent)
        for (let items of this.goodsBasket) {
            let showItem = new BasketItem(items);
            basketBlock.insertAdjacentHTML('beforeend', showItem.renderBasket());
        }
    }
}
class BasketItem {
    constructor(items) {
        this.id_product = items.id_product;
        this.product_name = items.product_name;
        this.price = items.price;
        this.quantity = items.quantity;
    }
    renderBasket() {
        return `<div class="basket_product"><img class="basket-img" src="img/100x100.jpg" alt="photo">
        <div class="basket_name_product"><h3 class="basket_title">${this.product_name}</h3> <div class="basket_info">Quantity: ${this.quantity}</div>
        <div class="basket_each"> ${this.price} each</div></div>
        <div class="basket_price_product">$${this.price} <button class="basket_item_close" type="button"><div class="cl-btn-4"></div></button></div></div>`
    }
}
let list = new ProductsList();
let basketList = new Basket();