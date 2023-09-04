<?php
require_once("class/class.php");
?>
<script type="text/javascript" src="assets/script/jscotizaciones.js"></script>
<script src="assets/script/jscalendario.js"></script>
<script src="assets/script/autocompleto.js"></script> 

<?php
$imp = new Login();
$imp = $imp->ImpuestosPorId();
$impuesto = ($imp == "" ? "Impuesto" : $imp[0]['nomimpuesto']);
$valor = ($imp == "" ? "0.00" : $imp[0]['valorimpuesto']);

$simbolo = ($_SESSION["acceso"] == "administradorG" ? "" : "<strong>".$_SESSION["simbolo"]."</strong>");

$new = new Login();
?>


<?php
##################################################################################################################
#                                                                                                                #
#                             FUNCIONES PARA PEDIDOS DE PRODUCTOS EN COTIZACIONES                                #
#                                                                                                                #
##################################################################################################################
?>

<?php
######################## BUSQUEDA DETALLE DE PRODUCTO EN COTIZACION #######################
if (isset($_GET['BuscaDetallesProductoxObservacion']) && isset($_GET['d_codigo']) && isset($_GET['d_tipo']) && isset($_GET['d_cantidad']) && isset($_GET['d_observacion']) && isset($_GET['d_salsa'])) { 

if(limpiar($_GET['d_tipo'] == 1)){ 

$reg = $new->DetallesProductoPorId();

?>

      <div class="row">
        <div class="col-md-2">
          <div class="form-group has-feedback">
            <label class="control-label">Cantidad: <span class="symbol required"></span></label>
            <br /><abbr title="Cantidad de Producto"><label id="d_cantidad"><?php echo $_GET['d_cantidad']; ?></label></abbr>
          </div>
        </div>

        <div class="col-md-8">
          <div class="form-group has-feedback">
            <label class="control-label">Descripción de Producto: <span class="symbol required"></span></label>
            <br /><abbr title="Descripción de Producto"><label id="d_producto"><?php echo $reg[0]['producto']; ?></label></abbr>
          </div>
        </div>

        <div class="col-md-2">
          <div class="form-group has-feedback">
            <label class="control-label">Precio: <span class="symbol required"></span></label>
            <br /><abbr title="Precio de Producto"><label id="d_precioventa"><?php echo number_format($reg[0]['precioventa'], 2, '.', ','); ?></label></abbr>
          </div>
        </div>
      </div>

      <?php 
$tru = new Login();
$a=1;
$busq = $tru->VerDetallesIngredientesModal(); 

if($busq==""){

    echo "";      
    
} else {

?>
<div id="div1">
  <table id="default_order" class="table2 table-striped table-bordered border display m-t-10">
          <thead>
          <tr>
        <th colspan="6" data-priority="1"><center>Ingredientes Agregados</center></th>
          </tr>
          <tr>
            <th>Nº</th>
            <th>Ingrediente</th>
            <th>Medida</th>
            <th>Cant. Ración</th>
          </tr>
          </thead>
            <tbody>
<?php 
$TotalCosto=0;
for($i=0;$i<sizeof($busq);$i++){
$TotalCosto+=($busq[$i]['precioventa']-$busq[$i]['descingrediente']/100)*$busq[$i]["cantracion"];
?>
          <tr>
            <th><?php echo $a++; ?></th>
<td><?php echo $busq[$i]["nomingrediente"]; ?></td>
<td><?php echo $busq[$i]["nommedida"]; ?></td>
<td><?php echo $busq[$i]["cantracion"]; ?></td>
          </tr> 
            <?php } ?> 
         </tbody>
        </table>
        </div>

  <?php } ?>

      <div class="row m-t-5">
        <div class="col-md-12"> 
          <div class="form-group has-feedback2"> 
            <label class="control-label">Observaciones: <span class="symbol required"></span></label> 
            <textarea class="form-control" type="text" name="observacion" id="observacion" onKeyUp="this.value=this.value.toUpperCase();" onfocus="this.style.background=('#FDF0DF')" onBlur="DoActionObservacion(
            '<?php echo $reg[0]['idproducto']; ?>',
            '<?php echo $reg[0]['codproducto']; ?>',
            '<?php echo $reg[0]['producto']; ?>',
            '<?php echo $reg[0]['codcategoria']; ?>',
            '<?php echo $reg[0]['nomcategoria']; ?>',
            '<?php echo number_format($reg[0]['preciocompra'], 2, '.', ''); ?>',
            '<?php echo number_format($reg[0]['precioventa'], 2, '.', ''); ?>',
            '<?php echo number_format($reg[0]['descproducto'], 2, '.', ''); ?>',
            '<?php echo $ivaproducto = ( $reg[0]['ivaproducto'] == 'SI' ? number_format($valor, 2, '.', '') : "(E)"); ?>',
            '<?php echo number_format($reg[0]['existencia'], 2, '.', ''); ?>',
            '<?php echo $precioconiva = ( $reg[0]['ivaproducto'] == 'SI' ? number_format($reg[0]['precioventa'], 2, '.', '') : "0.00"); ?>',
            '<?php echo "1"; ?>',
            document.getElementById('observacion').value,
            '<?php echo $_GET['d_salsa']; ?>',
            '<?php echo $reg[0]['preparado']; ?>');" autocomplete="off" placeholder="Agrega un comentario aqui...." rows="2" required="" aria-required="true"><?php echo str_replace("_"," ", $_GET['d_observacion']); ?></textarea>
            <i class="fa fa-comment-o form-control-feedback2"></i> 
          </div> 
        </div>
      </div> 

<?php } elseif(limpiar($_GET['d_tipo'] == 2)){ 

$reg = $new->DetallesComboPorId();

?>
      <div class="row">
        <div class="col-md-2">
          <div class="form-group has-feedback">
            <label class="control-label">Cantidad: <span class="symbol required"></span></label>
            <br /><abbr title="Cantidad de Combo"><label id="d_cantidad"><?php echo $_GET['d_cantidad']; ?></label></abbr>
          </div>
        </div>

        <div class="col-md-8">
          <div class="form-group has-feedback">
            <label class="control-label">Descripción de Combo: <span class="symbol required"></span></label>
            <br /><abbr title="Descripción de Combo"><label id="d_producto"><?php echo $reg[0]['nomcombo']; ?></label></abbr>
          </div>
        </div>

        <div class="col-md-2">
          <div class="form-group has-feedback">
            <label class="control-label">Precio: <span class="symbol required"></span></label>
            <br /><abbr title="Precio de Combo"><label id="d_precioventa"><?php echo number_format($reg[0]['precioventa'], 2, '.', ','); ?></label></abbr>
          </div>
        </div>
      </div>

      <?php 
$tru = new Login();
$a=1;
$busq = $tru->VerDetallesProductosModal(); 

if($busq==""){

    echo "";      
    
} else {

?>
<div id="div">
  <table id="default_order" class="table2 table-striped table-bordered border display m-t-10">
          <thead>
          <tr>
        <th colspan="6" data-priority="1"><center>Productos Agregados</center></th>
          </tr>
          <tr>
            <th>Nº</th>
            <th>Producto</th>
            <th>Categoria</th>
            <th>Cantidad</th>
          </tr>
          </thead>
            <tbody>
<?php 
$TotalCosto=0;
for($i=0;$i<sizeof($busq);$i++){
$TotalCosto+=($busq[$i]['precioventa']-$busq[$i]['descproducto']/100)*$busq[$i]["cantidad"];
?>
          <tr>
            <th><?php echo $a++; ?></th>
<td><?php echo $busq[$i]["producto"]; ?></td>
<td><?php echo $busq[$i]["nomcategoria"]; ?></td>
<td><?php echo $busq[$i]["cantidad"]; ?></td>
          </tr> 
            <?php } ?>
         </tbody>
        </table>
        </div>
<?php } ?>

      <div class="row m-t-5">
        <div class="col-md-12"> 
          <div class="form-group has-feedback2"> 
            <label class="control-label">Observaciones: <span class="symbol required"></span></label> 
            <textarea class="form-control" type="text" name="observacion" id="observacion" onKeyUp="this.value=this.value.toUpperCase();" onfocus="this.style.background=('#FDF0DF')" onBlur="DoActionObservacion(
            '<?php echo $reg[0]['idcombo']; ?>',
            '<?php echo $reg[0]['codcombo']; ?>',
            '<?php echo $reg[0]['nomcombo']; ?>',
            '<?php echo "********"; ?>',
            '<?php echo "********"; ?>',
            '<?php echo number_format($reg[0]['preciocompra'], 2, '.', ''); ?>',
            '<?php echo number_format($reg[0]['precioventa'], 2, '.', ''); ?>',
            '<?php echo number_format($reg[0]['desccombo'], 2, '.', ''); ?>',
            '<?php echo $ivacombo = ( $reg[0]['ivacombo'] == 'SI' ? number_format($valor, 2, '.', '') : "(E)"); ?>',
            '<?php echo number_format($reg[0]['existencia'], 2, '.', ''); ?>',
            '<?php echo $precioconiva = ( $reg[0]['ivacombo'] == 'SI' ? number_format($reg[0]['precioventa'], 2, '.', '') : "0.00"); ?>',
            '<?php echo "2"; ?>',
            document.getElementById('observacion').value,
            '<?php echo $_GET['d_salsa']; ?>',
            '<?php echo $reg[0]['preparado']; ?>');" autocomplete="off" placeholder="Agrega un comentario aqui...." rows="2" required="" aria-required="true"><?php echo str_replace("_"," ", $_GET['d_observacion']); ?></textarea>
            <i class="fa fa-comment-o form-control-feedback2"></i> 
          </div> 
        </div>
      </div>
