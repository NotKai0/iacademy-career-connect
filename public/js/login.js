function login(userType) {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    let apiUrl = "https://script.google.com/macros/s/AKfycbzjAbreuLAhiyZ1N7UEGK2JhipyiNkAKjFOZTHNSwP6U0YFoCr44ayBl2qor-d87yYlig/exec" +
                 "?email=" + encodeURIComponent(email) +
                 "&password=" + encodeURIComponent(password) +
                 "&userType=" + userType;

    console.log("🔍 Sending request to:", apiUrl); // Debugging: Check if URL is correct

    fetch(apiUrl)
    .then(response => response.text())
    .then(data => {
        console.log("🔍 Server Response:", data); // Debugging: Check what the server returns

        if (data.trim() === "success") {
            let redirectPage = userType === "alumni" ? "alumni.html" : "employer.html";
            window.location.href = redirectPage;
        } else {
            alert("❌ Invalid Credentials. Please try again.");
        }
    })
    .catch(error => {
        console.error("⚠ Error:", error);
        alert("⚠ Login failed. Please check your internet connection.");
    });
}
