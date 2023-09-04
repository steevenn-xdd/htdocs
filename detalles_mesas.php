<?php
require_once("class/class.php");
?>
<script type="text/javascript" src="assets/script/jsventas.js"></script>
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
#                                  FUNCIONES PARA PEDIDOS DE PRODUCTOS EN VENTAS                                 #
#                                                                                                                #
##################################################################################################################
?>


<?php
############################ MUESTRA PEDIDOS EN DELIVERY ########################### 
if (isset($_GET['CargaPedidosMesa']) && isset($_GET['codmesa']) && isset($_GET['codpedido']) && isset($_GET['codsucursal'])):

$pedido = new Login();
$reg = $pedido->ListarPedidosMesas();

if($reg==""){ echo ""; } else {
?>
    <div class="row">
      <div class="col-md-10">
      <h4 class="text-danger"><strong><?php echo $reg[0]['nomsala']; ?></strong></h4> 
      <h4 class="text-danger"><strong><?php echo $reg[0]['nommesa']; ?></strong></h4>
      </div>
    </div>

    <div class="row-horizon">
        <span style="font-size: 16px;" class="categorias <?php if(decrypt($_GET['codpedido']) == '0' || $_GET['codpedido'] == '0' || $_GET['codpedido'] == '0'){ ?> selectedGat <?php } else { ?> <?php } ?>" onClick="VerificaMesa('<?php echo encrypt($reg[0]['codmesa']);?>','0','0','<?php echo encrypt($reg[0]['codsucursal']);?>');"><i class="fa fa-plus-circle"></i></span>
        <?php 
        $a=1;
        for ($i = 0; $i < sizeof($reg); $i++) { ?>
        
        <span class="categorias <?php if(encrypt($reg[$i]['codpedido']) == $_GET['codpedido']){ ?> selectedGat <?php } ?>" onClick="RecibeMesa('<?php echo encrypt($reg[$i]['codmesa']);?>','<?php echo encrypt($reg[$i]['codpedido']);?>','<?php echo encrypt($reg[$i]['codventa']);?>','<?php echo encrypt($reg[$i]['codsucursal']);?>');"><span class="font-16"><?php echo $a++;?></span> <abbr title="<?php echo $reg[$i]['codcliente'] == '0' ? "CONSUMIDOR FINAL" : $reg[$i]['nomcliente']; ?>"> <span style="font-size: 12px;"><i class="fa fa-clock-o"></i>  <?php echo date("H:i:s",strtotime($reg[$i]['fechapedido']));?></span></abbr></span>
        <?php } } ?>
    </div><hr>
<?php 
############################ MUESTRA PEDIDOS EN DELIVERY ###########################
endif; ?>

