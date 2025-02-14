document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name && email && message) {
        document.getElementById("formResponse").innerHTML = `<span class="success-message">Thank you, ${name}! We have received your message and will get back to you at ${email} soon.</span>`;
        
        // Send email
        sendContactEmail(name, email, message);

        this.reset();
    } else {
        document.getElementById("formResponse").innerHTML = `<span class="error-message">Please fill out all fields.</span>`;
    }
});

function sendContactEmail(name, email, message) {
    fetch('/send-contact-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let bookingName = document.getElementById("bookingName").value;
    let bookingEmail = document.getElementById("bookingEmail").value;
    let bookingPhone = document.getElementById("bookingPhone").value;
    let bookingDate = document.getElementById("bookingDate").value;

    if (bookingName && bookingEmail && bookingPhone && bookingDate) {
        document.getElementById("bookingResponse").innerHTML = `<span class="success-message">Thank you, ${bookingName}! Your session is booked for ${bookingDate}. We will contact you at ${bookingPhone} or ${bookingEmail} if needed.</span>`;
        
        // Send email
        sendBookingEmail(bookingName, bookingEmail, bookingPhone, bookingDate);

        this.reset();
    } else {
        document.getElementById("bookingResponse").innerHTML = `<span class="error-message">Please fill out all fields.</span>`;
    }
});

function sendBookingEmail(name, email, phone, date) {
    fetch('/send-booking-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, date })
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
        document.getElementById("priceResponse").innerHTML = `<span class="success-message">The estimated price is $${totalPrice.toFixed(2)}</span>`;
        this.reset();
    } else {
        document.getElementById("priceResponse").innerHTML = `<span class="error-message">Please fill out all fields.</span>`;
    }
});
