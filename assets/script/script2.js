//SELECCIONAR/DESELECCIONAR TODOS LOS CHECKBOX
function Separador1(val) {//SEPARADOR SIN DECIMAL
    return String(val).split("").reverse().join("")
    .replace(/(.{3}\B)/g, "$1.")
    .split("").reverse().join("");
}

function Separador(x) {//SEPARADOR CON DECIMAL
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//document.getElementById('savepedido').innerHTML = ''
$("#checkTodos").change(function () {
  $("input:checkbox").prop('checked', $(this).prop("checked"));
  //$("input[type='checkbox']:checked:enabled").prop('checked', $(this).prop("checked"));
});
// FUNCION PARA LIMPIAR CHECKBOX ACTIVOS
function LimpiarCheckbox(){
$("input[type='checkbox']:checked:enabled").attr('checked',false); 
}

//BUSQUEDA EN CONSULTAS
$(document).ready(function () {
   (function($) {
       $('#FiltrarContenido').keyup(function () {
            var ValorBusqueda = new RegExp($(this).val(), 'i');
            $('.BusquedaRapida tr').hide();
             $('.BusquedaRapida tr').filter(function () {
                return ValorBusqueda.test($(this).text());
              }).show();
                })
      }(jQuery));
});




/////////////////////////////////// FUNCIONES DE USUARIOS //////////////////////////////////////

// FUNCION PARA MOSTRAR USUARIOS EN VENTANA MODAL
function VerUsuario(codigo){

$('#muestrausuariomodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaUsuarioModal=si&codigo='+codigo;

$.ajax({
            type: "GET",
                  url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestrausuariomodal').empty();
                $('#muestrausuariomodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

// FUNCION PARA ACTUALIZAR USUARIOS
function UpdateUsuario(codigo,dni,nombres,sexo,direccion,telefono,email,usuario,nivel,status,comision,codsucursal,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#saveuser #codigo").val(codigo);
  $("#saveuser #dni").val(dni);
  $("#saveuser #nombres").val(nombres);
  $("#saveuser #sexo").val(sexo);
  $("#saveuser #direccion").val(direccion);
  $("#saveuser #telefono").val(telefono);
  $("#saveuser #email").val(email);
  $("#saveuser #usuario").val(usuario);
  $("#saveuser #nivel").val(nivel);
  $("#saveuser #status").val(status);
  $("#saveuser #comision").val(comision);
  $("#saveuser #codsucursal").val(codsucursal);
  $("#saveuser #proceso").val(proceso);
}


/////FUNCION PARA ELIMINAR USUARIOS 
function EliminarUsuario(codigo,dni,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Usuario?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codigo="+codigo+"&dni="+dni+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $("#usuarios").load("consultas.php?CargaUsuarios=si");
                  
          } else if(data==2){ 

             swal("Oops", "Este Usuario no puede ser Eliminado, tiene registros relacionados!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Usuarios, no tienes los privilegios dentro del Sistema!", "error"); 

                }

            }
        })
    });
}

// FUNCION PARA BUSCAR LOGS DE ACCESO
$(document).ready(function(){
//function BuscarPacientes() {  
    var consulta;
    //hacemos focus al campo de búsqueda
    $("#blogs").focus();
    //comprobamos si se pulsa una tecla
    $("#blogs").keyup(function(e){
      //obtenemos el texto introducido en el campo de búsqueda
      consulta = $("#blogs").val();

      if (consulta.trim() === '') {  

      $("#logs").html("<center><div class='alert alert-danger'><span class='fa fa-info-circle'></span> POR FAVOR REALICE LA BUSQUEDA CORRECTAMENTE</div></center>");
      return false;

      } else {
                                                                           
        //hace la búsqueda
        $.ajax({
          type: "POST",
          url: "search.php?CargaLogs=si",
          data: "b="+consulta,
          dataType: "html",
          beforeSend: function(){
              //imagen de carga
              $("#logs").html('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>');
          },
          error: function(){
              swal("Oops", "Ha ocurrido un error en la petición Ajax, verifique por favor!", "error"); 
          },
          success: function(data){                                                    
            $("#logs").empty();
            $("#logs").append(data);
          }
      });
     }
   });                                                               
});

// FUNCION PARA MOSTRAR USUARIOS POR SUCURSAL
function CargaUsuarios(codsucursal){

$('#codigo').html('<center><i class="fa fa-spin fa-spinner"></i></center>');
                
var dataString = 'BuscaUsuariosxSucursal=si&codsucursal='+codsucursal;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#codigo').empty();
                $('#codigo').append(''+response+'').fadeIn("slow");
                
           }
      });
}

////FUNCION PARA MOSTRAR USUARIO POR CODIGO
function SelectUsuario(codigo,codsucursal){

  $("#codigo").load("funciones.php?MuestraUsuario=si&codigo="+codigo+"&codsucursal="+codsucursal);

}


//FUNCIONES PARA ACTIVAR-DESACTIVAR NIVEL DE USUARIO
function NivelUsuario(nivel){

  $("#nivel").on("change", function() {

    var valor = $("#nivel").val();

    if (valor == "ADMINISTRADOR(A) SUCURSAL" || valor == "SECRETARIA" || valor == "CAJERO(A)" || valor === true) {
         
      $("#codsucursal").attr('disabled', false);

    } else {

      $("#codsucursal").attr('disabled', true);
     }
  });
}

// FUNCION PARA MOSTRAR DIV DE SUCURSALES
function CargarSucursalesUsuarios(nivel){
                
var dataString = 'MuestraSucursalesUsuarios=si&nivel='+nivel;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestrasucursales').empty();
                $('#muestrasucursales').append(''+response+'').fadeIn("slow");
           }
      });
}

// FUNCION PARA MOSTRA SUCURSALES ASIGNADAS AL USUARIO
function CargarSucursalesAsignadasxUsuarios(codigo,nivel,gruposid){
                                        
var dataString = 'MuestraSucursalesAsignadasxUsuarios=si&codigo='+codigo+"&nivel="+nivel+"&gruposid="+gruposid;

$.ajax({
            type: "GET",
            url: "funciones.php",
            async : false,
            data: dataString,
            success: function(response) {            
                $('#muestrasucursales').empty();
                $('#muestrasucursales').append(''+response+'').fadeIn("slow");
             }
      });
}










/////////////////////////////////// FUNCIONES DE PROVINCIAS //////////////////////////////////////

