document.addEventListener("DOMContentLoaded", () => {
    const factDisplay = document.getElementById("fact-display");
    const generateButton = document.getElementById("generate-button");
    
    
    async function fetchFacts() {
        const response = await fetch('./database.json'); 
        const data = await response.json();
        return data.RandomFacts;
    }

    
    function getRandomFact(facts) {
        const randomIndex = Math.floor(Math.random() * facts.length);
        return facts[randomIndex].fact;
    }

    
    async function displayRandomFact() {
        const facts = await fetchFacts();
        const randomFact = getRandomFact(facts);
        factDisplay.textContent = randomFact;
    }
    
    displayRandomFact();

    
    generateButton.addEventListener("click", displayRandomFact);

    
    function shareOnWhatsApp(fact) {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fact)}`;
        window.open(whatsappUrl, '_blank');
    }

    
    const shareButton = document.getElementById("share");
    shareButton.addEventListener("click", () => {
        const currentFact = factDisplay.textContent; 
        shareOnWhatsApp(currentFact); 
    });  

});
