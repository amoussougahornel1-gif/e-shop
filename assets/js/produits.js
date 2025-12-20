/* ------------------------------------------------------
   1. GESTION DES DONNÉES
------------------------------------------------------ */
const produitsData = []; // Tes produits "en dur" si tu en ajoutes plus tard
const storedProducts = JSON.parse(localStorage.getItem("produits") || "[]");
const produits = [...produitsData, ...storedProducts];

/* ------------------------------------------------------
   2. UTILITAIRES
------------------------------------------------------ */
function formatPrix(n) {
    if (!n) return "0";
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/* ------------------------------------------------------
   3. RENDRE DYNAMIQUEMENT LES PRODUITS
------------------------------------------------------ */
function renderProducts(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; 

    container.innerHTML = "";

    if (produits.length === 0) {
        container.innerHTML = `<p class="no-product">Aucun produit disponible pour le moment.</p>`;
        return;
    }

    // Vérification du mode admin (clé "admin" doit être à "true")
    const isAdminMode = localStorage.getItem("admin") === "true";

    produits.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";

        // Génération des boutons Admin si connecté
        let adminButtons = "";
        if (isAdminMode) {
            adminButtons = `
                <div class="admin-actions" style="display: flex; justify-content: flex-end; gap: 8px; padding: 10px; background: rgba(255,255,255,0.9); border-bottom: 1px solid #eee;">
                    <button class="btn-edit" onclick="editProduct(${p.id})" style="background:#3498db; color:#fff; border:none; cursor:pointer; padding:8px 12px; border-radius:4px; font-size: 14px;">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteProduct(${p.id})" style="background:#e74c3c; color:#fff; border:none; cursor:pointer; padding:8px 12px; border-radius:4px; font-size: 14px;">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            `;
        }

        card.innerHTML = `
            ${adminButtons}
            <div class="product-img-container" style="position:relative;">
                <img src="${p.img}" alt="${p.nom}" style="width:100%; display:block;">
            </div>
            <div class="product-info" style="padding:15px;">
                <h3 style="margin-bottom:10px;">${p.nom}</h3>
                <p class="price" style="color:#2ecc71; font-weight:bold; margin-bottom:15px;">${formatPrix(p.prix)} FCFA</p>
                <button class="view-btn" onclick="location.href='produit.html?id=${p.id}'" style="width:100%; padding:10px; cursor:pointer; background:#333; color:#fff; border:none; border-radius:4px;">Voir le produit</button>
            </div>
        `;

        container.appendChild(card);
    });
}

/* ------------------------------------------------------
   4. FONCTIONS ADMIN (GLOBALES)
------------------------------------------------------ */

// SUPPRIMER UN PRODUIT
window.deleteProduct = function(id) {
    if (confirm("⚠️ Supprimer ce produit définitivement ?")) {
        let stored = JSON.parse(localStorage.getItem("produits") || "[]");
        let nouvelleListe = stored.filter(item => item.id !== id);
        
        localStorage.setItem("produits", JSON.stringify(nouvelleListe));
        alert("Produit supprimé avec succès.");
        location.reload(); 
    }
};

// MODIFIER UN PRODUIT
window.editProduct = function(id) {
    // Redirection vers la page d'ajout avec l'ID en paramètre
    window.location.href = `ajouter-produit.html?edit=${id}`;
};

/* ------------------------------------------------------
   5. INITIALISATION AU CHARGEMENT
------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    renderProducts("liste-produits");   // Page produits.html
    renderProducts("produits-vedette"); // Page index.html
});