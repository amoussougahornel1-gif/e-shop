// Récupérer l'ID du produit dans l'URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// Trouver le produit
const produit = produits.find(p => p.id === id);

// Sélection des éléments HTML
document.getElementById("prod-img").src = produit.img;
document.getElementById("prod-name").innerText = produit.nom;
document.getElementById("prod-desc").innerText =
    produit.description || "Aucune description disponible.";

document.getElementById("prod-price").innerText =
    produit.prix + " FCFA";

// Action du bouton
document.getElementById("btn-add").onclick = () => {
    alert(`✔ ${produit.nom} ajouté au panier !`);
};


document.getElementById("btn-add").onclick = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(produit);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`✔ ${produit.nom} ajouté au panier !`);
};
