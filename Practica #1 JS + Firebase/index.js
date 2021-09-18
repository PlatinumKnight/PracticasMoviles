const firebaseConfig = {
    apiKey: "AIzaSyDXPLdqL98BsBPOGwnU9kO7_gvUjTjn5VA",
    authDomain: "reactfirebase-c1dc0.firebaseapp.com",
    databaseURL: "https://reactfirebase-c1dc0-default-rtdb.firebaseio.com",
    projectId: "reactfirebase-c1dc0",
    storageBucket: "reactfirebase-c1dc0.appspot.com",
    messagingSenderId: "266100355290",
    appId: "1:266100355290:web:27527b838628fa6f69b5e3",
    measurementId: "G-3TFNCVKG48"
  };
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
}

function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var idMascota = document.getElementById("Input1").value;
    var nombreMascota = document.getElementById("Input2").value;
    var correo = document.getElementById("Input3").value;
    var selMascota= document.getElementById("Input4").value;
    var dueño = document.getElementById("Input5").value;
    var palabraClave = document.getElementById("Input6").value;

    //validaciones
    if (idMascota.length > 0) {
        //creo un objeto que guarda los datos
        var Mascotas = {
            idMascota, //matricula:id
            nombreMascota,
            correo,
            selMascota,
            dueño,
            palabraClave
        }

        //console.log(alumno);

        firebase.database().ref('Mascotas/' + idMascota).update(Mascotas).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Mascotas');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(Mascotas){
    
    if(Mascotas!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Mascotas.idMascota;
        cell2.innerHTML = Mascotas.nombreMascota; 
        cell3.innerHTML = Mascotas.correo;
        cell4.innerHTML = Mascotas.selMascota; 
        cell5.innerHTML = Mascotas.dueño; 
        cell6.innerHTML = Mascotas.palabraClave; 
        cell7.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Mascotas.idMascota})">Eliminar</button>`;
        cell8.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Mascotas.idMascota+')">Modificar</button>';
    }
}

function deleteR(idMascota){

    firebase.database().ref('Mascotas/' + idMascota).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(idMascota){
    var ref = firebase.database().ref('Mascotas/' + idMascota);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Mascotas){
    if(Mascotas!=null)
    {
        document.getElementById("Input1").value=Mascotas.idMascota;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Mascotas.nombreMascota;
        document.getElementById("Input3").value=Mascotas.correo;
        document.getElementById("Input4").value=Mascotas.selMascota;
        document.getElementById("Input5").value=Mascotas.dueño;
        document.getElementById("Input6").value=Mascotas.palabraClave;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Mascotas");
    
    ref.orderByChild("selMascota").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(Mascotas){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Mascotas.idMascota;
    cell2.innerHTML = Mascotas.nombreMascota; 
    cell3.innerHTML = Mascotas.correo;
    cell4.innerHTML = Mascotas.selMascota; 
    cell5.innerHTML = Mascotas.dueño; 
    cell6.innerHTML = Mascotas.palabraClave; 
}