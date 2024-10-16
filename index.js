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

    const commentInput = document.getElementById("comment");
    const commentsSection = document.getElementById("comments");
    const form = document.querySelector(".form");

    
    function addComment(commentText) {
        
        const commentContainer = document.createElement("div");
        commentContainer.classList.add("comment-container");

        
        const commentParagraph = document.createElement("p");
        commentParagraph.textContent = commentText;

        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        deleteButton.classList.add("delete-button");
        
        commentContainer.appendChild(commentParagraph);
        commentParagraph.appendChild(deleteButton);
        
        commentsSection.appendChild(commentContainer);
        
        commentInput.value = '';
        
        deleteButton.addEventListener("click", () => {
            commentContainer.remove();
        });
    }

    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const comment = commentInput.value.trim(); 
        if (comment) {
            addComment(comment); 
        }
    });
    

    const likeButton = document.getElementById("like");
    const dislikeButton = document.getElementById("dislike");

    likeButton.addEventListener("click", () => {
        if (likeButton.style.color === "blue") {            
            likeButton.style.color = "black";
        } else {            
            dislikeButton.style.color = "black";            
            likeButton.style.color = "blue";
        }
    });

    dislikeButton.addEventListener("click", () => {
        if (dislikeButton.style.color === "red") {            
            dislikeButton.style.color = "black";
        } else {
            
            likeButton.style.color = "black";            
            dislikeButton.style.color = "red";
        }
    });

});
