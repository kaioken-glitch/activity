document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.onclick = simulateLogin;
    }

    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const videoResults = document.getElementById('videoResults');
    const videoPlayer = document.getElementById('videoPlayer');
    const youtubePlayer = document.getElementById('youtubePlayer');
    const viewerCount = document.getElementById('viewerCount');

    const sendMessageButton = document.getElementById('sendMessageButton');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    let viewers = 0;
    let moderators = [];
    let watchTogetherOwner = 'user1'; // Assuming 'user1' is the owner for demo purposes
    let users = ['user1', 'user2', 'user3', 'user4']; // Example users

    function simulateLogin() {
        const predefinedEmail = 'testuser@yahoo.com';
        const predefinedPassword = 'password123'; // You can change this to a random password for testing

        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        if (!emailInput || !passwordInput) {
            console.error('Email or Password input not found.');
            return;
        }

        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;

        if (emailValue === predefinedEmail && passwordValue === predefinedPassword) {
            window.location.href = '/Pub/views/index.html'; // Use relative path
        } else {
            alert('Invalid email or password. Please try again.');
        }
    }

    function updateViewerCount() {
        viewerCount.textContent = viewers;
    }

    function addViewer() {
        viewers++;
        updateViewerCount();
    }

    function removeViewer() {
        if (viewers > 0) {
            viewers--;
            updateViewerCount();
        }
    }

    function clearVideoResults() {
        videoResults.innerHTML = '';
    }

    async function searchYouTube() {
        const query = searchInput.value.trim();
        if (query) {
            try {
                const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=AIzaSyC9eS5NiRdDlu2Na_t_xsADIkokRi-0cOI`);
                const data = await response.json();
                if (data.items) {
                    displayResults(data.items);
                } else {
                    console.error('No items found in response:', data);
                }
            } catch (error) {
                console.error('Error fetching YouTube data:', error);
            }
        }
    }

    function displayResults(videos) {
        videoResults.style.display = 'block'; // Show the videoResults div
        videoResults.innerHTML = ''; // Clear previous results
    
        videos.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.textContent = video.snippet.title;
    
            videoElement.addEventListener('click', () => {
                loadVideo(video.id.videoId); // Load the clicked video
                addViewer(); // Add a viewer when a video is loaded
                hideVideoResults(); // Hide video results after loading a video
            });
    
            videoResults.appendChild(videoElement);
        });
    }
    
    function hideVideoResults() {
        videoResults.style.display = 'none'; // Hide the videoResults div
    }
    

    function loadVideo(videoId) {
        videoPlayer.style.display = 'block';
        youtubePlayer.src = `https://www.youtube.com/embed/${videoId}`;
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
        }
    }

    function addModerator(username) {
        if (!moderators.includes(username)) {
            moderators.push(username);
            console.log(`${username} has been added as a moderator.`);
        }
    }

    function removeModerator(username) {
        const index = moderators.indexOf(username);
        if (index > -1) {
            moderators.splice(index, 1);
            console.log(`${username} has been removed as a moderator.`);
        }
    }

    // Function to show the popup
    function showWatchTogetherPopup() {
        const popup = document.getElementById('watchTogetherPopup');
        const closePopup = document.getElementById('closePopup');
        const startWatchTogether = document.getElementById('startWatchTogether');
        const moderatorsSelect = document.getElementById('moderatorsSelect');

        // Populate the moderators select options
        users.forEach(user => {
            if (user !== watchTogetherOwner) { // Exclude the owner from the moderators list
                const option = document.createElement('option');
                option.value = user;
                option.textContent = user;
                moderatorsSelect.appendChild(option);
            }
        });

        popup.style.display = 'block';

        closePopup.onclick = function() {
            popup.style.display = 'none';
        };

        window.onclick = function(event) {
            if (event.target == popup) {
                popup.style.display = 'none';
            }
        };

        startWatchTogether.onclick = function() {
            const title = document.getElementById('activityTitle').value;
            const description = document.getElementById('activityDescription').value;
            const selectedModerators = Array.from(moderatorsSelect.selectedOptions).map(option => option.value);

            // Display the description in the .descp div
            const descpDiv = document.querySelector('.descp');
            descpDiv.textContent = description;

            document.getElementById('watchTitle').textContent = title;

            // You can add more logic to use the title, description, and selected moderators
            console.log('Title:', title);
            console.log('Description:', description);
            console.log('Selected Moderators:', selectedModerators);

            // Close the popup
            popup.style.display = 'none';
        };
    }

    // Example: Showing the popup when the page loads
    showWatchTogetherPopup();

    // Example: Adding and removing moderators
    addModerator('user1');
    removeModerator('user1');

    // Update the viewer count periodically (for demonstration)
    setInterval(() => {
        updateViewerCount();
    }, 1000);

    if (searchButton && searchInput && videoResults && videoPlayer && youtubePlayer) {
        searchButton.addEventListener('click', searchYouTube);
    }

    if (sendMessageButton && chatInput && chatMessages) {
        sendMessageButton.addEventListener('click', sendMessage);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const logoDiv = document.querySelector('.logo');

    if (logoDiv) {
        logoDiv.addEventListener('click', function() {
            window.location.href = '/Pub/views/index.html';
        });
    }
});