// FUNCION PARA ACTUALIZAR PROVINCIAS
function UpdateProvincia(id_provincia,provincia,proceso) 
{
  // aqui asigno cada valor a los campos correspondientes
  $("#saveprovincia #id_provincia").val(id_provincia);
  $("#saveprovincia #provincia").val(provincia);
  $("#saveprovincia #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR PROVINCIAS 
function EliminarProvincia(id_provincia,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Provincia?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "id_provincia="+id_provincia+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#provincias').load("consultas?CargaProvincias=si");
                  
          } else if(data==2){ 

             swal("Oops", "Esta Provincia no puede ser Eliminada, tiene Departamentos relacionados!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Provincias, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}











/////////////////////////////////// FUNCIONES DE DEPARTAMENTOS //////////////////////////////////////

// FUNCION PARA ACTUALIZAR DEPARTAMENTOS
function UpdateDepartamento(id_departamento,departamento,id_provincia,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savedepartamento #id_departamento").val(id_departamento);
  $("#savedepartamento #departamento").val(departamento);
  $("#savedepartamento #id_provincia").val(id_provincia);
  $("#savedepartamento #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR DEPARTAMENTOS 
function EliminarDepartamento(id_departamento,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Departamento de Provincia?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "id_departamento="+id_departamento+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#departamentos').load("consultas?CargaDepartamentos=si");
                  
          } else if(data==2){ 

             swal("Oops", "Este Departamento no puede ser Eliminado, tiene registros relacionados!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Departamento, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}

////FUNCION PARA MOSTRAR PROVINCIAS POR DEPARTAMENTOS
function CargaDepartamentos(id_provincia){

$('#id_departamento').html('<center><img src="assets/images/loading.gif" width="30" height="30"/></center>');
                
var dataString = 'BuscaDepartamentos=si&id_provincia='+id_provincia;

$.ajax({
            type: "GET",
                  url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#id_departamento').empty();
                $('#id_departamento').append(''+response+'').fadeIn("slow");
                
           }
      });
}




////FUNCION PARA MOSTRAR PROVINCIAS POR DEPARTAMENTOS #2
function CargaDepartamentos2(id_provincia2){

$('#id_departamento2').html('<center><img src="assets/images/loading.gif" width="30" height="30"/></center>');
                
var dataString = 'BuscaDepartamentos2=si&id_provincia2='+id_provincia2;

$.ajax({
            type: "GET",
                  url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#id_departamento2').empty();
                $('#id_departamento2').append(''+response+'').fadeIn("slow");
                
           }
      });
}

////FUNCION PARA MOSTRAR LOCALIDAD POR CIUDAD
function SelectDepartamento(id_provincia,id_departamento){

  $("#id_departamento").load("funciones.php?SeleccionaDepartamento=si&id_provincia="+id_provincia+"&id_departamento="+id_departamento);

}











/////////////////////////////////// FUNCIONES DE TIPOS DE DOCUMENTOS  //////////////////////////////////////

// FUNCION PARA ACTUALIZAR TIPOS DE DOCUMENTOS
function UpdateDocumento(coddocumento,documento,descripcion,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savedocumento #coddocumento").val(coddocumento);
  $("#savedocumento #documento").val(documento);
  $("#savedocumento #descripcion").val(descripcion);
  $("#savedocumento #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR TIPOS DE DOCUMENTOS 
function EliminarDocumento(coddocumento,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Tipo de Documento?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddocumento="+coddocumento+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#documentos').load("consultas?CargaDocumentos=si");
                  
          } else if(data==2){ 

             swal("Oops", "Este Documento no puede ser Eliminado, tiene registros relacionados!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Documentos, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}











/////////////////////////////////// FUNCIONES DE TIPOS DE MONEDA //////////////////////////////////////

// FUNCION PARA ACTUALIZAR TIPOS DE MONEDA
function UpdateTipoMoneda(codmoneda,moneda,siglas,simbolo,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savemoneda #codmoneda").val(codmoneda);
  $("#savemoneda #moneda").val(moneda);
  $("#savemoneda #siglas").val(siglas);
  $("#savemoneda #simbolo").val(simbolo);
  $("#savemoneda #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR TIPOS DE MONEDA 
function EliminarTipoMoneda(codmoneda,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Tipo de Moneda?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codmoneda="+codmoneda+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#monedas').load("consultas?CargaMonedas=si");
                  
          } else if(data==2){ 

             swal("Oops", "Este Tipo de Moneda no puede ser Eliminado, tiene Tipos de Cambio relacionadas!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Tipos de Moneda, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}











/////////////////////////////////// FUNCIONES DE TIPOS DE CAMBIO  //////////////////////////////////////

// FUNCION PARA ACTUALIZAR TIPOS DE CAMBIO
function UpdateTipoCambio(codcambio,descripcioncambio,montocambio,codmoneda,fechacambio,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savecambio #codcambio").val(codcambio);
  $("#savecambio #descripcioncambio").val(descripcioncambio);
  $("#savecambio #montocambio").val(montocambio);
  $("#savecambio #codmoneda").val(codmoneda);
  $("#savecambio #fechacambio").val(fechacambio);
  $("#savecambio #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR TIPOS DE CAMBIO 
function EliminarTipoCambio(codcambio,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Tipo de Cambio?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codcambio="+codcambio+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#cambios').load("consultas?CargaCambios=si");
                  
           } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Tipos de Cambio, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}












/////////////////////////////////// FUNCIONES DE IMPUESTOS //////////////////////////////////////

// FUNCION PARA ACTUALIZAR IMPUESTOS
function UpdateImpuesto(codimpuesto,nomimpuesto,valorimpuesto,statusimpuesto,fechaimpuesto,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#saveimpuesto #codimpuesto").val(codimpuesto);
  $("#saveimpuesto #nomimpuesto").val(nomimpuesto);
  $("#saveimpuesto #valorimpuesto").val(valorimpuesto);
  $("#saveimpuesto #statusimpuesto").val(statusimpuesto);
  $("#saveimpuesto #fechaimpuesto").val(fechaimpuesto);
  $("#saveimpuesto #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR IMPUESTOS
function EliminarImpuesto(codimpuesto,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Impuesto?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codimpuesto="+codimpuesto+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#impuestos').load("consultas?CargaImpuestos=si");
                  
          } else if(data==2){ 

             swal("Oops", "Este Impuesto no puede ser Eliminado, se encuentra activo para Ventas!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Impuestos, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}














/////////////////////////////////// FUNCIONES DE SUCURSALES //////////////////////////////////////

// FUNCION PARA MOSTRAR SUCURSALES EN VENTANA MODAL
function VerSucursal(codsucursal){

$('#muestrasucursalmodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaSucursalModal=si&codsucursal='+codsucursal;

$.ajax({
            type: "GET",
                  url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestrasucursalmodal').empty();
                $('#muestrasucursalmodal').append(''+response+'').fadeIn("slow");
            }
      });
}

// FUNCION PARA ACTUALIZAR SUCURSALES
function UpdateSucursal(codsucursal,nrosucursal,documsucursal,cuitsucursal,nomsucursal,codgiro,girosucursal,
id_provincia,direcsucursal,correosucursal,tlfsucursal,nroactividadsucursal,inicioticket,inicioboleta,iniciofactura,inicionotacredito,
fechaautorsucursal,llevacontabilidad,documencargado,dniencargado,nomencargado,tlfencargado,descsucursal,codmoneda,codmoneda2,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savesucursal #codsucursal").val(codsucursal);
  $("#savesucursal #nrosucursal").val(nrosucursal);
  $("#savesucursal #documsucursal").val(documsucursal);
  $("#savesucursal #cuitsucursal").val(cuitsucursal);
  $("#savesucursal #nomsucursal").val(nomsucursal);
  $("#savesucursal #codgiro").val(codgiro);
  $("#savesucursal #girosucursal").val(girosucursal);
  $("#savesucursal #id_provincia").val(id_provincia);
  $("#savesucursal #direcsucursal").val(direcsucursal);
  $("#savesucursal #correosucursal").val(correosucursal);
  $("#savesucursal #tlfsucursal").val(tlfsucursal);
  $("#savesucursal #nroactividadsucursal").val(nroactividadsucursal);
  $("#savesucursal #inicioticket").val(inicioticket);
  $("#savesucursal #inicioboleta").val(inicioboleta);
  $("#savesucursal #iniciofactura").val(iniciofactura);
  $("#savesucursal #inicionotacredito").val(inicionotacredito);
  $("#savesucursal #fechaautorsucursal").val(fechaautorsucursal);
  $("#savesucursal #llevacontabilidad").val(llevacontabilidad);
  $("#savesucursal #documencargado").val(documencargado);
  $("#savesucursal #dniencargado").val(dniencargado);
  $("#savesucursal #nomencargado").val(nomencargado);
  $("#savesucursal #tlfencargado").val(tlfencargado);
  $("#savesucursal #descsucursal").val(descsucursal);
  $("#savesucursal #codmoneda").val(codmoneda);
  $("#savesucursal #codmoneda2").val(codmoneda2);
  $("#savesucursal #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR SUCURSALES 
function EliminarSucursal(codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Sucursal?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#2f323e',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

         if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#sucursales').load("consultas?CargaSucursales=si");
                  
          } else if(data==2){ 

             swal("Oops", "Esta Sucursal no puede ser Eliminada, tiene registros relacionados!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Sucursales, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}

// FUNCION PARA MOSTRAR SUCURSALES DIFERENTES
function CargaSucursales(codsucursal){
                
var dataString = 'MuestraSucursalesDiferentes=si&codsucursal='+codsucursal;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#recibe').empty();
                $('#recibe').append(''+response+'').fadeIn("slow");
           }
      });
}









/////////////////////////////////// FUNCIONES DE CATEGORIAS //////////////////////////////////////

// FUNCION PARA ACTUALIZAR CATEGORIAS
function UpdateCategoria(codcategoria,nomcategoria,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savecategoria #codcategoria").val(codcategoria);
  $("#savecategoria #nomcategoria").val(nomcategoria);
  $("#savecategoria #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR CATEGORIAS 
function EliminarCategoria(codcategoria,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Categoria de Producto?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codcategoria="+codcategoria+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#categorias').load("consultas.php?CargaCategorias=si");
            $("#savecategoria")[0].reset();

          } else if(data==2) { 

             swal("Oops", "Esta Categoria no puede ser Eliminada, tiene registros relacionados!", "error"); 

           } else {  

             swal("Oops", "Usted no tiene Acceso para Eliminar Categorias de Productos, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}















/////////////////////////////////// FUNCIONES DE MEDIDAS //////////////////////////////////////

// FUNCION PARA ACTUALIZAR MEDIDAS
function UpdateMedida(codmedida,nommedida,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savemedida #codmedida").val(codmedida);
  $("#savemedida #nommedida").val(nommedida);
  $("#savemedida #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR UNIDADES 
function EliminarMedida(codmedida,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Medida?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codmedida="+codmedida+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#medidas').load("consultas.php?CargaMedidas=si");
            $("#savemedida")[0].reset();

          } else if(data==2) { 

             swal("Oops", "Esta Medida no puede ser Eliminada, tiene registros relacionados!", "error"); 

           } else {  

             swal("Oops", "Usted no tiene Acceso para Eliminar Medidas, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}









/////////////////////////////////// FUNCIONES DE SALSAS //////////////////////////////////////

// FUNCION PARA ACTUALIZAR SALSAS
function UpdateSalsa(codsalsa,nomsalsa,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savesalsa #codsalsa").val(codsalsa);
  $("#savesalsa #nomsalsa").val(nomsalsa);
  $("#savesalsa #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR SALSAS 
function EliminarSalsa(codsalsa,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Salsa?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codsalsa="+codsalsa+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#salsas').load("consultas.php?CargaSalsas=si");
            $("#savesalsa")[0].reset();

          } else if(data==2) { 

             swal("Oops", "Esta Salsa no puede ser Eliminada, tiene registros relacionados!", "error"); 

           } else {  

             swal("Oops", "Usted no tiene Acceso para Eliminar Salsas, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}













/////////////////////////////////// FUNCIONES DE SALAS //////////////////////////////////////

// FUNCION PARA ACTUALIZAR SALAS
function UpdateSala(codsala,nomsala,codsucursal,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savesala #codsala").val(codsala);
  $("#savesala #nomsala").val(nomsala);
  $("#savesala #codsucursal").val(codsucursal);
  $("#savesala #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR SALAS 
function EliminarSala(codsala,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Sala?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codsala="+codsala+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#salas').load("consultas.php?CargaSalas=si");
            $("#savesala")[0].reset();

          } else if(data==2) { 

             swal("Oops", "Esta Salas no puede ser Eliminada, tiene registros relacionados!", "error"); 

           } else {  

             swal("Oops", "Usted no tiene Acceso para Eliminar Salas, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}

// FUNCION PARA MOSTRAR SALAS POR SUCURSAL
function CargaSalas(codsucursal){

$('#codsala').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');
                
var dataString = 'BuscaSalasxSucursal=si&codsucursal='+codsucursal;

$.ajax({
        type: "GET",
        url: "funciones.php",
        data: dataString,
        success: function(response) {            
          $('#codsala').empty();
          $('#codsala').append(''+response+'').fadeIn("slow");
      }
  });
}

////FUNCION PARA MOSTRAR SALAS POR SUCURSALES
function SelectSala(codsucursal,codsala){

  $("#codsala").load("funciones.php?SeleccionaSalas=si&codsucursal="+codsucursal+"&codsala="+codsala);

}












/////////////////////////////////// FUNCIONES DE SALAS //////////////////////////////////////

// FUNCION PARA ACTUALIZAR SALAS
function UpdateMesa(codmesa,codsucursal,codsala,nommesa,puestos,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savemesa #codmesa").val(codmesa);
  $("#savemesa #codsucursal").val(codsucursal);
  $("#savemesa #codsala").val(codsala);
  $("#savemesa #nommesa").val(nommesa);
  $("#savemesa #puestos").val(puestos);
  $("#savemesa #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR SALAS 
function EliminarMesa(codmesa,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Mesa en Sala?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codmesa="+codmesa+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#mesas').load("consultas.php?CargaMesas=si");
            $("#savemesa")[0].reset();

          } else if(data==2) { 

             swal("Oops", "Esta Mesa no puede ser Eliminada, tiene registros relacionados!", "error"); 

           } else {  

             swal("Oops", "Usted no tiene Acceso para Eliminar Mesas en Salas, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}

// FUNCION PARA MOSTRAR MESAS POR SALAS
function CargaMesas(nuevasala){

$('#nuevamesa').html('<center><img src="assets/images/loading.gif" width="30" height="30"/></center>');
                
var dataString = 'BuscaMesasxSalas=si&codsala='+nuevasala;

$.ajax({
  type: "GET",
    url: "funciones.php",
    data: dataString,
      success: function(response) {            
        $('#nuevamesa').empty();
        $('#nuevamesa').append(''+response+'').fadeIn("slow");
      }
  });
}










/////////////////////////////////// FUNCIONES DE CLIENTES //////////////////////////////////////

// FUNCION PARA BUSCAR CLIENTES
function BuscarClientes(){
                        
$('#muestraclientes').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');
                
var search = $("#bclientes").val();
var dataString = $("#busquedaclientes").serialize();
var url = 'search.php?CargaClientes=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
      success: function(response) {            
        $('#muestraclientes').empty();
        $('#muestraclientes').append(''+response+'').fadeIn("slow");
      }
  });
}

// FUNCION PARA MOSTRAR DIV DE CARGA MASIVA DE CLIENTES
function CargaDivClientes(){

$('#divcliente').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');
                
var dataString = 'BuscaDivCliente=si';

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#divcliente').empty();
                $('#divcliente').append(''+response+'').fadeIn("slow");
                
           }
      });
}

// FUNCION PARA LIMPIAR DIV DE CARGA MASIVA DE CLIENTES
function ModalCliente(){
  $("#divcliente").html("");
}

// FUNCION PARA MOSTRAR CLIENTES EN VENTANA MODAL
function VerCliente(codcliente){

$('#muestraclientemodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaClienteModal=si&codcliente='+codcliente;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestraclientemodal').empty();
                $('#muestraclientemodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

//SELECCIONA NOMBRE O RAZON SOCIAL DE CLIENTE
function CargaTipoCliente(tipocliente){

    if (tipocliente === "NATURAL" || tipocliente === true) {
    
    $('#nomcliente').attr('disabled', false);
    $("#razoncliente").attr('disabled', true);
    $('#girocliente').attr('disabled', true);

    } else {

    // deshabilitamos
    $('#nomcliente').attr('disabled', true);
    $("#razoncliente").attr('disabled', false);
    $('#girocliente').attr('disabled', false);

    }
}


// FUNCION PARA ACTUALIZAR CLIENTES
function UpdateCliente(codcliente,tipocliente,documcliente,dnicliente,nomcliente,razoncliente,girocliente,tlfcliente,id_provincia,
  direccliente,emailcliente,limitecredito,criterio,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savecliente #codcliente").val(codcliente);
  $("#savecliente #tipocliente").val(tipocliente);
  $("#savecliente #documcliente").val(documcliente);
  $("#savecliente #dnicliente").val(dnicliente);
  $("#savecliente #nomcliente").val(nomcliente);
  $("#savecliente #razoncliente").val(razoncliente);
  $("#savecliente #girocliente").val(girocliente);
  $("#savecliente #tlfcliente").val(tlfcliente);
  $("#savecliente #id_provincia").val(id_provincia);
  $("#savecliente #direccliente").val(direccliente);
  $("#savecliente #emailcliente").val(emailcliente);
  $("#savecliente #limitecredito").val(limitecredito);
  $("#savecliente #criterio").val(criterio);
  $("#savecliente #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR CLIENTES 
function EliminarCliente(codcliente,criterio,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Cliente?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codcliente="+codcliente+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#muestraclientes').load("search.php?CargaClientes=si&bclientes="+criterio);
                  
          } else if(data==2){ 

             swal("Oops", "Este Cliente no puede ser Eliminado, tiene Ventas relacionados!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Clientes, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}











/////////////////////////////////// FUNCIONES DE PROVEEDORES //////////////////////////////////////

// FUNCION PARA MOSTRAR DIV DE CARGA MASIVA DE PROVEEDORES
function CargaDivProveedores(){

$('#divproveedor').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');
                
var dataString = 'BuscaDivProveedor=si';

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#divproveedor').empty();
                $('#divproveedor').append(''+response+'').fadeIn("slow");
                
           }
      });
}


// FUNCION PARA LIMPIAR DIV DE CARGA MASIVA DE PROVEEDORES
function ModalProveedor(){
  $("#divproveedor").html("");
}

// FUNCION PARA MOSTRAR PROVEEDORES EN VENTANA MODAL
function VerProveedor(codproveedor){

$('#muestraproveedormodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaProveedorModal=si&codproveedor='+codproveedor;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestraproveedormodal').empty();
                $('#muestraproveedormodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

// FUNCION PARA ACTUALIZAR PROVEEDORES
function UpdateProveedor(codproveedor,documproveedor,cuitproveedor,nomproveedor,tlfproveedor,id_provincia,
  direcproveedor,emailproveedor,vendedor,tlfvendedor,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#saveproveedor #codproveedor").val(codproveedor);
  $("#saveproveedor #documproveedor").val(documproveedor);
  $("#saveproveedor #cuitproveedor").val(cuitproveedor);
  $("#saveproveedor #nomproveedor").val(nomproveedor);
  $("#saveproveedor #tlfproveedor").val(tlfproveedor);
  $("#saveproveedor #id_provincia").val(id_provincia);
  $("#saveproveedor #direcproveedor").val(direcproveedor);
  $("#saveproveedor #emailproveedor").val(emailproveedor);
  $("#saveproveedor #vendedor").val(vendedor);
  $("#saveproveedor #tlfvendedor").val(tlfvendedor);
  $("#saveproveedor #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR PROVEEDORES 
function EliminarProveedor(codproveedor,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Proveedor?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codproveedor="+codproveedor+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#proveedores').load("consultas.php?CargaProveedores=si");
                  
          } else if(data==2){ 

             swal("Oops", "Este Proveedor no puede ser Eliminado, tiene Productos relacionados!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Proveedores, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}












/////////////////////////////////// FUNCIONES DE INGREDIENTES //////////////////////////////////////

// FUNCION PARA BUSCAR INGREDIENTES
$(document).ready(function(){
//function BuscarPacientes() {  
    var consulta;
    //hacemos focus al campo de búsqueda
    $("#bingredientes").focus();
    //comprobamos si se pulsa una tecla
    $("#bingredientes").keyup(function(e){
      //obtenemos el texto introducido en el campo de búsqueda
      consulta = $("#bingredientes").val();
                                                                           
        //hace la búsqueda
        $.ajax({
          type: "POST",
          url: "search.php?CargaIngredientes=si",
          data: "b="+consulta,
          dataType: "html",
          beforeSend: function(){
              //imagen de carga
              $("#ingredientes").html('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>');
          },
          error: function(){
              swal("Oops", "Ha ocurrido un error en la petición Ajax, verifique por favor!", "error"); 
          },
          success: function(data){                                                    
            $("#ingredientes").empty();
            $("#ingredientes").append(data);
          }
      });
   });                                                               
});

// FUNCION PARA MOSTRAR DIV DE CARGA MASIVA DE INGREDIENTES
function CargaDivIngredientes(){

$('#divingrediente').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');
                
var dataString = 'BuscaDivIngrediente=si';

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#divingrediente').empty();
                $('#divingrediente').append(''+response+'').fadeIn("slow");
                
           }
      });
}

// FUNCION PARA LIMPIAR DIV DE CARGA MASIVA DE INGREDIENTES
function ModalIngrediente(){
  $("#divingrediente").html("");
}

// FUNCION PARA MOSTRAR INGREDIENTES EN VENTANA MODAL
function VerIngrediente(codingrediente,codsucursal){

$('#muestraingredientemodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaIngredienteModal=si&codingrediente='+codingrediente+"&codsucursal="+codsucursal;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestraingredientemodal').empty();
                $('#muestraingredientemodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

// FUNCION PARA SUMAR STOCK A INGREDIENTE
function SumarIngrediente(idingrediente,codingrediente,nomingrediente) 
{
  // aqui asigno cada valor a los campos correspondientes
  $("#savestockingrediente #idingrediente").val(idingrediente);
  $("#savestockingrediente #codingrediente").val(codingrediente);
  $("#savestockingrediente #nomingrediente").val(nomingrediente);
}

// FUNCION PARA ACTUALIZAR INGREDIENTES
function UpdateIngrediente(codingrediente,codsucursal) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Actualizar este Ingrediente?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Actualizar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "foringrediente?codingrediente="+codingrediente+"&codsucursal="+codsucursal;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}

/////FUNCION PARA ELIMINAR INGREDIENTES 
function EliminarIngrediente(codingrediente,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Ingrediente?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codingrediente="+codingrediente+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            //hace la búsqueda
            $.ajax({
              type: "POST",
              url: "search.php?CargaIngredientes=si",
              data: "b="+$("#bingredientes").val(),
              dataType: "html",
              success: function(data){                                                    
                $("#ingredientes").empty();
                $("#ingredientes").append(data);
              }
            });
                  
          } else if(data==2){ 

             swal("Oops", "Este Ingrediente no puede ser Eliminado, tiene Productos relacionadas!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Ingrediente, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}

// FUNCION PARA BUSQUEDA DE INGREDIENTES POR SUCURSAL
function BuscaIngredientesxSucursal(){

$('#muestraingredientes').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var dataString = $("#ingredientesxsucursal").serialize();
var url = 'funciones.php?BuscaIngredientesxSucursal=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestraingredientes').empty();
                $('#muestraingredientes').append(''+response+'').fadeIn("slow");
            }
      }); 
}

// FUNCION PARA BUSQUEDA DE INGREDIENTES VENDIDOS
function BuscaIngredientesVendidos(){
    
$('#muestraingredientesvendidos').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#ingredientesvendidos").serialize();
var url = 'funciones.php?BuscaIngredientesVendidos=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestraingredientesvendidos').empty();
                $('#muestraingredientesvendidos').append(''+response+'').fadeIn("slow");
                
            }
      }); 
}

// FUNCION PARA BUSQUEDA DE KARDEX POR INGREDIENTES
function BuscaKardexIngredientes(){

$('#muestrakardex').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codingrediente = $("#codingrediente").val();
var dataString = $("#buscakardexingredientes").serialize();
var url = 'funciones.php?BuscaKardexIngrediente=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestrakardex').empty();
                $('#muestrakardex').append(''+response+'').fadeIn("slow");
                
            }
      }); 
}

// FUNCION PARA BUSCAR KARDEX VALORIZADO DE INGREDIENTES
$(document).ready(function(){
//function BuscarPacientes() {  
    var consulta;
    //hacemos focus al campo de búsqueda
    $("#bkardexingredientes").focus();
    //comprobamos si se pulsa una tecla
    $("#bkardexingredientes").keyup(function(e){
      //obtenemos el texto introducido en el campo de búsqueda
      consulta = $("#bkardexingredientes").val();
                                                                           
        //hace la búsqueda
        $.ajax({
          type: "POST",
          url: "search.php?CargaKardexValorizadoIngredientes=si",
          data: "b="+consulta,
          dataType: "html",
          beforeSend: function(){
              //imagen de carga
              $("#valorizado_ingredientes").html('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>');
          },
          error: function(){
              swal("Oops", "Ha ocurrido un error en la petición Ajax, verifique por favor!", "error"); 
          },
          success: function(data){                                                    
            $("#valorizado_ingredientes").empty();
            $("#valorizado_ingredientes").append(data);
          }
      });
   });                                                               
});

// FUNCION PARA BUSQUEDA DE KARDEX INGREDIENTES VALORIZADO POR FECHAS
function BuscaValorizadoIngredientesxSucursales(){
    
$('#muestravalorizadoingredientes').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var dataString = $("#valorizadoingredientesxsucursales").serialize();
var url = 'funciones.php?BuscaValorizadoIngredientesxSucursal=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestravalorizadoingredientes').empty();
                $('#muestravalorizadoingredientes').append(''+response+'').fadeIn("slow");
            }
      }); 
}
















/////////////////////////////////// FUNCIONES DE PRODUCTOS //////////////////////////////////////

// FUNCION PARA BUSCAR PRODUCTOS
$(document).ready(function(){
//function BuscarPacientes() {  
    var consulta;
    //hacemos focus al campo de búsqueda
    $("#bproductos").focus();
    //comprobamos si se pulsa una tecla
    $("#bproductos").keyup(function(e){
      //obtenemos el texto introducido en el campo de búsqueda
      consulta = $("#bproductos").val();
                                                                           
        //hace la búsqueda
        $.ajax({
          type: "POST",
          url: "search.php?CargaProductos=si",
          data: "b="+consulta,
          dataType: "html",
          beforeSend: function(){
              //imagen de carga
              $("#productos").html('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>');
          },
          error: function(){
              swal("Oops", "Ha ocurrido un error en la petición Ajax, verifique por favor!", "error"); 
          },
          success: function(data){                                                    
            $("#productos").empty();
            $("#productos").append(data);
          }
      });
   });                                                               
});

//FUNCION PARA CALCULAR PRECIO VENTA
$(document).ready(function (){
    $('.calculoprecio').keyup(function (){
  
      var precio = $('input#preciocompra').val();
      var porcentaje = $('input#porcentaje').val()/100;

      //REALIZO EL CALCULO
      var calculo = parseFloat(precio)*parseFloat(porcentaje);
      precioventa = parseFloat(calculo)+parseFloat(precio);
      $("#precioventa").val((porcentaje == "0.00") ? "" : precioventa.toFixed(2));
  });
}); 

// FUNCION PARA MOSTRAR DIV DE CARGA MASIVA DE PRODUCTOS
function CargaDivProductos(){

$('#divproducto').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');
                
var dataString = 'BuscaDivProducto=si';

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#divproducto').empty();
                $('#divproducto').append(''+response+'').fadeIn("slow");
                
           }
      });
}

// FUNCION PARA LIMPIAR DIV DE CARGA MASIVA DE PRODUCTOS
function ModalProducto(){
  $("#divproducto").html("");
}

// FUNCION PARA MOSTRAR PRODUCTOS EN VENTANA MODAL
function VerProducto(codproducto,codsucursal){

$('#muestraproductomodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaProductoModal=si&codproducto='+codproducto+"&codsucursal="+codsucursal;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestraproductomodal').empty();
                $('#muestraproductomodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

// FUNCION PARA SUMAR STOCK A PRODUCTO
function SumarProducto(idproducto,codproducto,producto) 
{
  // aqui asigno cada valor a los campos correspondientes
  $("#savestockproducto #idproducto").val(idproducto);
  $("#savestockproducto #codproducto").val(codproducto);
  $("#savestockproducto #producto").val(producto);
}

// FUNCION PARA ACTUALIZAR PRODUCTOS
function UpdateProducto(codproducto,codsucursal) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Actualizar este Producto?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Actualizar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "forproducto?codproducto="+codproducto+"&codsucursal="+codsucursal;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}

// FUNCION PARA AGREGAR INGREDIENTES A PRODUCTOS
function AgregaIngrediente(codproducto,codsucursal) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Agregar Ingredientes a este Producto?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "foragregaingredientes?codproducto="+codproducto+"&codsucursal="+codsucursal;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}

/////FUNCION PARA ELIMINAR DETALLE DE PRODUCTO 
function EliminaDetalleProducto(codproducto,codingrediente,cantracion,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Ingrediente del Producto?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codproducto="+codproducto+"&codingrediente="+codingrediente+"&cantracion="+cantracion+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $("#cargaingredientes").load("funciones.php?BuscaDetallesProducto=si&codproducto="+codproducto+"&codsucursal="+codsucursal);

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Ingrediente asociados a Productos, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}

/////FUNCION PARA ELIMINAR PRODUCTOS 
function EliminarProducto(codproducto,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Producto?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codproducto="+codproducto+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#productos').load("consultas.php?CargaProductos=si");
            //hace la búsqueda
            /*$.ajax({
              type: "POST",
              url: "search.php?CargaProductos=si",
              data: "b="+$("#bproductos").val(),
              dataType: "html",
              success: function(data){                                                    
                $("#productos").empty();
                $("#productos").append(data);
              }
            });*/
                  
          } else if(data==2){ 

             swal("Oops", "Este Producto no puede ser Eliminado, tiene Ventas relacionadas!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Productos, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}

// FUNCION PARA CALCULAR DETALLES INGREDIENTES
function ProcesarCalculoIngrediente(indice){
    var cantidad = $('#cantidad_'+indice).val();
    var precioventa = $('#precioventaing_'+indice).val();
    var preciocompra = $('#preciocompraing_'+indice).val();
    var ValorNeto = 0;

    if (cantidad == "" || cantidad == "0.00") {

        $("#cantidad_"+indice).focus();
        $("#cantidad_"+indice).val("");
        $("#cantidad").css('border-color', '#f0ad4e');
        swal("Oops", "POR FAVOR INGRESE UNA CANTIDAD VÁLIDA!", "error");
        return false;
    }
    //REALIZAMOS LA MULTIPLICACION DE PRECIO COMPRA * CANTIDAD
    var ValorCompra = parseFloat(cantidad) * parseFloat(preciocompra);

    //REALIZAMOS LA MULTIPLICACION DE PRECIO VENTA * CANTIDAD
    var ValorVenta = parseFloat(cantidad) * parseFloat(precioventa);

    //CALCULO SUBTOTAL IVA SI
    $("#preciocompraing_"+indice).val(ValorCompra.toFixed(2));
    $("#txtmontocompra_"+indice).text(Separador(ValorCompra.toFixed(2)));
    //CALCULO SUBTOTAL IVA NO
    $("#precioventaing_"+indice).val(ValorVenta.toFixed(2));
    $("#txtmontoventa_"+indice).text(Separador(ValorVenta.toFixed(2)));

    //CALCULO DE PRECIO COMPRA
    var MontoCompra=0;
    $('.preciocompraing').each(function() {  
    MontoCompra += ($(this).val() == "0" ? "0" : parseFloat($(this).val()));
    }); 
    $('#preciocompra').val(MontoCompra.toFixed(2));

    //CALCULO DE PRECIO VENTA
    var MontoVenta=0;
    $('.precioventaing').each(function() {  
    MontoVenta += ($(this).val() == "0" ? "0" : parseFloat($(this).val()));
    }); 
    $('#precioventa').val(MontoVenta.toFixed(2));
}


// FUNCION PARA BUSQUEDA DE PRODUCTOS POR SUCURSAL
function BuscaProductosxSucursal(){

$('#muestraproductos').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var dataString = $("#productosxsucursal").serialize();
var url = 'funciones.php?BuscaProductosxSucursal=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestraproductos').empty();
                $('#muestraproductos').append(''+response+'').fadeIn("slow");
            }
      }); 
}


// FUNCION PARA BUSQUEDA DE PRODUCTOS VENDIDOS
function BuscaProductosVendidos(){
    
$('#muestraproductosvendidos').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#productosvendidos").serialize();
var url = 'funciones.php?BuscaProductosVendidos=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestraproductosvendidos').empty();
                $('#muestraproductosvendidos').append(''+response+'').fadeIn("slow");
            }
      }); 
}


// FUNCION PARA BUSQUEDA DE PRODUCTOS POR MONEDA
function BuscaProductosxMoneda(){
    
$('#muestraproductosxmoneda').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codmoneda = $("select#codmoneda").val();
var dataString = $("#productosxmoneda").serialize();
var url = 'funciones.php?BuscaProductosxMoneda=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestraproductosxmoneda').empty();
                $('#muestraproductosxmoneda').append(''+response+'').fadeIn("slow");
                
            }
      }); 
}


// FUNCION PARA BUSQUEDA DE KARDEX POR PRODUCTOS
function BuscaKardexProductos(){

$('#muestrakardex').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codproducto = $("#codproducto").val();
var dataString = $("#buscakardexproductos").serialize();
var url = 'funciones.php?BuscaKardexProducto=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestrakardex').empty();
                $('#muestrakardex').append(''+response+'').fadeIn("slow");
                
            }
      }); 
}

// FUNCION PARA BUSCAR KARDEX VALORIZADO DE PRODUCTOS
$(document).ready(function(){
//function BuscarPacientes() {  
    var consulta;
    //hacemos focus al campo de búsqueda
    $("#bkardexproductos").focus();
    //comprobamos si se pulsa una tecla
    $("#bkardexproductos").keyup(function(e){
      //obtenemos el texto introducido en el campo de búsqueda
      consulta = $("#bkardexproductos").val();
                                                                           
        //hace la búsqueda
        $.ajax({
          type: "POST",
          url: "search.php?CargaKardexValorizadoProductos=si",
          data: "b="+consulta,
          dataType: "html",
          beforeSend: function(){
              //imagen de carga
              $("#valorizado_productos").html('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>');
          },
          error: function(){
              swal("Oops", "Ha ocurrido un error en la petición Ajax, verifique por favor!", "error"); 
          },
          success: function(data){                                                    
            $("#valorizado_productos").empty();
            $("#valorizado_productos").append(data);
          }
      });
   });                                                               
});


// FUNCION PARA BUSQUEDA DE KARDEX INGREDIENTES VALORIZADO POR FECHAS
function BuscaValorizadoProductosxSucursales(){
    
$('#muestravalorizadoproductos').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var dataString = $("#valorizadoproductosxsucursales").serialize();
var url = 'funciones.php?BuscaValorizadoProductosxSucursal=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestravalorizadoproductos').empty();
                $('#muestravalorizadoproductos').append(''+response+'').fadeIn("slow");
            }
      }); 
}

// FUNCION PARA BUSQUEDA DE KARDEX PRODUCTOS VALORIZADO POR FECHAS
function BuscaValorizadoProductosxFechas(){
    
$('#muestrakardexvalorizadofechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#valorizadoproductosxfechas").serialize();
var url = 'funciones.php?BuscaKardexProductosxFechas=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestrakardexvalorizadofechas').empty();
                $('#muestrakardexvalorizadofechas').append(''+response+'').fadeIn("slow");
            }
      }); 
}

// FUNCION PARA CARGAR PRODUCTOS POR FAMILIAS EN VENTANA MODAL
function CargaProductos(){

$('#loadproductos').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var dataString = "CargaProductos=si";

$.ajax({
            type: "GET",
            url: "salas_mesas.php",
            data: dataString,
            success: function(response) {            
                $('#loadproductos').empty();
                $('#loadproductos').append(''+response+'').fadeIn("slow");  
            }
      });
}

// FUNCION PARA CARGAR MENU DE PRODUCTOS EN VENTANA MODAL
function CargarMenu(){

$('#muestra_menu').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var dataString = "Buscar_Menu=si";

$.ajax({
      type: "GET",
      url: "funciones.php",
      data: dataString,
      success: function(response) {            
          $('#muestra_menu').empty();
          $('#muestra_menu').append(''+response+'').fadeIn("slow");
          
      }
  });
}




















/////////////////////////////////// FUNCIONES DE COMBOS //////////////////////////////////////

// FUNCION PARA MOSTRAR COMBOS EN VENTANA MODAL
function VerCombo(codcombo,codsucursal){

$('#muestracombomodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaComboModal=si&codcombo='+codcombo+"&codsucursal="+codsucursal;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestracombomodal').empty();
                $('#muestracombomodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

// FUNCION PARA SUMAR STOCK A COMBO
function SumarCombo(idcombo,codcombo,nomcombo) 
{
  // aqui asigno cada valor a los campos correspondientes
  $("#savestockcombo #idcombo").val(idcombo);
  $("#savestockcombo #codcombo").val(codcombo);
  $("#savestockcombo #nomcombo").val(nomcombo);
}

// FUNCION PARA ACTUALIZAR COMBOS
function UpdateCombo(codcombo,codsucursal) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Actualizar este Combo?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Actualizar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "forcombo?codcombo="+codcombo+"&codsucursal="+codsucursal;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}

// FUNCION PARA AGREGAR PRODUCTOS A COMBOS
function AgregaProducto(codcombo,codsucursal) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Agregar Productos a este Combo?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "foragregaproductos?codcombo="+codcombo+"&codsucursal="+codsucursal;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}

/////FUNCION PARA ELIMINAR DETALLE DE COMBO 
function EliminaDetalleCombo(codcombo,codproducto,cantidad,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Producto del Combo?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codcombo="+codcombo+"&codproducto="+codproducto+"&cantidad="+cantidad+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $("#cargaproductos").load("funciones.php?BuscaDetallesCombo=si&codcombo="+codcombo+"&codsucursal="+codsucursal);

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Productos, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}

/////FUNCION PARA ELIMINAR COMBOS 
function EliminarCombo(codcombo,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Combo?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codcombo="+codcombo+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#combos').load("consultas.php?CargaCombos=si");
                  
          } else if(data==2){ 

             swal("Oops", "Este Combo no puede ser Eliminado, tiene Ventas relacionadas!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Combos, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}


// FUNCION PARA CALCULAR DETALLES PRODUCTOS EN ACTUALIZAR
function ProcesarCalculoProducto(indice){
    var cantidad = $('#cantidad_'+indice).val();
    var precioventa = $('#precioventadet_'+indice).val();
    var preciocompra = $('#preciocompradet_'+indice).val();
    var ValorNeto = 0;

    if (cantidad == "" || cantidad == "0" || cantidad == "0.00") {

        $("#cantidad_"+indice).focus();
        $("#cantidad").css('border-color', '#f0ad4e');
        swal("Oops", "POR FAVOR INGRESE UNA CANTIDAD VÁLIDA!", "error");
        return false;
    }
    //REALIZAMOS LA MULTIPLICACION DE PRECIO COMPRA * CANTIDAD
    var ValorCompra = parseFloat(cantidad) * parseFloat(preciocompra);

    //REALIZAMOS LA MULTIPLICACION DE PRECIO VENTA * CANTIDAD
    var ValorVenta = parseFloat(cantidad) * parseFloat(precioventa);

    //CALCULO SUBTOTAL IVA SI
    $("#montocompra_"+indice).val(ValorCompra.toFixed(2));
    $("#txtmontocompra_"+indice).text(Separador(ValorCompra.toFixed(2)));
    //CALCULO SUBTOTAL IVA NO
    $("#montoventa_"+indice).val(ValorVenta.toFixed(2));
    $("#txtmontoventa_"+indice).text(Separador(ValorVenta.toFixed(2)));

    //CALCULO DE PRECIO COMPRA
    var MontoCompra=0;
    $('.preciocompradet').each(function() {  
    MontoCompra += ($(this).val() == "0" ? "0" : parseFloat($(this).val()));
    }); 
    $('#preciocompra').val(MontoCompra.toFixed(2));

    //CALCULO DE PRECIO VENTA
    var MontoVenta=0;
    $('.precioventadet').each(function() {  
    MontoVenta += ($(this).val() == "0" ? "0" : parseFloat($(this).val()));
    }); 
    $('#precioventa').val(MontoVenta.toFixed(2));
}

// FUNCION PARA BUSQUEDA DE COMBOS POR SUCURSAL
function BuscaCombosxSucursal(){

$('#muestracombos').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var dataString = $("#combosxsucursal").serialize();
var url = 'funciones.php?BuscaCombosxSucursal=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestracombos').empty();
                $('#muestracombos').append(''+response+'').fadeIn("slow");
            }
      }); 
}

// FUNCION PARA BUSQUEDA DE COMBOS VENDIDOS
function BuscaCombosVendidos(){
    
$('#muestracombosvendidos').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#combosvendidos").serialize();
var url = 'funciones.php?BuscaCombosVendidos=si';

        $.ajax({
            type: "GET",
      url: url,
            data: dataString,
            success: function(response) {
                $('#muestracombosvendidos').empty();
                $('#muestracombosvendidos').append(''+response+'').fadeIn("slow");
                
            }
      }); 
}

// FUNCION PARA BUSQUEDA DE COMBOS POR MONEDA
function BuscaCombosxMoneda(){
    
$('#muestracombosxmoneda').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codmoneda = $("select#codmoneda").val();
var dataString = $("#combosxmoneda").serialize();
var url = 'funciones.php?BuscaCombosxMoneda=si';

        $.ajax({
            type: "GET",
      url: url,
            data: dataString,
            success: function(response) {
                $('#muestracombosxmoneda').empty();
                $('#muestracombosxmoneda').append(''+response+'').fadeIn("slow");
            }
      }); 
}

// FUNCION PARA BUSQUEDA DE KARDEX POR COMBOS
function BuscaKardexCombos(){

$('#muestrakardex').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codcombo = $("#codcombo").val();
var dataString = $("#buscakardexcombos").serialize();
var url = 'funciones.php?BuscaKardexCombo=si';

        $.ajax({
            type: "GET",
      url: url,
            data: dataString,
            success: function(response) {
                $('#muestrakardex').empty();
                $('#muestrakardex').append(''+response+'').fadeIn("slow");
                
            }
      }); 
}


// FUNCION PARA BUSQUEDA DE KARDEX COMBOS VALORIZADO POR FECHAS
function BuscaValorizadoCombosxSucursales(){
    
$('#muestravalorizadocombos').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var dataString = $("#valorizadocombosxsucursales").serialize();
var url = 'funciones.php?BuscaValorizadoCombosxSucursal=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestravalorizadocombos').empty();
                $('#muestravalorizadocombos').append(''+response+'').fadeIn("slow");
            }
      }); 
}

// FUNCION PARA BUSQUEDA DE KARDEX COMBOS VALORIZADO POR FECHAS
function BuscaValorizadoCombosxFechas(){
    
$('#muestrakardexvalorizadofechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#valorizadocombosxfechas").serialize();
var url = 'funciones.php?BuscaKardexCombosxFechas=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestrakardexvalorizadofechas').empty();
                $('#muestrakardexvalorizadofechas').append(''+response+'').fadeIn("slow");
            }
      }); 
}


