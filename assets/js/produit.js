// Récupérer l'ID depuis l'URL
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

// Trouver le produit
const produit = produits.find(p => Number(p.id) === id);

if (!produit) {
    alert("Produit introuvable");
    window.location = "produits.html";
}

// Affichage
document.getElementById("prod-img").src = produit.img;
document.getElementById("prod-name").innerText = produit.nom;
document.getElementById("prod-desc").innerText =
    produit.description || "Aucune description disponible.";
document.getElementById("prod-price").innerText =
    produit.prix + " FCFA";

// Ajouter au panier
document.getElementById("btn-add").addEventListener("click", () => {

    let panier = JSON.parse(localStorage.getItem("panier")) || [];

    // Vérifier si le produit existe déjà
    const exist = panier.find(p => p.id === produit.id);

    if (exist) {
        exist.quantite += 1;
    } else {
        panier.push({
            id: produit.id,
            nom: produit.nom,
            prix: produit.prix,
            img: produit.img,
            quantite: 1
        });
    }

    localStorage.setItem("panier", JSON.stringify(panier));
    alert(`✔ ${produit.nom} ajouté au panier`);
});
