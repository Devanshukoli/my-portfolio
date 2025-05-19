function validate(event) {
    if (event) event.preventDefault();
    var name = document.getElementById('your-name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.style.padding = "12px";

    let text;
    if (name.trim() === "") {
        text = "Please Enter Name.";
        errorMessage.innerHTML = text;
        return false;
    }

    if (email.indexOf("@") === -1 || email.trim() === "") {
        text = "Please Enter Valid Email";
        errorMessage.innerHTML = text;
        return false;
    }

    if (message.trim() === "") {
        text = "Please Enter Message";
        errorMessage.innerHTML = text;
        return false;
    }

    // Send email using EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Devanshu Koli', // Your name
    };

    // Display sending message
    errorMessage.innerHTML = "Sending message...";
    errorMessage.style.color = "blue"; emailjs.send(import.meta.env.EMAILJS_SERVICE_ID, import.meta.env.EMAILJS_TEMPLATE_ID, templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            errorMessage.style.color = "green";
            errorMessage.innerHTML = "Message sent successfully!";
            // Clear the form
            document.getElementById('your-name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        }, function (error) {
            console.log('FAILED...', error);
            errorMessage.style.color = "red";
            errorMessage.innerHTML = "Failed to send message. Please try again.";
        });

    return false;
}