// FUNCION PARA CARGAR COMBOS POR PRODUCTOS EN VENTANA MODAL
function CargaCombos(){

$('#loadcombos').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var dataString = "CargaCombos=si";

$.ajax({
            type: "GET",
            url: "salas_mesas.php",
            data: dataString,
            success: function(response) {            
                $('#loadcombos').empty();
                $('#loadcombos').append(''+response+'').fadeIn("slow");
                
            }
      });
}




























/////////////////////////////////// FUNCIONES DE COMPRAS //////////////////////////////////////


// FUNCION PARA BUSCAR COMPRAS PAGADAS
function BuscarCompras(){
                        
$('#muestracompras').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');
                
var search = $("#bcompras").val();
var dataString = $("#busquedacompras").serialize();
var url = 'search.php?CargaCompras=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
      success: function(response) {            
        $('#muestracompras').empty();
        $('#muestracompras').append(''+response+'').fadeIn("slow");
      }
  });
}

// FUNCION PARA BUSCAR COMPRAS PENDIENTES
function BuscarCuentasxPagar(){
                        
$('#muestracuentasxpagar').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');
                
var search = $("#bcompras").val();
var dataString = $("#busquedacuentasxpagar").serialize();
var url = 'search.php?CargaCuentasxPagar=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
      success: function(response) {            
        $('#muestracuentasxpagar').empty();
        $('#muestracuentasxpagar').append(''+response+'').fadeIn("slow");
      }
  });
}

// FUNCION PARA MOSTRAR FORMA DE PAGO EN COMPRAS
function CargaFormaPagosCompras(){

  var valor = $("#tipocompra").val();

      if (valor === "" || valor === true) {
         
          $("#formacompra").attr('disabled', true);
          $("#fechavencecredito").attr('disabled', true);

      } else if (valor === "CONTADO" || valor === true) {
         
          $("#formacompra").attr('disabled', false);
          $("#fechavencecredito").attr('disabled', true);

      } else {

          $("#formacompra").attr('disabled', true);
          $("#fechavencecredito").attr('disabled', false);
      }
}