function addAmbientLight() {
    const videoPlayer = document.getElementById('videoPlayer');

    if (videoPlayer) {
        const ambientLight = document.createElement('div');
        ambientLight.id = 'ambientLight';
        videoPlayer.appendChild(ambientLight);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const descriptionDiv = document.getElementById('description');

    if (descriptionDiv) {
        descriptionDiv.addEventListener('input', function() {
            highlightLinks(descriptionDiv);
        });
    }

    function highlightLinks(container) {
        const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        let htmlContent = container.innerHTML;
        
        htmlContent = htmlContent.replace(urlPattern, function(url) {
            return `<a href="${url}" target="_blank">${url}</a>`;
        });
        
        container.innerHTML = htmlContent;
    }
});




document.addEventListener('DOMContentLoaded', function() {
    // Open the popup when the page loads (or you can tie this to a specific event)
    openChatroomPopup();

    document.getElementById('createChatroomButton').onclick = createChatroom;
});

function openChatroomPopup() {
    document.getElementById('chatroomPopup').style.display = 'block';
}

function createChatroom() {
    const chatroomImage = document.getElementById('chatroomImage').files[0];
    const chatroomTitle = document.getElementById('chatroomTitle').value;
    const chatroomDescription = document.getElementById('chatroomDescription').value;

    if (!chatroomImage || !chatroomTitle || !chatroomDescription) {
        alert('Please fill in all fields');
        return;
    }

    // Create a new div element for the chatroom
    const chatroomElement = document.createElement('div');
    chatroomElement.className = 'minr';

    // Set the inner HTML of the chatroom element
    chatroomElement.innerHTML = `
        <div class="min">
            <img src="${URL.createObjectURL(chatroomImage)}" alt="Chatroom Image">
        </div>
        <p id="chatTitle">${chatroomTitle}</p>
    `;

    // Append the new chatroom element to the mostActive div
    document.querySelector('.mostActive').appendChild(chatroomElement);

    // Close the popup
    document.getElementById('chatroomPopup').style.display = 'none';
}



document.addEventListener('DOMContentLoaded', function() {
    // Open the popup when the page loads (or you can tie this to a specific event)
    openChatroomPopup();

    document.getElementById('createChatroomButton').onclick = createChatroom;
    setupChatroomClickEvent();
});

function openChatroomPopup() {
    document.getElementById('chatroomPopup').style.display = 'block';
}

function createChatroom() {
    const chatroomImage = document.getElementById('chatroomImage').files[0];
    const chatroomTitle = document.getElementById('chatroomTitle').value;
    const chatroomDescription = document.getElementById('chatroomDescription').value;

    if (!chatroomImage || !chatroomTitle || !chatroomDescription) {
        alert('Please fill in all fields');
        return;
    }

    // Create a new div element for the chatroom
    const chatroomElement = document.createElement('div');
    chatroomElement.className = 'minr';

    // Set the inner HTML of the chatroom element
    chatroomElement.innerHTML = `
        <div class="min">
            <img src="${URL.createObjectURL(chatroomImage)}" alt="Chatroom Image">
        </div>
        <p id="chatTitle">${chatroomTitle}</p>
    `;

    // Append the new chatroom element to the mostActive div
    document.querySelector('.mostActive').appendChild(chatroomElement);

    // Add event listener for the newly created chatroom
    chatroomElement.addEventListener('click', displayChatDetails);

    // Close the popup
    document.getElementById('chatroomPopup').style.display = 'none';
}

