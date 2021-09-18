
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

        var lista_mascotas = JSON.parse(localStorage.getItem('Mascotas'));
        if(lista_mascotas == null) {
            var lista_mascotas = [];
        }

        const existe = lista_mascotas.some(Mascotas => Mascotas.idMascota == idMascota);

        if( !existe || document.getElementById('Input1').disabled == true){

            if(document.getElementById("Input1").disabled==true)
            {
                var lista_mascotas = lista_mascotas.filter(Mascotas => Mascotas.idMascota != idMascota);
            }
    
            lista_mascotas.push(Mascotas);
            var temporal = lista_mascotas.sort((a,b) => a.id-b.id);
            localStorage.setItem("Mascotas", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");
        }
        else {
            swal("Error", "Ya existe ese id de alumno","warning");
        }
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
}

function read(){
    document.getElementById("Table1").innerHTML='';
    const lista_mascotas = JSON.parse(localStorage.getItem("Mascotas"));
    if(lista_mascotas)
    {
        lista_mascotas.forEach((Mascotas)=>printRow(Mascotas));
    }

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
    const lista_mascotas = JSON.parse(localStorage.getItem("Mascotas"));
    var temporal=lista_mascotas.filter(Mascotas =>Mascotas.idMascota!= idMascota);
    localStorage.setItem("Mascotas", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Mascotas");
    }
  
    read();
    
}

function seekR(idMascota){
    const lista_mascotas = JSON.parse(localStorage.getItem("Mascotas"));
    var MList=lista_mascotas.filter(Mascotas=>Mascotas.idMascota == idMascota);
    updateR(MList[0]);
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

    const lista_mascotas = JSON.parse(localStorage.getItem("Mascotas"));
    var alumnosC=lista_mascotas.filter(Mascotas =>Mascotas.selMascota==c);
    if(alumnosC)
    {
        alumnosC.forEach((Mascotas)=>printRowQ(Mascotas));
    }

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