<?php

} else { 

$reg = $new->DetallesIngredientesPorId();

?>
      <div class="row">
        <div class="col-md-2">
          <div class="form-group has-feedback">
            <label class="control-label">Cantidad: <span class="symbol required"></span></label>
            <br /><abbr title="Cantidad de Combo"><label id="d_cantidad"><?php echo $_GET['d_cantidad']; ?></label></abbr>
          </div>
        </div>

        <div class="col-md-8">
          <div class="form-group has-feedback">
            <label class="control-label">Descripción de Combo: <span class="symbol required"></span></label>
            <br /><abbr title="Descripción de Combo"><label id="d_producto"><?php echo $reg[0]['nomingrediente']; ?></label></abbr>
          </div>
        </div>

        <div class="col-md-2">
          <div class="form-group has-feedback">
            <label class="control-label">Precio: <span class="symbol required"></span></label>
            <br /><abbr title="Precio de Combo"><label id="d_precioventa"><?php echo number_format($reg[0]['precioventa'], 2, '.', ','); ?></label></abbr>
          </div>
        </div>
      </div>

      <div class="row m-t-5">
        <div class="col-md-12"> 
          <div class="form-group has-feedback2"> 
            <label class="control-label">Observaciones: <span class="symbol required"></span></label> 
            <textarea class="form-control" type="text" name="observacion" id="observacion" onKeyUp="this.value=this.value.toUpperCase();" onfocus="this.style.background=('#FDF0DF')" onBlur="DoActionObservacion(
            '<?php echo $reg[0]['idingrediente']; ?>',
            '<?php echo $reg[0]['codingrediente']; ?>',
            '<?php echo $reg[0]['nomingrediente']; ?>',
            '<?php echo $reg[0]['codmedida']; ?>',
            '<?php echo $reg[0]['nommedida']; ?>',
            '<?php echo number_format($reg[0]['preciocompra'], 2, '.', ''); ?>',
            '<?php echo number_format($reg[0]['precioventa'], 2, '.', ''); ?>',
            '<?php echo number_format($reg[0]['descingrediente'], 2, '.', ''); ?>',
            '<?php echo $ivaingrediente = ( $reg[0]['ivaingrediente'] == 'SI' ? number_format($valor, 2, '.', '') : "(E)"); ?>',
            '<?php echo number_format($reg[0]['cantingrediente'], 2, '.', ''); ?>',
            '<?php echo $precioconiva = ( $reg[0]['ivaingrediente'] == 'SI' ? number_format($reg[0]['precioventa'], 2, '.', '') : "0.00"); ?>',
            '<?php echo "3"; ?>',
            document.getElementById('observacion').value,
            '<?php echo $_GET['d_salsa']; ?>',
            '<?php echo $reg[0]['preparado']; ?>');" autocomplete="off" placeholder="Agrega un comentario aqui...." rows="2" required="" aria-required="true"><?php echo str_replace("_"," ", $_GET['d_observacion']); ?></textarea>
            <i class="fa fa-comment-o form-control-feedback2"></i> 
          </div> 
        </div>
      </div> 
