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

document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let bookingName = document.getElementById("bookingName").value;
    let bookingEmail = document.getElementById("bookingEmail").value;
    let bookingDate = document.getElementById("bookingDate").value;

    if (bookingName && bookingEmail && bookingDate) {
        document.getElementById("bookingResponse").innerText = "Thank you, " + bookingName + "! Your session is booked for " + bookingDate + ".";
        
        // Send email
        sendBookingEmail(bookingName, bookingEmail, bookingDate);

        this.reset();
    } else {
        document.getElementById("bookingResponse").innerText = "Please fill out all fields.";
    }
});

function sendBookingEmail(name, email, date) {
    fetch('http://localhost:3000/send-booking-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, date })
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

document.getElementById("priceCalcForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let width = document.getElementById("width").value;
    let height = document.getElementById("height").value;
    let material = document.getElementById("material").value;

    if (width && height && material) {
        let area = width * height;
        let pricePerSquareInch;

        switch (material) {
            case "frontlit":
                pricePerSquareInch = 0.05;
                break;
            case "backlit":
                pricePerSquareInch = 0.07;
                break;
            case "vinyl":
                pricePerSquareInch = 0.06;
                break;
            default:
                pricePerSquareInch = 0;
        }

        let totalPrice = area * pricePerSquareInch;
        document.getElementById("priceResponse").innerText = "The estimated price is $" + totalPrice.toFixed(2);
        this.reset();
    } else {
        document.getElementById("priceResponse").innerText = "Please fill out all fields.";
    }
});
