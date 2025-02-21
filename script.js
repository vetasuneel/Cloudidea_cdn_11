<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat with User Info</title>
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
    <script>
        (function () {
            // Inject CSS into the page
            const style = document.createElement('style');
            style.textContent = `
            * {
                box-sizing: border-box;
            }
                body{
                background: white;
                }
    
            .powered-by {
                text-align: center;
                font-size: 12px;
                color: #999;
                margin-top: 6px;
                padding-bottom: 4px;
                
            }
    
            .powered-by a {
                color: #75CC18;
                text-decoration: none;
                font-weight: bold;
            }
    
            .chat-icon-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                z-index: 1000;
            }
    
            .chat-icon-container .speech-bubble {
                background: #F7FDFF;
                color: black;
                padding: 14px 12px;
                border-radius: 12px;
                margin-bottom: 8px;
                font-size: 14px;
                max-width: 300px;
                text-align: left;
                position: relative;
                animation: fadeIn 0.5s ease-in-out forwards;
                opacity: 0;
            }
    

            .chat-icon-container .speech-bubble .close-speech {
                position: absolute;
                bottom: 38px;
                right: 5px;
                font-size: 23px;
                cursor: pointer;
                color: black;
            }
    
            @keyframes fadeIn {
                to {
                    opacity: 1;
                }
            }
    
            .chat-icon {
                background: #368CFE;
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 30px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
            }
    
            .chat-icon i {
                font-size: 28px;
                color: white;
                transition: transform 0.3s ease;
            }
    
            .chat-icon:hover {
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
            }
    
            .chat-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 380px;
                max-width: 90%;
                height: 550px;
                background-color: #ffffff;
                border-radius: 15px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                z-index: 1001;
                transform: translateY(100%);
                opacity: 0;
                transition: transform 0.4s ease, opacity 0.4s ease;
                visibility: hidden;
            }
    
            .chat-container.open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
    
            .chat-container.close {
                transform: translateY(100%);
                opacity: 0;
                visibility: hidden;
            }
    
            .chat-header {
                background-color: white;
                padding: 11px;
                color: black;
                border-radius: 15px 15px 0 0;
                font-weight: 600;
                font-size: 18px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                text-align: center;
                position: relative;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15)
            }
    
            .chat-header img {
                width: 150px;
                padding-top: 10px;
            }
    
            .chat-header .phone-number {
                position: absolute;
                left: 50%;
                top: 14px;
                transform: translateX(-50%);
                display: flex;
                align-items: center;
                gap: 5px;
                font-size: 16px;
                color: #956fd6;
            }
    
            .chat-header .phone-number i {
                font-size: 15px;
                color: black;
            }
    
            .chat-header .close-btn {
                font-size: 27px;
                cursor: pointer;
                color: #black;
            }
    
            .chat-box {
                flex-grow: 1;
                padding: 15px;
                overflow-y: auto;
                background-color: #fff;
                height: 300px;
            }
    
            .chat-input {
                display: flex;
                padding: 10px;
                background-color: #fff;
                border-top: 1px solid #ddd;
                border-radius: 0 0 15px 15px;
                box-shadow: #fff;
            }
    
            .chat-input input {
                flex: 1;
                border: none;
                padding: 10px;
                outline: none;
                font-size: 14px;
                border-radius: 20px;
                background-color: #fff;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
            }
    
            .chat-input button {
                background-color:#368CFE;
                color: #fff;
                border: none;
                padding: 10px 20px;
                margin-left: 10px;
                border-radius: 20px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                font-size: 14px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
    
            .chat-input button i {
                font-size: 16px;
            }
    
            .chat-input button:hover {
                 background-color: transparent;
    color: black;
    border: 1px solid #368CFE; /* Correct border syntax */
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            }
    
            .message {
                display: flex;
                align-items: flex-start;
                margin: 10px 0;
            }
    
            .message.user-message {
                justify-content: flex-end;
            }
    
            .message.ai-message {
                justify-content: flex-start;
            }
    
            .message-content {
                max-width: 75%;
                padding: 10px;
                font-size: 14px;
                line-height: 1.4;
                word-wrap: break-word;
                border-radius: 15px;
                position: relative;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
    
            .message.user-message .message-content {
                background: #368CFE;
                color: #fff;
                border-radius: 15px 15px 0 15px;
            }
    
            .message.ai-message .message-content {
                background-color: white;
                color: #333;
                border-radius: 15px 15px 15px 0;
            }
    
            .timestamp {
                font-size: 12px;
                color: #999;
                margin-top: 5px;
                text-align: right;
            }
    
            a {
                color: #0d6efd;
                text-decoration: none;
                font-size: 14px;
                word-break: break-all;
            }
    
            .predefined-inputs {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 10px;
            }
    
            .predefined-btn {
                background: #368CFE;
                color: #fff;
                padding: 10px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 14px;
                border: 1px solid transparent;
                transition: all 0.3s ease;
                text-align: left;
                width: fit-content;
                max-width: 80%;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                position: relative;
                overflow: hidden;
            }
    
            .predefined-btn::after {
                content: '';
                position: absolute;
                top: 0;
                left: -50px;
                width: 200%;
                height: 100%;
                background: #368CFE;
                color: black;
                transform: skewX(-45deg);
                transition: all 0.3s ease;
                opacity: 0;
            }
    
            .predefined-btn:hover::after {
                left: 100%;
                opacity: 0.3;
            }
    
            .predefined-btn:hover {
  background-color: transparent;
    color: black;
    border: 1px solid #368CFE; /* Correct border syntax */
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            }
    
            .typing-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 10px;
                margin-top: 8px;
            }
    
            .dot {
                height: 5px;
                width: 5px;
                margin: 0 5px;
                background-color: #956fd6;
                border-radius: 50%;
                display: inline-block;
                animation: dot-blink 1.5s infinite ease-in-out;
            }
    
            .dot:nth-child(1) {
                animation-delay: 0s;
            }
    
            .dot:nth-child(2) {
                animation-delay: 0.3s;
            }
    
            .dot:nth-child(3) {
                animation-delay: 0.6s;
            }
    
            @keyframes dot-blink {
                0%, 20% {
                    transform: scale(1);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.5);
                    opacity: 0.5;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
    
            /* Modal Styling */
            .modal {
                display: none;
                position: fixed;
                z-index: 1002;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
            }
    
            .modal-content {
                background-color: #fff;
                margin: 15% auto;
                padding: 20px;
                border: 1px solid #888;
                width: 80%;
                max-width: 400px;
                border-radius: 10px;
                position: relative;
            }
    
            .modal-content input {
                width: 100%;
                padding: 10px;
                margin: 10px 0;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
    
            .modal-content button {
                background-color: #368CFE;
                color: white;
                border: none;
                padding: 10px;
                width: 100%;
                cursor: pointer;
                border-radius: 5px;
            }
    
 .modal-content button:hover {
    background-color: transparent; /* Fully transparent */
    color: black;
    border: 1px solid #368CFE ; /* Correct border syntax */
}

    
            .close-modal {
                position: absolute;
                top: 10px;
                right: 20px;
                font-size: 20px;
                color: #888;
                cursor: pointer;
            }
    
            .close-modal:hover {
                color: #444;
            }

            /* Shatter (Banner) Styling */
.shatter {
    position: fixed;
    top: -60px;  /* Initially hidden */
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    background-color: #368CFE;
    color: #fff;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: top 0.5s ease-in-out;
    font-size: 14px;
    z-index: 2000;
}

.shatter i {
    margin-right: 10px;
    font-size: 18px;
}
            `;
            document.head.appendChild(style);

            // Inject HTML into the page
            const chatHTML = `

            <!-- Shatter (Banner) HTML -->
<div id="shatter" class="shatter">
    <i class="fas fa-phone-alt fa-flip-horizontal"></i>

    <div style="margin-right: 15px;">
        <strong>+1-123-456-7890</strong><br>
        Feel free to talk with our AI assistant.
    </div>
</div>

            <div class="chat-icon-container">
                <div class="speech-bubble">
                    Revolutionize Your Business with AI & Cloud Solutions Choose Cloudidea Today! 💡
                    <span class="close-speech">&times;</span>
                </div>
            <div class="chat-icon" id="chat-icon">
            <i class="fas fa-robot"></i> 
        </div>

            </div>
    
            <div class="chat-container" id="chat-container">
                <div class="chat-header">
                    <center><img src="https://cloudidea.vetaai.com/wp-content/uploads/2025/01/Cloud-Idea-1.webp" alt="Header Image"></center><br>
                    <span class="close-btn" id="close-btn">&times;</span>
                </div>
                <div id="chat-box" class="chat-box">
                <div class="predefined-inputs" id="predefined-inputs">
    <div class="predefined-btn" data-message="AI">
    <i class="fas fa-tags"></i> AI
</div>
<div class="predefined-btn" data-message="AI & Data Analytics">
    <i class="fas fa-handshake"></i> AI & Data Analytics
</div>
<div class="predefined-btn" data-message="Managed Services">
    <i class="fas fa-store"></i> Managed Services
</div>
<div class="predefined-btn" data-message="Cloud Platform">
    <i class="fas fa-shopping-bag"></i> Cloud Platform
</div>
<div class="predefined-btn" data-message="Migrate | Modernize">
    <i class="fas fa-tags"></i> Migrate | Modernize
</div>
</div>

                </div>
                <div class="chat-input">
                    <input type="text" id="user-input" placeholder=" Type your message...">
                    <button id="send-btn">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
<div class="powered-by mt-3">
powered by <a href="https://cloudidea.io/" style="color: #368CFE;">cloudidea</a>
</div>


            </div>
    
            <!-- Modal to get user details -->
<div id="user-info-modal" class="modal">
<div class="modal-content">
    <span class="close-modal">&times;</span> <!-- Close icon -->
    <h3>Please provide your details</h3>
    <input type="text" id="modal-name" placeholder="Enter your name" required>

    <!-- Phone Input with intl-tel-input -->
    <input type="tel" id="modal-phone" placeholder="Enter your phone number" required>
    
    <input type="email" id="modal-email" placeholder="Enter your email" required> <!-- New email field -->
    <button id="submit-user-info">Submit</button>
</div>
</div>


            `;
            document.body.insertAdjacentHTML('beforeend', chatHTML);

            let userName = '';
            let userPhone = '';
            let firstMessage = '';

            // JavaScript functionality for chat and modal
            document.addEventListener('DOMContentLoaded', function () {
                const chatIcon = document.getElementById('chat-icon');
                const chatContainer = document.getElementById('chat-container');
                const closeBtn = document.getElementById('close-btn');
                const sendBtn = document.getElementById('send-btn');
                const userInput = document.getElementById('user-input');
                const chatBox = document.getElementById('chat-box');
                const closeSpeechBtn = document.querySelector('.close-speech');
                const speechBubble = document.querySelector('.speech-bubble');
                const modal = document.getElementById('user-info-modal');
                const submitUserInfoBtn = document.getElementById('submit-user-info');
                const modalName = document.getElementById('modal-name');
                const modalPhone = document.getElementById('modal-phone');
                const closeModal = document.querySelector('.close-modal');

                chatIcon.addEventListener('click', function () {
                    if (chatContainer.classList.contains('open')) {
                        chatContainer.classList.remove('open');
                        chatContainer.classList.add('close');
                        shatter.style.top = '-60px';  // Hide shatter when chat is closed
                    } else {
                        chatContainer.classList.remove('close');
                        chatContainer.classList.add('open');
                        setTimeout(function () {
                            shatter.style.top = '10px';  // Show the shatter when chat opens
                        }, 300);  // Delay to avoid immediate appearance
                    }
                });


                closeBtn.addEventListener('click', function () {
                    chatContainer.classList.remove('open');
                    chatContainer.classList.add('close');
                });

                closeSpeechBtn.addEventListener('click', function () {
                    speechBubble.style.display = 'none';
                });

                sendBtn.addEventListener('click', function () {
                    handleUserMessage(userInput.value.trim());
                });

                userInput.addEventListener('keypress', function (e) {
                    if (e.which === 13) {
                        e.preventDefault(); // Prevent the form from submitting
                        handleUserMessage(userInput.value.trim());
                    }
                });

                document.querySelectorAll('.predefined-btn').forEach(function (button) {
                    button.addEventListener('click', function () {
                        const message = this.getAttribute('data-message');
                        handleUserMessage(message);
                    });
                });

                // Close modal when clicking the close icon
                closeModal.addEventListener('click', function () {
                    modal.style.display = 'none';
                });

                submitUserInfoBtn.addEventListener('click', function () {
    // Capture the name, phone number, and email
    const name = modalName.value.trim();
    const phone = modalPhone.value.trim();
    const email = document.getElementById('modal-email').value.trim(); // Capture email

    if (name !== '' && phone !== '' && email !== '') {
        userName = name;  // Save the user name
        userPhone = phone;
        modal.style.display = 'none'; // Close the modal
        // Save the user info including email
        saveUserInfo(userName, userPhone, email);
    } else {
        alert('Please fill out all fields (name, phone, and email)');
    }
});

                function handleUserMessage(message) {
                    if (message === "") return;
                    firstMessage = message;

                    // Check if the user has provided name and phone
                    if (!userName || !userPhone) {
                        // Show modal if name and phone are not provided
                        modal.style.display = 'block';
                    } else {
                        sendMessage(message);
                    }
                }

                function saveUserInfo(name, phone, email) {
    fetch('https://670e49e1073307b4ee463c70.mockapi.io/czit_leads', {  // Replace with your Flask route to save lead
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, phone_number: phone, email: email })  // Send email too
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Continue with the first message, now userName is available for personalization
        sendMessage(firstMessage);
    })
    .catch(error => {
        console.error("Error saving user info:", error);
    });
}


document.addEventListener('DOMContentLoaded', function () {
const phoneInputField = document.querySelector("#modal-phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "auto",  // Automatically select the user's country
    geoIpLookup: function(callback) {
        fetch('https://ipinfo.io/json')
            .then(response => response.json())
            .then(data => callback(data.country))
            .catch(() => callback("US"));  // Default to US if geolocation fails
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // For formatting the number
});

// Function to submit the form with full phone number
submitUserInfoBtn.addEventListener('click', function () {
    const name = modalName.value.trim();
    const phone = phoneInput.getNumber(); // Get full phone number with country code
    const email = document.getElementById('modal-email').value.trim();

    if (name !== '' && phone !== '' && email !== '') {
        userName = name;
        userPhone = phone;  // Full phone number with country code
        modal.style.display = 'none';
        saveUserInfo(userName, userPhone, email);
    } else {
        alert('Please fill out all fields (name, phone, and email)');
    }
});
});


function sendMessage(message) {
    if (message === "") return;

    userInput.value = '';

    appendMessage('user', message);

    // Show typing indicator
    showTypingIndicator();

    console.log("Sending message:", message);

    // Make an AJAX request to the server using Fetch API
    fetch('https://chat.vetaai.com/chat', {  // Replace with your Flask route for chat
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: userName, phone: userPhone, message: message })  // Include the user's name in the chat request
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Received response:", data);
        // Hide typing indicator
        hideTypingIndicator();

        // Check if the response contains a URL and format it as a link
        let responseText = data.response;
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        responseText = responseText.replace(urlRegex, function (url) {
            return `<a href="${url}" target="_blank">${url}</a>`;
        });

        appendMessage('ai', responseText);
        scrollToBottom();
    })
    .catch(error => {
        console.error("Error during AJAX request:", error);
        // Hide typing indicator
        hideTypingIndicator();
        appendMessage('ai', 'Sorry, something went wrong. Please try again later.');
        scrollToBottom();
    });
}


                function appendMessage(sender, content) {
                    const messageClass = sender === 'user' ? 'user-message' : 'ai-message';
                    const timestamp = new Date().toLocaleString();

                    const messageHTML = `
                    <div class="message ${messageClass}">
                        <div class="message-content">
                            ${content}
                            ${sender === 'ai' ? `<div class="timestamp">${timestamp}</div>` : ''}
                        </div>
                    </div>
                `;
                    chatBox.insertAdjacentHTML('beforeend', messageHTML);

                    scrollToBottom();
                }

                function scrollToBottom() {
                    chatBox.scrollTop = chatBox.scrollHeight;
                }

                function showTypingIndicator() {
                    const typingIndicatorHTML = `
                    <div id="typing-indicator" class="message ai-message">
                        <div class="message-content">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>
                `;
                    chatBox.insertAdjacentHTML('beforeend', typingIndicatorHTML);
                    scrollToBottom();
                }



                closeBtn.addEventListener('click', function () {
                    chatContainer.classList.remove('open');
                    chatContainer.classList.add('close');
                    shatter.style.top = '-60px';  // Hide the shatter when the chat is closed
                });

                

                function hideTypingIndicator() {
                    const typingIndicator = document.getElementById('typing-indicator');
                    if (typingIndicator) {
                        typingIndicator.remove();
                    }
                }
            });
        })();
    </script>
</body>
</html>
