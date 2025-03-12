document.addEventListener("DOMContentLoaded", function () { 
    loadProfile();
    loadFeed();
});

const API_URL = "https://script.google.com/macros/s/AKfycbwJTUYCp47JjCN52nRe_d8qzLwW0jpYEPaB7gxwqvbD_kUdbDxE-w7LT6ZIkpilpGFpgw/exec";  // Replace with your actual deployed URL

// Toggle between Feed & Profile tabs
function showTab(tab) {
    document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));
    document.querySelector(`#${tab}`).classList.add('active');
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    document.querySelector(`button[onclick="showTab('${tab}')"]`).classList.add('active');
}

// Logout function
function logout() {
    window.location.href = "index.html";
}

// Load profile details (mock data for now)
function loadProfile() {
    document.getElementById("profileName").textContent = "John Doe";
    document.getElementById("aboutMe").textContent = "A passionate software developer.";
    document.getElementById("skillsList").innerHTML = "<li>JavaScript</li><li>React</li><li>Node.js</li>";
    document.getElementById("portfolioLinks").innerHTML = "<li><a href='#'>My Website</a></li>";
}

// Load feed from Google Sheets
function loadFeed() {
    fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({ action: "getPosts" })  // Send as POST request
    })
    .then(response => response.json())  // Expect JSON directly
    .then(posts => {
        console.log("Parsed posts:", posts);  // Debugging parsed JSON

        let feed = document.getElementById("feedPosts");
        feed.innerHTML = ""; // Clear feed

        if (!Array.isArray(posts)) {
            console.error("Unexpected API response format:", posts);
            return;
        }

        posts.forEach(post => {
            let postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <p><strong>${post.email}</strong></p>
                <p>${post.content}</p>
                ${post.mediaUrl ? `<img src="${post.mediaUrl}" width="100%">` : ""}
                <button onclick="deletePost(${post.postId})">🗑️</button>
            `;
            feed.appendChild(postElement);
        });
    })
    .catch(error => console.error("Error loading feed:", error));
}

// Submit new post
function submitPost() {
    let content = document.getElementById("postText").value;
    let file = document.getElementById("postFile").files[0];

    if (!content && !file) {
        alert("Please write something or upload a file.");
        return;
    }

    let mediaUrl = file ? "https://drive.google.com/your-media-link" : "";  // Replace this with actual upload functionality

    fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({
            action: "createPost",
            email: "alumni1@email.com",  // Replace with logged-in user email
            content: content,
            mediaUrl: mediaUrl
        })
    }).then(response => response.text())
      .then(data => {
          if (data.trim() === "success") {
              alert("Post created!");
              loadFeed(); // Refresh feed
          }
      });
}

// Delete post
function deletePost(postId) {
    fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({ action: "deletePost", postId: postId })
    }).then(response => response.text())
      .then(data => {
          if (data.trim() === "success") {
              alert("Post deleted!");
              loadFeed();
          }
      });
}