<?php
######################## BUSQUEDA DETALLE DE PRODUCTO PARA OBSERVACION #######################
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
            '<?php echo $ivaproducto = ( $reg[0]['ivacombo'] == 'SI' ? number_format($valor, 2, '.', '') : "(E)"); ?>',
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
            '<?php echo $ivaproducto = ( $reg[0]['ivaingrediente'] == 'SI' ? number_format($valor, 2, '.', '') : "(E)"); ?>',
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
######################## BUSQUEDA DETALLE DE PRODUCTO PARA OBSERVACION ########################
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
######################## MOSTRAR PEDIDOS INDIVIDUAL EN MESA ########################
if (isset($_GET['BuscaPedidosMesa']) && isset($_GET['codmesa']) && isset($_GET['codpedido']) && isset($_GET['codventa']) && isset($_GET['codsucursal'])){

$detalle = new Login();
$detalle = $detalle->VerificaMesa(); 
?>

    <input type="hidden" name="proceso" id="proceso" value="agregarpedido"/>
    <input type="hidden" name="pedido" id="pedido" value="<?php echo encrypt($detalle[0]['codpedido']); ?>">
    <input type="hidden" name="venta" id="venta" value="<?php echo encrypt($detalle[0]['codventa']); ?>">
    <input type="hidden" name="sucursal" id="sucursal" value="<?php echo encrypt($detalle[0]['codsucursal']); ?>">
    <input type="hidden" name="codpedido" id="codpedido" value="<?php echo encrypt($detalle[0]['codpedido']); ?>">
    <input type="hidden" name="codventa" id="codventa" value="<?php echo encrypt($detalle[0]['codventa']); ?>">
    <input type="hidden" name="codsucursal" id="codsucursal" value="<?php echo encrypt($_SESSION['codsucursal']); ?>">
    <input type="hidden" name="mesa" id="mesa" value="<?php echo encrypt($detalle[0]['codmesa']); ?>">
    <input type="hidden" name="codmesa" id="codmesa" value="<?php echo $detalle[0]['codmesa']; ?>">
    <input type="hidden" name="nombremesa" id="nombremesa" value="<?php echo $detalle[0]['nommesa']; ?>">

    <input type="hidden" name="idproducto" id="idproducto">
    <input type="hidden" name="codproducto" id="codproducto">
    <input type="hidden" name="producto" id="producto">
    <input type="hidden" name="codcategoria" id="codcategoria">
    <input type="hidden" name="categorias" id="categorias">
    <input type="hidden" name="precioventa" id="precioventa">
    <input type="hidden" name="preciocompra" id="preciocompra"> 
    <input type="hidden" name="precioconiva" id="precioconiva">
    <input type="hidden" name="observacion" id="observacion">
    <input type="hidden" name="ivaproducto" id="ivaproducto">
    <input type="hidden" name="descproducto" id="descproducto">
    <input type="hidden" name="preparado" id="preparado">
    <input type="hidden" name="tipo" id="tipo">
    <input type="hidden" name="cantidad" id="cantidad" value="1">
    <input type="hidden" name="existencia" id="existencia">

    <div class="row">
        <div class="col-md-12">
            <label class="control-label">Búsqueda de Cliente: </label>
            <div class="input-group mb-3 has-feedback">
                <div class="input-group-append">
                <button type="button" class="btn btn-success waves-effect waves-light" data-placement="left" title="Nuevo Cliente" data-original-title="" data-href="#" data-toggle="modal" data-target="#myModalCliente" data-backdrop="static" data-keyboard="false"><i class="fa fa-user-plus"></i></button>
                </div>
                <input type="hidden" name="codcliente" id="codcliente" value="<?php echo $detalle[0]['codcliente'] == '' ? "0" : $detalle[0]['codcliente']; ?>">
                <input type="hidden" name="nrodocumento" id="nrodocumento" value="<?php echo $detalle[0]['codcliente'] == '' ? "0" : $detalle[0]['dnicliente']; ?>">
                <input style="color:#000;font-weight:bold;" type="text" class="form-control" name="busqueda" id="busqueda" onKeyUp="this.value=this.value.toUpperCase();" placeholder="Ingrese Criterio para la Búsqueda del Cliente" value="<?php echo $detalle[0]['codcliente'] == '0' ? "CONSUMIDOR FINAL" : $documento = ($detalle[0]['documcliente'] == '0' ? "DOCUMENTO" : $detalle[0]['documento']).": ".$detalle[0]['dnicliente'].": ".$detalle[0]['nomcliente']; ?>" autocomplete="off"/>

                <div class="input-group-append">
                  <div class="btn-group">
                    <button type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-list"></i></button>
                    <div class="dropdown-menu dropdown-menu-left" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(164px, 35px, 0px);">
                        
                        <a class="dropdown-item" style="cursor: pointer;" class="btn btn-dark waves-effect waves-light" onClick="CambiarMesa('<?php echo encrypt($detalle[0]['codmesa']); ?>','<?php echo encrypt($detalle[0]['codpedido']); ?>','<?php echo encrypt($detalle[0]['codventa']); ?>','<?php echo encrypt($detalle[0]['codsucursal']); ?>','<?php echo $detalle[0]['nomsala']; ?>','<?php echo $detalle[0]['nommesa']; ?>')" data-placement="left" title="Cambio de Mesa" data-original-title="" data-href="#" data-toggle="modal" data-target="#myModalCambioMesa" data-backdrop="static" data-keyboard="false"><span class="mdi mdi-redo-variant"></span> Cambiar Mesa</a>

                        <a class="dropdown-item" style="cursor: pointer;" href="reportepdf?codpedido=<?php echo encrypt($detalle[0]['codpedido']); ?>&codventa=<?php echo encrypt($detalle[0]['codventa']); ?>&codsucursal=<?php echo encrypt($detalle[0]['codsucursal']); ?>&tipo=<?php echo encrypt("PRECUENTA") ?>" target="_blank" rel="noopener noreferrer"title="Imprimir Precuenta"><span class="fa fa-print"></span> Precuenta</a>

                        <!--<a class="dropdown-item" style="cursor: pointer;" class="btn btn-danger btn-lg btn-block waves-effect waves-light" onClick="CerrarMesa('<?php echo encrypt($detalle[0]["codpedido"]) ?>','<?php echo encrypt($detalle[0]["codventa"]) ?>','<?php echo encrypt($detalle[0]["codsucursal"]) ?>','<?php echo encrypt($detalle[0]["codmesa"]) ?>','<?php echo encrypt("CERRARMESA") ?>')" title="Cerra Mesa"><span class="mdi mdi-black-mesa"></span> Cerrar Mesa</a>-->

                        <a class="dropdown-item" style="cursor: pointer;" class="btn btn-warning btn-lg btn-block waves-effect waves-light" onClick="MostrarDetallesPedidos('<?php echo encrypt($detalle[0]['codmesa']);?>','<?php echo encrypt($detalle[0]['codpedido']);?>','<?php echo encrypt($detalle[0]['codventa']);?>','<?php echo encrypt($detalle[0]['codsucursal']);?>');" data-placement="left" title="Ver Pedidos" data-original-title="" data-href="#" data-toggle="modal" data-target="#MyModalDetallePedido" data-backdrop="static" data-keyboard="false"><i class="fa fa-list"></i> Ver Detalles</a>

                        <a class="dropdown-item" style="cursor: pointer;" class="btn btn-dark btn-lg btn-block" onClick="CancelarPedidoMesa('<?php echo encrypt($detalle[0]["codpedido"]) ?>','<?php echo encrypt($detalle[0]["codventa"]) ?>','<?php echo encrypt($detalle[0]["codsucursal"]) ?>','<?php echo encrypt($detalle[0]["codmesa"]) ?>','<?php echo encrypt("CANCELARPEDIDO") ?>')" title="Cancelar Pedido"><span class="fa fa-trash-o"></span> Cancelar</a>
 
                    </div>
                </div>
                          
                </div>
            </div>
        </div>
    </div>

    <div id="favoritos" style="display:none !important;"></div>

    <div class="table-responsive m-t-5 scroll-mesa-detalle">
        <table id="carrito" class="table table-hover" style="margin-bottom: -20px !important; margin-top: 0px !important;" id="nvo-ped-det">
            <thead>
            </thead>
            <tbody>
              <tr class="warning-element" style="border-left: 2px solid #ffb22b !important; background: #fefde3;">
                <td class="text-center" colspan=5><h4>NO HAY DETALLES AGREGADOS</h4></td>
              </tr>
            </tbody>
        </table> 
    </div>

    <hr>

    <div class="row">
        <div class="col-md-12"> 
            <div class="form-group has-feedback2"> 
                <label class="control-label">Observaciones: </label> 
                <textarea class="form-control" type="text" name="descripciones" id="descripciones" onKeyUp="this.value=this.value.toUpperCase();" autocomplete="off" placeholder="Ingrese Observaciones" rows="2"></textarea>
                <i class="fa fa-comment-o form-control-feedback2"></i> 
            </div> 
        </div>
    </div>

    <div class="table-responsive">
      <table id="carritototal" width="100%">
          <tr>
            <td><h5 class="text-left"><label>TOTAL DE ITEMS:</label></h5></td>
            <td><h5 class="text-right"><label id="lblitems" name="lblitems">0.00</label></h5></td>
          </tr>
          <tr>
          <td><h5 class="text-left"><label>TOTAL A CONFIRMAR:</label></h5></td>
          <td><h5 class="text-right"><?php echo $simbolo; ?><label id="lbltotal" name="lbltotal">0.00</label></h5></td>
          <input type="hidden" name="txtsubtotal" id="txtsubtotal" value="0.00"/>
          <input type="hidden" name="txtsubtotal2" id="txtsubtotal2" value="0.00"/>
          <input type="hidden" name="iva" id="iva" value="<?php echo number_format($valor, 2, '.', ''); ?>">
          <input type="hidden" name="txtIva" id="txtIva" value="0.00"/>
          <input type="hidden" name="txtdescontado" id="txtdescontado" value="0.00"/>
          <input type="hidden" name="descuento" id="descuento" value="<?php echo number_format($_SESSION['descsucursal'], 2, '.', ''); ?>">
          <input type="hidden" name="txtDescuento" id="txtDescuento" value="0.00"/>
          <input type="hidden" name="txtTotal" id="txtTotal" value="0.00"/>
          <input type="hidden" name="txtTotalCompra" id="txtTotalCompra" value="0.00"/>
        </tr>
      </table>
    </div>

    <div class="row">
      <div class="col-md-4">
          <button type="button" class="btn btn-info btn-lg btn-block waves-effect waves-light" onClick="RecargaPedidos('<?php echo encrypt("MESAS"); ?>');" data-placement="left" title="Ver Pedidos" data-original-title="" data-href="#" data-toggle="modal" data-target="#myModalPedidos" data-backdrop="static" data-keyboard="false"><i class="fa fa-cutlery"></i> Ver Cocina</button>
      </div>

      <div class="col-md-4">
          <button type="button" class="btn btn-dark btn-lg btn-block" id="vaciar"><span class="fa fa-trash-o"></span> Limpiar</button>
      </div>

      <div class="col-md-4">
          <span id="submit_guardar"><button type="submit" name="btn-submit" id="btn-submit" class="btn btn-warning btn-lg btn-block waves-effect waves-light" ><span class="fa fa-save"></span> Confirmar</button></span>
      </div>
  </div>
             
<?php  
  }
