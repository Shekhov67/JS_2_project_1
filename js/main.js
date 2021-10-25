const products = [
    {id: 1, title: 'Notebook', price: 2000, image: 'img/notebook.jpg'},
    {id: 2, title: 'Mouse', price: 20, image: 'img/mouse.jpg'},
    {id: 3, title: 'Keyboard', price: 200, image: 'img/keyboard.jpg'},
    {id: 4, title: 'Gamepad', price: 50, image: 'img/gamepad.jpg'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <img src="${item.image}" alt="photo">
                <p>${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join(' ');
};

renderPage(products);