<?php
  }
} 
######################## BUSQUEDA DETALLE DE PRODUCTO ########################
?>


<?php
######################## BUSQUEDA DETALLE DE PRODUCTO PARA SALSAS #######################
if (isset($_GET['BuscaDetallesProductoxSalsa']) && isset($_GET['d_codigo']) && isset($_GET['d_tipo']) && isset($_GET['d_cantidad']) && isset($_GET['d_observacion']) && isset($_GET['d_salsa'])) { 

$explode = explode(",", $_GET['d_salsa']);
//var_dump($explode);

if(limpiar($_GET['d_tipo'] == 1)){ 

$reg = $new->DetallesProductoPorId();

?>

      <div class="row">
        <div class="col-md-2">
          <div class="form-group has-feedback">
            <label class="control-label">Cantidad: <span class="symbol required"></span></label>
            <br /><abbr title="Cantidad de Producto"><label id="d_cantidad"><?php echo $_GET['d_cantidad']; ?></label></abbr>
          </div>
        </div>

        <div class="col-md-8">
          <div class="form-group has-feedback">
            <label class="control-label">Descripción de Producto: <span class="symbol required"></span></label>
            <br /><abbr title="Descripción de Producto"><label id="d_producto"><?php echo $reg[0]['producto']; ?></label></abbr>
          </div>
        </div>

        <div class="col-md-2">
          <div class="form-group has-feedback">
            <label class="control-label">Precio: <span class="symbol required"></span></label>
            <br /><abbr title="Precio de Producto"><label id="d_precioventa"><?php echo number_format($reg[0]['precioventa'], 2, '.', ','); ?></label></abbr>
          </div>
        </div>
      </div>

      <?php 
$tru = new Login();
$a=1;
$busq = $tru->VerDetallesIngredientesModal(); 

if($busq==""){

    echo "";      
    
} else {

?>
<div id="div1">
  <table id="default_order" class="table2 table-striped table-bordered border display m-t-10">
          <thead>
          <tr>
        <th colspan="6" data-priority="1"><center>Ingredientes Agregados</center></th>
          </tr>
          <tr>
            <th>Nº</th>
            <th>Ingrediente</th>
            <th>Medida</th>
            <th>Cant. Ración</th>
          </tr>
          </thead>
            <tbody>
<?php 
$TotalCosto=0;
for($i=0;$i<sizeof($busq);$i++){
$TotalCosto+=($busq[$i]['precioventa']-$busq[$i]['descingrediente']/100)*$busq[$i]["cantracion"];
?>
          <tr>
            <th><?php echo $a++; ?></th>
<td><?php echo $busq[$i]["nomingrediente"]; ?></td>
<td><?php echo $busq[$i]["nommedida"]; ?></td>
<td><?php echo $busq[$i]["cantracion"]; ?></td>
          </tr> 
            <?php } ?> 
         </tbody>
        </table>
        </div>

  <?php } ?>

  <hr>

  <input type="hidden" name="nombres_salsa" id="nombres_salsa"/>

  <div id="div1">

    <div class='row'>

<?php 
$new = new Login();
$salsa = $new->ListarSalsas();

if($salsa==""){
    
    echo "<div class='alert alert-danger'>";
    echo "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>";
    echo "<center><span class='fa fa-info-circle'></span> NO SE ENCONTRARON SALSAS ACTUALMENTE </center>";
    echo "</div>";    

} else {
 
$v=1;
for($i=0;$i<sizeof($salsa);$i++){ 
$v++;  
?>  

    <div class='col-md-4'>

      <label class="checkeable">
        <input type="checkbox" name="nomsalsa[]" id="nomsalsa_<?php echo $v; ?>" value="<?php echo $nombre = str_replace(" ", "_", $salsa[$i]['nomsalsa']); ?>" <?php echo $var = in_array($nombre, $explode) ? "checked=\"checked\"" : ""; ?> onClick="CargaDetallesSalsas(document.getElementById('nomsalsa_<?php echo $v; ?>').value)">
        <?php if (file_exists("fotos/salsas/".$salsa[$i]["codsalsa"].".jpg")){
          echo "<img src='fotos/salsas/".$salsa[$i]["codsalsa"].".jpg?' class='rounded-circle' title='".$salsa[$i]['nomsalsa']."' style='margin:0px;' width='80' height='80'><br><h6 class='text-center alert-link'>".$salsa[$i]['nomsalsa']."</h6>";
        }else{
          echo "<img src='fotos/img.png' class='rounded-circle' title='".$salsa[$i]['nomsalsa']."' style='margin:0px;' width='80' height='80'><br><h6 class='text-center alert-link'>".$salsa[$i]['nomsalsa']."</h6>";  
        } ?>
      </label>

    </div>

  <?php } } ?>

    </div>

  </div>

        <div class="modal-footer">
          <button type="button" onClick="DoActionSalsa(
            '<?php echo $reg[0]['idproducto']; ?>',
            '<?php echo $reg[0]['codproducto']; ?>',
            '<?php echo $reg[0]['producto']; ?>',
            '<?php echo $reg[0]['codcategoria']; ?>',
            '<?php echo $reg[0]['nomcategoria']; ?>',
            '<?php echo number_format($reg[0]['preciocompra'], 2, '.', ''); ?>',
            '<?php echo number_format($reg[0]['precioventa'], 2, '.', ''); ?>',
            '<?php echo number_format($reg[0]['descproducto'], 2, '.', ''); ?>',
            '<?php echo $ivaproducto = ( $reg[0]['ivaproducto'] == 'SI' ? number_format($valor, 2, '.', '') : "(E)"); ?>',
            '<?php echo number_format($reg[0]['existencia'], 2, '.', ''); ?>',
            '<?php echo $precioconiva = ( $reg[0]['ivaproducto']  == 'SI' ? number_format($reg[0]['precioventa'], 2, '.', '') : "0.00"); ?>',
            '<?php echo "1"; ?>',
            '<?php echo $_GET['d_observacion']; ?>',
            document.getElementById('nombres_salsa').value,
            '<?php echo $reg[0]['preparado']; ?>');" name="agregar" id="agregar" data-dismiss="modal" class="btn btn-info"><span class="fa fa-plus-circle"></span> Agregar</button>
          <button type="button" class="btn btn-dark" data-dismiss="modal"><span class="fa fa-times-circle"></span> Cerrar</button>
        </div>

<?php } elseif(limpiar($_GET['d_tipo'] == 2)){ 

$reg = $new->DetallesComboPorId();

?>
      <div class="row">
        <div class="col-md-2">
          <div class="form-group has-feedback">
            <label class="control-label">Cantidad: <span class="symbol required"></span></label>
            <br /><abbr title="Cantidad de Combo"><label id="d_cantidad"><?php echo $_GET['d_cantidad']; ?></label></abbr>
          </div>
        </div>

        <div class="col-md-8">
          <div class="form-group has-feedback">
            <label class="control-label">Descripción de Combo: <span class="symbol required"></span></label>
            <br /><abbr title="Descripción de Combo"><label id="d_producto"><?php echo $reg[0]['nomcombo']; ?></label></abbr>
          </div>
        </div>

        <div class="col-md-2">
          <div class="form-group has-feedback">
            <label class="control-label">Precio: <span class="symbol required"></span></label>
            <br /><abbr title="Precio de Combo"><label id="d_precioventa"><?php echo number_format($reg[0]['precioventa'], 2, '.', ','); ?></label></abbr>
          </div>
        </div>
      </div>

      <?php 
$tru = new Login();
$a=1;
$busq = $tru->VerDetallesProductosModal(); 

if($busq==""){

    echo "";      
    
} else {

?>
<div id="div">
  <table id="default_order" class="table2 table-striped table-bordered border display m-t-10">
          <thead>
          <tr>
        <th colspan="6" data-priority="1"><center>Productos Agregados</center></th>
          </tr>
          <tr>
            <th>Nº</th>
            <th>Producto</th>
            <th>Categoria</th>
            <th>Cantidad</th>
          </tr>
          </thead>
            <tbody>
<?php 
$TotalCosto=0;
for($i=0;$i<sizeof($busq);$i++){
$TotalCosto+=($busq[$i]['precioventa']-$busq[$i]['descproducto']/100)*$busq[$i]["cantidad"];
?>
          <tr>
            <th><?php echo $a++; ?></th>
<td><?php echo $busq[$i]["producto"]; ?></td>
<td><?php echo $busq[$i]["nomcategoria"]; ?></td>
<td><?php echo $busq[$i]["cantidad"]; ?></td>
          </tr> 
            <?php } ?>
         </tbody>
        </table>
        </div>
<?php } ?>

  <hr>

  <input type="hidden" name="nombres_salsa" id="nombres_salsa"/>

  <div id="div1">

    <div class='row'>

<?php 
$new = new Login();
$salsa = $new->ListarSalsas();

if($salsa==""){
    
    echo "<div class='alert alert-danger'>";
    echo "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>";
    echo "<center><span class='fa fa-info-circle'></span> NO SE ENCONTRARON SALSAS ACTUALMENTE </center>";
    echo "</div>";    

} else {
 
$v=1;
for($i=0;$i<sizeof($salsa);$i++){ 
$v++;  
?>  

    <div class='col-md-4'>

      <label class="checkeable">
        <input type="checkbox" name="nomsalsa[]" id="nomsalsa_<?php echo $v; ?>" value="<?php echo $nombre = str_replace(" ", "_", $salsa[$i]['nomsalsa']); ?>" <?php echo $var = in_array($nombre, $explode) ? "checked=\"checked\"" : ""; ?> onClick="CargaDetallesSalsas(document.getElementById('nomsalsa_<?php echo $v; ?>').value)">
        <?php if (file_exists("fotos/salsas/".$salsa[$i]["codsalsa"].".jpg")){
          echo "<img src='fotos/salsas/".$salsa[$i]["codsalsa"].".jpg?' class='rounded-circle' title='".$salsa[$i]['nomsalsa']."' style='margin:0px;' width='80' height='80'><br><h6 class='text-center alert-link'>".$salsa[$i]['nomsalsa']."</h6>";
        }else{
          echo "<img src='fotos/img.png' class='rounded-circle' title='".$salsa[$i]['nomsalsa']."' style='margin:0px;' width='80' height='80'><br><h6 class='text-center alert-link'>".$salsa[$i]['nomsalsa']."</h6>";  
        } ?>
      </label>

    </div>

  <?php } } ?>

    </div>

  </div>

      <div class="modal-footer">
          <button type="button" onClick="DoActionSalsa(
            '<?php echo $reg[0]['idcombo']; ?>',
            '<?php echo $reg[0]['codcombo']; ?>',
            '<?php echo $reg[0]['nomcombo']; ?>',
            '<?php echo "********"; ?>',
            '<?php echo "********"; ?>',
            '<?php echo number_format($reg[0]['preciocompra'], 2, '.', ''); ?>',
            '<?php echo number_format($reg[0]['precioventa'], 2, '.', ''); ?>',
            '<?php echo number_format($reg[0]['desccombo'], 2, '.', ''); ?>',
            '<?php echo $ivaproducto = ( $reg[0]['ivacombo'] == 'SI' ? number_format($valor, 2, '.', '') : "(E)"); ?>',
            '<?php echo number_format($reg[0]['existencia'], 2, '.', ''); ?>',
            '<?php echo $precioconiva = ( $reg[0]['ivacombo'] == 'SI' ? number_format($reg[0]['precioventa'], 2, '.', '') : "0.00"); ?>',
            '<?php echo "2"; ?>',
            '<?php echo $_GET['d_observacion']; ?>',
            document.getElementById('nombres_salsa').value,
            '<?php echo $reg[0]['preparado']; ?>');" name="agregar" id="agregar" data-dismiss="modal" class="btn btn-info"><span class="fa fa-plus-circle"></span> Agregar</button>
          <button type="button" class="btn btn-dark" data-dismiss="modal"><span class="fa fa-times-circle"></span> Cerrar</button>
        </div>

