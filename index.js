function validate() {
    var name = document.getElementById('your-name').value
    var email = document.getElementById('email').value
    var message = document.getElementById('message').value
    const errorMessage = document.getElementById("errorMessage"); 

    errorMessage.style.padding = "12px";

    let text;
    if (name.length < 0) {
        text = "Please Enter Name."
        errorMessage.innerHTML = text;
        return;
    }

    if (email.indexOf("@") == -1 || email.length < 0) {
        text = "Please Enter Valid Email";
        errorMessage.innerHTML = text;
        return
    }

    if (message.length <= 0) {
        text = "Pleaes Enter Message";
        errorMessage.innerHTML = text;
        return;
    }

    alert("Form Submitted Successfully!")
    return;
}