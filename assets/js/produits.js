/* ------------------------------------------------------
   1. GESTION DES DONNÉES
------------------------------------------------------ */

// On commence avec une liste vide (plus de produits forcés)
const produitsData = [];

// On récupère uniquement les produits ajoutés via le formulaire admin
const storedProducts = JSON.parse(localStorage.getItem("produits") || "[]");

// Fusion (qui contiendra uniquement tes produits ajoutés)
const produits = [...produitsData, ...storedProducts];

/* ------------------------------------------------------
   2. UTILITAIRES
------------------------------------------------------ */
function formatPrix(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/* ------------------------------------------------------
   3. RENDRE DYNAMIQUEMENT LES PRODUITS
------------------------------------------------------ */
function renderProducts(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; 

    container.innerHTML = "";

    // Si aucun produit n'a été ajouté par l'admin
    if (produits.length === 0) {
        container.innerHTML = `<p class="no-product">Aucun produit disponible pour le moment.</p>`;
        return;
    }

    // Vérifier si le mode admin est activé
    const isAdmin = localStorage.getItem("admin") === "true";

    produits.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";

        // Boutons admin (Edit / Delete)
        let adminButtons = "";
        if (isAdmin) {
            adminButtons = `
                <div class="admin-actions" style="display: flex; justify-content: flex-end; gap: 5px; padding: 5px;">
                    <button class="btn-edit" onclick="editProduct(${p.id})" style="background:#3498db; color:#fff; border:none; cursor:pointer; padding:5px 8px; border-radius:3px;"><i class="fa fa-edit"></i></button>
                    <button class="btn-delete" onclick="deleteProduct(${p.id})" style="background:#e74c3c; color:#fff; border:none; cursor:pointer; padding:5px 8px; border-radius:3px;"><i class="fa fa-trash"></i></button>
                </div>
            `;
        }

        card.innerHTML = `
            ${adminButtons}
            <img src="${p.img}" alt="${p.nom}">
            <h3>${p.nom}</h3>
            <p class="price">${formatPrix(p.prix)} FCFA</p>
            <button onclick="location.href='produit.html?id=${p.id}'">Voir</button>
        `;

        container.appendChild(card);
    });
}

/* ------------------------------------------------------
   4. FONCTIONS ADMIN
------------------------------------------------------ */

// SUPPRIMER
window.deleteProduct = function(id) {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
        let stored = JSON.parse(localStorage.getItem("produits") || "[]");
        // On garde tout sauf celui qui a cet ID
        let nouvelleListe = stored.filter(p => p.id !== id);
        
        localStorage.setItem("produits", JSON.stringify(nouvelleListe));
        location.reload(); 
    }
};

// MODIFIER
window.editProduct = function(id) {
    window.location.href = `ajouter-produit.html?edit=${id}`;
};

/* ------------------------------------------------------
   5. CHARGEMENT
------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    renderProducts("liste-produits");
    renderProducts("produits-vedette");
});