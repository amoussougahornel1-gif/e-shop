const form = document.getElementById("addForm");
const params = new URLSearchParams(window.location.search);
const editId = params.get("edit");

// 1. GESTION DU MODE ÉDITION (Pré-remplissage)
if (editId) {
    document.querySelector("h1").innerText = "Modifier le produit";
    let produits = JSON.parse(localStorage.getItem("produits") || "[]");
    let p = produits.find(item => item.id == editId);
    
    if (p) {
        document.getElementById("nom").value = p.nom;
        document.getElementById("prix").value = p.prix;
        document.getElementById("description").value = p.description;
        // L'image n'est plus obligatoire si on modifie (on garde l'ancienne sinon)
        document.getElementById("image").required = false;
    }
}

// 2. ÉCOUTEUR UNIQUE POUR LA SOUMISSION
form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    let produits = JSON.parse(localStorage.getItem("produits") || "[]");
    let nom = document.getElementById("nom").value;
    let prix = parseInt(document.getElementById("prix").value);
    let description = document.getElementById("description").value;
    let imageFile = document.getElementById("image").files[0];

    // Fonction interne pour sauvegarder les données
    const save = (imgData) => {
        if (editId) {
            // MODE MODIFICATION
            let index = produits.findIndex(item => item.id == editId);
            if (index !== -1) {
                produits[index].nom = nom;
                produits[index].prix = prix;
                produits[index].description = description;
                // On ne change l'image que si une nouvelle a été sélectionnée
                if (imgData) {
                    produits[index].img = imgData;
                }
            }
        } else {
            // MODE AJOUT CLASSIQUE
            let nouveauProduit = {
                id: Date.now(),
                nom: nom,
                prix: prix,
                description: description,
                img: imgData // Ici imgData ne sera jamais null car "required" est actif à l'ajout
            };
            produits.push(nouveauProduit);
        }

        localStorage.setItem("produits", JSON.stringify(produits));
        alert(editId ? "✔ Produit modifié !" : "✔ Produit ajouté !");
        window.location = "produits.html";
    };

    // GESTION DE L'IMAGE
    if (imageFile) {
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => save(reader.result);
    } else {
        // Si pas d'image et qu'on est en édition, on passe null (save gardera l'ancienne)
        save(null);
    }
});