######################## MOSTRAR PEDIDOS INDIVIDUAL EN MESA ########################
?>

<?php 
######################## MOSTRAR DETALLES DE PEDIDOS EN MESA ########################
if (isset($_GET['BuscaDetallesPedidosModal']) && isset($_GET['codmesa']) && isset($_GET['codpedido']) && isset($_GET['codventa']) && isset($_GET['codsucursal'])){

$detalle = new Login();
$detalle = $detalle->VerDetallesPedidosModal();  
?>

<div class="table-responsive"><!-- if table-responsive -->

       <div id="div1" class="table-responsive m-t-5">
        <table class="table table-hover" style="margin-bottom: -20px !important; margin-top: 0px !important;" id="nvo-ped-det">
            <tbody>
<?php 
if($detalle==""){

} else {

for($i=0;$i<sizeof($detalle);$i++){
?>
            <tr class="warning-element font-12" style="border-left: 2px solid #ffb22b !important; background: #fefde3;">
            <td class="alert-link" width="15%"><?php echo $detalle[$i]['cantventa']; ?></td>
            <td width="58%"><h6 class="alert-link"><?php echo $detalle[$i]['producto']; ?></h6>
            <small class="badge badge-pill badge-warning alert-link"><?php echo $detalle[$i]['observacionespedido'] == "" ? "" : "<br>(".$detalle[$i]['observacionespedido'].")"; ?></small></td>
            
            <td class="alert-link" width="22%"><?php echo $simbolo.number_format($detalle[$i]['valorneto'], 2, '.', ','); ?></td>
            
            <td width="5%"><span class="text-danger" style="cursor:pointer;" title="Eliminar Detalle" onClick="EliminaPedidoMesa('<?php echo encrypt($detalle[$i]["codmesa"]) ?>','<?php echo encrypt($detalle[$i]["coddetallepedido"]) ?>','<?php echo encrypt($detalle[$i]["codpedido"]) ?>','<?php echo encrypt($detalle[$i]["pedido"]) ?>','<?php echo encrypt($detalle[$i]["codventa"]) ?>','<?php echo encrypt($detalle[$i]["codsucursal"]) ?>','<?php echo encrypt($detalle[$i]["codcliente"]) ?>','<?php echo encrypt($detalle[$i]["codproducto"]) ?>','<?php echo encrypt($detalle[$i]["cantventa"]) ?>','<?php echo encrypt($detalle[$i]["tipo"]) ?>','<?php echo encrypt("ELIMINADETALLEPEDIDO") ?>')"><i class="font-22 mdi mdi-delete-variant"></i></span></td>

            </tr>
          <?php } } ?>
           </tbody>
        </table>   
      </div><!-- if div --><br>

      <table id="carritototal" class="table-responsive">
    
    <tr>
    <td></td>
    <td width="250">
    <h5 class="text-left"><label>Gravado (<?php echo number_format($detalle[0]['iva'], 2, '.', ','); ?>%):</label></h5>    
    </td>
    <td width="250">
    <h5 class="text-left"><?php echo $simbolo; ?><label><?php echo number_format($detalle[0]['subtotalivasi'], 2, '.', ','); ?></label></h5>
    </td>
    <td width="250">
    <h5 class="text-left"><label>Exento (0%):</label></h5>    
    </td>
    <td width="250">
    <h5 class="text-right"><?php echo $simbolo; ?><label><?php echo number_format($detalle[0]['subtotalivano'], 2, '.', ','); ?></label></h5>
    </td>
    <td></td>
    </tr>

    <tr>
    <td></td>
    <td>
    <h5 class="text-left"><label><?php echo $impuesto; ?> (<?php echo number_format($detalle[0]['iva'], 2, '.', ','); ?>%):</label></h5>
    </td>
    <td>
    <h5 class="text-left"><?php echo $simbolo; ?><label><?php echo number_format($detalle[0]['totaliva'], 2, '.', ','); ?></label></h5></td>
    <td width="180">
    <h5 class="text-left"><label>Descontado %:</label></h5>
    </td>
    <td><h5 class="text-right"><?php echo $simbolo; ?><label><?php echo number_format($detalle[0]['descontado'], 2, '.', ','); ?></label></h5>
    </td>
    <td width="10"></td>      
    </tr>

    <tr>
    <td></td>
    <td colspan="2">
    <h5><label class="text-right">DESC: (<?php echo number_format($detalle[0]['descuento'], 2, '.', ','); ?>%):</label></h5>
    </td>
    <td colspan="2">
    <h5 class="text-right"> <?php echo $simbolo; ?><label id="lbldescuento2" name="lbldescuento2"><?php echo number_format($detalle[0]['totaldescuento'], 2, '.', ','); ?></label></h5>
    </td>
    <td width="10"></td>
    </tr>

    <tr>
    <td></td>
    <td colspan="2">
    <h4><label class="text-right">TOTAL A PAGAR:</label></h4>
    </td>
    <td colspan="2">
    <h4 class="text-right"> <?php echo $simbolo; ?><label id="lbltotal2" name="lbltotal2"><?php echo number_format($detalle[0]['totalpago'], 2, '.', ','); ?></label></h4>
    </td>
    <td width="10"></td>
    </tr>

    </table>
        
    </div><!-- end table-responsive -->

<?php  
  }
