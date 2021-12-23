var nombreActual="";

function traerInformacion(extension, espacio){
  $.ajax({
  url:"http://localhost/api/user/all",
  type:"GET",
  datatype:"JSON",
  success:function(respuesta){
        console.log(respuesta);
  }
  });
}


function pintarRespuesta(respuesta,extension, espacio){
  $("#resultado_"+espacio).empty();
  let myTable="<table class='TablaResultados'>";
  $("#resultado_"+espacio).append(myTable);
}

function iniciarSesion(data){
  let email=data["email"];
  let password=data["password"];
  $.ajax({
    url:"http://150.136.4.8:8080/api/user/"+email+"/"+password,
    type:"GET",
    datatype:"JSON",
    success:function(respuesta){
      if(respuesta["id"]!=null){
        nombreActual=respuesta["name"];
        modificarSaludo();
      }
      else{
        alert("El usuario no se encuentra registrado.");
      }
    }
    });
}


function guardarUsuario(data){
  let email=data["email"];
  $.ajax({
    url:"http://150.136.4.8:8080/api/user/"+email,
    type:"GET",
    datatype:"JSON",
    success:function(respuesta){
          if(respuesta){
            alert("El usuario con el correo ingresado ya existe.");
          }
          else{
            let dataToSend=JSON.stringify(data);
            $.ajax({
              url:"http://150.136.4.8:8080/api/user/new",
              type:"POST",
              data:dataToSend,
              contentType:"application/JSON",
              datatype:"JSON",
              success:function(respuesta){
                alert("Usuario registrado. Ya puede iniciar sesión.");
                window.location.replace("index.html");
            }
            });
          }
    }
    });
      
}


function actualizarInformacion(extension, espacio, data){
  let dataToSend=JSON.stringify(data);
  $.ajax({
    url:"http://150.136.4.8:8080/api/"+extension+"/update",
    type:"PUT",
    data:dataToSend,
    contentType:"application/JSON",
    datatype:"JSON",
    success:function(respuesta){
        traerInformacion(extension, espacio);
        alert("Se ha actualizado.");
        cargarCategorias();
        cargarPartyrooms();
        cargarClientes();
        cargarPartyrooms2();
        cargarClientes2();
    }
  });
  document.getElementById("actualizar_"+espacio).style.display='none';
}

function borrarElemento(extension,espacio, idElemento){
  $.ajax({
    url:"http://150.136.4.8:8080/api/"+extension+"/"+idElemento,
    type:"DELETE",
    contentType:"application/JSON",
    datatype:"JSON",
    success:function(respuesta){
        traerInformacion(extension, espacio);
        alert("Se ha eliminado.");
    } 
  });
}

function modificarSaludo(){
  console.log(nombreActual);
    if(nombreActual!=""){
      $("#espacio").empty();
      $("#espacio").append('<h3>¡Bienvenido '+nombreActual+'!</h3>');
  }
}

