document.addEventListener("DOMContentLoaded", () => {

    const cart = JSON.parse(localStorage.getItem("panier") || "[]");
    const cartContainer = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");
    const orderBtn = document.getElementById("orderWhatsApp");

    const whatsappNumber = "0146208980"; // MET LE NUMÉRO DE LA VENDEUSE

    function formatPrix(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function renderCart() {
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = `<p class="empty">Votre panier est vide.</p>`;
            totalEl.textContent = "0";
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            total += item.prix * item.quantite;

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <img src="${item.img}" alt="">
                <div class="info">
                    <h3>${item.nom}</h3>
                    <p>${formatPrix(item.prix)} FCFA</p>
                    <p>Quantité : ${item.quantite}</p>
                </div>

                <button class="remove" onclick="removeItem(${index})">X</button>
            `;

            cartContainer.appendChild(div);
        });

        totalEl.textContent = formatPrix(total);
    }

    // Suppression d’un produit
    window.removeItem = (index) => {
        cart.splice(index, 1);
        localStorage.setItem("panier", JSON.stringify(cart));
        renderCart();
    };

    // Envoi WhatsApp
    orderBtn.addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Votre panier est vide.");
            return;
        }

        const name = prompt("Entrez votre nom complet pour finaliser la commande :");

        if (!name) {
            alert("Vous devez entrer votre nom.");
            return;
        }

        let message = `🛒 *Nouvelle commande E-SHOP*\n\n👤 *Client:* ${name}\n\n📦 *Articles:* \n`;

        cart.forEach(item => {
            message += `• ${item.nom} — ${item.quantite} x ${formatPrix(item.prix)} FCFA\n`;
        });

        message += `\n💰 *Total:* ${totalEl.textContent} FCFA\n\nMerci de confirmer la disponibilité.`;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    });

    renderCart();

});
