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

    errorMessage.innerHTML = "";
    alert("Form Submitted Successfully!");
    return true;
}