######################## MOSTRAR DETALLES DE PEDIDOS EN MESA ########################
?>

<?php 
######################## MOSTRAR PEDIDOS EN MESA PARA COBROS ########################
if (isset($_GET['BuscaDetallesPedidosMesa']) && isset($_GET['codmesa']) && isset($_GET['codsucursal'])) {

$detalle = new Login();
$reg = $detalle->BusquedaPedidosMesa(); 

?>

    <div class="row">
      <div class="col-md-10">
      <h4 class="text-danger"><strong><?php echo $reg[0]['nomsala']; ?></strong></h4> 
      <h4 class="text-danger"><strong><?php echo $reg[0]['nommesa']; ?></strong></h4>
      </div>
    </div>

    <div id="div2"><div class="table-responsive" data-pattern="priority-columns">
      <table id="default_order" class="table table-striped table-bordered border display">
                                   <thead>
                                   <tr role="row">
                                      <th>N°</th>
                                      <th>Descripción de Cliente</th>
                                      <th>Detalles de Productos</th>
                                      <th>Imp. Total</th>
                                      <th>Cobrar</th>
                                      <th>Precuenta</th>
                                   </tr>
                                   </thead>
                                   <tbody>

<?php 
$a=1;
for($i=0;$i<sizeof($reg);$i++){  
?>
                                  <tr role="row" class="odd">
                                  <td><?php echo $a++; ?></td>
  <td><abbr title="<?php echo $reg[$i]['codcliente'] == '0' ? "CONSUMIDOR FINAL" : "Nº ".$documento = ($reg[$i]['documcliente'] == '0' ? "DOCUMENTO" : $reg[$i]['documento']).": ".$reg[$i]['dnicliente']; ?>"><?php echo $reg[$i]['codcliente'] == '0' ? "CONSUMIDOR FINAL" : $reg[$i]['nomcliente']; ?></abbr></td> 
  <td class="font-10 bold"><?php echo $reg[$i]['detalles']; ?></td>
  <td><abbr title="Nº DE ARTICULOS: <?php echo $reg[$i]['articulos']; ?>"><?php echo $simbolo.number_format($reg[$i]['totalpago'], 2, '.', ','); ?></abbr></td>
  <td>
  <button type="button" class="btn btn-success btn-rounded" data-placement="left" title="Cobrar Venta" data-original-title="" data-href="#" data-toggle="modal" data-target="#myModalPago" data-backdrop="static" data-keyboard="false" onClick="CobrarMesa('<?php echo encrypt($reg[$i]["codmesa"]) ?>','<?php echo encrypt($reg[$i]["codpedido"]) ?>','<?php echo encrypt($reg[$i]["codventa"]) ?>','<?php echo encrypt($reg[$i]["codsucursal"]) ?>','<?php echo number_format($reg[$i]["totalpago"], 2, '.', ''); ?>')"><i class="mdi mdi-calculator font-24"></i></button>
  </td>
  <td>
  <a href="reportepdf?codpedido=<?php echo encrypt($reg[$i]['codpedido']); ?>&codventa=<?php echo encrypt($reg[$i]['codventa']); ?>&codsucursal=<?php echo encrypt($reg[$i]['codsucursal']); ?>&tipo=<?php echo encrypt("PRECUENTA") ?>" target="_blank" rel="noopener noreferrer"><button type="button" class="btn btn-info btn-rounded" title="Imprimir Pdf"><i class="mdi mdi-printer font-24"></i></button></a>
  </td>
                                               </tr>
                                                <?php } ?>
                                            </tbody>
                                     </table></div></div>     

<?php  
  }
