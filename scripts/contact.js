let form = document.getElementById("contactForm");
form.addEventListener("submit", function(event){
    event.preventDefault();

    let isValid = true;
    let fullname = document.getElementById("contactName").value.trim();
    let email = document.getElementById("contactEmail").value.trim();
    let phone = document.getElementById("contactPhone").value.trim();
    let subject = document.getElementById("contactSubject").value;
    let message = document.getElementById("contactMessage").value.trim();
    
    

    if(fullname == ""){
        document.getElementById("fullnameError").innerHTML = "Please enter your name."
        isValid = false;
    }else if(fullname.length < 6){
        document.getElementById("fullnameError").innerHTML = "Please enter your full name."
        isValid = false;
    }

    if(email == ""){
        document.getElementById("emailError").innerHTML = "Please enter your email."
        isValid = false;
    }else if(!email.includes("@") || !email.includes(".")){
        document.getElementById("emailError").innerHTML = "Please enter the @ or (.)."
        isValid = false;
    }

    if(phone == ""){
        document.getElementById("phonenumberError").innerHTML = "Please enter your phonenumber."
        isValid = false;
    }else if(phone.length < 10 || phone.length > 12 || isNaN(phone)){
        document.getElementById("phonenumberError").innerHTML = "Please enter your full phonenumber."
        isValid = false;
    }

    if(subject == ""){
        document.getElementById("subjectError").innerHTML = "Please choose a subject."
        isValid = false;
    }

    if(message == ""){
        document.getElementById("messageError").innerHTML = "Please enter your message."
        isValid = false;
    }
    // TEST
    // if(isValid){
    //     alert("successfully");
    // }

    if(isValid){
        contactForm.reset();
        showToastBox("success", "send success", "Your message has been sent successfully.");
    }
    
});