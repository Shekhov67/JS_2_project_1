'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

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
                   <p>${this.price}</p>
                     <button class="buy-btn">Купить</button>
                </div>`
    }
}

class Basket {
    constructor(basketContent = '.btn-basket') {
        this.basketContent = basketContent;
        this._openBasket();
        this.renderBasket();
        //this.sumItemInBasket();
        //this.deleteItem();
        //this.sumItem();
    }
    _openBasket() {
        let showBasket = document.querySelector(this.basketContent)
        showBasket.addEventListener('click', () => {
            let basket = document.querySelector('.basket');
            basket.style.display = (basket.style.display != 'none') ? 'none' : 'block';
        });
    }
    renderBasket() {
        let basketBlock = document.querySelector(this.basketContent)
        for (let items of this.goods) {
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
    }
    renderBasket() {
        return `<div class="basket_block">${this.product_name}</div>`
    }
}
let list = new ProductsList();
let basketList = new Basket();