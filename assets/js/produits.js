/* ------------------------------------------------------
   GESTION DYNAMIQUE DES PRODUITS
------------------------------------------------------ */

// Produits de base (tu peux laisser vide si tu veux commencer à 0)
const produitsData = [
    // Exemple (si tu veux remettre des produits par défaut, ajoute ici)
    // { id: 1, nom: "Casque Bluetooth", prix: 12500, img: "assets/img/p1.jpg", desc: "Casque bluetooth puissant." }
];

// Produits ajoutés par l'utilisateur
const storedProducts = JSON.parse(localStorage.getItem("produits") || "[]");

// Fusion propre (produits système + produits utilisateur)
const produits = [...produitsData, ...storedProducts];

/* ------------------------------------------------------
   FORMATAGE PRIX (12 500)
------------------------------------------------------ */
function formatPrix(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/* ------------------------------------------------------
   RENDRE DYNAMIQUEMENT LES PRODUITS
------------------------------------------------------ */
function renderProducts(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; // page ne contient pas ce conteneur

    container.innerHTML = "";

    if (produits.length === 0) {
        container.innerHTML = `<p class="no-product">Aucun produit disponible pour le moment.</p>`;
        return;
    }

    produits.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${p.img}" alt="${p.nom}">
            <h3>${p.nom}</h3>
            <p class="price">${formatPrix(p.prix)} FCFA</p>
            <button onclick="location.href='produit.html?id=${p.id}'">Voir</button>
        `;

        container.appendChild(card);
    });
}

/* ------------------------------------------------------
   RETOURNER PRODUIT PAR ID
------------------------------------------------------ */
function getProductById(id) {
    return produits.find(p => Number(p.id) === Number(id));
}

/* ------------------------------------------------------
   CHARGEMENT AUTOMATIQUE SUR LES PAGES
------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    renderProducts("liste-produits");      // liste page produits
    renderProducts("produits-vedette");    // page d'accueil
});