######################## MOSTRAR PEDIDOS EN MESA PARA COBROS ########################
?>


<?php
################### MUESTRA MODAL CIERRE DE VENTA EN MESA ########################
if (isset($_GET['CargaModalCierreVenta']) && isset($_GET['codmesa']) && isset($_GET['codpedido']) && isset($_GET['codventa']) && isset($_GET['codsucursal']) && isset($_GET['totalpago'])) {

$detalle = new Login();
$detalle = $detalle->DetallesPedido(); 

$arqueo = new Login();
$arqueo = $arqueo->ArqueoCajaPorUsuario();

$codpedido = limpiar(decrypt($_GET['codpedido']));
$codventa = limpiar(decrypt($_GET['codventa']));
$codsucursal = limpiar(decrypt($_GET['codsucursal']));
$totalpago = limpiar($_GET['totalpago']);
  
?>
    
      <div class="row">
        <div class="col-md-12">
            <label class="control-label">Búsqueda de Cliente: </label>
            <div class="input-group mb-3">
                <div class="input-group-append">
                <button type="button" class="btn btn-success waves-effect waves-light" data-placement="left" title="Nuevo Cliente" data-original-title="" data-href="#" data-toggle="modal" data-target="#myModalCliente" data-backdrop="static" data-keyboard="false"><i class="fa fa-user-plus"></i></button>
                </div>
                <input type="hidden" name="codcliente" id="codcliente" value="<?php echo $detalle[0]['codcliente'] == '' ? "0" : $detalle[0]['codcliente']; ?>">
                <input type="hidden" name="nrodocumento" id="nrodocumento" value="<?php echo $detalle[0]['codcliente'] == '' ? "0" : $detalle[0]['dnicliente']; ?>">
                <input type="text" class="form-control" name="busqueda" id="busqueda" onKeyUp="this.value=this.value.toUpperCase();" placeholder="Ingrese Criterio para la Búsqueda del Cliente" value="<?php echo $detalle[0]['codcliente'] == '' ? "CONSUMIDOR FINAL" : $documento = ($detalle[0]['documcliente'] == '0' ? "DOCUMENTO" : $detalle[0]['documento']).": ".$detalle[0]['dnicliente'].": ".$detalle[0]['nomcliente']; ?>" autocomplete="off"/>
                </div>
            </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <h4 class="mb-0 font-light">Total a Pagar</h4>
          <h4 class="mb-0 font-medium"><?php echo $simbolo; ?><label id="TotalImporte" name="TotalImporte"><?php echo number_format($totalpago, 2, '.', ',') ?></label></h4>
        </div>

        <div class="col-md-4">
          <h4 class="mb-0 font-light">Total Recibido</h4>
          <h4 class="mb-0 font-medium"><?php echo $simbolo; ?><label id="TotalPagado" name="TotalPagado"><?php echo number_format($totalpago, 2, '.', ',') ?></label></h4>
        </div>

        <div class="col-md-4">
          <h4 class="mb-0 font-light">Total Cambio</h4>
          <h4 class="mb-0 font-medium"><?php echo $simbolo; ?><label id="TextCambio" name="TextCambio">0.00</label></h4>
        </div>
      </div>
             
      <div class="row">
        <div class="col-md-8">
          <h4 class="mb-0 font-light">Nombre del Cliente</h4>
          <h4 class="mb-0 font-medium"> <label id="TextCliente" name="TextCliente"><?php echo $detalle[0]['codcliente'] == '0' || $detalle[0]['codcliente'] == '' ? "CONSUMIDOR FINAL" : $detalle[0]['nomcliente']; ?></label></h4>
        </div>

        <div class="col-md-4">
          <h4 class="mb-0 font-light">Limite de Crédito</h4>
          <h4 class="mb-0 font-medium"><?php echo $simbolo; ?><label id="TextCredito" name="TextCredito">0.00</label></h4>
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col-md-3"> 
          <div class="form-group has-feedback"> 
              <label class="control-label">Descuento %: <span class="symbol required"></span></label>
            <input type="hidden" name="txtDescuento2" id="txtDescuento2" value="0.00">
            <input class="form-control" type="text" name="descuento" id="descuento" onKeyPress="EvaluateText('%f', this);" onBlur="this.value = NumberFormat(this.value, '2', '.', '')" autocomplete="off" placeholder="Ingrese Descuento" value="0.00" required="" aria-required="true"> 
            <i class="fa fa-dollar form-control-feedback"></i>
            </div> 
        </div>

        <div class="col-md-3"> 
          <div class="form-group has-feedback"> 
            <label class="control-label">Total Descuento: <span class="symbol required"></span></label>
            <input class="form-control" type="text" name="totaldescuento" id="totaldescuento" onKeyPress="EvaluateText('%f', this);" onBlur="this.value = NumberFormat(this.value, '2', '.', '')" autocomplete="off" placeholder="Total Descuento" value="0.00" disabled="" required="" aria-required="true"> 
            <i class="fa fa-dollar form-control-feedback"></i>
          </div> 
        </div>

        <div class="col-md-3">
          <div class="form-group">
            <label class="control-label">Tipo de Documento: <span class="symbol required"></span></label><br>
              <div class="form-check form-check-inline">
                <div class="custom-control custom-radio">
                  <input type="radio" class="custom-control-input" id="ticket" name="tipodocumento" value="TICKET" checked="checked">
                  <label class="custom-control-label" for="ticket">TICKET</label>
                </div>
              </div>

              <div class="form-check form-check-inline">
                <div class="custom-control custom-radio">
                  <input type="radio" class="custom-control-input" id="boleta" name="tipodocumento" value="BOLETA">
                  <label class="custom-control-label" for="boleta">BOLETA</label>
                </div>
              </div>

              <div class="form-check form-check-inline">
                <div class="custom-control custom-radio">
                  <input type="radio" class="custom-control-input" id="factura" name="tipodocumento" value="FACTURA">
                  <label class="custom-control-label" for="factura">FACTURA</label>
                </div>
              </div>
          </div>
        </div>

        <div class="col-md-3">
            <div class="form-group">
            <label class="control-label">Condición de Pago: <span class="symbol required"></span></label>
            <input type="hidden" name="proceso" id="proceso" value="cobrarmesa"/>
            <input type="hidden" name="codcaja" id="codcaja" value="<?php echo $arqueo[0]["codcaja"]; ?>">
            <input type="hidden" name="codmesa" id="codmesa" value="<?php echo $detalle[0]['codmesa']; ?>">
            <input type="hidden" name="nombremesa" id="nombremesa" value="<?php echo $detalle[0]['nommesa']; ?>">
            <input type="hidden" name="mesa" id="mesa" value="<?php echo encrypt($detalle[0]['codmesa']); ?>">
            <input type="hidden" name="codpedido" id="codpedido" value="<?php echo $detalle[0]['codpedido']; ?>">
            <input type="hidden" name="codventa" id="codventa" value="<?php echo $codventa; ?>">
            <input type="hidden" name="venta" id="venta" value="<?php echo encrypt($codventa); ?>">
            <input type="hidden" name="codsucursal" id="codsucursal" value="<?php echo encrypt($codsucursal); ?>">
            <input type="hidden" name="sucursal" id="sucursal" value="<?php echo encrypt($codsucursal); ?>">

            <input type="hidden" name="subtotalivasi" id="subtotalivasi" value="<?php echo number_format($detalle[0]['subtotalivasi'], 2, '.', ''); ?>"/>
            <input type="hidden" name="subtotalivano" id="subtotalivano" value="<?php echo number_format($detalle[0]['subtotalivano'], 2, '.', ''); ?>"/>
            <input type="hidden" name="iva" id="iva" value="<?php echo number_format($detalle[0]['iva'], 2, '.', ''); ?>"/>
            <input type="hidden" name="totaliva" id="totaliva" value="<?php echo number_format($detalle[0]['totaliva'], 2, '.', ''); ?>"/>
            <input type="hidden" name="txtdescontado" id="txtdescontado" value="<?php echo number_format($detalle[0]['totaliva'], 2, '.', ''); ?>"/>
            
            <input type="hidden" name="txtImporte" id="txtImporte" value="<?php echo number_format($totalpago, 2, '.', ''); ?>"/>
            <input type="hidden" name="txtTotalPago" id="txtTotalPago" value="<?php echo number_format($totalpago, 2, '.', ''); ?>"/>
            <input type="hidden" name="txtAgregado" id="txtAgregado" value="<?php echo number_format($totalpago, 2, '.', ''); ?>"/>

            <input type="hidden" name="fechaventa" id="fechaventa" value="<?php echo date("Y-m-d",strtotime($detalle[0]['fechaventa'])); ?>"/>
            <div class="custom-control custom-radio">
            <input type="radio" class="custom-control-input" id="contado" name="tipopago" value="CONTADO" onClick="CargaCondicionesPagos()" value="CONTADO" checked="checked">
            <label class="custom-control-label" for="contado">CONTADO</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" class="custom-control-input" id="credito" name="tipopago" value="CREDITO" onClick="CargaCondicionesPagos()">
                <label class="custom-control-label" for="credito">CRÉDITO</label>
            </div>
          </div>
        </div>
      </div>

      <div id="muestra_condiciones"><!-- IF CONDICION PAGO -->

      <div class="row">

        
        <!-- .col -->
        <div class="col-md-4">

        <h4 class="card-subtitle m-0 text-dark"><i class="font-18 mdi mdi-cash-multiple"></i> Propina Recibida</h4><hr>
            
        <div class="row">
          <div class="col-md-12"> 
            <div class="form-group has-feedback"> 
              <label class="control-label">Pago de Propina: </label>
              <i class="fa fa-bars form-control-feedback"></i>
              <select style="color:#000;font-weight:bold;" name="formapropina" id="formapropina" class="form-control" required="" aria-required="true">
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
              <label class="control-label">Propina Recibida: </label>
              <input class="form-control number" type="text" name="montopropina" id="montopropina" onKeyPress="EvaluateText('%f', this);" onBlur="this.value = NumberFormat(this.value, '2', '.', '')" autocomplete="off" placeholder="Propina Recibida" value="0.00" disabled="" required="" aria-required="true"> 
              <i class="fa fa-dollar form-control-feedback"></i>
            </div> 
          </div>
        </div>

        </div>
        <!-- /.col -->

        <!-- .col -->
        <div class="col-md-4">

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
              <input class="form-control" type="text" name="montopagado" id="montopagado" onKeyUp="DevolucionVenta();" onKeyPress="EvaluateText('%f', this);" onBlur="this.value = NumberFormat(this.value, '2', '.', '')" autocomplete="off" placeholder="Monto de Pago Nº 1" value="<?php echo number_format($totalpago, 2, '.', ''); ?>" required="" aria-required="true"> 
              <i class="fa fa-dollar form-control-feedback"></i>
            </div> 
          </div>
        </div>

        </div>
        <!-- /.col -->

        <!-- .col -->
        <div class="col-md-4">

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
              <input class="form-control" type="text" name="montopagado2" id="montopagado2" onKeyUp="DevolucionVenta();" onKeyPress="EvaluateText('%f', this);" onBlur="this.value = NumberFormat(this.value, '2', '.', '')" autocomplete="off" placeholder="Monto de Pago Nº 2" value="0.00" disabled="" required="" aria-required="true"> 
              <i class="fa fa-dollar form-control-feedback"></i>
            </div>  
          </div>
        </div>

        </div>
        <!-- /.col -->

      </div>

      <div class="row">
        <div class="col-md-12"> 
          <div class="form-group has-feedback2"> 
            <label class="control-label">Observaciones: </label> 
            <textarea class="form-control" type="text" name="observaciones" id="observaciones" onKeyUp="this.value=this.value.toUpperCase();" autocomplete="off" placeholder="Ingrese Observaciones" rows="1"></textarea>
            <i class="fa fa-comment-o form-control-feedback2"></i> 
          </div> 
        </div>
      </div> 

    </div><!-- END CONDICION PAGO -->

<?php
}
######################## MUESTRA MODAL CIERRE DE VENTA EN MESA ########################
?>