<?php

} else { 

$reg = $new->DetallesIngredientesPorId();

?>
      <div class="row">
        <div class="col-md-2">
          <div class="form-group has-feedback">
            <label class="control-label">Cantidad: <span class="symbol required"></span></label>
            <br /><abbr title="Cantidad de Combo"><label id="d_cantidad"><?php echo $_GET['d_cantidad']; ?></label></abbr>
          </div>
        </div>

        <div class="col-md-8">
          <div class="form-group has-feedback">
            <label class="control-label">Descripción de Combo: <span class="symbol required"></span></label>
            <br /><abbr title="Descripción de Combo"><label id="d_producto"><?php echo $reg[0]['nomingrediente']; ?></label></abbr>
          </div>
        </div>

        <div class="col-md-2">
          <div class="form-group has-feedback">
            <label class="control-label">Precio: <span class="symbol required"></span></label>
            <br /><abbr title="Precio de Combo"><label id="d_precioventa"><?php echo number_format($reg[0]['precioventa'], 2, '.', ','); ?></label></abbr>
          </div>
        </div>
      </div>

  <hr>

  <input type="hidden" name="nombres_salsa" id="nombres_salsa"/>

  <div id="div1">

    <div class='row'>

<?php 
$new = new Login();
$salsa = $new->ListarSalsas();

if($salsa==""){
    
    echo "<div class='alert alert-danger'>";
    echo "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>";
    echo "<center><span class='fa fa-info-circle'></span> NO SE ENCONTRARON SALSAS ACTUALMENTE </center>";
    echo "</div>";    

} else {
 
$v=1;
for($i=0;$i<sizeof($salsa);$i++){ 
$v++;  
?>  

    <div class='col-md-4'>

      <label class="checkeable">
        <input type="checkbox" name="nomsalsa[]" id="nomsalsa_<?php echo $v; ?>" value="<?php echo $nombre = str_replace(" ", "_", $salsa[$i]['nomsalsa']); ?>" <?php echo $var = in_array($nombre, $explode) ? "checked=\"checked\"" : ""; ?> onClick="CargaDetallesSalsas(document.getElementById('nomsalsa_<?php echo $v; ?>').value)">
        <?php if (file_exists("fotos/salsas/".$salsa[$i]["codsalsa"].".jpg")){
          echo "<img src='fotos/salsas/".$salsa[$i]["codsalsa"].".jpg?' class='rounded-circle' title='".$salsa[$i]['nomsalsa']."' style='margin:0px;' width='80' height='80'><br><h6 class='text-center alert-link'>".$salsa[$i]['nomsalsa']."</h6>";
        }else{
          echo "<img src='fotos/img.png' class='rounded-circle' title='".$salsa[$i]['nomsalsa']."' style='margin:0px;' width='80' height='80'><br><h6 class='text-center alert-link'>".$salsa[$i]['nomsalsa']."</h6>";  
        } ?>
      </label>

    </div>

  <?php } } ?>

    </div>

  </div>

      <div class="modal-footer">
          <button type="button" onClick="DoActionSalsa(
            '<?php echo $reg[0]['idingrediente']; ?>',
            '<?php echo $reg[0]['codingrediente']; ?>',
            '<?php echo $reg[0]['nomingrediente']; ?>',
            '<?php echo $reg[0]['codmedida']; ?>',
            '<?php echo $reg[0]['nommedida']; ?>',
            '<?php echo number_format($reg[0]['preciocompra'], 2, '.', ''); ?>',
            '<?php echo number_format($reg[0]['precioventa'], 2, '.', ''); ?>',
            '<?php echo number_format($reg[0]['descingrediente'], 2, '.', ''); ?>',
            '<?php echo $ivaproducto = ( $reg[0]['ivaingrediente'] == 'SI' ? number_format($valor, 2, '.', '') : "(E)"); ?>',
            '<?php echo number_format($reg[0]['cantingrediente'], 2, '.', ''); ?>',
            '<?php echo $precioconiva = ( $reg[0]['ivaingrediente'] == 'SI' ? number_format($reg[0]['precioventa'], 2, '.', '') : "0.00"); ?>',
            '<?php echo "3"; ?>',
            '<?php echo $_GET['d_observacion']; ?>',
            document.getElementById('nombres_salsa').value,
            '<?php echo $reg[0]['preparado']; ?>');" name="agregar" id="agregar" data-dismiss="modal" class="btn btn-info"><span class="fa fa-plus-circle"></span> Agregar</button>
          <button type="button" class="btn btn-dark" data-dismiss="modal"><span class="fa fa-times-circle"></span> Cerrar</button>
        </div>