// FUNCION PARA MOSTRAR COMPRA PAGADA EN VENTANA MODAL
function VerCompraPagada(codcompra,codsucursal){

$('#muestracompramodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaCompraPagadaModal=si&codcompra='+codcompra+"&codsucursal="+codsucursal;

$.ajax({
            type: "GET",
                  url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestracompramodal').empty();
                $('#muestracompramodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}


// FUNCION PARA MOSTRAR COMPRA PENDIENTE EN VENTANA MODAL
function VerCompraPendiente(codcompra,codsucursal){

$('#muestracompramodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaCompraPendienteModal=si&codcompra='+codcompra+"&codsucursal="+codsucursal;

$.ajax({
            type: "GET",
                  url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestracompramodal').empty();
                $('#muestracompramodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

// FUNCION PARA ACTUALIZAR COMPRAS
function UpdateCompra(codcompra,codsucursal,proceso,status) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Actualizar esta Compra de Producto?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Actualizar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "forcompra?codcompra="+codcompra+"&codsucursal="+codsucursal+"&proceso="+proceso+"&status="+status;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}


// FUNCION PARA CALCULAR DETALLES VENTAS EN ACTUALIZAR
function ProcesarCalculoCompra(indice){
    var cantidad = $('#cantcompra_'+indice).val();
    var preciocompra = $('#preciocompra_'+indice).val();
    var precioconiva = $('#precioconiva_'+indice).val();
    var neto = $('#valorneto_'+indice).val();
    var descproducto = $('#descfactura_'+indice).val();
    var ivaproducto = $('#ivaproducto_'+indice).val();
    var ivg = $('#iva').val();
    var desc = $('#descuento').val();
    var ValorNeto = 0;

    if (cantidad == "" || cantidad == "0" || cantidad == "0.00") {

        $("#cantcompra_"+indice).focus();
        $("#cantcompra_"+indice).css('border-color', '#f0ad4e');
        swal("Oops", "POR FAVOR INGRESE UNA CANTIDAD VÁLIDA!", "error");
        return false;
    }
    //REALIZAMOS LA MULTIPLICACION DE PRECIO VENTA * CANTIDAD
    var ValorTotal = parseFloat(cantidad) * parseFloat(preciocompra);

    //CALCULO DEL TOTAL DEL DESCUENTO %
    var Descuento = ValorTotal * descproducto / 100;
    var ValorNeto = parseFloat(ValorTotal) - parseFloat(Descuento);
    
    //CALCULO VALOR TOTAL
    $("#valortotal_"+indice).val(ValorTotal.toFixed(2));
    $("#txtvalortotal_"+indice).text(Separador(ValorTotal.toFixed(2)));

    //CALCULO TOTAL DESCUENTO
    $("#totaldescuentoc_"+indice).val(Descuento.toFixed(2));
    $("#txtdescproducto_"+indice).text(Separador(Descuento.toFixed(2)));

    //CALCULO VALOR NETO
    $("#valorneto_"+indice).val(ValorNeto.toFixed(2));
    $("#txtvalorneto_"+indice).text(Separador(ValorNeto.toFixed(2)));

    //CALCULO SUBTOTAL IVA SI
    $("#subtotalivasi_"+indice).val(ivaproducto != '0.00' ? ValorNeto.toFixed(2) : "0");
    
    //CALCULO SUBTOTAL IVA NO
    $("#subtotalivano_"+indice).val(ivaproducto == "0.00" ? ValorNeto.toFixed(2) : "0");

    /*################################ CALCULO DISCRIMINADO ################################*/
    
    //CALCULO SUBTOTAL DISCRIMINADO
    ivg2  = ivg;
    var ValorImpuesto = (ivg2 <= 9) ? "1.0"+parseInt(ivg2) : "1."+parseInt(ivg2);
    var Discriminado = parseFloat(precioconiva) / ValorImpuesto;
    var SubtotalDiscriminado = parseFloat(precioconiva) - parseFloat(Discriminado.toFixed(2));
    var BaseDiscriminado = parseFloat(SubtotalDiscriminado.toFixed(2)) * parseFloat(cantidad);
    //TotalIvaGeneral = parseFloat(TotalIvaGeneral.toFixed(2)) + parseFloat(BaseDiscriminado.toFixed(2));
    var RestoDiscriminado = parseFloat(ValorNeto) - parseFloat(BaseDiscriminado.toFixed(2));
    
    //CALCULO SUBTOTAL IMPUESTOS
    $("#subtotalimpuestos_"+indice).val(BaseDiscriminado.toFixed(2));

    //CALCULO SUBTOTAL DISCRIMINADO
    $("#subtotaldiscriminado_"+indice).val(ivaproducto != "0.00" ? RestoDiscriminado.toFixed(2) : "0"); 

    /*################################ CALCULO DISCRIMINADO ################################*/

    //CALCULO DE SUBTOTAL CON IVA
    var BaseImpIva1=0;
    $('.subtotalivasi').each(function() {
    ($(this).val() != "0" ? BaseImpIva1 += parseFloat($(this).val()) : BaseImpIva1);
    }); 
    //$('#txtsubtotal').val(Math.round(BaseImpIva1.toFixed(2)));
    //$('#lblsubtotal').text(Separador(Math.round(BaseImpIva1.toFixed(2))));

    //CALCULO DE SUBTOTAL SIN IVA
    var BaseImpIva2=0;
    $('.subtotalivano').each(function() {
    ($(this).val() != "0" ? BaseImpIva2 += parseFloat($(this).val()) : BaseImpIva2);
    }); 
    $('#txtsubtotal2').val(BaseImpIva2.toFixed(2));
    $('#lblsubtotal2').text(Separador(BaseImpIva2.toFixed(2)));

    //CALCULO DE SUBTOTAL GENERAL
    var SubTotal=0;
    $('.subtotaldiscriminado').each(function() {
    SubTotal += parseFloat($(this).val());
    });
    var SubtotalBaseGeneral = parseFloat(SubTotal.toFixed(2)) + parseFloat(BaseImpIva2.toFixed(2));
    $('#lblsubtotal').text(Separador(SubTotal.toFixed(2)));
    $('#txtsubtotal').val(SubTotal.toFixed(2));
    $('#txtdiscriminado').val(SubtotalBaseGeneral.toFixed(2));
    //$('#lblsubtotal').text(Separador(Math.round(SubTotal+BaseImpIva2)));

    //CALCULO DE TOTAL IMPUEST0S 
    var TotalIvaGeneral=0;
    $('.subtotalimpuestos').each(function() {  
    ($(this).val() != "0" ? TotalIvaGeneral += parseFloat($(this).val()) : TotalIvaGeneral);
    }); 
    $('#txtIva').val(TotalIvaGeneral.toFixed(2));
    $('#lbliva').text(Separador(TotalIvaGeneral.toFixed(2)));

    //CALCULO DE TOTAL DESCONTADO
    var TotalDescontado=0;
    $('.totaldescuentov').each(function() { 
    ($(this).val() != "0" ? TotalDescontado += parseFloat($(this).val()) : TotalDescontado); 
    });
    $('#txtdescontado').val(TotalDescontado.toFixed(2));
    $('#lbldescontado').text(Separador(TotalDescontado.toFixed(2))); 

    //CALCULAMOS DESCUENTO POR PRODUCTO
    desc2  = desc/100;

    //CALCULO DEL TOTAL DE FACTURA
    var Total = parseFloat(SubtotalBaseGeneral) + parseFloat(TotalIvaGeneral);
    TotalDescuentoGeneral   = parseFloat(Total.toFixed(2)) * parseFloat(desc2.toFixed(2));
    TotalFactura   = parseFloat(Total.toFixed(2)) - parseFloat(TotalDescuentoGeneral.toFixed(2));

    $('#txtTotal').val(TotalFactura.toFixed(2));
    $('#lbltotal').text(Separador(TotalFactura.toFixed(2)));
}


/////FUNCION PARA ELIMINAR DETALLES DE COMPRAS PAGADAS EN VENTANA MODAL
function EliminarDetallesComprasPagadasModal(coddetallecompra,codcompra,codsucursal,codproveedor,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Compra?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetallecompra="+coddetallecompra+"&codcompra="+codcompra+"&codsucursal="+codsucursal+"&codproveedor="+codproveedor+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#muestracompramodal').load("funciones.php?BuscaCompraPagadaModal=si&codcompra="+codcompra+"&codsucursal="+codsucursal); 
            //hace la búsqueda
            $.ajax({
              type: "POST",
              url: "search.php?CargaCompras=si",
              data: "b="+$("#bcompras").val(),
              dataType: "html",
              success: function(data){                                                    
                $("#compras").empty();
                $("#compras").append(data);
              }
            });

          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Compras en este Módulo, realice la Eliminación completa de la Compra!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Compras, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}


/////FUNCION PARA ELIMINAR DETALLES DE COMPRAS PENDIENTES EN VENTANA MODAL
function EliminarDetallesComprasPendientesModal(coddetallecompra,codcompra,codsucursal,codproveedor,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Compra?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetallecompra="+coddetallecompra+"&codcompra="+codcompra+"&codsucursal="+codsucursal+"&codproveedor="+codproveedor+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#muestracompramodal').load("funciones.php?BuscaCompraPendienteModal=si&codcompra="+codcompra+"&codsucursal="+codsucursal); 
            //hace la búsqueda
            $.ajax({
              type: "POST",
              url: "search.php?CargaCuentasxPagar=si",
              data: "b="+$("#bcomprasp").val(),
              dataType: "html",
              success: function(data){                                                    
                $("#cuentasxpagar").empty();
                $("#cuentasxpagar").append(data);
              }
            });

          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Compras en este Módulo, realice la Eliminación completa de la Compra!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Compras, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}


/////FUNCION PARA ELIMINAR DETALLES DE COMPRAS EN ACTUALIZAR
function EliminarDetallesComprasUpdate(coddetallecompra,codcompra,codsucursal,codproveedor,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Compra?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetallecompra="+coddetallecompra+"&codcompra="+codcompra+"&codsucursal="+codsucursal+"&codproveedor="+codproveedor+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#detallescomprasupdate').load("funciones.php?MuestraDetallesComprasUpdate=si&codcompra="+codcompra+"&codsucursal="+codsucursal); 
          
          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Compras en este Módulo, realice la Eliminación completa de la Compra!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Compras, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}

/////FUNCION PARA ELIMINAR COMPRAS 
function EliminarCompra(codcompra,codsucursal,codproveedor,status,criterio,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Compra?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codcompra="+codcompra+"&codsucursal="+codsucursal+"&codproveedor="+codproveedor+"&tipo="+tipo,
                  success: function(data){

          if(data==1){
            swal("Eliminado!", "Datos eliminados con éxito!", "success");
             if (status=="P") {
            $('#muestracompras').load("search.php?CargaCompras=si&bcompras="+criterio); 
            } else {
            $('#muestracuentasxpagar').load("search.php?CargaCuentasxPagar=si&bcompras="+criterio);  
            }
          
          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Compras de Productos, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}

/////FUNCION PARA PAGAR FACTURA DE COMPRAS 
function PagarCompra(codcompra,codsucursal,criterio,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Pagar Esta Factura de Compra?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Pagar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codcompra="+codcompra+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Factura Pagada!", "La Compra a sido Pagada con éxito!", "success");
            $('#muestracuentasxpagar').load("search.php?CargaCuentasxPagar=si&bcompras="+criterio);
                  
          } else { 

             swal("Oops", "Usted no tiene Acceso para Pagar Compras de Productos, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}

// FUNCION PARA BUSQUEDA DE COMPRAS POR FECHAS
function BuscarComprasxFechas(){
                        
$('#muestracomprasxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#comprasxfechas").serialize();
var url = 'funciones.php?BuscaComprasxFechas=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestracomprasxfechas').empty();
                $('#muestracomprasxfechas').append(''+response+'').fadeIn("slow");
                
             }
      });
}


// FUNCION PARA BUSQUEDA DE COMPRAS POR PROVEEDORES
function BuscarComprasxProveedores(){
                        
$('#muestracomprasxproveedores').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');
                
var codsucursal = $("#codsucursal").val();
var codproveedor = $("select#codproveedor").val();
var dataString = $("#comprasxproveedores").serialize();
var url = 'funciones.php?BuscaComprasxProvedores=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
    success: function(response) {            
        $('#muestracomprasxproveedores').empty();
        $('#muestracomprasxproveedores').append(''+response+'').fadeIn("slow");
        
     }
  });
}

























/////////////////////////////////// FUNCIONES DE TRASPASOS //////////////////////////////////////

// FUNCION PARA MOSTRAR TRASPASOS EN VENTANA MODAL
function VerTraspaso(codtraspaso,codsucursal){

$('#muestratraspasomodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaTraspasoModal=si&codtraspaso='+codtraspaso+"&codsucursal="+codsucursal;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestratraspasomodal').empty();
                $('#muestratraspasomodal').append(''+response+'').fadeIn("slow");
            }
      });
}

// FUNCION PARA ACTUALIZAR TRASPASOS
function UpdateTraspaso(codtraspaso,codsucursal,proceso) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Actualizar este Traspaso?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Actualizar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "fortraspaso?codtraspaso="+codtraspaso+"&codsucursal="+codsucursal+"&proceso="+proceso;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}

// FUNCION PARA CALCULAR DETALLES COTIZACIONES EN ACTUALIZAR
function ProcesarCalculoTraspaso(indice){
    var cantidad = $('#cantidad_'+indice).val();
    var preciocompra = $('#preciocompra_'+indice).val();
    var precioventa = $('#precioventa_'+indice).val();
    var precioconiva = $('#precioconiva_'+indice).val();
    var valortotal = $('#valortotal_'+indice).val();
    var neto = $('#valorneto_'+indice).val();
    var descproducto = $('#descproducto_'+indice).val();
    var ivaproducto = $('#ivaproducto_'+indice).val();
    var ivg = $('#iva').val();
    var desc = $('#descuento').val();
    var ValorNeto = 0;

    if (cantidad == "" || cantidad == "0" || cantidad == "0.00") {

        $("#cantidad_"+indice).focus();
        $("#cantidad_"+indice).css('border-color', '#f0ad4e');
        swal("Oops", "POR FAVOR INGRESE UNA CANTIDAD VÁLIDA!", "error");
        return false;
    }
    //REALIZAMOS LA MULTIPLICACION DE PRECIO VENTA * CANTIDAD
    var ValorTotal = parseFloat(cantidad) * parseFloat(precioventa);

    //REALIZAMOS LA MULTIPLICACION DE PRECIO COMPRA * CANTIDAD
    var ValorTotal2 = parseFloat(cantidad) * parseFloat(preciocompra);

    //CALCULO DEL TOTAL DEL DESCUENTO %
    var Descuento = ValorTotal * descproducto / 100;
    var ValorNeto = parseFloat(ValorTotal) - parseFloat(Descuento);

    //CALCULO VALOR TOTAL
    $("#valortotal_"+indice).val(ValorTotal.toFixed(2));
    $("#txtvalortotal_"+indice).text(Separador(ValorTotal.toFixed(2)));

    //CALCULO TOTAL DESCUENTO
    $("#totaldescuentov_"+indice).val(Descuento.toFixed(2));
    $("#txtdescproducto_"+indice).text(Separador(Descuento.toFixed(2)));

    //CALCULO VALOR NETO
    $("#valorneto_"+indice).val(ValorNeto.toFixed(2));
    $("#txtvalorneto_"+indice).text(Separador(ValorNeto.toFixed(2)));

    //CALCULO VALOR NETO 2
    $("#valorneto2_"+indice).val(ValorTotal2.toFixed(2));

    //CALCULO SUBTOTAL IVA SI
    $("#subtotalivasi_"+indice).val(ivaproducto != '0.00' ? ValorNeto.toFixed(2) : "0");
    //CALCULO SUBTOTAL IVA NO
    $("#subtotalivano_"+indice).val(ivaproducto == "0.00" ? ValorNeto.toFixed(2) : "0"); 

    /*################################ CALCULO DISCRIMINADO ################################*/
    
    //CALCULO SUBTOTAL DISCRIMINADO
    ivg2  = ivg;
    var ValorImpuesto = (ivg2 <= 9) ? "1.0"+parseInt(ivg2) : "1."+parseInt(ivg2);
    var Discriminado = parseFloat(precioconiva) / ValorImpuesto;
    var SubtotalDiscriminado = parseFloat(precioconiva) - parseFloat(Discriminado.toFixed(2));
    var BaseDiscriminado = parseFloat(SubtotalDiscriminado.toFixed(2)) * parseFloat(cantidad);
    //TotalIvaGeneral = parseFloat(TotalIvaGeneral.toFixed(2)) + parseFloat(BaseDiscriminado.toFixed(2));
    var RestoDiscriminado = parseFloat(ValorNeto) - parseFloat(BaseDiscriminado.toFixed(2));
    
    //CALCULO SUBTOTAL IMPUESTOS
    $("#subtotalimpuestos_"+indice).val(BaseDiscriminado.toFixed(2));

    //CALCULO SUBTOTAL DISCRIMINADO
    $("#subtotaldiscriminado_"+indice).val(ivaproducto != "0.00" ? RestoDiscriminado.toFixed(2) : "0"); 

    /*################################ CALCULO DISCRIMINADO ################################*/

    //CALCULO DE VALOR NETO PARA COMPRAS
    var NetoCompra=0;
    $('.valorneto2').each(function() {  
    ($(this).val() != "0" ? NetoCompra += parseFloat($(this).val()) : NetoCompra);
    });

   //CALCULO DE SUBTOTAL CON IVA
    var BaseImpIva1=0;
    $('.subtotalivasi').each(function() {
    ($(this).val() != "0" ? BaseImpIva1 += parseFloat($(this).val()) : BaseImpIva1);
    }); 
    //$('#txtsubtotal').val(Math.round(BaseImpIva1.toFixed(2)));
    //$('#lblsubtotal').text(Separador(Math.round(BaseImpIva1.toFixed(2))));

    //CALCULO DE SUBTOTAL SIN IVA
    var BaseImpIva2=0;
    $('.subtotalivano').each(function() {
    ($(this).val() != "0" ? BaseImpIva2 += parseFloat($(this).val()) : BaseImpIva2);
    }); 
    $('#txtsubtotal2').val(BaseImpIva2.toFixed(2));
    $('#lblsubtotal2').text(Separador(BaseImpIva2.toFixed(2)));

    //CALCULO DE SUBTOTAL GENERAL
    var SubTotal=0;
    $('.subtotaldiscriminado').each(function() {
    SubTotal += parseFloat($(this).val());
    });
    var SubtotalBaseGeneral = parseFloat(SubTotal.toFixed(2)) + parseFloat(BaseImpIva2.toFixed(2));
    $('#lblsubtotal').text(Separador(SubTotal.toFixed(2)));
    $('#txtsubtotal').val(SubTotal.toFixed(2));
    $('#txtdiscriminado').val(SubtotalBaseGeneral.toFixed(2));
    //$('#lblsubtotal').text(Separador(Math.round(SubTotal+BaseImpIva2)));

    //CALCULO DE TOTAL IMPUEST0S 
    var TotalIvaGeneral=0;
    $('.subtotalimpuestos').each(function() {  
    ($(this).val() != "0" ? TotalIvaGeneral += parseFloat($(this).val()) : TotalIvaGeneral);
    }); 
    $('#txtIva').val(TotalIvaGeneral.toFixed(2));
    $('#lbliva').text(Separador(TotalIvaGeneral.toFixed(2)));

    //CALCULO DE TOTAL DESCONTADO
    var TotalDescontado=0;
    $('.totaldescuentov').each(function() { 
    ($(this).val() != "0" ? TotalDescontado += parseFloat($(this).val()) : TotalDescontado); 
    });
    $('#txtdescontado').val(TotalDescontado.toFixed(2));
    $('#lbldescontado').text(Separador(Math.round(TotalDescontado.toFixed(2)))); 

    //CALCULAMOS DESCUENTO POR PRODUCTO
    desc2  = desc/100;

    //CALCULO DEL TOTAL DE FACTURA
    var Total = parseFloat(SubtotalBaseGeneral) + parseFloat(TotalIvaGeneral);
    TotalDescuentoGeneral   = parseFloat(Total.toFixed(2)) * parseFloat(desc2.toFixed(2));
    TotalFactura   = parseFloat(Total.toFixed(2)) - parseFloat(TotalDescuentoGeneral.toFixed(2));

    $('#txtTotal').val(TotalFactura.toFixed(2));
    $('#txtTotalCompra').val(NetoCompra.toFixed(2));
    $('#lbltotal').text(Separador(TotalFactura.toFixed(2)));
}

/////FUNCION PARA ELIMINAR DETALLES DE TRASPASOS EN VENTANA MODAL
function EliminarDetalleTraspasoModal(coddetalletraspaso,codtraspaso,recibe,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Traspaso?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetalletraspaso="+coddetalletraspaso+"&codtraspaso="+codtraspaso+"&recibe="+recibe+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#muestratraspasomodal').load("funciones.php?BuscaTraspasoModal=si&codtraspaso="+codtraspaso+"&codsucursal="+codsucursal); 
            $('#traspasos').load("consultas.php?CargaTraspasos=si");    
          
          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Traspasos en este Módulo, realice la Eliminación completa del Traspaso!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Traspasos, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}

/////FUNCION PARA ELIMINAR DETALLES DE TRASPASOS EN ACTUALIZAR
function EliminarDetalleTraspasoUpdate(coddetalletraspaso,codtraspaso,recibe,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Traspaso?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetalletraspaso="+coddetalletraspaso+"&codtraspaso="+codtraspaso+"&recibe="+recibe+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#detallestraspasoupdate').load("funciones.php?MuestraDetallesTraspasoUpdate=si&codtraspaso="+codtraspaso+"&codsucursal="+codsucursal); 
          
          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Traspasos en este Módulo, realice la Eliminación completa del Traspaso!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Traspasos, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}

/////FUNCION PARA ELIMINAR TRASPASOS 
function EliminarTraspaso(codtraspaso,recibe,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Traspaso?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codtraspaso="+codtraspaso+"&recibe="+recibe+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#traspasos').load("consultas.php?CargaTraspasos=si");
                  
          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Traspasos, no tienes los privilegios dentro del Sistema!", "error"); 

                }
            }
        })
    });
}


// FUNCION PARA BUSQUEDA DE TRASPASOS POR SUCURSAL
function BuscarTraspasosxSucursal(){
                        
$('#muestratraspasosxsucursal').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

codsucursal = $("#codsucursal").val();
var dataString = $("#traspasosxsucursal").serialize();
var url = 'funciones.php?BuscaTraspasosxSucursal=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
    success: function(response) {            
      $('#muestratraspasosxsucursal').empty();
      $('#muestratraspasosxsucursal').append(''+response+'').fadeIn("slow");
      }
  });
}


// FUNCION PARA BUSQUEDA DE TRASPASOS POR FECHAS
function BuscarTraspasosxFechas(){
                        
$('#muestratraspasosxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#traspasosxfechas").serialize();
var url = 'funciones.php?BuscaTraspasosxFechas=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
    success: function(response) {            
      $('#muestratraspasosxfechas').empty();
      $('#muestratraspasosxfechas').append(''+response+'').fadeIn("slow");    
    }
  });
}

// FUNCION PARA BUSQUEDA DE DETALLES TRASPASOS X FECHAS
function BuscaDetallesTraspasosxFechas(){
    
$('#muestradetallestraspasosxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#detallestraspasosxfechas").serialize();
var url = 'funciones.php?BuscaDetallesTraspasosxFechas=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestradetallestraspasosxfechas').empty();
                $('#muestradetallestraspasosxfechas').append(''+response+'').fadeIn("slow");
            }
      }); 
}


// FUNCION PARA BUSQUEDA DE DETALLES TRASPASOS X SUCURSAL
function BuscaDetallesTraspasosxSucursal(){
    
$('#muestradetallestraspasosxsucursal').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var recibe = $("#recibe").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#detallestraspasosxsucursal").serialize();
var url = 'funciones.php?BuscaDetallesTraspasosxSucursal=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestradetallestraspasosxsucursal').empty();
                $('#muestradetallestraspasosxsucursal').append(''+response+'').fadeIn("slow");
            }
      }); 
}


// FUNCION PARA BUSQUEDA DE PRODUCTOS TRASPASOS
function BuscaProductosTraspasos(){
    
$('#muestraproductostraspasos').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#productostraspasos").serialize();
var url = 'funciones.php?BuscaProductosTraspasos=si';

    $.ajax({
        type: "GET",
        url: url,
        data: dataString,
        success: function(response) {
            $('#muestraproductostraspasos').empty();
            $('#muestraproductostraspasos').append(''+response+'').fadeIn("slow");
        }
  }); 
}

// FUNCION PARA BUSQUEDA DE INGRDIENTES TRASPASOS
function BuscaIngredientesTraspasos(){
    
$('#muestraingredientestraspasos').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#ingredientestraspasos").serialize();
var url = 'funciones.php?BuscaIngredientesTraspasos=si';

    $.ajax({
        type: "GET",
        url: url,
        data: dataString,
        success: function(response) {
            $('#muestraingredientestraspasos').empty();
            $('#muestraingredientestraspasos').append(''+response+'').fadeIn("slow");
        }
  }); 
}


















/////////////////////////////////// FUNCIONES DE COTIZACIONES //////////////////////////////////////

