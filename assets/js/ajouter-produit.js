const form = document.getElementById("addForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let nom = document.getElementById("nom").value;
    let prix = parseInt(document.getElementById("prix").value);
    let description = document.getElementById("description").value;
    let imageFile = document.getElementById("image").files[0];

    // Lire l'image en Base64
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onload = function() {

        let produit = {
            id: Date.now(),
            nom: nom,
            prix: prix,
            description: description,
            img: reader.result
        };

        let produits = JSON.parse(localStorage.getItem("produits")) || [];
        produits.push(produit);

        localStorage.setItem("produits", JSON.stringify(produits));

        alert("✔ Produit ajouté avec succès !");
        window.location = "produits.html";
    };
});
