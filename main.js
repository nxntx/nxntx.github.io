// Функція для створення читабельного URL з назви товару
function createSlug(name) {
    return name
        .toLowerCase()           // Перетворюємо на нижній регістр
        .replace(/\s+/g, '-')    // Замінюємо пробіли на тире
        .replace(/[^\w-]/g, ''); // Видаляємо спецсимволи (крім тире та літер/цифр)
}

// Далі йде ваш існуючий код renderProducts...

function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.isNew ? '<span class="product-badge">Новинка</span>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title"><a href="product.html?id=${product.id}">${product.name}</a></h3>
                <div class="product-price">${product.price.toLocaleString()} грн</div>
                <div class="product-meta">
                    <span>Код: ${product.code}</span>
                    <span class="availability ${product.available ? '' : 'unavailable'}">
                        ${product.available ? 'В наявності' : 'Під замовлення'}
                    </span>
                </div>
                  <div class="product-actions">
        <a href="product-${createSlug(product.name)}.html" class="btn btn-outline">Детальніше</a>
        <button class="btn btn-primary" onclick="addToCart(${product.id})">Купити</button>
    </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

const productsAPI = {
    getAllProducts: () => products,
    getProductById: (id) => products.find(p => p.id === id)
}
function createSlug(name) {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')  // Заміна пробілів на тире
        .replace(/[^\w-]/g, ''); // Видалення спецсимволів
}

// Використання:
productCard.innerHTML = `
    <a href="product-${createSlug(product.name)}.html">Детальніше</a>
`;