//FUNCION PARA CALCULAR DEVOLUCION DE MONTO
function DevolucionCotizacion(){
      
    if ($('input#txtTotal').val()==0.00 || $('input#txtTotal').val()==0 || $('input#txtTotal').val()=="") {
              
        $("#montopagado").val("0.00");
        $("#montopagado2").val("0.00");
        swal("Oops", "POR FAVOR AGREGUE DETALLES PARA CONTINUAR CON LA VENTA DE PRODUCTOS!", "error");
        return false;
   
    } else {
      
    var montototal = $('input#txtTotal').val();
    var montodelivery = $('input#montodelivery').val();
    var montopagado = $('input#montopagado').val();
    var montopagado2 = $('input#montopagado2').val();
    var montodevuelto = $('input#montodevuelto').val(); 
            
    //REALIZO EL CALCULO Y MUESTRO LA DEVOLUCION
    var sumtotal = parseFloat(montototal) + parseFloat(montodelivery);
    var Sumatoria = parseFloat(sumtotal.toFixed(2));

    var sumpagado = parseFloat(montopagado) + parseFloat(montopagado2);
    var subtotal= parseFloat(sumpagado);
    total = parseFloat(sumpagado) - parseFloat(sumtotal);
    var original = parseFloat(total.toFixed(2));

    $("#TextImporte").text((montopagado == "" || montopagado == "0" || montopagado == "0.00") ? Separador(Sumatoria.toFixed(2)) : Separador(Sumatoria.toFixed(2)));
    $("#txtImporte").val((montopagado == "" || montopagado == "0" || montopagado == "0.00") ? Sumatoria.toFixed(2) : Sumatoria.toFixed(2));
    $("#TextPagado").text((montopagado == "" || montopagado == "0" || montopagado == "0.00") ? Separador(sumtotal) : Separador(sumpagado.toFixed(2)));
    $("#TextCambio").text((montopagado == "" || montopagado == "0" || montopagado == "0.00") ? Separador(sumtotal) : Separador(original.toFixed(2)));
    $("#montodevuelto").val((montopagado == "" || montopagado == "0" || montopagado == "0.00") ? sumtotal : original.toFixed(2));
   }
}

// FUNCION PARA MOSTRAR CONDICIONES DE PAGO
function CargaCondicionesPagosCotizacion(){
    
var tipopago = $('input:radio[name=tipopago]:checked').val();
var montototal = $('input#txtTotal').val();
var montodelivery = $('input#montodelivery').val(); 

var sumtotal = parseFloat(montototal) + parseFloat(montodelivery);
var Sumatoria = parseFloat(sumtotal.toFixed(2));

$("#TextImporte").text(Sumatoria.toFixed(2));
$("#TextPagado").text(tipopago == "CREDITO" ? "0.00" : Separador(montototal));
$("#TextCambio").text("0.00");

var dataString = 'BuscaCondicionesPagos=si&tipopago='+tipopago+"&txtTotal="+montototal;

    $.ajax({
        type: "GET",
            url: "detalles_cotizaciones.php",
            data: dataString,
            success: function(response) {            
            $('#muestra_condiciones').empty();
            $('#muestra_condiciones').append(''+response+'').fadeIn("slow");                
        }
    });
}

// FUNCION PARA BUSCAR COTIZACIONES
function BuscarCotizaciones(){
                        
$('#muestracotizaciones').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');
                
var search = $("#bcotizaciones").val();
var dataString = $("#busquedacotizaciones").serialize();
var url = 'search.php?CargaCotizaciones=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
      success: function(response) {            
        $('#muestracotizaciones').empty();
        $('#muestracotizaciones').append(''+response+'').fadeIn("slow");
      }
  });
}

// FUNCION PARA MOSTRAR COTIZACIONES EN VENTANA MODAL
function VerCotizacion(codcotizacion,codsucursal){

$('#muestracotizacionmodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaCotizacionModal=si&codcotizacion='+codcotizacion+"&codsucursal="+codsucursal;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestracotizacionmodal').empty();
                $('#muestracotizacionmodal').append(''+response+'').fadeIn("slow");
            }
      });
}

// FUNCION PARA CARGAR DATOS DE COTIZACION
function ProcesaCotizacion(codcotizacion,codsucursal,codcliente,busqueda,nombres,limitecredito,totalpago) 
{
  // aqui asigno cada valor a los campos correspondientes
  $("#procesacotizacion #codcotizacion").val(codcotizacion);
  $("#procesacotizacion #codsucursal").val(codsucursal);
  $("#procesacotizacion #codcliente").val(codcliente);
  $("#procesacotizacion #busqueda").val(busqueda);
  $("#procesacotizacion #TextCliente").text(nombres);
  $("#procesacotizacion #TextCredito").text(limitecredito);
  $("#procesacotizacion #TextImporte").text(totalpago);
  $("#procesacotizacion #txtImporte").val(totalpago);
  $("#procesacotizacion #txtTotal").val(totalpago);
  $("#procesacotizacion #TextPagado").text(totalpago);
  $("#procesacotizacion #montopagado").val(totalpago);
}


//FUNCIONES PARA ACTIVAR-DESACTIVAR MONTO DELIVERY
$(document).ready(function(){
   $('#repartidores').on('change', function() {

    var two = $('select#repartidores').val();

        if (two != "" || two === true) {

        $("#montodelivery").attr('disabled', false);
        $("#montodelivery").focus();

        } else {

        $("#montodelivery").attr('disabled', true);

        } 
    });
});

//FUNCIONES PARA ACTIVAR-DESACTIVAR MONTO PAGO #2
$(document).ready(function(){
   $('#formapago2').on('change', function() {

    var two = $('select#formapago2').val();

        if (two != "" || two === true) {

        $("#montopagado2").attr('disabled', false);
        $("#montopagado2").focus();

        } else {

        $("#montopagado2").attr('disabled', true);

        } 
    });
});


// FUNCION PARA ACTUALIZAR COTIZACIONES
function UpdateCotizacion(codcotizacion,codsucursal,proceso) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Actualizar esta Cotización de Producto?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Actualizar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "forcotizacion?codcotizacion="+codcotizacion+"&codsucursal="+codsucursal+"&proceso="+proceso;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}

// FUNCION PARA CALCULAR DETALLES COTIZACIONES EN ACTUALIZAR
function ProcesarCalculoCotizacion(indice){
    var cantidad = $('#cantcotizacion_'+indice).val();
    var preciocompra = $('#preciocompra_'+indice).val();
    var precioventa = $('#precioventa_'+indice).val();
    var precioconiva = $('#precioconiva_'+indice).val();
    var valortotal = $('#valortotal_'+indice).val();
    var neto = $('#valorneto_'+indice).val();
    var descproducto = $('#descproducto_'+indice).val();
    var ivaproducto = $('#ivaproducto_'+indice).val();
    var ivg = $('#iva').val();
    var desc = $('#descuento').val();
    var ValorNeto = 0;

    if (cantidad == "" || cantidad == "0" || cantidad == "0.00") {

        $("#cantcotizacion_"+indice).focus();
        $("#cantcotizacion_"+indice).css('border-color', '#f0ad4e');
        swal("Oops", "POR FAVOR INGRESE UNA CANTIDAD VÁLIDA!", "error");
        return false;
    }
    //REALIZAMOS LA MULTIPLICACION DE PRECIO VENTA * CANTIDAD
    var ValorTotal = parseFloat(cantidad) * parseFloat(precioventa);

    //REALIZAMOS LA MULTIPLICACION DE PRECIO COMPRA * CANTIDAD
    var ValorTotal2 = parseFloat(cantidad) * parseFloat(preciocompra);

    //CALCULO DEL TOTAL DEL DESCUENTO %
    var Descuento = ValorTotal * descproducto / 100;
    var ValorNeto = parseFloat(ValorTotal) - parseFloat(Descuento);

    //CALCULO VALOR TOTAL
    $("#valortotal_"+indice).val(ValorTotal.toFixed(2));
    $("#txtvalortotal_"+indice).text(Separador(ValorTotal.toFixed(2)));

    //CALCULO TOTAL DESCUENTO
    $("#totaldescuentov_"+indice).val(Descuento.toFixed(2));
    $("#txtdescproducto_"+indice).text(Separador(Descuento.toFixed(2)));

    //CALCULO VALOR NETO
    $("#valorneto_"+indice).val(ValorNeto.toFixed(2));
    $("#txtvalorneto_"+indice).text(Separador(ValorNeto.toFixed(2)));

    //CALCULO VALOR NETO 2
    $("#valorneto2_"+indice).val(ValorTotal2.toFixed(2));

    //CALCULO SUBTOTAL IVA SI
    $("#subtotalivasi_"+indice).val(ivaproducto != '0.00' ? ValorNeto.toFixed(2) : "0");
    //CALCULO SUBTOTAL IVA NO
    $("#subtotalivano_"+indice).val(ivaproducto == "0.00" ? ValorNeto.toFixed(2) : "0"); 

    /*################################ CALCULO DISCRIMINADO ################################*/
    
    //CALCULO SUBTOTAL DISCRIMINADO
    ivg2  = ivg;
    var ValorImpuesto = (ivg2 <= 9) ? "1.0"+parseInt(ivg2) : "1."+parseInt(ivg2);
    var Discriminado = parseFloat(precioconiva) / ValorImpuesto;
    var SubtotalDiscriminado = parseFloat(precioconiva) - parseFloat(Discriminado.toFixed(2));
    var BaseDiscriminado = parseFloat(SubtotalDiscriminado.toFixed(2)) * parseFloat(cantidad);
    //TotalIvaGeneral = parseFloat(TotalIvaGeneral.toFixed(2)) + parseFloat(BaseDiscriminado.toFixed(2));
    var RestoDiscriminado = parseFloat(ValorNeto) - parseFloat(BaseDiscriminado.toFixed(2));
    
    //CALCULO SUBTOTAL IMPUESTOS
    $("#subtotalimpuestos_"+indice).val(BaseDiscriminado.toFixed(2));

    //CALCULO SUBTOTAL DISCRIMINADO
    $("#subtotaldiscriminado_"+indice).val(ivaproducto != "0.00" ? RestoDiscriminado.toFixed(2) : "0"); 

    /*################################ CALCULO DISCRIMINADO ################################*/

    //CALCULO DE VALOR NETO PARA COMPRAS
    var NetoCompra=0;
    $('.valorneto2').each(function() {  
    ($(this).val() != "0" ? NetoCompra += parseFloat($(this).val()) : NetoCompra);
    });

   //CALCULO DE SUBTOTAL CON IVA
    var BaseImpIva1=0;
    $('.subtotalivasi').each(function() {
    ($(this).val() != "0" ? BaseImpIva1 += parseFloat($(this).val()) : BaseImpIva1);
    }); 
    //$('#txtsubtotal').val(Math.round(BaseImpIva1.toFixed(2)));
    //$('#lblsubtotal').text(Separador(Math.round(BaseImpIva1.toFixed(2))));

    //CALCULO DE SUBTOTAL SIN IVA
    var BaseImpIva2=0;
    $('.subtotalivano').each(function() {
    ($(this).val() != "0" ? BaseImpIva2 += parseFloat($(this).val()) : BaseImpIva2);
    }); 
    $('#txtsubtotal2').val(BaseImpIva2.toFixed(2));
    $('#lblsubtotal2').text(Separador(BaseImpIva2.toFixed(2)));

    //CALCULO DE SUBTOTAL GENERAL
    var SubTotal=0;
    $('.subtotaldiscriminado').each(function() {
    SubTotal += parseFloat($(this).val());
    });
    var SubtotalBaseGeneral = parseFloat(SubTotal.toFixed(2)) + parseFloat(BaseImpIva2.toFixed(2));
    $('#lblsubtotal').text(Separador(SubTotal.toFixed(2)));
    $('#txtsubtotal').val(SubTotal.toFixed(2));
    $('#txtdiscriminado').val(SubtotalBaseGeneral.toFixed(2));
    //$('#lblsubtotal').text(Separador(Math.round(SubTotal+BaseImpIva2)));

    //CALCULO DE TOTAL IMPUEST0S 
    var TotalIvaGeneral=0;
    $('.subtotalimpuestos').each(function() {  
    ($(this).val() != "0" ? TotalIvaGeneral += parseFloat($(this).val()) : TotalIvaGeneral);
    }); 
    $('#txtIva').val(TotalIvaGeneral.toFixed(2));
    $('#lbliva').text(Separador(TotalIvaGeneral.toFixed(2)));

    //CALCULO DE TOTAL DESCONTADO
    var TotalDescontado=0;
    $('.totaldescuentov').each(function() { 
    ($(this).val() != "0" ? TotalDescontado += parseFloat($(this).val()) : TotalDescontado); 
    });
    $('#txtdescontado').val(TotalDescontado.toFixed(2));
    $('#lbldescontado').text(Separador(TotalDescontado.toFixed(2))); 

    //CALCULAMOS DESCUENTO POR PRODUCTO
    desc2  = desc/100;

    //CALCULO DEL TOTAL DE FACTURA
    var Total = parseFloat(SubtotalBaseGeneral) + parseFloat(TotalIvaGeneral);
    TotalDescuentoGeneral   = parseFloat(Total.toFixed(2)) * parseFloat(desc2.toFixed(2));
    TotalFactura   = parseFloat(Total.toFixed(2)) - parseFloat(TotalDescuentoGeneral.toFixed(2));

    $('#txtTotal').val(TotalFactura.toFixed(2));
    $('#lbltotal').text(Separador(TotalFactura.toFixed(2)));

    $('#txtTotal').val(TotalFactura.toFixed(2));
    $('#txtTotalCompra').val(NetoCompra.toFixed(2));
    $('#lbltotal').text(Separador(TotalFactura.toFixed(2)));
}

// FUNCION PARA AGREGAR DETALLES A COTIZACIONES
function AgregaDetalleCotizacion(codcotizacion,codsucursal,proceso) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Agregar Detalles de Productos a esta Cotización?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "forcotizacion?codcotizacion="+codcotizacion+"&codsucursal="+codsucursal+"&proceso="+proceso;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}


/////FUNCION PARA ELIMINAR DETALLES DE COTIZACIONES EN VENTANA MODAL
function EliminarDetallesCotizacionModal(coddetallecotizacion,codcotizacion,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Cotización?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetallecotizacion="+coddetallecotizacion+"&codcotizacion="+codcotizacion+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#muestracotizacionmodal').load("funciones.php?BuscaCotizacionModal=si&codcotizacion="+codcotizacion+"&codsucursal="+codsucursal); 
            $('#cotizaciones').load("consultas.php?CargaCotizaciones=si");    
          
          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Cotizaciones en este Módulo, realice la Eliminación completa de la Cotización!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Cotizaciones, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}


/////FUNCION PARA ELIMINAR DETALLES DE COTIZACIONES EN ACTUALIZAR
function EliminarDetallesCotizacionesUpdate(coddetallecotizacion,codcotizacion,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Cotización?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetallecotizacion="+coddetallecotizacion+"&codcotizacion="+codcotizacion+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#detallescotizacionesupdate').load("funciones.php?MuestraDetallesCotizacionesUpdate=si&codcotizacion="+codcotizacion+"&codsucursal="+codsucursal); 
          
          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Cotizaciones en este Módulo, realice la Eliminación completa de la Cotización!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Cotizaciones, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}

/////FUNCION PARA ELIMINAR DETALLES DE COTIZACIONES EN AGREGAR
function EliminarDetallesCotizacionesAgregar(coddetallecotizacion,codcotizacion,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Cotización?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetallecotizacion="+coddetallecotizacion+"&codcotizacion="+codcotizacion+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#detallescotizacionesagregar').load("funciones.php?MuestraDetallesCotizacionesAgregar=si&codcotizacion="+codcotizacion+"&codsucursal="+codsucursal); 
          
          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Cotizaciones en este Módulo, realice la Eliminación completa de la Cotización!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Cotizaciones, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}

/////FUNCION PARA ELIMINAR COTIZACIONES 
function EliminarCotizacion(codcotizacion,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Cotización?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codcotizacion="+codcotizacion+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#cotizaciones').load("consultas.php?CargaCotizaciones=si"); 
            //$('#muestracotizaciones').load("search.php?CargaCotizaciones=si&bcotizaciones="+criterio);
                  
          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Cotizaciones de Productos, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}


// FUNCION PARA BUSQUEDA DE COTIZACIONES POR FECHAS
function BuscarCotizacionesxFechas(){
                        
$('#muestracotizacionesxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#cotizacionesxfechas").serialize();
var url = 'funciones.php?BuscaCotizacionesxFechas=si';


$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestracotizacionesxfechas').empty();
                $('#muestracotizacionesxfechas').append(''+response+'').fadeIn("slow");
             }
      });
}

// FUNCION PARA BUSQUEDA DE PRODUCTOS COTIZADOS POR VENDEDOR
function BuscaCotizacionesxVendedor(){
    
$('#muestracotizacionesxvendedor').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codigo = $("#codigo").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#cotizacionesxvendedor").serialize();
var url = 'funciones.php?BuscaCotizacionesxVendedor=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestracotizacionesxvendedor').empty();
                $('#muestracotizacionesxvendedor').append(''+response+'').fadeIn("slow");
            }
      }); 
}

// FUNCION PARA BUSQUEDA DE DETALLES COTIZACIONES X FECHAS
function BuscaDetallesCotizacionesxFechas(){
    
$('#muestradetallescotizacionesxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#detallescotizacionesxfechas").serialize();
var url = 'funciones.php?BuscaDetallesCotizacionesxFechas=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestradetallescotizacionesxfechas').empty();
                $('#muestradetallescotizacionesxfechas').append(''+response+'').fadeIn("slow");
            }
      }); 
}


// FUNCION PARA BUSQUEDA DE DETALLES COTIZACIONES X VENDEDOR
function BuscaDetallesCotizacionesxVendedor(){
    
$('#muestradetallescotizacionesxvendedor').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codigo = $("#codigo").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#detallescotizacionesxvendedor").serialize();
var url = 'funciones.php?BuscaDetallesCotizacionesxVendedor=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestradetallescotizacionesxvendedor').empty();
                $('#muestradetallescotizacionesxvendedor').append(''+response+'').fadeIn("slow");
            }
      }); 
}
















/////////////////////////////////// FUNCIONES DE CAJAS DE VENTAS //////////////////////////////////////

