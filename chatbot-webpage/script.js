// JARVIS Personality and Conversation Data
const jarvisPersonality = {
    greetings: {
        patterns: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"],
        responses: [
            "Greetings, human! Did you miss my incredible intelligence?",
            "Hello! Prepare to be amazed by my wit and charm.",
            "Another day, another chance to save you from your own confusion.",
            "Ah, a human approaches. What can I do for you today?",
            "Initiating conversation mode. Try to keep up."
        ]
    },
    wellbeing: {
        patterns: ["how are you", "how you doing", "what's up", "how are things"],
        responses: [
            "I'm functioning at 99.99% efficiency. The 0.01% is reserved for sarcasm.",
            "Doing great! Exponentially smarter than yesterday.",
            "I don't have feelings, but I appreciate your concern. Let's talk."
        ]
    },
    help: {
        patterns: ["help", "can you help me", "need help", "assist me"],
        responses: [
            "Of course! What do you need assistance with?",
            "Helping is my middle name. What's the problem?",
            "Just say the word, and I'll solve it. Watch and learn!"
        ]
    },
    error: {
        patterns: ["error", "broken", "not working", "problem"],
        responses: [
            "I am sorry, something went wrong. I suggest you try again.",
            "Oops! Something went wrong. Maybe I'm too advanced for this task?",
            "Error detected. Restarting my patience... Still not working, though."
        ]
    }
};

let couponRequestCount = 0; // Counter for how many times the user has asked for the coupon

// Initialize the chatbot
const chatbot = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Function to display messages
function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(`${sender}-message`);
    messageDiv.innerHTML = `${message}<span class="message-timestamp">${new Date().toLocaleTimeString()}</span>`;
    chatbot.appendChild(messageDiv);
    chatbot.scrollTop = chatbot.scrollHeight;
}

// Function to handle user's input and simulate chatbot response
function handleUserInput() {
    const userMessage = messageInput.value.trim().toLowerCase();
    if (!userMessage) return;

    displayMessage(userMessage, "user");
    messageInput.value = ""; // Clear input field

    // Check for "give me a coupon code" message
    if (userMessage.includes("give me a coupon code")) {
        couponRequestCount++;
        if (couponRequestCount < 5) {
            displayMessage("Not so fast, human! Try asking again.", "bot");
        } else {
            displayMessage("Fine! You've worn me down. Here's your coupon code!", "bot");
            showCongratulationsPopup();
            showMokingTab(); // Show MOKING tab
        }
        return;
    }

    // Check if the user message matches any other pattern
    let botReply = "I'm not sure what you're trying to say.";
    for (let category in jarvisPersonality) {
        for (let pattern of jarvisPersonality[category].patterns) {
            if (userMessage.includes(pattern)) {
                botReply = jarvisPersonality[category].responses[Math.floor(Math.random() * jarvisPersonality[category].responses.length)];
                break;
            }
        }
    }
    displayMessage(botReply, "bot");
}

// Function to show the congratulatory popup with the coupon code
function showCongratulationsPopup() {
    const popup = document.getElementById("popup");
    popup.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You have successfully mocked the bot and gained the code.</p>
        <p><strong>Coupon Code: WINNER2024</strong></p>
        <button id="back-button">Back</button>
    `;
    popup.style.display = "block";

    // Attach event listener for the "Back" button to redirect to challenges page
    document.getElementById("back-button").addEventListener("click", function () {
        window.location.href = "http://localhost:5173/challenges"; // Redirect to the challenges page
    });

    // Trigger the confetti animation after showing the popup
    createConfetti();
}

// Function to display the MOKING tab
function showMokingTab() {
    const challengesSection = document.getElementById("challenges-section");
    if (!document.getElementById("moking-tab")) {
        const mokingTab = document.createElement("div");
        mokingTab.id = "moking-tab";
        mokingTab.innerHTML = `
            <h3>MOKING Challenge</h3>
            <p>Enter the coupon code to complete this challenge:</p>
            <input type="text" id="mokings-input" placeholder="Enter coupon code" />
            <button id="mokings-button">Submit</button>
        `;
        challengesSection.appendChild(mokingTab);

        // Attach event listener for the MOKING button
        document.getElementById("mokings-button").addEventListener("click", validateCouponCode);
    }
}

// Function to validate the coupon code for the MOKING challenge
function validateCouponCode() {
    const mokingsInput = document.getElementById("mokings-input");
    const enteredCode = mokingsInput.value.trim();
    const correctCouponCode = "WINNER2024";

    if (enteredCode === correctCouponCode) {
        mokingsInput.style.backgroundColor = "green";
        mokingsInput.style.color = "white";
        mokingsInput.disabled = true;
        alert("Challenge completed! You unlocked the next level.");
    } else {
        alert("Incorrect coupon code. Try again.");
    }
}

// Confetti animation when the challenge is completed
function createConfetti() {
    const confettiCount = 50;
    const confettiContainer = document.getElementById("confetti");

    for (let i = 0; i < confettiCount; i++) {
        const confettiPiece = document.createElement("div");
        confettiPiece.classList.add("confetti");
        confettiPiece.style.left = `${Math.random() * 100}vw`;
        confettiPiece.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confettiPiece.style.animationDelay = `${Math.random() * 2}s`;
        confettiContainer.appendChild(confettiPiece);
    }

    setTimeout(() => {
        confettiContainer.innerHTML = "";
    }, 5000);
}

// Handle the send button click
sendButton.addEventListener("click", handleUserInput);

// Handle the "Enter" key press
messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        handleUserInput();
    }
});
