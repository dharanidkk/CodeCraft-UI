const menuItems = [
  { name: "Classic Glaze", description: "Soft, pillowy, sweet glaze", price: "₹99", emoji: "🍯" },
  { name: "Choco Dream", description: "Rich chocolate ganache", price: "₹129", emoji: "🍫" },
  { name: "Berry Blast", description: "Fresh berry compote topping", price: "₹139", emoji: "🫐" },
  { name: "Salted Caramel", description: "Caramel with sea salt crunch", price: "₹149", emoji: "🍮" },
  { name: "Matcha & White", description: "Matcha frosting with white chocolate", price: "₹159", emoji: "🍵" },
  { name: "Kinder Crunch", description: "Crispy bits & chocolate drizzle", price: "₹169", emoji: "🍫" }
];

function renderMenu() {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = '';
  menuItems.forEach(it=>{
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.innerHTML = `
      <div class="menu-emoji">${it.emoji}</div>
      <div style="flex:1">
        <div style="font-weight:700">${it.name}</div>
        <div style="font-size:13px;color:#64748b">${it.description}</div>
      </div>
      <div style="font-weight:700">${it.price}</div>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderMenu();
  document.getElementById('year').textContent = new Date().getFullYear();

  // Order form behaviour: submit via fetch to server.php and show message
  const form = document.getElementById('orderForm');
  const msg = document.getElementById('formMessage');

  form.addEventListener('submit', async (ev)=>{
    ev.preventDefault();
    msg.textContent = 'Sending…';
    const data = new FormData(form);
    try{
      const res = await fetch(form.action, { method: 'POST', body: data });
      const json = await res.json();
      if(json.success){
        msg.style.color = 'green';
        msg.textContent = json.message || 'Order received! We will contact you soon.';
        form.reset();
      } else {
        msg.style.color = 'crimson';
        msg.textContent = json.message || 'Failed to send order.';
      }
    }catch(e){
      msg.style.color = 'crimson';
      msg.textContent = 'Network error. Try again.';
    }
  });

  document.getElementById('resetBtn').addEventListener('click', ()=>{
    form.reset();
  });

  // Two small hero buttons hook-ups
  document.getElementById('heroOrder').addEventListener('click', ()=>document.getElementById('name').focus());
  document.getElementById('orderNowBtn')?.addEventListener('click', ()=>document.getElementById('name').focus());

  // Show fallback image text if image not found
  const heroImage = document.getElementById('heroImage');
  heroImage.addEventListener('error', ()=>{
    heroImage.src = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\"><rect width=\"100%\" height=\"100%\" fill=\"#fff1f2\"/><text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\" fill=\"#ef4444\" font-size=\"20\">Replace with hero image</text></svg>';
  });
});
