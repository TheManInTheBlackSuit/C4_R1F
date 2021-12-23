const errorEmail=document.getElementById("errorEmail");
const errorPassword=document.getElementById("errorPassword");
const email=document.getElementById("email");
const password=document.getElementById("password");
const btnIngresar=document.getElementById("btnIngresar");
const confirmPassword=document.getElementById("confirmPassword");
const nameUser=document.getElementById("name");

email.addEventListener("click",(e)=>{
    e.preventDefault();
    errorEmail.style.display="none";
});

password.addEventListener("input",(e)=>{
    e.preventDefault();
    errorPassword.style.display="none";
});



if(btnIngresar!=null){
    btnIngresar.addEventListener("click",(e)=>{
        e.preventDefault();
        let val1=validarEmail(email.value)?"none":"block";
        let val2=validarPassword(password.value)?"none":"block";
        errorEmail.style.display=val1;
        voidPassword.style.display=val2;
        if(val1!="block" && val2!="block"){
            iniciarSesion({
                email:email.value,
                password:password.value
            });
        }
    });
}
else if(btnRegistrar!=null){

    const validarConfirmacion=()=>{
        if(password.value!=confirmPassword.value){
            return "block";
        }
        return "none";
    }

    password.addEventListener("input",(e)=>{
        e.preventDefault();
        confirmError.style.display=validarConfirmacion();
    });

    confirmPassword.addEventListener("input",(e)=>{
        e.preventDefault();
        confirmError.style.display=validarConfirmacion();
    })

    btnRegistrar.addEventListener("click",(e)=>{
        e.preventDefault();
        let val1=validarEmail(email.value)?"none":"block";
        let val2=validarPassword(password.value)?"none":"block";
        if(nameUser.value=="" || nameUser.value==null){
            errorName.style.display="block";
        }
        errorEmail.style.display=val1;
        errorPassword.style.display=val2;
        if(errorName.style.display!="block" && val1!="block" && val2!="block" && confirmError.style.display!="block"){
            guardarUsuario({
                name:nameUser.value,
                email:email.value,
                password:password.value
            });
        }
    });

    nameUser.addEventListener("click",(e)=>{
        errorName.style.display="none";
    });
}



const validarEmail=(email)=>{
    var regex=/^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

const validarPassword=(password)=>{
    var regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password) ? true : false;
}

