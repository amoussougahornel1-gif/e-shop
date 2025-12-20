document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("formFeedback");
    const resetBtn = document.getElementById("resetBtn");

    // ⚠️ MET ICI LE NUMÉRO DU VENDEUR (format international sans +)
    const whatsappNumber = "2290146208980"; // Exemple : 22962541278

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // VALIDATION
        if (!name || !email || !message) {
            feedback.style.color = "red";
            feedback.textContent = "Veuillez remplir les champs obligatoires.";
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            feedback.style.color = "red";
            feedback.textContent = "Adresse email invalide.";
            return;
        }

        // MESSAGE POUR WHATSAPP
        const texte = 
`👤 Nom : ${name}
📧 Email : ${email}
📝 Sujet : ${subject || "Aucun"}

💬 Message :
${message}`;

        // URL WHATSAPP
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(texte)}`;

        // OUVRIR WHATSAPP
        window.open(url, "_blank");

        feedback.style.color = "#0b6";
        feedback.textContent = "Ouverture de WhatsApp...";
        form.reset();
    });

    resetBtn.addEventListener("click", () => {
        form.reset();
        feedback.textContent = "";
    });

});