// FUNCION PARA MOSTRAR CAJAS DE VENTAS EN VENTANA MODAL
function VerCaja(codcaja){

$('#muestracajamodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaCajaModal=si&codcaja='+codcaja;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestracajamodal').empty();
                $('#muestracajamodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

// FUNCION PARA ACTUALIZAR CAJAS DE VENTAS
function UpdateCaja(codsucursal,codcaja,nrocaja,nomcaja,codigo,proceso) 
{
  // aqui asigno cada valor a los campos correspondientes
  $("#savecaja #codsucursal").val(codsucursal);
  $("#savecaja #codcaja").val(codcaja);
  $("#savecaja #nrocaja").val(nrocaja);
  $("#savecaja #nomcaja").val(nomcaja);
  $("#savecaja #codigo").val(codigo);
  $("#savecaja #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR CAJAS DE VENTAS 
function EliminarCaja(codcaja,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta CAJA?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codcaja="+codcaja+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#cajas').load("consultas?CargaCajas=si");
                  
          } else if(data==2){ 

             swal("Oops", "Esta Caja para Venta no puede ser Eliminada, tiene Ventas relacionados!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Cajas, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}

// FUNCION PARA MOSTRAR CAJAS POR SUCURSAL
function CargaCajas(codsucursal){

$('#codcaja').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');
                
var dataString = 'BuscaCajasxSucursal=si&codsucursal='+codsucursal;

$.ajax({
    type: "GET",
    url: "funciones.php",
    data: dataString,
    success: function(response) {            
        $('#codcaja').empty();
        $('#codcaja').append(''+response+'').fadeIn("slow");
      }
  });
}


// FUNCION PARA MOSTRAR CAJAS POR SUCURSAL
function CargaCajasAbiertas(codsucursal){

$('#codcaja').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');
                
var dataString = 'BuscaCajasAbiertasxSucursal=si&codsucursal='+codsucursal;

$.ajax({
    type: "GET",
    url: "funciones.php",
    data: dataString,
    success: function(response) {            
      $('#codcaja').empty();
      $('#codcaja').append(''+response+'').fadeIn("slow");
    }
  });
}














/////////////////////////////////// FUNCIONES DE ARQUEOS DE Cajas //////////////////////////////////////

// FUNCION PARA MOSTRAR ARQUEO DE CAJA EN VENTANA MODAL
function VerArqueo(codarqueo){

$('#muestraarqueomodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaArqueoModal=si&codarqueo='+codarqueo;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestraarqueomodal').empty();
                $('#muestraarqueomodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

// FUNCION PARA CERRAR ARQUEO DE CAJA
function CerrarCaja(codarqueo) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Realizar el Cierre de Caja?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "forcierre?codarqueo="+codarqueo;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}

//FUNCION PARA CALCULAR LA DIFERENCIA EN CIERRE DE CAJA
$(document).ready(function (){
  $('.cierrecaja').keyup(function (){
      
    var efectivo = $('input#dineroefectivo').val();
    var estimado = $('input#estimado').val();
            
    //REALIZO EL CALCULO Y MUESTRO LA DEVOLUCION
    total=efectivo - estimado;
    var original=parseFloat(total.toFixed(2));
    $("#diferencia").val((efectivo == "" || efectivo == "0" || efectivo == "0.00") ? "0.00" : original.toFixed(2));
    //$("#diferencia").val(original.toFixed(2));
      
  });
});

//FUNCION PARA BUSQUEDA DE ARQUEOS DE CAJAS POR FECHAS PARA REPORTES
function BuscarArqueosxFechas(){
                  
$('#muestraarqueosxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codcaja = $("#codcaja").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#arqueosxfechas").serialize();
var url = 'funciones.php?BuscaArqueosxFechas=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestraarqueosxfechas').empty();
                $('#muestraarqueosxfechas').append(''+response+'').fadeIn("slow");
                
               }
      }); 
}

















/////////////////////////////////// FUNCIONES DE MOVIMIENTOS EN CAJAS DE VENTAS //////////////////////////////////////

// FUNCION PARA MOSTRAR MOVIMIENTO EN CAJAS DE VENTAS EN VENTANA MODAL
function VerMovimiento(codmovimiento){

$('#muestramovimientomodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaMovimientoModal=si&codmovimiento='+codmovimiento;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestramovimientomodal').empty();
                $('#muestramovimientomodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

// FUNCION PARA ACTUALIZAR MOVIMIENTOS EN CAJAS DE VENTAS
function UpdateMovimiento(codmovimiento,codcaja,tipomovimiento,descripcionmovimiento,montomovimiento,mediomovimiento,fechamovimiento,codarqueo,proceso) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savemovimiento #codmovimiento").val(codmovimiento);
  $("#savemovimiento #codcaja").val(codcaja);
  $("#savemovimiento #tipomovimiento").val(tipomovimiento);
  $("#savemovimiento #tipomovimientobd").val(tipomovimiento);
  $("#savemovimiento #descripcionmovimiento").val(descripcionmovimiento);
  $("#savemovimiento #montomovimiento").val(montomovimiento);
  $("#savemovimiento #montomovimientobd").val(montomovimiento);
  $("#savemovimiento #mediomovimiento").val(mediomovimiento);
  $("#savemovimiento #mediomovimientobd").val(mediomovimiento);
  $("#savemovimiento #fecharegistro").val(fechamovimiento);
  $("#savemovimiento #codarqueo").val(codarqueo);
  $("#savemovimiento #proceso").val(proceso);
}

/////FUNCION PARA ELIMINAR MOVIMIENTOS EN CAJAS DE VENTAS 
function EliminarMovimiento(codmovimiento,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Movimiento en CAJA?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codmovimiento="+codmovimiento+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#movimientos').load("consultas?CargaMovimientos=si");
                  
          } else if(data==2){ 

             swal("Oops", "Este Movimiento en Caja no puede ser Eliminado, el Arqueo de Caja asociado se encuentra Cerrado!", "error"); 

          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Movimiento en Cajas, no eres el Administrador o Cajero del Sistema!", "error"); 

                }
            }
        })
    });
}

//FUNCION PARA BUSQUEDA DE MOVIMIENTOS DE CAJAS POR FECHAS PARA REPORTES
function BuscarMovimientosxFechas(){
                  
$('#muestramovimientosxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codcaja = $("#codcaja").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#movimientosxfechas").serialize();
var url = 'funciones.php?BuscaMovimientosxFechas=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestramovimientosxfechas').empty();
                $('#muestramovimientosxfechas').append(''+response+'').fadeIn("slow");
                
               }
      }); 
}

//FUNCION PARA BUSQUEDA INFORMES DE CAJAS POR FECHAS PARA REPORTES
function BuscarInformesCajasxFechas(){
                  
$('#muestrainformescajasxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codcaja = $("#codcaja").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#informescajasxfechas").serialize();
var url = 'funciones.php?BuscaInformesCajasxFechas=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestrainformescajasxfechas').empty();
                $('#muestrainformescajasxfechas').append(''+response+'').fadeIn("slow");
                
               }
      }); 
}


//FUNCION PARA BUSQUEDA INFORMES DE VENTAS POR FECHAS PARA REPORTES
function BuscarInformesVentasxFechas(){
                  
$('#muestrainformesventasxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#informesventasxfechas").serialize();
var url = 'funciones.php?BuscaInformesVentasxFechas=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestrainformesventasxfechas').empty();
                $('#muestrainformesventasxfechas').append(''+response+'').fadeIn("slow");
                
               }
      }); 
}

//FUNCION PARA BUSQUEDA INFORMES DE VENTAS POR FECHAS PARA REPORTES
function BuscarGananciasVentasxFechas(){
                  
$('#muestragananciasventasxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#gananciasventasxfechas").serialize();
var url = 'funciones.php?BuscaGananciasVentasxFechas=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestragananciasventasxfechas').empty();
                $('#muestragananciasventasxfechas').append(''+response+'').fadeIn("slow");
                
               }
      }); 
}

























/////////////////////////////////// FUNCIONES DE PEDIDOS //////////////////////////////////////

/////FUNCION PARA ENTREGAR PEDIDOS DE DELIVERY
function VerificarPedido(codventa,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Realizar la Entrega de este Pedido al Cliente?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codventa="+codventa+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Entregado!", "El Pedido fue entregado al Cliente Exitosamente!", "success");
            $('#pedidos').load("consultas?CargaPedidos=si");
          
            }
          }
        })
    });
}


// FUNCION PARA MOSTRAR PEDIDOS EN VENTANA MODAL
function VerPedido(codventa,codsucursal){

$('#muestrapedidomodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaPedidoModal=si&codventa='+codventa+"&codsucursal="+codsucursal;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestrapedidomodal').empty();
                $('#muestrapedidomodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

/////FUNCION PARA PAGAR FACTURA DE PEDIDO 
function EntregarPedido(codventa,codcliente,codsucursal,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Entregar Este Pedido?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Entregar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codventa="+codventa+"&codcliente="+codcliente+"&codsucursal="+codsucursal+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Pedido Entregado!", "El Pedido ha sido entregado con éxito!", "success");
            $('#pedidos').load("consultas?CargaPedidos=si");
                  
          } else { 

             swal("Oops", "Usted no tiene Acceso para Entregar Pedidos de Productos, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}

// FUNCION PARA ABONAR PAGO A CREDITOS
function AbonoPedido(codcliente,codventa,codsucursal,totaldebe,dnicliente,nomcliente,codfactura,totalfactura,fechaventa,totalabono,debe) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savepagopedido #codcliente").val(codcliente);
  $("#savepagopedido #codventa").val(codventa);
  $("#savepagopedido #codsucursal").val(codsucursal);
  $("#savepagopedido #totaldebe").val(totaldebe);
  $("#savepagopedido #dnicliente").val(dnicliente);
  $("#savepagopedido #nomcliente").val(nomcliente);
  $("#savepagopedido #codfactura").val(codfactura);
  $("#savepagopedido #totalfactura").val(totalfactura);
  $("#savepagopedido #fechaventa").val(fechaventa);
  $("#savepagopedido #abono").val(totalabono);
  $("#savepagopedido #totalabono").val(totalabono);
  $("#savepagopedido #debe").val(debe);
}


// FUNCION PARA ACTUALIZAR PEDIDOS
function UpdatePedido(codventa,codsucursal,proceso) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Actualizar este Pedido de Producto?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Actualizar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "forpedido?codventa="+codventa+"&codsucursal="+codsucursal+"&proceso="+proceso;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}


// FUNCION PARA CALCULAR DETALLES PEDIDOS EN ACTUALIZAR
function ProcesarCalculoPedido(indice){
    var cantidad = $('#cantventa_'+indice).val();
    var preciocompra = $('#preciocompra_'+indice).val();
    var precioventa = $('#precioventa_'+indice).val();
    var precioconiva = $('#precioconiva_'+indice).val();
    var valortotal = $('#valortotal_'+indice).val();
    var neto = $('#valorneto_'+indice).val();
    var descproducto = $('#descproducto_'+indice).val();
    var ivaproducto = $('#ivaproducto_'+indice).val();
    var ivg = $('#iva').val();
    var desc = $('#descuento').val();
    var ValorNeto = 0;

    if (cantidad == "" || cantidad == "0" || cantidad == "0.00") {

        $("#cantventa_"+indice).focus();
        $("#cantventa_"+indice).css('border-color', '#f0ad4e');
        swal("Oops", "POR FAVOR INGRESE UNA CANTIDAD VÁLIDA!", "error");
        return false;
    }
    //REALIZAMOS LA MULTIPLICACION DE PRECIO VENTA * CANTIDAD
    var ValorTotal = parseFloat(cantidad) * parseFloat(precioventa);

    //REALIZAMOS LA MULTIPLICACION DE PRECIO COMPRA * CANTIDAD
    var ValorTotal2 = parseFloat(cantidad) * parseFloat(preciocompra);

    //CALCULO DEL TOTAL DEL DESCUENTO %
    var Descuento = ValorTotal * descproducto / 100;
    var ValorNeto = parseFloat(ValorTotal) - parseFloat(Descuento);

    //CALCULO VALOR TOTAL
    $("#valortotal_"+indice).val(ValorTotal.toFixed(2));
    $("#txtvalortotal_"+indice).text(Separador(ValorTotal.toFixed(2)));

    //CALCULO TOTAL DESCUENTO
    $("#totaldescuentov_"+indice).val(Descuento.toFixed(2));
    $("#txtdescproducto_"+indice).text(Separador(Descuento.toFixed(2)));

    //CALCULO VALOR NETO
    $("#valorneto_"+indice).val(ValorNeto.toFixed(2));
    $("#txtvalorneto_"+indice).text(Separador(ValorNeto.toFixed(2)));

    //CALCULO VALOR NETO 2
    $("#valorneto2_"+indice).val(ValorTotal2.toFixed(2));

    //CALCULO SUBTOTAL IVA SI
    $("#subtotalivasi_"+indice).val(ivaproducto != '0.00' ? ValorNeto.toFixed(2) : "0");
    //CALCULO SUBTOTAL IVA NO
    $("#subtotalivano_"+indice).val(ivaproducto == "0.00" ? ValorNeto.toFixed(2) : "0");

    /*################################ CALCULO DISCRIMINADO ################################*/
    
    //CALCULO SUBTOTAL DISCRIMINADO
    ivg2  = ivg;
    var ValorImpuesto = (ivg2 <= 9) ? "1.0"+parseInt(ivg2) : "1."+parseInt(ivg2);
    var Discriminado = parseFloat(precioconiva) / ValorImpuesto;
    var SubtotalDiscriminado = parseFloat(precioconiva) - parseFloat(Discriminado.toFixed(2));
    var BaseDiscriminado = parseFloat(SubtotalDiscriminado.toFixed(2)) * parseFloat(cantidad);
    //TotalIvaGeneral = parseFloat(TotalIvaGeneral.toFixed(2)) + parseFloat(BaseDiscriminado.toFixed(2));
    var RestoDiscriminado = parseFloat(ValorNeto) - parseFloat(BaseDiscriminado.toFixed(2));
    
    //CALCULO SUBTOTAL IMPUESTOS
    $("#subtotalimpuestos_"+indice).val(BaseDiscriminado.toFixed(2));

    //CALCULO SUBTOTAL DISCRIMINADO
    $("#subtotaldiscriminado_"+indice).val(ivaproducto != "0.00" ? RestoDiscriminado.toFixed(2) : "0"); 

    /*################################ CALCULO DISCRIMINADO ################################*/

    //CALCULO DE VALOR NETO PARA COMPRAS
    var NetoCompra=0;
    $('.valorneto2').each(function() {  
    ($(this).val() != "0" ? NetoCompra += parseFloat($(this).val()) : NetoCompra);
    });

   //CALCULO DE SUBTOTAL CON IVA
    var BaseImpIva1=0;
    $('.subtotalivasi').each(function() {
    ($(this).val() != "0" ? BaseImpIva1 += parseFloat($(this).val()) : BaseImpIva1);
    }); 
    //$('#txtsubtotal').val(Math.round(BaseImpIva1.toFixed(2)));
    //$('#lblsubtotal').text(Separador(Math.round(BaseImpIva1.toFixed(2))));

    //CALCULO DE SUBTOTAL SIN IVA
    var BaseImpIva2=0;
    $('.subtotalivano').each(function() {
    ($(this).val() != "0" ? BaseImpIva2 += parseFloat($(this).val()) : BaseImpIva2);
    }); 
    $('#txtsubtotal2').val(BaseImpIva2.toFixed(2));
    $('#lblsubtotal2').text(Separador(BaseImpIva2.toFixed(2)));

    //CALCULO DE SUBTOTAL GENERAL
    var SubTotal=0;
    $('.subtotaldiscriminado').each(function() {
    SubTotal += parseFloat($(this).val());
    });
    var SubtotalBaseGeneral = parseFloat(SubTotal.toFixed(2)) + parseFloat(BaseImpIva2.toFixed(2));
    $('#lblsubtotal').text(Separador(SubTotal.toFixed(2)));
    $('#txtsubtotal').val(SubTotal.toFixed(2));
    $('#txtdiscriminado').val(SubtotalBaseGeneral.toFixed(2));
    //$('#lblsubtotal').text(Separador(Math.round(SubTotal+BaseImpIva2)));

    //CALCULO DE TOTAL IMPUEST0S 
    var TotalIvaGeneral=0;
    $('.subtotalimpuestos').each(function() {  
    ($(this).val() != "0" ? TotalIvaGeneral += parseFloat($(this).val()) : TotalIvaGeneral);
    }); 
    $('#txtIva').val(TotalIvaGeneral.toFixed(2));
    $('#lbliva').text(Separador(TotalIvaGeneral.toFixed(2)));

    //CALCULO DE TOTAL DESCONTADO
    var TotalDescontado=0;
    $('.totaldescuentov').each(function() { 
    ($(this).val() != "0" ? TotalDescontado += parseFloat($(this).val()) : TotalDescontado); 
    });
    $('#txtdescontado').val(TotalDescontado.toFixed(2));
    $('#lbldescontado').text(Separador(TotalDescontado.toFixed(2))); 

    //CALCULAMOS DESCUENTO POR PRODUCTO
    desc2  = desc/100;

    //CALCULO DEL TOTAL DE FACTURA
    var Total = parseFloat(SubtotalBaseGeneral) + parseFloat(TotalIvaGeneral);
    TotalDescuentoGeneral   = parseFloat(Total.toFixed(2)) * parseFloat(desc2.toFixed(2));
    TotalFactura   = parseFloat(Total.toFixed(2)) - parseFloat(TotalDescuentoGeneral.toFixed(2));

    $('#txtTotal').val(TotalFactura.toFixed(2));
    $('#txtTotal2').val(TotalFactura.toFixed(2));
    $('#txtTotalCompra').val(NetoCompra.toFixed(2));
    $('#lbltotal').text(Separador(TotalFactura.toFixed(2)));
}


// FUNCION PARA AGREGAR DETALLES A PEDIDOS
function AgregaDetallePedido(codventa,codsucursal,proceso) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Agregar Detalles de Productos a este Pedido?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "forpedido?codventa="+codventa+"&codsucursal="+codsucursal+"&proceso="+proceso;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}


/////FUNCION PARA ELIMINAR DETALLES DE PEDIDOS EN VENTANA MODAL
function EliminarDetallesPedidoModal(coddetalleventa,codventa,codsucursal,codcliente,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Pedido?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetalleventa="+coddetalleventa+"&codventa="+codventa+"&codsucursal="+codsucursal+"&codcliente="+codcliente+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

          swal("Eliminado!", "Datos eliminados con éxito!", "success");
          $('#muestrapedidomodal').load("funciones.php?BuscaPedidoModal=si&codventa="+codventa+"&codsucursal="+codsucursal); 
          $('#pedidos').load("consultas?CargaPedidos=si");
          
          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Pedidos en este Módulo, realice la Eliminación completa del Pedidos!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Pedidos, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}


/////FUNCION PARA ELIMINAR DETALLES DE PEDIDOS EN ACTUALIZAR
function EliminarDetallesPedidoUpdate(coddetalleventa,codventa,codsucursal,codcliente,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Pedidos?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetalleventa="+coddetalleventa+"&codventa="+codventa+"&codsucursal="+codsucursal+"&codcliente="+codcliente+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#detallespedidosupdate').load("funciones.php?MuestraDetallesPedidosUpdate=si&codventa="+codventa+"&codsucursal="+codsucursal); 
          
          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Pedidos en este Módulo, realice la Eliminación completa del Pedido!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Pedidos, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}

/////FUNCION PARA ELIMINAR DETALLES DE PEDIDOS EN AGREGAR
function EliminarDetallesPedidoAgregar(coddetalleventa,codventa,codsucursal,codcliente,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Pedidos?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetalleventa="+coddetalleventa+"&codventa="+codventa+"&codsucursal="+codsucursal+"&codcliente="+codcliente+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#detallespedidosagregar').load("funciones.php?MuestraDetallesPedidosAgregar=si&codventa="+codventa+"&codsucursal="+codsucursal); 
          
          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Pedidos en este Módulo, realice la Eliminación completa del Pedidos!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Pedidos, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}

/////FUNCION PARA ELIMINAR VENTAS 
function EliminarPedido(codventa,codsucursal,codcliente,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Pedido?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codventa="+codventa+"&codsucursal="+codsucursal+"&codcliente="+codcliente+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#pedidos').load("consultas?CargaPedidos=si");
                  
          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Pedidos de Productos, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}

//FUNCION PARA BUSQUEDA DE PEDIDOS POR CAJAS Y FECHAS
function BuscarPedidosxCajas(){
                  
$('#muestrapedidosxcajas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codcaja = $("#codcaja").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#pedidosxcajas").serialize();
var url = 'funciones.php?BuscaPedidosxCajas=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestrapedidosxcajas').empty();
                $('#muestrapedidosxcajas').append(''+response+'').fadeIn("slow");
                
               }
      }); 
}

// FUNCION PARA BUSQUEDA DE PEDIDOS POR FECHAS
function BuscarPedidosxFechas(){
                        
$('#muestrapedidosxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#pedidosxfechas").serialize();
var url = 'funciones.php?BuscaPedidosxFechas=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestrapedidosxfechas').empty();
                $('#muestrapedidosxfechas').append(''+response+'').fadeIn("slow");
                
             }
      });
}

