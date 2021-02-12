
function validateEmail(checkEmail){      
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const msg=document.getElementById("checkEmail");
    if(emailPattern.test(checkEmail)){
        msg.innerHTML="Valid Email";
        msg.style.backgroundColor="green";
        return true
    } 
    else{
        msg.innerHTML="Invalid Email"
        msg.style.backgroundColor="red";
        return false
   
    }
} 
function validatePassword(password){
    const passwordmsg=document.getElementById("checkPassword");
    if (password.length>=8){
        passwordmsg.innerHTML="Valid Password";
        passwordmsg.style.backgroundColor="green";
        return true
    }
    else{
        passwordmsg.innerHTML="Please write atleast 8 characters";
        passwordmsg.style.backgroundColor="red";
        return false
    }

}

function handleSubmit(){
    if (validateEmail(document.getElementById("email").value) && validatePassword(document.getElementById("password").value))
    {

       
        
        
        document.signin.action="/checkLogin";
        return true

    }
    console.log("no hello")
    return false
}
