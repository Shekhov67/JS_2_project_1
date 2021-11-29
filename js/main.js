'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

class List { //это класс список
    constructor(url, container, list = list2) {
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = []; //Массив объектов соответствующего класса
        this._init();
    }
    getJson(url) {
        return fetch(url ? url : `${API +this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    handleData() {
        this.goods = data;
        this.render();
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0)
    }
    render() { //вывод всех товаров
        console.log(this.constructor.name); //имя класса из которого вызывается метод render(
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new this.list[this.constructor.name](product); //мы сделали объект товара либо
            //CartItem, либо ProductItem
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    _init() {}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
class Item { //это класс товар(базовый)
    constructor(el, img = 'https://via.placeholder.com/200x150') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render() { //генерация товара для каталога товаров
        return `<div class='product-item' data-id='${this.id_product}'>
        <img src="${this.img}" alt='Photo'>
        <div class="desc">
            <h3>${this.product_name}</h3>
            <p>${this.price} $</p>
            <button class="buy-btn" data-id="${this.id_product}" data-name="${this.product_name}" data-price="${this.price}">Купить</button>
        </div>
    </div>`
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
class ProductsList extends List { //это класс каталог(потомок класса список)
    constructor(cart, container = '.products', url = '/catalogData.json') {
        super(url, container) //вызываем конструктор базового класса
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data)) //handleData запускает отрисовку либо каталога товаров, либо списка товаров корзины
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                //console.log(e.target)
                this.cart.addProduct(e.target);
            }
        });
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
class ProductItem extends Item {} //это класс товар каталога(совпадает с базовым классом товар)
//Цель конструктора каталога и корзины одна и та же:
//1. Регистрация событий по клику на кнопку купить.
//2.Заполнить массив товаров из файла JSON.
//3. Вывод данных на странице, используя метод handleData, который заполняет глобальный массив
//товаров и выводит их на странице,вызывая render().
class Cart extends List { //Список товаров корзины(потомок класса список)
    constructor(container = '.cart-block', url = '/getBasket.json') {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents) //вывели все товары в корзине
            });
    }
    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: +element.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert(error)
                }
            })
    }
    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert(error);
                }
            })
    }
    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `Quantity: ${product.quantity*product.price}`;
    }
    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })
    }
}
class CartItem extends Item {} // товар корзины(потомок класса товар)
const list2 = {
    ProductsList: ProductItem, //Каталог:Товар каталога
    Cart: CartItem //Корзина:Товар корзины
        //То нужно для того чтобы выводить в render() все товары, каталога и корзины
}; //Что такое лист2? Это объект, у которого два элемента.
//1. Элемент содержит: название класса, отвечающего за список товаров каталога
//2. Элемент выступает в качестве значения класса, товара каталога
let cart = new Cart();
let products = new ProductsList(cart);
/*Если мы хотим использовать в классе
методы другого класса,то удобнее всего в конструктор передать объект класса, методы
которого нам нужны в данном классе
products.getJson(`getProducts.json`).then(data=> products.handleData(data));*/