<?php 
######################## MUESTRA CONDICIONES DE PAGO EN MESA ########################
if (isset($_GET['BuscaCondicionesPagosVentas']) && isset($_GET['tipopago']) && isset($_GET['txtTotalPago'])) { 
  
$tra = new Login();

if(limpiar($_GET['tipopago'])==""){ echo ""; 

 } elseif(limpiar($_GET['tipopago'])=="CONTADO"){  ?>

    <div class="row">

        
        <!-- .col -->
        <div class="col-md-4">

        <h4 class="card-subtitle m-0 text-dark"><i class="font-18 mdi mdi-cash-multiple"></i> Propina Recibida</h4><hr>
            
        <div class="row">
          <div class="col-md-12"> 
            <div class="form-group has-feedback"> 
              <label class="control-label">Pago de Propina: </label>
              <i class="fa fa-bars form-control-feedback"></i>
              <select style="color:#000;font-weight:bold;" name="formapropina" id="formapropina" class="form-control" required="" aria-required="true">
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
              <label class="control-label">Propina Recibida: </label>
              <input class="form-control number" type="text" name="montopropina" id="montopropina" onKeyPress="EvaluateText('%f', this);" onBlur="this.value = NumberFormat(this.value, '2', '.', '')" autocomplete="off" placeholder="Propina Recibida" value="0.00" disabled="" required="" aria-required="true"> 
              <i class="fa fa-dollar form-control-feedback"></i>
            </div> 
          </div>
        </div>

        </div>
        <!-- /.col -->

        <!-- .col -->
        <div class="col-md-4">

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
              <input class="form-control" type="text" name="totalpagado" id="totalpagado" onKeyUp="DevolucionVenta();" onKeyPress="EvaluateText('%f', this);" onBlur="this.value = NumberFormat(this.value, '2', '.', '')" autocomplete="off" placeholder="Monto de Pago Nº 1" value="<?php echo number_format($_GET['txtTotalPago'], 2, '.', ''); ?>" required="" aria-required="true"> 
              <i class="fa fa-dollar form-control-feedback"></i>
            </div> 
          </div>
        </div>

        </div>
        <!-- /.col -->

        <!-- .col -->
        <div class="col-md-4">

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
              <input class="form-control" type="text" name="totalpagado2" id="totalpagado2" onKeyUp="DevolucionVenta();" onKeyPress="EvaluateText('%f', this);" onBlur="this.value = NumberFormat(this.value, '2', '.', '')" autocomplete="off" placeholder="Monto de Pago Nº 2" value="0.00" disabled="" required="" aria-required="true"> 
              <i class="fa fa-dollar form-control-feedback"></i>
            </div>  
          </div>
        </div>

        </div>
        <!-- /.col -->

      </div>

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
      <div class="col-md-4"> 
        <div class="form-group has-feedback"> 
          <label class="control-label">Fecha Vence Crédito: <span class="symbol required"></span></label> 
          <input type="text" class="form-control vencecredito" name="fechavencecredito" id="fechavencecredito" onKeyUp="this.value=this.value.toUpperCase();" autocomplete="off" value="<?php echo date("d-m-Y"); ?>" placeholder="Ingrese Fecha Vence Crédito" aria-required="true">
          <i class="fa fa-calendar form-control-feedback"></i>  
        </div> 
      </div>

      <div class="col-md-4"> 
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

      <div class="col-md-4"> 
        <div class="form-group has-feedback"> 
          <label class="control-label">Abono Crédito: <span class="symbol required"></span></label>
          <input type="hidden" name="formapago" id="formapago" value="">
          <input type="hidden" name="totalpagado" id="totalpagado" value="0.00">
          <input type="hidden" name="formapago2" id="formapago2" value="">
          <input type="hidden" name="totalpagado2" id="totalpagado2" value="0.00">
          <input type="hidden" name="montodevuelto" id="montodevuelto" value="0.00">
          <input type="hidden" name="montopropina" id="montopropina" value="0.00">
          <input class="form-control number" type="text" name="montoabono" id="montoabono" onKeyUp="this.value=this.value.toUpperCase();" onKeyPress="EvaluateText('%f', this);" onBlur="this.value = NumberFormat(this.value, '2', '.', '')" autocomplete="off" placeholder="Ingrese Monto de Abono" value="0.00" required="" aria-required="true"> 
          <i class="fa fa-dollar form-control-feedback"></i>
        </div> 
      </div>
    </div>

    <div class="row">
      <div class="col-md-12"> 
        <div class="form-group has-feedback2"> 
          <label class="control-label">Observaciones: </label> 
          <textarea class="form-control" type="text" name="observaciones" id="observaciones" onKeyUp="this.value=this.value.toUpperCase();" autocomplete="off" placeholder="Ingrese Observaciones" rows="1"></textarea>
          <i class="fa fa-comment-o form-control-feedback2"></i> 
        </div> 
      </div>
    </div>
 
<?php  }
  }
######################## MUESTRA CONDICIONES DE PAGO EN MESA ########################
?>


<?php
##################################################################################################################
#                                                                                                                #
#                                  FUNCIONES PARA PEDIDOS DE PRODUCTOS EN VENTAS                                 #
#                                                                                                                #
##################################################################################################################
?>
