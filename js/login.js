

document.getElementById("signin-btn").addEventListener('click',()=>{
    const inputName = document.getElementById("input-username");
    const name = inputName.value;
    console.log(name);
    const inputPass = document.getElementById("input-pass");
    const pass = inputPass.value;
    console.log(pass);
    if(name == "admin" && pass == "admin123"){
        window.location.assign("main.html");
        // window.location.href = "main.html";
    }else{
        alert("incorrect credential");
        return;
    }
})