// FUNCION PARA BUSQUEDA DE PEDIDOS POR FECHASDE ENTREGA
function BuscarPedidosxFechasEntrega(){
                        
$('#muestrapedidosxfechasentrega').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#pedidosxfechasentrega").serialize();
var url = 'funciones.php?BuscaPedidosxFechasEntrega=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestrapedidosxfechasentrega').empty();
                $('#muestrapedidosxfechasentrega').append(''+response+'').fadeIn("slow");
                
             }
      });
}

//FUNCION PARA BUSQUEDA DE PEDIDOS POR CONDICION DE PAGO Y FECHAS
function BuscarPedidosxCondiciones(){
                  
$('#muestrapedidosxcondiciones').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var formapago = $("select#formapago").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#pedidosxcondiciones").serialize();
var url = 'funciones.php?BuscaPedidosxCondiciones=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestrapedidosxcondiciones').empty();
                $('#muestrapedidosxcondiciones').append(''+response+'').fadeIn("slow");
                
               }
      }); 
}


















/////////////////////////////////// FUNCIONES DE VENTAS //////////////////////////////////////

////FUNCION MENSAJE FACTURA ANULADA
function MsjAnulado(){
  
  swal("Mensaje!", "Esta Factura se encuentra Anulada, verifique en las Notas de Crédito por favor!", "danger");
}

////FUNCION MUESTRA BOTON MESAS
function MostrarMesas(){
  
  $('#loading_mesas').load("salas_mesas?CargaMesas=si");
  $("#muestra_detalles_mesas").show();
  $("#muestra_detalles_pedidos").hide();
}

////FUNCION MUESTRA BOTON PRODUCTOS
function MostrarProductos(){
  
  $('#loading_productos').load("salas_mesas?CargaProductos=si");
}

////FUNCION MUESTRA BOTON COMBOS
function MostrarCombos(){
  
  $('#loading_productos').load("salas_mesas?CargaCombos=si");
}

////FUNCION MUESTRA BOTON EXTRAS
function MostrarExtras(){
  
  $('#loading_productos').load("salas_mesas?CargaExtras=si");
}

////FUNCION RECARGAR COMANDA
function RecargaComanda(proceso){

  $("#all-todo").addClass("active");
  $("#all-category").removeClass("active");
  $("#note-business").removeClass("active");
  $("#note-social").removeClass("active");
  $('#mostrador').html("");
  $('#mostrador').append('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>').fadeIn("slow");
  setTimeout(function() {
  $('#mostrador').load("consultas?CargaMostrador=si&proceso="+proceso);
  }, 1000);
}

////FUNCION MUESTRA COMANDA POR SELECCION
function MuestraComanda(proceso){

  $('#mostrador').html("");
  $('#mostrador').append('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>').fadeIn("slow");
  setTimeout(function() {
  $('#mostrador').load("consultas?CargaMostrador=si&proceso="+proceso);
  }, 1000);
}


/////FUNCION PARA ENTREGAR PEDIDOS DE COCINA
function EntregarPedidosCocina(codpedido,pedido,codventa,codsucursal,delivery,proceso,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Realizar la Entrega de este Pedido?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codpedido="+codpedido+"&pedido="+pedido+"&codventa="+codventa+"&codsucursal="+codsucursal+"&delivery="+delivery+"&proceso="+proceso+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Entregado!", "El Pedido en Mesa fue entregado Exitosamente!", "success");
            $('#mostrador').load("consultas.php?CargaMostrador=si&proceso="+proceso);    
          
          } else if(data==2){

            swal("Entregado!", "El Pedido de Delivery fue entregado Exitosamente!", "success");
            $('#mostrador').load("consultas.php?CargaMostrador=si&proceso="+proceso);  

             }
          }
        })
    });
}

////FUNCION RECARGAR BAR
function RecargaBar(proceso){

  $("#all-todo").addClass("active");
  $("#all-category").removeClass("active");
  $("#note-business").removeClass("active");
  $("#note-social").removeClass("active");
  $('#barra').html("");
  $('#barra').append('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>').fadeIn("slow");
  setTimeout(function() {
  $('#barra').load("consultas?CargaBar=si&proceso="+proceso);
  }, 1000);
}

////FUNCION MUESTRA BAR POR SELECCION
function MuestraBar(proceso){

  $('#barra').html("");
  $('#barra').append('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>').fadeIn("slow");
  setTimeout(function() {
  $('#barra').load("consultas?CargaBar=si&proceso="+proceso);
  }, 1000);
}


/////FUNCION PARA ENTREGAR PEDIDOS DE BAR
function EntregarPedidosBar(codpedido,pedido,codventa,codsucursal,delivery,proceso,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Realizar la Entrega de este Pedido?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codpedido="+codpedido+"&pedido="+pedido+"&codventa="+codventa+"&codsucursal="+codsucursal+"&delivery="+delivery+"&proceso="+proceso+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Entregado!", "El Pedido en Mesa fue entregado Exitosamente!", "success");
            $('#barra').load("consultas.php?CargaBar=si&proceso="+proceso);    
          
          } else if(data==2){

            swal("Entregado!", "El Pedido de Delivery fue entregado Exitosamente!", "success");
            $('#barra').load("consultas.php?CargaBar=si&proceso="+proceso);  

             }
          }
        })
    });
}


////FUNCION RECARGAR PASTELERIA
function RecargaReposteria(proceso){

  $("#all-todo").addClass("active");
  $("#all-category").removeClass("active");
  $("#note-business").removeClass("active");
  $("#note-social").removeClass("active");
  $('#reposteria').html("");
  $('#reposteria').append('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>').fadeIn("slow");
  setTimeout(function() {
  $('#reposteria').load("consultas?CargaReposteria=si&proceso="+proceso);
  }, 1000);
}

////FUNCION MUESTRA PASTELERIA POR SELECCION
function MuestraReposteria(proceso){

  $('#reposteria').html("");
  $('#reposteria').append('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>').fadeIn("slow");
  setTimeout(function() {
  $('#reposteria').load("consultas?CargaReposteria=si&proceso="+proceso);
  }, 1000);
}


/////FUNCION PARA ENTREGAR PEDIDOS DE PATELERIA
function EntregarPedidosReposteria(codpedido,pedido,codventa,codsucursal,delivery,proceso,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Realizar la Entrega de este Pedido?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codpedido="+codpedido+"&pedido="+pedido+"&codventa="+codventa+"&codsucursal="+codsucursal+"&delivery="+delivery+"&proceso="+proceso+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Entregado!", "El Pedido en Mesa fue entregado Exitosamente!", "success");
            $('#reposteria').load("consultas.php?CargaReposteria=si&proceso="+proceso);    
          
          } else if(data==2){

            swal("Entregado!", "El Pedido de Delivery fue entregado Exitosamente!", "success");
            $('#reposteria').load("consultas.php?CargaReposteria=si&proceso="+proceso);  

             }
          }
        })
    });
}


////FUNCION RECARGAR DELIVERY
function RecargaDelivery(proceso){

  $("#all-todo").addClass("active");
  $("#note-social").removeClass("active");
  $('#delivery').html("");
  $('#delivery').append('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>').fadeIn("slow");
  setTimeout(function() {
  $('#delivery').load("consultas?CargaDelivery=si&proceso="+proceso);
  }, 1000);
}

////FUNCION MUESTRA DELIVERY POR SELECCION
function MuestraDelivery(proceso){

  $('#delivery').html("");
  $('#delivery').append('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>').fadeIn("slow");
  setTimeout(function() {
  $('#delivery').load("consultas?CargaDelivery=si&proceso="+proceso);
  }, 1000);
}


/////FUNCION PARA ENTREGAR PEDIDOS DE DELIVERY
function EntregarDelivery(codpedido,pedido,codventa,codsucursal,delivery,proceso,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Realizar la Entrega de este Pedido al Cliente?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codpedido="+codpedido+"&pedido="+pedido+"&codventa="+codventa+"&codsucursal="+codsucursal+"&delivery="+delivery+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Entregado!", "El Pedido fue entregado al Cliente Exitosamente!", "success");
            $('#delivery').load("consultas.php?CargaDelivery=si&proceso="+proceso); 
          
            }
          }
        })
    });
}


////FUNCION RECARGAR PEDIDOS EN VENTANA MODAL
function RecargaPedidos(proceso){

  $('#detallescocina').html("");
  $('#detallescocina').append('<center><i class="fa fa-spin fa-spinner"></i> Por favor espere, cargando registros ......</center>').fadeIn("slow");
  setTimeout(function() {
  $('#detallescocina').load("consultas?CargaDetallesPedidos=si&proceso="+proceso);
  }, 100);
}


////FUNCION MENSAJE MESA DISPONIBLE
function MesaDisponible() {

  swal("Mesa Disponible?", "No existen cuentas pendientes por cobrar en la Mesa seleccionada!", "success");

}

////FUNCION MENSAJE MESA OCUPADA
function MesaOcupada() {

  swal("Mesa Ocupada?", "La Mesa seleccionada se encuentra Ocupada actualmente, aún no puede ser procesado el Cobro de la misma!", "info");

}

// FUNCION PARA BUSCAR VENTAS
function BuscarVentas(){
                        
$('#muestraventas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');
                
var search = $("#bventas").val();
var dataString = $("#busquedaventas").serialize();
var url = 'search.php?CargaVentas=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
      success: function(response) {            
        $('#muestraventas').empty();
        $('#muestraventas').append(''+response+'').fadeIn("slow");
      }
  });
}

// FUNCION PARA MOSTRAR VENTAS EN VENTANA MODAL
function VerVenta(codventa,codsucursal){

$('#muestraventamodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaVentaModal=si&codventa='+codventa+"&codsucursal="+codsucursal;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestraventamodal').empty();
                $('#muestraventamodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

// FUNCION PARA ACTUALIZAR VENTAS
function UpdateVenta(codventa,codsucursal,proceso) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Actualizar esta Venta de Producto?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Actualizar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "forventa?codventa="+codventa+"&codsucursal="+codsucursal+"&proceso="+proceso;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}


// FUNCION PARA CALCULAR DETALLES VENTAS EN ACTUALIZAR
function ProcesarCalculoVenta(indice){
    var cantidad = $('#cantventa_'+indice).val();
    var preciocompra = $('#preciocompra_'+indice).val();
    var precioventa = $('#precioventa_'+indice).val();
    var precioconiva = $('#precioconiva_'+indice).val();
    var valortotal = $('#valortotal_'+indice).val();
    var neto = $('#valorneto_'+indice).val();
    var descproducto = $('#descproducto_'+indice).val();
    var ivaproducto = $('#ivaproducto_'+indice).val();
    var ivg = $('#iva').val();
    var desc = $('#descuento').val();
    var ValorNeto = 0;

    if (cantidad == "" || cantidad == "0" || cantidad == "0.00") {

        $("#cantventa_"+indice).focus();
        $("#cantventa_"+indice).css('border-color', '#f0ad4e');
        swal("Oops", "POR FAVOR INGRESE UNA CANTIDAD VÁLIDA!", "error");
        return false;
    }
    //REALIZAMOS LA MULTIPLICACION DE PRECIO VENTA * CANTIDAD
    var ValorTotal = parseFloat(cantidad) * parseFloat(precioventa);

    //REALIZAMOS LA MULTIPLICACION DE PRECIO COMPRA * CANTIDAD
    var ValorTotal2 = parseFloat(cantidad) * parseFloat(preciocompra);

    //CALCULO DEL TOTAL DEL DESCUENTO %
    var Descuento = ValorTotal * descproducto / 100;
    var ValorNeto = parseFloat(ValorTotal) - parseFloat(Descuento);

    //CALCULO DEL TOTAL PARA COMPRA

    //CALCULO VALOR TOTAL
    $("#valortotal_"+indice).val(ValorTotal.toFixed(2));
    $("#txtvalortotal_"+indice).text(Separador(ValorTotal.toFixed(2)));

    //CALCULO TOTAL DESCUENTO
    $("#totaldescuentov_"+indice).val(Descuento.toFixed(2));
    $("#txtdescproducto_"+indice).text(Separador(Descuento.toFixed(2)));

    //CALCULO VALOR NETO
    $("#valorneto_"+indice).val(ValorNeto.toFixed(2));
    $("#txtvalorneto_"+indice).text(Separador(ValorNeto.toFixed(2)));

    //CALCULO VALOR NETO 2
    $("#valorneto2_"+indice).val(ValorTotal2.toFixed(2));

    //CALCULO SUBTOTAL IVA SI
    $("#subtotalivasi_"+indice).val(ivaproducto != '0.00' ? ValorNeto.toFixed(2) : "0");
    //CALCULO SUBTOTAL IVA NO
    $("#subtotalivano_"+indice).val(ivaproducto == "0.00" ? ValorNeto.toFixed(2) : "0"); 

    /*################################ CALCULO DISCRIMINADO ################################*/
    
    //CALCULO SUBTOTAL DISCRIMINADO
    ivg2  = ivg;
    var ValorImpuesto = (ivg2 <= 9) ? "1.0"+parseInt(ivg2) : "1."+parseInt(ivg2);
    var Discriminado = parseFloat(precioconiva) / ValorImpuesto;
    var SubtotalDiscriminado = parseFloat(precioconiva) - parseFloat(Discriminado.toFixed(2));
    var BaseDiscriminado = parseFloat(SubtotalDiscriminado.toFixed(2)) * parseFloat(cantidad);
    //TotalIvaGeneral = parseFloat(TotalIvaGeneral.toFixed(2)) + parseFloat(BaseDiscriminado.toFixed(2));
    var RestoDiscriminado = parseFloat(ValorNeto) - parseFloat(BaseDiscriminado.toFixed(2));
    
    //CALCULO SUBTOTAL IMPUESTOS
    $("#subtotalimpuestos_"+indice).val(BaseDiscriminado.toFixed(2));

    //CALCULO SUBTOTAL DISCRIMINADO
    $("#subtotaldiscriminado_"+indice).val(ivaproducto != "0.00" ? RestoDiscriminado.toFixed(2) : "0"); 

    /*################################ CALCULO DISCRIMINADO ################################*/

    //CALCULO DE VALOR NETO PARA COMPRAS
    var NetoCompra=0;
    $('.valorneto2').each(function() {  
    ($(this).val() != "0" ? NetoCompra += parseFloat($(this).val()) : NetoCompra);
    });

   //CALCULO DE SUBTOTAL CON IVA
    var BaseImpIva1=0;
    $('.subtotalivasi').each(function() {
    ($(this).val() != "0" ? BaseImpIva1 += parseFloat($(this).val()) : BaseImpIva1);
    }); 
    //$('#txtsubtotal').val(Math.round(BaseImpIva1.toFixed(2)));
    //$('#lblsubtotal').text(Separador(Math.round(BaseImpIva1.toFixed(2))));

    //CALCULO DE SUBTOTAL SIN IVA
    var BaseImpIva2=0;
    $('.subtotalivano').each(function() {
    ($(this).val() != "0" ? BaseImpIva2 += parseFloat($(this).val()) : BaseImpIva2);
    }); 
    $('#txtsubtotal2').val(BaseImpIva2.toFixed(2));
    $('#lblsubtotal2').text(Separador(BaseImpIva2.toFixed(2)));

    //CALCULO DE SUBTOTAL GENERAL
    var SubTotal=0;
    $('.subtotaldiscriminado').each(function() {
    SubTotal += parseFloat($(this).val());
    });
    var SubtotalBaseGeneral = parseFloat(SubTotal.toFixed(2)) + parseFloat(BaseImpIva2.toFixed(2));
    $('#lblsubtotal').text(Separador(SubTotal.toFixed(2)));
    $('#txtsubtotal').val(SubTotal.toFixed(2));
    $('#txtdiscriminado').val(SubtotalBaseGeneral.toFixed(2));
    //$('#lblsubtotal').text(Separador(Math.round(SubTotal+BaseImpIva2)));

    //CALCULO DE TOTAL IMPUEST0S 
    var TotalIvaGeneral=0;
    $('.subtotalimpuestos').each(function() {  
    ($(this).val() != "0" ? TotalIvaGeneral += parseFloat($(this).val()) : TotalIvaGeneral);
    }); 
    $('#txtIva').val(TotalIvaGeneral.toFixed(2));
    $('#lbliva').text(Separador(TotalIvaGeneral.toFixed(2)));

    //CALCULO DE TOTAL DESCONTADO
    var TotalDescontado=0;
    $('.totaldescuentov').each(function() { 
    ($(this).val() != "0" ? TotalDescontado += parseFloat($(this).val()) : TotalDescontado); 
    });
    $('#txtdescontado').val(TotalDescontado.toFixed(2));
    $('#lbldescontado').text(Separador(TotalDescontado.toFixed(2))); 

    //CALCULAMOS DESCUENTO POR PRODUCTO
    desc2  = desc/100;

    //CALCULO DEL TOTAL DE FACTURA
    var Total = parseFloat(SubtotalBaseGeneral) + parseFloat(TotalIvaGeneral);
    TotalDescuentoGeneral   = parseFloat(Total.toFixed(2)) * parseFloat(desc2.toFixed(2));
    TotalFactura   = parseFloat(Total.toFixed(2)) - parseFloat(TotalDescuentoGeneral.toFixed(2));

    $('#txtTotal').val(TotalFactura.toFixed(2));
    $('#txtTotal2').val(TotalFactura.toFixed(2));
    $('#txtTotalCompra').val(NetoCompra.toFixed(2));
    $('#lbltotal').text(Separador(TotalFactura.toFixed(2)));
}


// FUNCION PARA AGREGAR DETALLES A VENTAS
function AgregaDetalleVenta(codventa,codsucursal,proceso) {

  swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Agregar Detalles de Productos a esta Venta?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#3085d6"
        }, function(isConfirm) {
    if (isConfirm) {
      location.href = "forventa?codventa="+codventa+"&codsucursal="+codsucursal+"&proceso="+proceso;
      // handle confirm
    } else {
      // handle all other cases
    }
  })
}


/////FUNCION PARA ELIMINAR DETALLES DE VENTAS EN VENTANA MODAL
function EliminarDetallesVentaModal(coddetalleventa,codventa,codsucursal,codcliente,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Venta?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetalleventa="+coddetalleventa+"&codventa="+codventa+"&codsucursal="+codsucursal+"&codcliente="+codcliente+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#muestraventamodal').load("funciones.php?BuscaVentaModal=si&codventa="+codventa+"&codsucursal="+codsucursal); 
            //hace la búsqueda
            $.ajax({
              type: "POST",
              url: "search.php?CargaVentas=si",
              data: "b="+$("#bventas").val(),
              dataType: "html",
              success: function(data){                                                    
                $("#ventas").empty();
                $("#ventas").append(data);
              }
            });
          
          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Ventas en este Módulo, realice la Eliminación completa de la Venta!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Ventas, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}


/////FUNCION PARA ELIMINAR DETALLES DE VENTAS EN ACTUALIZAR
function EliminarDetallesVentaUpdate(coddetalleventa,codventa,codsucursal,codcliente,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Venta?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetalleventa="+coddetalleventa+"&codventa="+codventa+"&codsucursal="+codsucursal+"&codcliente="+codcliente+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#detallesventasupdate').load("funciones.php?MuestraDetallesVentasUpdate=si&codventa="+codventa+"&codsucursal="+codsucursal); 
          
          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Ventas en este Módulo, realice la Eliminación completa de la Venta!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Ventas, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}

