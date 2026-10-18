document.getElementById("checkoutBtn").onclick = () => {
  if (cart.length === 0) return alert("Корзина пуста!");
  let text = "🛒 Новый заказ VapSolo:\n\n";
  let total = 0;
  cart.forEach(i => {
    text += `• ${i.name} × ${i.qty} — $${i.price * i.qty}\n`;
    total += i.price * i.qty;
  });
  text += `\n💰 Итого: $${total}`;
  
  // Открывает Telegram с твоим ником и готовым текстом
  window.open(`https://t.me/ТВОЙ_НИК?text=${encodeURIComponent(text)}`, "_blank");
  
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  cartModal.classList.remove("open");
};
