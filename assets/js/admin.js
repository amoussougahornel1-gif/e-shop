// ---------------------------------------------------------
// CONFIG : Mot de passe administrateur
// ---------------------------------------------------------
const ADMIN_PASSWORD = "eshopAdmin2026";

// ---------------------------------------------------------
// Vérifier si l'utilisateur est admin
// ---------------------------------------------------------
function isAdmin() {
    return localStorage.getItem("admin") === "true";
}

// ---------------------------------------------------------
// Connexion administrateur
// ---------------------------------------------------------
function loginAdmin() {
    const pwd = prompt("Mot de passe administrateur :");

    if (pwd === null) return; // bouton annuler

    if (pwd.trim() === ADMIN_PASSWORD) {
        alert("Connexion réussie !");
        localStorage.setItem("admin", "true");
        location.reload();
    } else {
        alert("Mot de passe incorrect.");
    }
}

// ---------------------------------------------------------
// Déconnexion administrateur
// ---------------------------------------------------------
function logoutAdmin() {
    localStorage.removeItem("admin");
    alert("Déconnecté.");
    location.reload();
}

// ---------------------------------------------------------
// Afficher options admin à l'ouverture de la page
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const btnAdd = document.getElementById("btnAddProduct");
    const logoutLink = document.getElementById("logoutAdmin");

    if (isAdmin()) {
        if (btnAdd) btnAdd.style.display = "inline-block";
        if (logoutLink) logoutLink.style.display = "inline-block";
    }
});