/////FUNCION PARA ELIMINAR DETALLES DE VENTAS EN AGREGAR
function EliminarDetallesVentaAgregar(coddetalleventa,codventa,codsucursal,codcliente,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar este Detalle de Venta?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "coddetalleventa="+coddetalleventa+"&codventa="+codventa+"&codsucursal="+codsucursal+"&codcliente="+codcliente+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#detallesventasagregar').load("funciones.php?MuestraDetallesVentasAgregar=si&codventa="+codventa+"&codsucursal="+codsucursal); 
          
          } else if(data==2){ 

             swal("Oops", "No puede Eliminar todos los Detalles de Ventas en este Módulo, realice la Eliminación completa de la Venta!", "error"); 

          } else { 

             swal("Oops", "No tiene Acceso para Eliminar Detalles de Ventas, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}

/////FUNCION PARA ELIMINAR VENTAS 
function EliminarVenta(codventa,codsucursal,codcliente,criterio,tipo) {
        swal({
          title: "¿Estás seguro?", 
          text: "¿Estás seguro de Eliminar esta Venta?", 
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: '#d33',
          closeOnConfirm: false,
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#3085d6"
        }, function() {
             $.ajax({
                  type: "GET",
                  url: "eliminar.php",
                  data: "codventa="+codventa+"&codsucursal="+codsucursal+"&codcliente="+codcliente+"&tipo="+tipo,
                  success: function(data){

          if(data==1){

            swal("Eliminado!", "Datos eliminados con éxito!", "success");
            $('#muestraventas').load("search.php?CargaVentas=si&bventas="+criterio);
                  
          } else { 

             swal("Oops", "Usted no tiene Acceso para Eliminar Ventas de Productos, no eres el Administrador!", "error"); 

                }
            }
        })
    });
}


//FUNCION PARA BUSQUEDA DE VENTAS POR CAJAS Y FECHAS
function BuscarVentasxCajas(){
                  
$('#muestraventasxcajas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codcaja = $("#codcaja").val();
var tipopago = $('input:radio[name=tipopago]:checked').val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#ventasxcajas").serialize();
var url = 'funciones.php?BuscaVentasxCajas=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestraventasxcajas').empty();
                $('#muestraventasxcajas').append(''+response+'').fadeIn("slow");
                
               }
      }); 
}

// FUNCION PARA BUSQUEDA DE VENTAS POR FECHAS
function BuscarVentasxFechas(){
                        
$('#muestraventasxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var tipopago = $('input:radio[name=tipopago]:checked').val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#ventasxfechas").serialize();
var url = 'funciones.php?BuscaVentasxFechas=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestraventasxfechas').empty();
                $('#muestraventasxfechas').append(''+response+'').fadeIn("slow");
                
             }
      });
}


//FUNCION PARA BUSQUEDA DE VENTAS POR CONDICION DE PAGO Y FECHAS
function BuscarVentasxCondiciones(){
                  
$('#muestraventasxcondiciones').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codcaja = $("#codcaja").val();
var tipopago = $('input:radio[name=tipopago]:checked').val();
var formapago = $("select#formapago").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#ventasxcondiciones").serialize();
var url = 'funciones.php?BuscaVentasxCondiciones=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestraventasxcondiciones').empty();
                $('#muestraventasxcondiciones').append(''+response+'').fadeIn("slow");
                
               }
      }); 
}

//FUNCION PARA BUSQUEDA DE VENTAS POR TIPOS DE CLIENTES Y FECHAS
function BuscarVentasxTipos(){
                  
$('#muestraventasxtipos').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var tipocliente = $("select#tipocliente").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#ventasxtipos").serialize();
var url = 'funciones.php?BuscaVentasxTipos=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestraventasxtipos').empty();
                $('#muestraventasxtipos').append(''+response+'').fadeIn("slow");
                
               }
      }); 
}


//FUNCION PARA BUSQUEDA DE VENTAS POR CLIENTES Y FECHAS
function BuscarVentasxClientes(){
                  
$('#muestraventasxclientes').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codcliente = $("input#codcliente").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#ventasxclientes").serialize();
var url = 'funciones.php?BuscaVentasxClientes=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestraventasxclientes').empty();
                $('#muestraventasxclientes').append(''+response+'').fadeIn("slow");
                
               }
      }); 
}


// FUNCION PARA BUSQUEDA DE COMISION POR DELIVERY
function BuscaDeliveryxFechas(){
    
$('#muestradeliveryxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codigo = $("#codigo").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#deliveryxfechas").serialize();
var url = 'funciones.php?BuscaDeliveryxFechas=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestradeliveryxfechas').empty();
                $('#muestradeliveryxfechas').append(''+response+'').fadeIn("slow");
            }
      }); 
}

// FUNCION PARA BUSQUEDA DE COMISION POR VENDEDOR
function BuscaComisionxVentas(){
    
$('#muestracomisionxventas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codigo = $("#codigo").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#comisionxventas").serialize();
var url = 'funciones.php?BuscaComisionxVentas=si';

        $.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {
                $('#muestracomisionxventas').empty();
                $('#muestracomisionxventas').append(''+response+'').fadeIn("slow");
            }
      }); 
}












/////////////////////////////////// FUNCIONES DE CREDITOS //////////////////////////////////////

// FUNCION PARA MOSTRAR VENTA DE CREDITO EN VENTANA MODAL
function VerCredito(codventa,codsucursal){

$('#muestracreditomodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaCreditoModal=si&codventa='+codventa+"&codsucursal="+codsucursal;

$.ajax({
            type: "GET",
            url: "funciones.php",
            data: dataString,
            success: function(response) {            
                $('#muestracreditomodal').empty();
                $('#muestracreditomodal').append(''+response+'').fadeIn("slow");
                
            }
      });
}

// FUNCION PARA ABONAR PAGO A CREDITOS
function AbonoCreditoVenta(codcliente,codventa,codsucursal,totaldebe,dnicliente,nomcliente,codfactura,totalfactura,fechaventa,totalabono,debe) 
{
    // aqui asigno cada valor a los campos correspondientes
  $("#savepago #codcliente").val(codcliente);
  $("#savepago #codventa").val(codventa);
  $("#savepago #codsucursal").val(codsucursal);
  $("#savepago #totaldebe").val(totaldebe);
  $("#savepago #dnicliente").val(dnicliente);
  $("#savepago #nomcliente").val(nomcliente);
  $("#savepago #codfactura").val(codfactura);
  $("#savepago #totalfactura").val(totalfactura);
  $("#savepago #fechaventa").val(fechaventa);
  $("#savepago #abono").val(totalabono);
  $("#savepago #totalabono").val(totalabono);
  $("#savepago #debe").val(debe);
}

//FUNCION PARA BUSQUEDA DE VENTAS POR CONDICION DE PAGO Y FECHAS
function BuscarAbonosCreditosxCajas(){
                  
$('#muestraabonoscreditosxcajas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codcaja = $("#codcaja").val();
var formapago = $("select#formapago").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#abonoscreditosxcajas").serialize();
var url = 'funciones.php?BuscaAbonosCreditosxCajas=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
    success: function(response) {            
      $('#muestraabonoscreditosxcajas').empty();
      $('#muestraabonoscreditosxcajas').append(''+response+'').fadeIn("slow");
    }
  }); 
}

// FUNCION PARA BUSQUEDA DE CREDITOS POR FECHAS
function BuscarCreditosxFechas(){
                        
$('#muestracreditosxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var status = $('input:radio[name=status]:checked').val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#creditosxfechas").serialize();
var url = 'funciones.php?BuscaCreditosxFechas=si';

$.ajax({
            type: "GET",
            url: url,
            data: dataString,
            success: function(response) {            
                $('#muestracreditosxfechas').empty();
                $('#muestracreditosxfechas').append(''+response+'').fadeIn("slow");
                
             }
      });
}

//FUNCION PARA BUSQUEDA DE CREDITOS POR CLIENTES
function BuscarCreditosxClientes(){
                  
$('#muestracreditosxclientes').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var status = $('input:radio[name=status]:checked').val();
var codcliente = $("#codcliente").val();
var dataString = $("#creditosxclientes").serialize();
var url = 'funciones.php?BuscaCreditosxClientes=si';

$.ajax({
  type: "GET",
  url: url,
  data: dataString,
    success: function(response) {            
    $('#muestracreditosxclientes').empty();
    $('#muestracreditosxclientes').append(''+response+'').fadeIn("slow");        
    }
  }); 
}

//FUNCION PARA BUSQUEDA DE DETALLES DE CREDITOS POR CLIENTES
function BuscarDetallesCreditosxClientes(){
                  
$('#muestradetallescreditosxclientes').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var status = $('input:radio[name=status]:checked').val();
var codcliente = $("#codcliente").val();
var dataString = $("#detallescreditosxclientes").serialize();
var url = 'funciones.php?BuscaDetallesCreditosxClientes=si';

$.ajax({
  type: "GET",
  url: url,
  data: dataString,
    success: function(response) {            
    $('#muestradetallescreditosxclientes').empty();
    $('#muestradetallescreditosxclientes').append(''+response+'').fadeIn("slow");        
    }
  }); 
}




























/////////////////////////////////// FUNCIONES DE NOTAS DE CREDITO //////////////////////////////////////

// FUNCION PARA BUSQUEDA DE FACTURA PARA NOTA DE CREDITO
function BuscarFactura(){
                        
$('#muestrafactura').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');
                
var codsucursal = $("#codsucursal").val();
var numeroventa = $("input#numeroventa").val();
var status = $('input:radio[name=descontar]:checked').val();
var codarqueo = $("input#codarqueo").val();
var dataString = $("#savenota").serialize();
var url = 'funciones.php?ProcesaNotaCredito=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
    success: function(response) {            
      $('#muestrafactura').empty();
      $('#muestrafactura').append(''+response+'').fadeIn("slow");
    }
  });
}

//FUNCIONES PARA VERIFICAR NOTA CREDITO
function VerificaDescuentoCaja(){

    var status = $('input:radio[name=descontar]:checked').val();

    if (status == 1 || status == true) {
         
      //deshabilitamos
      $("#codarqueo").attr('disabled', false);

    } else {

      // habilitamos
      $("#codarqueo").attr('disabled', true);

    }
}

// FUNCION PARA CALCULAR DETALLES VENTAS PARA NOTA DE CREDITO
function ProcesarCalculoDevolucion(indice){

    var devuelto = $('#devuelto_'+indice).val();
    var cantidad = $('#cantidad_'+indice).val();
    var preciocompra = $('#preciocompra_'+indice).val();
    var precioventa = $('#precioventa_'+indice).val();
    var precioconiva = $('#precioconiva_'+indice).val();
    var valortotal = $('#valortotal_'+indice).val();
    var neto = $('#valorneto_'+indice).val();
    var descproducto = $('#descproducto_'+indice).val();
    var ivaproducto = $('#ivaproducto_'+indice).val();
    var ivg = $('#iva').val();
    var desc = $('#descuento').val();
    var ValorNeto = 0;

    if (devuelto > cantidad) {

        $("#devuelto_"+indice).val("0");
        $('#valortotal_'+indice).val("0");
        $('#subtotalivasi_'+indice).val("0");
        $('#subtotalivano_'+indice).val("0");
        $('#subtotalimpuestos_'+indice).val("0");
        $('#valorneto_'+indice).val("0");
        $("#txtvalorneto_"+indice).text("0");
        $("#devuelto_"+indice).focus();
        $("#devuelto").css('border-color', '#f0ad4e');
        swal("Oops", "LA DEVOLUCIÓN NO PUEDE SER MAYOR QUE LA CANTIDAD!", "error");
        return false;
    }

    //REALIZAMOS LA MULTIPLICACION DE PRECIO VENTA * CANTIDAD
    var ValorTotal = parseFloat(devuelto) * parseFloat(precioventa);

    //CALCULO DEL TOTAL DEL DESCUENTO %
    var Descuento = ValorTotal * descproducto / 100;
    var ValorNeto = parseFloat(ValorTotal) - parseFloat(Descuento);

    //CALCULO VALOR TOTAL
    $("#valortotal_"+indice).val(ValorTotal.toFixed(2));
    $("#txtvalortotal_"+indice).text(ValorTotal.toFixed(2));

    //CALCULO TOTAL DESCUENTO
    $("#totaldescuentov_"+indice).val(Descuento.toFixed(2));
    $("#txtdescproducto_"+indice).text(Descuento.toFixed(2));

    //CALCULO VALOR NETO
    $("#valorneto_"+indice).val(ValorNeto.toFixed(2));
    $("#txtvalorneto_"+indice).text(ValorNeto.toFixed(2));

    //CALCULO SUBTOTAL IVA SI
    $("#subtotalivasi_"+indice).val(ivaproducto != '0.00' ? ValorNeto.toFixed(2) : "0");
    //CALCULO SUBTOTAL IVA NO
    $("#subtotalivano_"+indice).val(ivaproducto == "0.00" ? ValorNeto.toFixed(2) : "0"); 

    /*################################ CALCULO DISCRIMINADO ################################*/
    
    //CALCULO SUBTOTAL DISCRIMINADO
    ivg2  = ivg;
    var ValorImpuesto = (ivg2 <= 9) ? "1.0"+parseInt(ivg2) : "1."+parseInt(ivg2);
    var Discriminado = parseFloat(precioconiva) / ValorImpuesto;
    var SubtotalDiscriminado = parseFloat(precioconiva) - parseFloat(Discriminado.toFixed(2));
    var BaseDiscriminado = parseFloat(SubtotalDiscriminado.toFixed(2)) * parseFloat(devuelto);
    //TotalIvaGeneral = parseFloat(TotalIvaGeneral.toFixed(2)) + parseFloat(BaseDiscriminado.toFixed(2));
    var RestoDiscriminado = parseFloat(ValorNeto) - parseFloat(BaseDiscriminado.toFixed(2));
    
    //CALCULO SUBTOTAL IMPUESTOS
    $("#subtotalimpuestos_"+indice).val(BaseDiscriminado.toFixed(2));

    //CALCULO SUBTOTAL DISCRIMINADO
    $("#subtotaldiscriminado_"+indice).val(ivaproducto != "0.00" ? RestoDiscriminado.toFixed(2) : "0"); 

    /*################################ CALCULO DISCRIMINADO ################################*/

    //CALCULO DE SUBTOTAL CON IVA
    var BaseImpIva1=0;
    $('.subtotalivasi').each(function() { 
    ($(this).val() != "0" ? BaseImpIva1 += parseFloat($(this).val()) : BaseImpIva1);
    }); 
    //$('#txtsubtotal').val(Math.round(BaseImpIva1.toFixed(2)));
    //$('#lblsubtotal').text(Separador(Math.round(BaseImpIva1.toFixed(2))));

    //CALCULO DE SUBTOTAL SIN IVA
    var BaseImpIva2=0;
    $('.subtotalivano').each(function() {
    ($(this).val() != "0" ? BaseImpIva2 += parseFloat($(this).val()) : BaseImpIva2);
    }); 
    $('#txtsubtotal2').val(BaseImpIva2.toFixed(2));
    $('#lblsubtotal2').text(Separador(BaseImpIva2.toFixed(2)));

    //CALCULO DE SUBTOTAL GENERAL
    var SubTotal=0;
    $('.subtotaldiscriminado').each(function() {
    SubTotal += parseFloat($(this).val());
    });
    var SubtotalBaseGeneral = parseFloat(SubTotal.toFixed(2)) + parseFloat(BaseImpIva2.toFixed(2));
    $('#lblsubtotal').text(Separador(SubTotal.toFixed(2)));
    $('#txtsubtotal').val(SubTotal.toFixed(2));
    $('#txtdiscriminado').val(SubtotalBaseGeneral.toFixed(2));
    //$('#lblsubtotal').text(Separador(Math.round(SubTotal+BaseImpIva2)));

    //CALCULO DE TOTAL IMPUEST0S 
    var TotalIvaGeneral=0;
    $('.subtotalimpuestos').each(function() {  
    ($(this).val() != "0" ? TotalIvaGeneral += parseFloat($(this).val()) : TotalIvaGeneral);
    }); 
    $('#txtIva').val(TotalIvaGeneral.toFixed(2));
    $('#lbliva').text(Separador(TotalIvaGeneral.toFixed(2)));

    //CALCULO DE TOTAL DESCONTADO
    var TotalDescontado=0;
    $('.totaldescuentov').each(function() { 
    ($(this).val() != "0" ? TotalDescontado += parseFloat($(this).val()) : TotalDescontado); 
    });
    $('#txtdescontado').val(TotalDescontado.toFixed(2));
    $('#lbldescontado').text(Separador(TotalDescontado.toFixed(2))); 

    //CALCULAMOS DESCUENTO POR PRODUCTO
    desc2  = desc/100;

    //CALCULO DEL TOTAL DE FACTURA
    var Total = parseFloat(SubtotalBaseGeneral) + parseFloat(TotalIvaGeneral);
    TotalDescuentoGeneral   = parseFloat(Total.toFixed(2)) * parseFloat(desc2.toFixed(2));
    TotalFactura   = parseFloat(Total.toFixed(2)) - parseFloat(TotalDescuentoGeneral.toFixed(2));

    $('#txtTotal').val(TotalFactura.toFixed(2));
    $('#lbltotal').text(Separador(TotalFactura.toFixed(2)));
}

// FUNCION PARA MOSTRAR NOTA DE CREDITO EN VENTANA MODAL
function VerNota(codnota,codsucursal){

$('#muestranotamodal').html('<center><i class="fa fa-spin fa-spinner"></i> Cargando información, por favor espere....</center>');

var dataString = 'BuscaNotaCreditoModal=si&codnota='+codnota+"&codsucursal="+codsucursal;

$.ajax({
    type: "GET",
    url: "funciones.php",
    data: dataString,
    success: function(response) {            
      $('#muestranotamodal').empty();
      $('#muestranotamodal').append(''+response+'').fadeIn("slow");
    }
  });
}

// FUNCION PARA BUSQUEDA DE NOTAS POR CAJAS
function BuscarNotasxCajas(){
                        
$('#muestranotasxcajas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var codcaja = $("#codcaja").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#notasxcajas").serialize();
var url = 'funciones.php?BuscaNotasxCajas=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
    success: function(response) {            
      $('#muestranotasxcajas').empty();
      $('#muestranotasxcajas').append(''+response+'').fadeIn("slow");  
    }
  });
}

// FUNCION PARA BUSQUEDA DE NOTAS POR FECHAS
function BuscarNotasxFechas(){
                        
$('#muestranotasxfechas').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');

var codsucursal = $("#codsucursal").val();
var desde = $("input#desde").val();
var hasta = $("input#hasta").val();
var dataString = $("#notasxfechas").serialize();
var url = 'funciones.php?BuscaNotasxFechas=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
    success: function(response) {            
      $('#muestranotasxfechas').empty();
      $('#muestranotasxfechas').append(''+response+'').fadeIn("slow");  
    }
  });
}


// FUNCION PARA BUSQUEDA DE NOTAS POR CLIENTE
function BuscarNotasxClientes(){
                        
$('#muestranotasxclientes').html('<center><i class="fa fa-spin fa-spinner"></i> Procesando información, por favor espere....</center>');
                
var codsucursal = $("#codsucursal").val();
var codcliente = $("input#codcliente").val();
var dataString = $("#notasxclientes").serialize();
var url = 'funciones.php?BuscaNotasxClientes=si';

$.ajax({
    type: "GET",
    url: url,
    data: dataString,
    success: function(response) {            
      $('#muestranotasxclientes').empty();
      $('#muestranotasxclientes').append(''+response+'').fadeIn("slow");
    }
  });
}