<?php
  }
} 
######################## BUSQUEDA DETALLE DE PRODUCTO PARA SALSAS ########################
?>


<?php 
######################## MUESTRA DETALLES DE SALSAS AGREGADAS ########################
if (isset($_GET['CargaDetalleSalsasAgregadas']) && isset($_GET['nomsalsa'])) { 
?>

<input type="hidden" name="nombres_salsa" id="nombres_salsa" value="<?php echo $_GET['nomsalsa']; ?>"/>

<?php
} 
######################## MUESTRA DETALLES DE SALSAS AGREGADAS ########################
?>


<?php 
######################## MUESTRA CONDICIONES DE PAGO PARA COTIZACIONES ########################
if (isset($_GET['BuscaCondicionesPagos']) && isset($_GET['tipopago']) && isset($_GET['txtTotal'])) { 
  
 if(limpiar($_GET['tipopago'])==""){ echo ""; 

 } elseif(limpiar($_GET['tipopago'])=="CONTADO"){  ?>

    <div class="row">

        <!-- .col -->
        <div class="col-md-6">

        <h4 class="card-subtitle m-0 text-dark"><i class="font-18 mdi mdi-cash-multiple"></i> Métodos de Pago Nº 1</h4><hr>
            
        <div class="row">
          <div class="col-md-12"> 
            <div class="form-group has-feedback"> 
              <label class="control-label">Forma de Pago Nº 1: <span class="symbol required"></span></label>
              <i class="fa fa-bars form-control-feedback"></i>
              <select style="color:#000;font-weight:bold;" name="formapago" id="formapago" class="form-control" required="" aria-required="true">
                <option value=""> -- SELECCIONE -- </option>
                <option value="EFECTIVO" selected="">EFECTIVO</option>
                <option value="CHEQUE">CHEQUE</option>
                <option value="TARJETA DE CREDITO">TARJETA DE CRÉDITO</option>
                <option value="TARJETA DE DEBITO">TARJETA DE DÉBITO</option>
                <option value="TARJETA PREPAGO">TARJETA PREPAGO</option>
                <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                <option value="DINERO ELECTRONICO">DINERO ELECTRÓNICO</option>
                <option value="CUPON">CUPÓN</option>
                <option value="OTROS">OTROS</option>
              </select>
            </div> 
          </div>
        </div>

        <div class="row">
          <div class="col-md-12"> 
            <div class="form-group has-feedback"> 
              <label class="control-label">Monto de Pago Nº 1: <span class="symbol required"></span></label>
              <input type="hidden" name="montodevuelto" id="montodevuelto" value="0.00">
              <input class="form-control" type="text" name="montopagado" id="montopagado" onKeyUp="DevolucionCotizacion();" onKeyPress="EvaluateText('%f', this);" onBlur="this.value = NumberFormat(this.value, '2', '.', '')" autocomplete="off" placeholder="Monto de Pago Nº 1" value="<?php echo number_format($_GET['txtTotal'], 2, '.', ''); ?>" required="" aria-required="true"> 
              <i class="fa fa-dollar form-control-feedback"></i>
            </div> 
          </div>
        </div>

        </div>
        <!-- /.col -->

        <!-- .col -->
        <div class="col-md-6">

        <h4 class="card-subtitle m-0 text-dark"><i class="font-18 mdi mdi-cash-multiple"></i> Métodos de Pago Nº 2</h4><hr>
            
        <div class="row">
          <div class="col-md-12"> 
            <div class="form-group has-feedback"> 
              <label class="control-label">Forma de Pago Nº 2: </label>
              <i class="fa fa-bars form-control-feedback"></i>
              <select style="color:#000;font-weight:bold;" name="formapago2" id="formapago2" class="form-control" required="" aria-required="true">
                <option value=""> -- SELECCIONE -- </option>
                <option value="EFECTIVO">EFECTIVO</option>
                <option value="CHEQUE">CHEQUE</option>
                <option value="TARJETA DE CREDITO">TARJETA DE CRÉDITO</option>
                <option value="TARJETA DE DEBITO">TARJETA DE DÉBITO</option>
                <option value="TARJETA PREPAGO">TARJETA PREPAGO</option>
                <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                <option value="DINERO ELECTRONICO">DINERO ELECTRÓNICO</option>
                <option value="CUPON">CUPÓN</option>
                <option value="OTROS">OTROS</option>
              </select>
            </div> 
          </div>
        </div>

        <div class="row">
          <div class="col-md-12"> 
            <div class="form-group has-feedback"> 
              <label class="control-label">Monto de Pago Nº 2: </label>
              <input class="form-control" type="text" name="montopagado2" id="montopagado2" onKeyUp="DevolucionCotizacion();" onKeyPress="EvaluateText('%f', this);" onBlur="this.value = NumberFormat(this.value, '2', '.', '')" autocomplete="off" placeholder="Monto de Pago Nº 2" value="0.00" disabled="" required="" aria-required="true"> 
              <i class="fa fa-dollar form-control-feedback"></i>
            </div>  
          </div>
        </div>

        </div>
        <!-- /.col -->

      </div><!-- END CONDICION PAGO -->

      <div class="row">
        <div class="col-md-12"> 
          <div class="form-group has-feedback2"> 
            <label class="control-label">Observaciones: </label> 
            <textarea class="form-control" type="text" name="observaciones" id="observaciones" onKeyUp="this.value=this.value.toUpperCase();" autocomplete="off" placeholder="Ingrese Observaciones" rows="1"></textarea>
            <i class="fa fa-comment-o form-control-feedback2"></i> 
          </div> 
        </div>
      </div>
          
 <?php   } else if(limpiar($_GET['tipopago'])=="CREDITO"){  ?>

      <div class="row">
        <div class="col-md-6"> 
             <div class="form-group has-feedback"> 
                <label class="control-label">Fecha Vence Crédito: <span class="symbol required"></span></label> 
                <input type="text" class="form-control vencecredito" name="fechavencecredito" id="fechavencecredito" onKeyUp="this.value=this.value.toUpperCase();" autocomplete="off" value="<?php echo date("d-m-Y"); ?>" placeholder="Ingrese Fecha Vence Crédito" aria-required="true">
                <i class="fa fa-calendar form-control-feedback"></i>  
           </div> 
        </div>

        <div class="col-md-6"> 
            <div class="form-group has-feedback"> 
              <label class="control-label">Forma de Abono: </label>
                <i class="fa fa-bars form-control-feedback"></i>
                <select style="color:#000;font-weight:bold;" name="medioabono" id="medioabono" class="form-control" required="" aria-required="true">
                <option value=""> -- SELECCIONE -- </option>
                <option value="EFECTIVO">EFECTIVO</option>
                <option value="CHEQUE">CHEQUE</option>
                <option value="TARJETA DE CREDITO">TARJETA DE CRÉDITO</option>
                <option value="TARJETA DE DEBITO">TARJETA DE DÉBITO</option>
                <option value="TARJETA PREPAGO">TARJETA PREPAGO</option>
                <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                <option value="DINERO ELECTRONICO">DINERO ELECTRÓNICO</option>
                <option value="CUPON">CUPÓN</option>
                <option value="OTROS">OTROS</option>
              </select>
            </div> 
        </div>
      </div>

      <div class="row">
        <div class="col-md-6"> 
          <div class="form-group has-feedback"> 
            <label class="control-label">Abono Crédito: <span class="symbol required"></span></label>
            <input type="hidden" name="formapago" id="formapago" value="">
            <input type="hidden" name="montopagado" id="montopagado" value="0.00">
            <input type="hidden" name="formapago2" id="formapago2" value="">
            <input type="hidden" name="montopagado2" id="montopagado2" value="0.00">
            <input type="hidden" name="montodevuelto" id="montodevuelto" value="0.00">
            <input class="form-control number" type="text" name="montoabono" id="montoabono" onKeyUp="this.value=this.value.toUpperCase();" onKeyPress="EvaluateText('%f', this);" onBlur="this.value = NumberFormat(this.value, '2', '.', '')" autocomplete="off" placeholder="Ingrese Monto de Abono" value="0.00" required="" aria-required="true"> 
            <i class="fa fa-dollar form-control-feedback"></i>
          </div> 
        </div>

        <div class="col-md-6"> 
          <div class="form-group has-feedback2"> 
            <label class="control-label">Observaciones: </label> 
            <textarea class="form-control" type="text" name="observaciones" id="observaciones" onKeyUp="this.value=this.value.toUpperCase();" autocomplete="off" placeholder="Ingrese Observaciones" rows="1"></textarea>
            <i class="fa fa-comment-o form-control-feedback2"></i> 
          </div> 
        </div>
      </div>
 
<?php  }
  }
######################## MUESTRA CONDICIONES DE PAGO PARA COTIZACIONES ########################
?>



<?php
##################################################################################################################
#                                                                                                                #
#                              FUNCIONES PARA PEDIDOS DE PRODUCTOS EN COTIZACIONES                               #
#                                                                                                                #
##################################################################################################################
?>