function displayChatDetails(event) {
    // Get the clicked chatroom element
    const chatroomElement = event.currentTarget;

    // Extract the image and title from the chatroom element
    const chatImageSrc = chatroomElement.querySelector('img').src;
    const chatTitle = chatroomElement.querySelector('p#chatTitle').textContent;

    // Set the extracted image and title to the top and chatImage divs
    document.querySelector('.top p').textContent = chatTitle;
    const chatImageDiv = document.querySelector('.top .chatImage');
    if (chatImageDiv) {
        chatImageDiv.style.backgroundImage = `url(${chatImageSrc})`;
    } else {
        const newChatImageDiv = document.createElement('div');
        newChatImageDiv.className = 'chatImage';
        newChatImageDiv.style.backgroundImage = `url(${chatImageSrc})`;
        document.querySelector('.top').prepend(newChatImageDiv);
    }
}

function setupChatroomClickEvent() {
    const chatrooms = document.querySelectorAll('.minr');
    chatrooms.forEach(chatroom => {
        chatroom.addEventListener('click', displayChatDetails);
    });
}



document.addEventListener('DOMContentLoaded', function() {
    // Set up the event listener for the paper plane icon
    const sendMessageIcon = document.querySelector('.divide .fa-paper-plane');
    const messageInput = document.querySelector('.divide input[type="text"]');
    const chatsDiv = document.querySelector('.chats');

    if (sendMessageIcon && messageInput && chatsDiv) {
        sendMessageIcon.addEventListener('click', function() {
            sendMessage();
        });

        // Optionally, you can send the message when the Enter key is pressed
        messageInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messageElement.className = 'chat-message'; // Add a class for styling if needed

            // Append the message to the chats div
            chatsDiv.appendChild(messageElement);

            // Clear the input field
            messageInput.value = '';

            // Scroll to the bottom of the chats div
            chatsDiv.scrollTop = chatsDiv.scrollHeight;
        }
    }
});





document.addEventListener('DOMContentLoaded', function() {
    const createChatroomButton = document.getElementById('createChatroomButton');

    createChatroomButton.addEventListener('click', function() {
        const chatroomDescription = document.getElementById('chatroomDescription').value;
        displayDescription(chatroomDescription);
        closePopup();
    });

    // Function to display the description in the tp div
    function displayDescription(description) {
        const descriptionElement = document.getElementById('description');
        if (descriptionElement) {
            descriptionElement.textContent = description;
        } else {
            console.error('Description element not found.');
        }
    }

    // Function to close the popup (you can implement your own logic here)
    function closePopup() {
        const chatroomPopup = document.getElementById('chatroomPopup');
        chatroomPopup.style.display = 'none'; // Hide the popup
    }

    // Function to show the popup (you can call this function when needed)
    function showPopup() {
        const chatroomPopup = document.getElementById('chatroomPopup');
        chatroomPopup.style.display = 'block'; // Show the popup
    }

    // For demonstration, let's show the popup when the page loads
    showPopup();
});


document.addEventListener('DOMContentLoaded', function() {
    let totalMembers = 0;
    let activeMembers = 0;

    // Example: Simulate members joining and leaving
    setTimeout(() => {
        addMember();
        addMember();
        setActiveMemberStatus(1, true);  // Set second member as active
    }, 1000);

    setTimeout(() => {
        setActiveMemberStatus(1, false); // Set second member as inactive
    }, 5000);

    // Function to add a new member
    function addMember() {
        totalMembers++;
        updateCounter();
    }

    // Function to set member active status
    function setActiveMemberStatus(memberId, isActive) {
        if (isActive) {
            activeMembers++;
        } else {
            activeMembers--;
        }
        updateCounter();
    }

    // Function to update the counter
    function updateCounter() {
        const counterElement = document.getElementById('counter');
        if (counterElement) {
            counterElement.textContent = `${activeMembers}/${totalMembers}`;
        } else {
            console.error('Counter element not found.');
        }
    }

    // Example: Adding a member
    function simulateAddingMembers() {
        addMember();
        setActiveMemberStatus(totalMembers - 1, true); // Set the latest member as active
    }

    // Example: Removing a member
    function simulateRemovingMembers() {
        if (totalMembers > 0) {
            setActiveMemberStatus(totalMembers - 1, false); // Set the latest member as inactive
            totalMembers--;
            updateCounter();
        }
    }

    // You can call simulateAddingMembers and simulateRemovingMembers to test the functionality
});

