document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name && email && message) {
        document.getElementById("formResponse").innerText = "Thank you, " + name + "! We'll get back to you soon.";
        this.reset();
    } else {
        document.getElementById("formResponse").innerText = "Please fill out all fields.";
    }
});
