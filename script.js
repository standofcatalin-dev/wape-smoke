// ======= ДАННЫЕ ТОВАРОВ =======
const products = [
  { id: 1, name: "Strawberry Banana & Lemon Lime", category: "fruit", img: "img/vape-1.png", price: 35 },
  { id: 2, name: "Triple Cherry Bubblegum", category: "fruit", img: "img/vape-2.png", price: 35 },
  { id: 3, name: "Pina Colada & Love 66", category: "drink", img: "img/vape-3.png", price: 35 },
  { id: 4, name: "Lychee Ice Cheesecake", category: "dessert", img: "img/vape-4.png", price: 35 },
  { id: 5, name: "Watermelon Ice", category: "ice", img: "img/vape-5.png", price: 35 },
  { id: 6, name: "Monster Mango Ice", category: "ice", img: "img/vape-6.png", price: 35 },
  // ... добавь остальные 60 вкусов
];

const categoryNames = { fruit: "Фрукты", dessert: "Десерты", drink: "Напитки", ice: "Лед" };

// ======= РЕНДЕР ТОВАРОВ =======
const container = document.getElementById("products");

function renderProducts(list) {
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <div class="product-card" data-category="${p.category}">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="category">${categoryNames[p.category]}</p>
        <button class="buy-btn" onclick="addToCart(${p.id})">Купить — $${p.price}</button>
      </div>`;
  });
}
renderProducts(products);

// ======= ФИЛЬТРЫ =======
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.category;
    document.querySelectorAll(".product-card").forEach(card => {
      if (cat === "all" || card.dataset.category === cat) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ======= КОРЗИНА (localStorage) =======
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.reduce((s, i) => s + i.qty, 0);
}
updateCartCount();

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else {
    const p = products.find(x => x.id === id);
    cart.push({ ...p, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// ======= МОДАЛКА КОРЗИНЫ =======
const cartModal = document.getElementById("cartModal");
document.getElementById("cartBtn").onclick = () => {
  renderCart();
  cartModal.classList.add("open");
};
document.getElementById("closeCart").onclick = () => cartModal.classList.remove("open");

function renderCart() {
  const box = document.getElementById("cartItems");
  if (cart.length === 0) { box.innerHTML = "<p>Корзина пуста 😢</p>"; return; }
  box.innerHTML = cart.map(i =>
    `<div class="cart-item">
       <span>${i.name} × ${i.qty}</span>
       <span>$${i.price * i.qty}</span>
     </div>`).join("");
}

// ======= ОТПРАВКА ЗАКАЗА В TELEGRAM =======
const TG_BOT_TOKEN = "ТВОЙ_ТОКЕН_БОТА";   // получить у @BotFather
const TG_CHAT_ID = "ТВОЙ_CHAT_ID";         // узнать через @userinfobot

document.getElementById("checkoutBtn").onclick = async () => {
  if (cart.length === 0) return alert("Корзина пуста!");

  let text = "🛒 *НОВЫЙ ЗАКАЗ VapSolo*%0A%0A";
  let total = 0;
  cart.forEach(i => {
    text += `• ${i.name} × ${i.qty} — $${i.price * i.qty}%0A`;
    total += i.price * i.qty;
  });
  text += `%0A💰 *Итого: $${total}*`;

  const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&parse_mode=Markdown&text=${text}`;

  try {
    await fetch(url);
    alert("✅ Заказ отправлен! Мы свяжемся с вами.");
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount();
    cartModal.classList.remove("open");
  } catch (e) {
    alert("Ошибка отправки. Попробуйте ещё раз.");
  }
};
