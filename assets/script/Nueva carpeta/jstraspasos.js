function DoAction(idproducto, codproducto, producto, codcategoria, categorias, preciocompra, precioventa, descproducto, ivaproducto, existencia, precioconiva, tipo, observacion) 
{
    addItem(idproducto, codproducto, 1.00, producto, codcategoria, categorias, preciocompra, precioventa, descproducto, ivaproducto, existencia, precioconiva, tipo, observacion, '+=');
}

function pulsar(e, valor) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) comprueba(valor)
}

$(document).ready(function() {

    $('#AgregarTraspaso').click(function() {
        AgregarTraspasos();
    });

    $('.agregatraspaso').keypress(function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
          AgregarTraspasos();
          e.preventDefault();
          return false;
        }
    });

    function AgregarTraspasos () {

        var code = $('input#codproducto').val();
        var prod = $('input#producto').val();
        var cantp = $('input#cantidad').val();
        var exist = $('input#existencia').val();
        var prec = $('input#preciocompra').val();
        var prec2 = $('input#precioventa').val();
        var descuen = $('input#descproducto').val();
        var ivgprod = $('input#ivaproducto').val();
        var lote = $('input#lote').val();
        var tipo = $('input:radio[name=tipo]:checked').val();
        var er_num = /^([0-9])*[.]?[0-9]*$/;
        cantp = parseInt(cantp);
        exist = parseInt(exist);
        cantp = cantp;

        if (code == "") {
            $("#search_traspaso").focus();
            $("#search_traspaso").css('border-color', '#f0ad4e');
            swal("Oops", "POR FAVOR REALICE LA BÚSQUEDA DEL PRODUCTO O INGREDIENTE CORRECTAMENTE!", "error");
            return false;
        

        } else if ($('#cantidad').val() == "" || $('#cantidad').val() == "0") {
            $("#cantidad").focus();
            $("#cantidad").css('border-color', '#f0ad4e');
            swal("Oops", "POR FAVOR INGRESE UNA CANTIDAD VÁLIDA EN COMPRAS!", "error");
            return false;

        } else if (isNaN($('#cantidad').val())) {
            $("#cantidad").focus();
            $("#cantidad").css('border-color', '#f0ad4e');
            swal("Oops", "POR FAVOR INGRESE SOLO DIGITOS EN CANTIDAD DE COMPRAS!", "error");
            return false;
            
        /*} else if(prec=="" || prec=="0.00"){
            $("#preciocompra").focus();
            $('#preciocompra').css('border-color','#f0ad4e');
            swal("Oops", "POR FAVOR INGRESE PRECIO DE COMPRA VALIDO!", "error");  
            return false;
            
        } else if(!er_num.test($('#preciocompra').val())){
            $("#preciocompra").focus();
            $('#preciocompra').css('border-color','#f0ad4e');
            $("#preciocompra").val("");
            swal("Oops", "POR FAVOR INGRESE SOLO NUMEROS POSITIVOS EN PRECIO COMPRA!", "error");  
            return false;*/

        } else if(tipo == "PRODUCTO" && prec2=="" || tipo == "PRODUCTO" && prec2=="0.00"){
            $("#precioventa").focus();
            $('#precioventa').css('border-color','#f0ad4e');
            swal("Oops", "POR FAVOR INGRESE PRECIO DE VENTA VALIDO!", "error");
            return false;
            
        } else if(!er_num.test($('#precioventa').val()) && tipo == "PRODUCTO"){
            $("#precioventa").focus();
            $('#precioventa').css('border-color','#f0ad4e');
            $("#precioventa").val("");
            swal("Oops", "POR FAVOR INGRESE SOLO NUMEROS POSITIVOS EN PRECIO VENTA!", "error");
            return false;
            
        } else if(descuen==""){
            $("#descproducto").focus();
            $('#descproducto').css('border-color','#f0ad4e');
            swal("Oops", "POR FAVOR INGRESE DESCUENTO PARA VENTA!", "error");
            return false;
            
        } else if(!er_num.test($('#descproducto').val())){
            $("#descproducto").focus();
            $('#descproducto').css('border-color','#f0ad4e');
            $("#descproducto").val("");
            swal("Oops", "POR FAVOR INGRESE SOLO NUMEROS POSITIVOS EN DESCUENTO PARA VENTA!", "error");
            return false;
            
        } else if(ivgprod==""){
            $("#ivaproducto").focus();
            $('#ivaproducto').css('border-color','#f0ad4e');
            swal("Oops", "POR FAVOR SELECCIONE SI TIENE IMPUESTO EL PRODUCTO O INGREDIENTE!", "error");
            return false;

        } else {

        var Carrito = new Object();
        Carrito.Id = $('input#idproducto').val();
        Carrito.Codigo = $('input#codproducto').val();
        Carrito.Producto = $('input#producto').val();
        Carrito.Codcategoria = $('input#codcategoria').val();
        Carrito.Categorias = $('input#categorias').val();
        Carrito.Precio      = $('input#preciocompra').val();
        Carrito.Precio2      = $('input#precioventa').val();
        Carrito.Descproducto      = $('input#descproducto').val();
        Carrito.Ivaproducto = ($('input#ivaproducto').val() == "SI" ? $('input#iva').val() : "(E)");
        Carrito.Precioconiva = $('input#precioconiva').val();
        Carrito.Lote = $('input#lote').val();
        Carrito.Fechaelaboracion = $('input#fechaelaboracion').val();
        Carrito.Fechaexpiracion = $('input#fechaexpiracion').val();
        Carrito.Tipo      = $('input:radio[name=tipo]:checked').val();
        Carrito.Cantidad = $('input#cantidad').val();
        Carrito.opCantidad = '+=';
        var DatosJson = JSON.stringify(Carrito);
        $.post('carritotraspaso.php', {
                MiCarrito: DatosJson
            },
        function(data, textStatus) {
            $("#carrito tbody").html("");
            var contador = 0;
            var OperacionItems = 0;
            var TotalDescuento = 0;
            var SubtotalFact = 0;
            var BaseImpIva = 0;
            var BaseImpIva2 = 0;
            var TotalIvaGeneral = 0;
            var TotalCompra = 0;

            $.each(data, function(i, item) {
                var cantsincero = item.cantidad;
                cantsincero = parseInt(cantsincero);
                if (cantsincero != 0) {
                    contador = contador + 1;


            //TIPO DE DETALLE
            if (item.tipo == 1){
                var TipoDetalle = "PRODUCTO";
            } else if(item.tipo == 2){
                var TipoDetalle = "INGREDIENTE";
            }

            //CALCULO DEL TOTAL DE ITEMS
            var Items= parseFloat(cantsincero);
            OperacionItems = parseFloat(OperacionItems) + parseFloat(Items);

            //CALCULO DEL VALOR TOTAL DE COMPRA
            var OperacionCompra= parseFloat(item.precio) * parseFloat(item.cantidad);
            TotalCompra = parseFloat(TotalCompra) + parseFloat(OperacionCompra);

            //CALCULO DEL VALOR TOTAL
            var ValorTotal= parseFloat(item.precio2) * parseFloat(item.cantidad);

            //CALCULO DEL TOTAL DEL DESCUENTO %
            var Descuento = ValorTotal * item.descproducto / 100;
            TotalDescuento = parseFloat(TotalDescuento) + parseFloat(Descuento);
            
            //OBTENEMOS DESCUENTO INDIVIDUAL POR PRODUCTOS
            var descsiniva = item.precio * item.descproducto / 100;
            var descconiva = item.precioconiva * item.descproducto / 100;

            //CALCULO DE BASE IMPONIBLE IVA SIN PORCENTAJE
            var Operac= parseFloat(item.precio2) - parseFloat(descsiniva);
            var Operacion= parseFloat(Operac) * parseFloat(item.cantidad);
            var Subtotal = Operacion.toFixed(2);

            //CALCULO DE BASE IMPONIBLE IVA CON PORCENTAJE
            var Operac3 = parseFloat(item.precioconiva) - parseFloat(descconiva);
            var Operacion3 = parseFloat(Operac3) * parseFloat(item.cantidad);
            var Subbaseimponiva = Operacion3.toFixed(2);

                
            //CALCULO GENERAL DE IVA CON BASE IVA * IVA %
            var ivg = $('input#iva').val();
            ivg2  = ivg;
            //TotalIvaGeneral = parseFloat(BaseImpIva1) * parseFloat(ivg2.toFixed(2));

            //CALCULO VALOR DISCRIMINADO
            var ValorImpuesto = (ivg2 <= 9) ? "1.0"+parseInt(ivg2) : "1."+parseInt(ivg2);
            var Discriminado = parseFloat(item.precioconiva) / ValorImpuesto;
            var SubtotalDiscriminado = parseFloat(item.precioconiva) - parseFloat(Discriminado.toFixed(2));
            var BaseDiscriminado = parseFloat(SubtotalDiscriminado.toFixed(2)) * parseFloat(item.cantidad);
            TotalIvaGeneral = parseFloat(TotalIvaGeneral.toFixed(2)) + parseFloat(BaseDiscriminado.toFixed(2));

            //BASE IMPONIBLE IVA CON PORCENTAJE
            BaseImpIva = parseFloat(BaseImpIva) + parseFloat(Subbaseimponiva);
            BaseImpIva1 = parseFloat(BaseImpIva) - parseFloat(TotalIvaGeneral);
            
            //SUBTOTAL GENERAL DE FACTURA
            //SubtotalFact = parseFloat(SubtotalFact) + parseFloat(Subtotal);

            //BASE IMPONIBLE IVA SIN PORCENTAJE
            BaseImpIva2 = (item.ivaproducto != "(E)") ? BaseImpIva2 : parseFloat(BaseImpIva2) + parseFloat(Subtotal);
            //BaseImpIva2 = parseFloat(BaseImpIva2) + parseFloat(Subtotal);
            
            //CALCULAMOS DESCUENTO POR PRODUCTO
            var desc = $('input#descuento').val();
            desc2  = desc/100;

            //CALCULO DEL TOTAL DE FACTURA
            Total = parseFloat(BaseImpIva1) + parseFloat(BaseImpIva2) + parseFloat(TotalIvaGeneral);
            TotalDescuentoGeneral   = parseFloat(Total.toFixed(2)) * parseFloat(desc2.toFixed(2));
            TotalFactura   = parseFloat(Total.toFixed(2)) - parseFloat(TotalDescuentoGeneral.toFixed(2));

            var nuevaFila =
            "<tr align='center'>" +
            "<td>" +
            '<button class="btn btn-xs" style="cursor:pointer;border-radius:5px 0px 0px 5px;background-color:#cd874a;" onclick="addItem(' +
            "'" + item.id + "'," +
            "'" + item.txtCodigo + "'," +
            "'-1'," +
            "'" + item.producto + "'," +
            "'" + item.codcategoria + "'," +
            "'" + item.categorias + "'," +
            "'" + item.precio + "', " +
            "'" + item.precio2 + "', " +
            "'" + item.descproducto + "', " +
            "'" + item.ivaproducto + "', " +
            "'" + item.precioconiva + "', " +
            "'" + item.lote + "', " +
            "'" + item.fechaelaboracion + "', " +
            "'" + item.fechaexpiracion + "', " +
            "'" + item.tipo + "', " +
            "'-'" +
            ')"' +
            " type='button'><span class='fa fa-minus'></span></button>" +
            "<input type='text' id='" + item.cantidad + "' class='bold' style='width:26px;height:34px;border:#f0ad4e;' value='" + item.cantidad + "'>" +
            '<button class="btn btn-xs" style="cursor:pointer;border-radius:0px 5px 5px 0px;background-color:#cd874a;" onclick="addItem(' +
            "'" + item.id + "'," +
            "'" + item.txtCodigo + "'," +
            "'+1'," +
            "'" + item.producto + "'," +
            "'" + item.codcategoria + "'," +
            "'" + item.categorias + "'," +
            "'" + item.precio + "', " +
            "'" + item.precio2 + "', " +
            "'" + item.descproducto + "', " +
            "'" + item.ivaproducto + "', " +
            "'" + item.precioconiva + "', " +
            "'" + item.lote + "', " +
            "'" + item.fechaelaboracion + "', " +
            "'" + item.fechaexpiracion + "', " +
            "'" + item.tipo + "', " +
            "'+'" +
            ')"' +
            " type='button'><span class='fa fa-plus'></span></button></td>" +
            "<td class='text-danger alert-link'><h6><label>" + TipoDetalle + "</label></h6></td>" +
            "<td align='left'><h6><abbr title='" + item.categorias + "'><label>" + item.producto + "</label></abbr></h6></td>" +
            "<td><h6><label>" + item.precio2 + "</label></h6></td>" +
            "<td><h6><label>" + ValorTotal.toFixed(2) + "</label></h6></td>" +
            "<td><h6><label>" + Descuento.toFixed(2) + "<sup>" + item.descproducto + "%</sup></label></h6></td>" +
            "<td><h6><label>" + item.ivaproducto + "</label></h6></td>" +
            "<td><h6><label>" + Operacion.toFixed(2) + "</label></h6></td>" +
            "<td>" +
            '<button class="btn btn-dark btn-sm btn-rounded" style="cursor:pointer;border-radius:5px 5px 5px 5px;color:#fff;" ' +
            'onclick="addItem(' +
            "'" + item.id + "'," +
            "'" + item.txtCodigo + "'," +
            "'0'," +
            "'" + item.producto + "'," +
            "'" + item.codcategoria + "'," +
            "'" + item.categorias + "'," +
            "'" + item.precio + "', " +
            "'" + item.precio2 + "', " +
            "'" + item.descproducto + "', " +
            "'" + item.ivaproducto + "', " +
            "'" + item.precioconiva + "', " +
            "'" + item.lote + "', " +
            "'" + item.fechaelaboracion + "', " +
            "'" + item.fechaexpiracion + "', " +
            "'" + item.tipo + "', " +
            "'='" +
            ')"' +
            ' type="button"><span class="fa fa-trash-o"></span></button>' +
            "</td>" +
            "</tr>";
            
            $(nuevaFila).appendTo("#carrito tbody");
                            
                    $("#lblsubtotal").text(BaseImpIva1.toFixed(2));
                    $("#lblsubtotal2").text(BaseImpIva2.toFixed(2));
                    $("#lbliva").text(TotalIvaGeneral.toFixed(2));
                    $("#lbldescontado").text(TotalDescuento.toFixed(2));
                    $("#lbldescuento").text(TotalDescuentoGeneral.toFixed(2));
                    $("#lbltotal").text(TotalFactura.toFixed(2));
                    
                    $("#txtsubtotal").val(BaseImpIva1.toFixed(2));
                    $("#txtsubtotal2").val(BaseImpIva2.toFixed(2));
                    $("#txtIva").val(TotalIvaGeneral.toFixed(2));
                    $("#txtdescontado").val(TotalDescuento.toFixed(2));
                    $("#txtDescuento").val(TotalDescuentoGeneral.toFixed(2));
                    $("#txtTotal").val(TotalFactura.toFixed(2));
                    $("#txtTotalCompra").val(TotalCompra.toFixed(2));
                    $("#btn-submit").attr('disabled', false);

                    }
                });

                $("#search_traspaso").focus();
                LimpiarTexto();
            },
            "json"
        );
        return false;
    }
}

/* CANCELAR LOS ITEM AGREGADOS EN REGISTRO */
$("#vaciar").click(function() {
        var Carrito = new Object();
        Carrito.Id = "vaciar";
        Carrito.Codigo = "vaciar";
        Carrito.Producto = "vaciar";
        Carrito.Codcategoria = "vaciar";
        Carrito.Categorias = "vaciar";
        Carrito.Precio      = "vaciar";
        Carrito.Precio2      = "0.00";
        Carrito.Descproducto      = "0";
        Carrito.Ivaproducto = "vaciar";
        Carrito.Precioconiva      = "0.00";
        Carrito.Lote = "0";
        Carrito.Fechaelaboracion = "vaciar";
        Carrito.Fechaexpiracion = "vaciar";
        Carrito.Tipo      = "vaciar";
        Carrito.Cantidad = "0";
        var DatosJson = JSON.stringify(Carrito);
        $.post('carritotraspaso.php', {
            MiCarrito: DatosJson
        },
        function(data, textStatus) {
            $("#carrito tbody").html("");
            var nuevaFila =
            "<tr>"+"<td class='text-center' colspan=9><h4>NO HAY DETALLES AGREGADOS</h4></td>"+"</tr>";
            $(nuevaFila).appendTo("#carrito tbody");
            LimpiarTexto();
        },
        "json"
    );
    return false;
});


$(document).ready(function() {
    $('#vaciar').click(function() {
        $("#carrito tbody").html("");
        var nuevaFila =
        "<tr>"+"<td class='text-center' colspan=9><h4>NO HAY DETALLES AGREGADOS</h4></td>"+"</tr>";
        $(nuevaFila).appendTo("#carrito tbody");
        $("#savetraspaso")[0].reset();
        $("#lblsubtotal").text("0.00");
        $("#lblsubtotal2").text("0.00");
        $("#lbliva").text("0.00");
        $("#lbldescontado").text("0.00");
        $("#lbldescuento").text("0.00");
        $("#lbltotal").text("0.00");

        $("#txtsubtotal").val("0.00");
        $("#txtsubtotal2").val("0.00");
        $("#txtIva").val("0.00");
        $("#txtdescontado").val("0.00");
        $("#txtDescuento").val("0.00");
        $("#txtTotal").val("0.00");
        $("#txtTotalCompra").val("0.00");
        $("#btn-submit").attr('disabled', true);
    });
});


//FUNCION PARA ACTUALIZAR CALCULO EN FACTURA DE COMPRAS CON DESCUENTO
$(document).ready(function (){
    $('#descuento').keyup(function (){
    
        var txtsubtotal = $('input#txtsubtotal').val();
        var txtsubtotal2 = $('input#txtsubtotal2').val();
        var txtIva = $('input#txtIva').val();
        var desc = $('input#descuento').val();
        descuento  = desc/100;
                        
        //REALIZO EL CALCULO CON EL DESCUENTO INDICADO
        Subtotal = parseFloat(txtsubtotal) + parseFloat(txtsubtotal2) + parseFloat(txtIva); 
        TotalDescuentoGeneral   = parseFloat(Subtotal.toFixed(2)) * parseFloat(descuento.toFixed(2));
        TotalFactura   = parseFloat(Subtotal.toFixed(2)) - parseFloat(TotalDescuentoGeneral.toFixed(2));        
        
        $("#lbldescuento").text(TotalDescuentoGeneral.toFixed(2));
        $("#lbltotal").text(TotalFactura.toFixed(2));
        $("#txtDescuento").val(TotalDescuentoGeneral.toFixed(2));
        $("#txtTotal").val(TotalFactura.toFixed(2));
    });
});


//FUNCION PARA ACTUALIZAR CALCULO EN FACTURA DE COMPRAS CON IVA
$(document).ready(function (){
    $('#iva').keyup(function (){
    
        var txtsubtotal = $('input#txtsubtotal').val();
        var txtsubtotal2 = $('input#txtsubtotal2').val();
        var txtIva = $('input#txtIva').val();
        var iva = $('input#iva').val();
        var desc = $('input#descuento').val();
        ivg2  = iva/100;
        descuento  = desc/100;
                    
        //REALIZO EL CALCULO CON EL IVA INDICADO
        TotalIvaGeneral = parseFloat(txtsubtotal) * parseFloat(ivg2.toFixed(2));

        Subtotal = parseFloat(txtsubtotal) + parseFloat(txtsubtotal2) + parseFloat(TotalIvaGeneral); 
        TotalDescuentoGeneral   = parseFloat(Subtotal.toFixed(2)) * parseFloat(descuento.toFixed(2));
        TotalFactura   = parseFloat(Subtotal.toFixed(2)) - parseFloat(TotalDescuentoGeneral.toFixed(2));        
    
        $("#lbliva").text(TotalIvaGeneral.toFixed(2));
        $("#txtIva").text(TotalIvaGeneral.toFixed(2));
        
        $("#lbldescuento").text(TotalDescuentoGeneral.toFixed(2));
        $("#txtDescuento").val(TotalDescuentoGeneral.toFixed(2));
        
        $("#lbltotal").text(TotalFactura.toFixed(2));
        $("#txtTotal").val(TotalFactura.toFixed(2));
    });
});



    $("#carrito tbody").on('keydown', 'input', function(e) {
        var element = $(this);
        var pvalue = element.val();
        var code = e.charCode || e.keyCode;
        var avalue = String.fromCharCode(code);
        var action = element.siblings('button').first().attr('onclick');
        var params;
        if (code !== 14 && /[^\d]/ig.test(avalue)) {
            e.preventDefault();
            return;
        }
        if (element.attr('data-proc') == '1') {
            return true;
        }
        element.attr('data-proc', '1');
        params = action.match(/\'([^\']+)\'/g).map(function(v) {
            return v.replace(/\'/g, '');
        });
        setTimeout(function() {
            if (element.attr('data-proc') == '1') {
                var value = element.val() || 0;
                addItem(
                    params[0],
                    params[1],
                    value,
                    params[3],
                    params[4],
                    params[5],
                    params[6],
                    params[7],
                    params[8],
                    params[9],
                    params[10],
                    params[11],
                    params[12],
                    params[13],
                    params[14],
                    '='
                );
                element.attr('data-proc', '0');
            }
        }, 500);
    });
});

function LimpiarTexto() {
    $("#search_traspaso").val("");
    $("#idproducto").val("");
    $("#codproducto").val("");
    $("#producto").val("");
    $("#codcategoria").val("");
    $("#categorias").val("");
    $("#preciocompra").val("");
    $("#precioventa").val("0.00");
    $("#descproducto").val("0.00");
    $("#ivaproducto").val("");
    $("#precioconiva").val("0.00");
    $("#lote").val("0");
    $("#fechaelaboracion").val("");
    $("#fechaexpiracion").val("");
    $("#cantidad").val("");
}


function addItem(id, codigo, cantidad, producto, codcategoria, categorias, precio, precio2, descproducto, ivaproducto, precioconiva, lote, fechaelaboracion, fechaexpiracion, tipo, opCantidad) {
    var Carrito = new Object();
    Carrito.Id = id;
    Carrito.Codigo = codigo;
    Carrito.Producto = producto;
    Carrito.Codcategoria = codcategoria;
    Carrito.Categorias = categorias;
    Carrito.Precio = precio;
    Carrito.Precio2 = precio2;
    Carrito.Descproducto = descproducto;
    Carrito.Ivaproducto = ivaproducto;
    Carrito.Precioconiva = precioconiva;
    Carrito.Lote = lote;
    Carrito.Fechaelaboracion = fechaelaboracion;
    Carrito.Fechaexpiracion = fechaexpiracion;
    Carrito.Tipo = tipo;
    Carrito.Cantidad = cantidad;
    Carrito.opCantidad = opCantidad;
    var DatosJson = JSON.stringify(Carrito);
    $.post('carritotraspaso.php', {
            MiCarrito: DatosJson
        },
    function(data, textStatus) {
        $("#carrito tbody").html("");
        var contador = 0;
        var OperacionItems = 0;
        var TotalDescuento = 0;
        var SubtotalFact = 0;
        var BaseImpIva = 0;
        var BaseImpIva2 = 0;
        var TotalIvaGeneral = 0;
        var TotalCompra = 0;

        $.each(data, function(i, item) {
            var cantsincero = item.cantidad;
            cantsincero = parseInt(cantsincero);
            if (cantsincero != 0) {
                contador = contador + 1;


            //TIPO DE DETALLE
            if (item.tipo == 1){
                var TipoDetalle = "PRODUCTO";
            } else if(item.tipo == 2){
                var TipoDetalle = "INGREDIENTE";
            }

            //CALCULO DEL TOTAL DE ITEMS
            var Items= parseFloat(cantsincero);
            OperacionItems = parseFloat(OperacionItems) + parseFloat(Items);

            //CALCULO DEL VALOR TOTAL DE COMPRA
            var OperacionCompra= parseFloat(item.precio) * parseFloat(item.cantidad);
            TotalCompra = parseFloat(TotalCompra) + parseFloat(OperacionCompra);

            //CALCULO DEL VALOR TOTAL
            var ValorTotal= parseFloat(item.precio2) * parseFloat(item.cantidad);

            //CALCULO DEL TOTAL DEL DESCUENTO %
            var Descuento = ValorTotal * item.descproducto / 100;
            TotalDescuento = parseFloat(TotalDescuento) + parseFloat(Descuento);
            
            //OBTENEMOS DESCUENTO INDIVIDUAL POR PRODUCTOS
            var descsiniva = item.precio * item.descproducto / 100;
            var descconiva = item.precioconiva * item.descproducto / 100;

            //CALCULO DE BASE IMPONIBLE IVA SIN PORCENTAJE
            var Operac= parseFloat(item.precio2) - parseFloat(descsiniva);
            var Operacion= parseFloat(Operac) * parseFloat(item.cantidad);
            var Subtotal = Operacion.toFixed(2);

            //CALCULO DE BASE IMPONIBLE IVA CON PORCENTAJE
            var Operac3 = parseFloat(item.precioconiva) - parseFloat(descconiva);
            var Operacion3 = parseFloat(Operac3) * parseFloat(item.cantidad);
            var Subbaseimponiva = Operacion3.toFixed(2);

                
            //CALCULO GENERAL DE IVA CON BASE IVA * IVA %
            var ivg = $('input#iva').val();
            ivg2  = ivg;
            //TotalIvaGeneral = parseFloat(BaseImpIva1) * parseFloat(ivg2.toFixed(2));

            //CALCULO VALOR DISCRIMINADO
            var ValorImpuesto = (ivg2 <= 9) ? "1.0"+parseInt(ivg2) : "1."+parseInt(ivg2);
            var Discriminado = parseFloat(item.precioconiva) / ValorImpuesto;
            var SubtotalDiscriminado = parseFloat(item.precioconiva) - parseFloat(Discriminado.toFixed(2));
            var BaseDiscriminado = parseFloat(SubtotalDiscriminado.toFixed(2)) * parseFloat(item.cantidad);
            TotalIvaGeneral = parseFloat(TotalIvaGeneral.toFixed(2)) + parseFloat(BaseDiscriminado.toFixed(2));

            //BASE IMPONIBLE IVA CON PORCENTAJE
            BaseImpIva = parseFloat(BaseImpIva) + parseFloat(Subbaseimponiva);
            BaseImpIva1 = parseFloat(BaseImpIva) - parseFloat(TotalIvaGeneral);
            
            //SUBTOTAL GENERAL DE FACTURA
            //SubtotalFact = parseFloat(SubtotalFact) + parseFloat(Subtotal);

            //BASE IMPONIBLE IVA SIN PORCENTAJE
            BaseImpIva2 = (item.ivaproducto != "(E)") ? BaseImpIva2 : parseFloat(BaseImpIva2) + parseFloat(Subtotal);
            //BaseImpIva2 = parseFloat(BaseImpIva2) + parseFloat(Subtotal);
            
            //CALCULAMOS DESCUENTO POR PRODUCTO
            var desc = $('input#descuento').val();
            desc2  = desc/100;

            //CALCULO DEL TOTAL DE FACTURA
            Total = parseFloat(BaseImpIva1) + parseFloat(BaseImpIva2) + parseFloat(TotalIvaGeneral);
            TotalDescuentoGeneral   = parseFloat(Total.toFixed(2)) * parseFloat(desc2.toFixed(2));
            TotalFactura   = parseFloat(Total.toFixed(2)) - parseFloat(TotalDescuentoGeneral.toFixed(2));

            var nuevaFila =
            "<tr align='center'>" +
            "<td>" +
            '<button class="btn btn-xs" style="cursor:pointer;border-radius:5px 0px 0px 5px;background-color:#cd874a;" onclick="addItem(' +
            "'" + item.id + "'," +
            "'" + item.txtCodigo + "'," +
            "'-1'," +
            "'" + item.producto + "'," +
            "'" + item.codcategoria + "'," +
            "'" + item.categorias + "'," +
            "'" + item.precio + "', " +
            "'" + item.precio2 + "', " +
            "'" + item.descproducto + "', " +
            "'" + item.ivaproducto + "', " +
            "'" + item.precioconiva + "', " +
            "'" + item.lote + "', " +
            "'" + item.fechaelaboracion + "', " +
            "'" + item.fechaexpiracion + "', " +
            "'" + item.tipo + "', " +
            "'-'" +
            ')"' +
            " type='button'><span class='fa fa-minus'></span></button>" +
            "<input type='text' id='" + item.cantidad + "' class='bold' style='width:26px;height:34px;border:#f0ad4e;' value='" + item.cantidad + "'>" +
            '<button class="btn btn-xs" style="cursor:pointer;border-radius:0px 5px 5px 0px;background-color:#cd874a;" onclick="addItem(' +
            "'" + item.id + "'," +
            "'" + item.txtCodigo + "'," +
            "'+1'," +
            "'" + item.producto + "'," +
            "'" + item.codcategoria + "'," +
            "'" + item.categorias + "'," +
            "'" + item.precio + "', " +
            "'" + item.precio2 + "', " +
            "'" + item.descproducto + "', " +
            "'" + item.ivaproducto + "', " +
            "'" + item.precioconiva + "', " +
            "'" + item.lote + "', " +
            "'" + item.fechaelaboracion + "', " +
            "'" + item.fechaexpiracion + "', " +
            "'" + item.tipo + "', " +
            "'+'" +
            ')"' +
            " type='button'><span class='fa fa-plus'></span></button></td>" +
            "<td class='text-danger alert-link'><h6><label>" + TipoDetalle + "</label></h6></td>" +
            "<td align='left'><h6><abbr title='" + item.categorias + "'><label>" + item.producto + "</label></abbr></h6></td>" +
            "<td><h6><label>" + item.precio2 + "</label></h6></td>" +
            "<td><h6><label>" + ValorTotal.toFixed(2) + "</label></h6></td>" +
            "<td><h6><label>" + Descuento.toFixed(2) + "<sup>" + item.descproducto + "%</sup></label></h6></td>" +
            "<td><h6><label>" + item.ivaproducto + "</label></h6></td>" +
            "<td><h6><label>" + Operacion.toFixed(2) + "</label></h6></td>" +
            "<td>" +
            '<button class="btn btn-dark btn-sm btn-rounded" style="cursor:pointer;border-radius:5px 5px 5px 5px;color:#fff;" ' +
            'onclick="addItem(' +
            "'" + item.id + "'," +
            "'" + item.txtCodigo + "'," +
            "'0'," +
            "'" + item.producto + "'," +
            "'" + item.codcategoria + "'," +
            "'" + item.categorias + "'," +
            "'" + item.precio + "', " +
            "'" + item.precio2 + "', " +
            "'" + item.descproducto + "', " +
            "'" + item.ivaproducto + "', " +
            "'" + item.precioconiva + "', " +
            "'" + item.lote + "', " +
            "'" + item.fechaelaboracion + "', " +
            "'" + item.fechaexpiracion + "', " +
            "'" + item.tipo + "', " +
            "'='" +
            ')"' +
            ' type="button"><span class="fa fa-trash-o"></span></button>' +
            "</td>" +
            "</tr>";
                    
            $(nuevaFila).appendTo("#carrito tbody");
                                    
                $("#lblsubtotal").text(BaseImpIva1.toFixed(2));
                $("#lblsubtotal2").text(BaseImpIva2.toFixed(2));
                $("#lbliva").text(TotalIvaGeneral.toFixed(2));
                $("#lbldescontado").text(TotalDescuento.toFixed(2));
                $("#lbldescuento").text(TotalDescuentoGeneral.toFixed(2));
                $("#lbltotal").text(TotalFactura.toFixed(2));
                
                $("#txtsubtotal").val(BaseImpIva1.toFixed(2));
                $("#txtsubtotal2").val(BaseImpIva2.toFixed(2));
                $("#txtIva").val(TotalIvaGeneral.toFixed(2));
                $("#txtdescontado").val(TotalDescuento.toFixed(2));
                $("#txtDescuento").val(TotalDescuentoGeneral.toFixed(2));
                $("#txtTotal").val(TotalFactura.toFixed(2));
                $("#txtTotalCompra").val(TotalCompra.toFixed(2));
                $("#btn-submit").attr('disabled', false);

                }
            });
            if (contador == 0) {

                $("#carrito tbody").html("");

                var nuevaFila =
                "<tr>"+"<td class='text-center' colspan=9><h4>NO HAY DETALLES AGREGADOS</h4></td>"+"</tr>";
                $(nuevaFila).appendTo("#carrito tbody");

                //alert("ELIMINAMOS TODOS LOS SUBTOTAL Y TOTALES");
                $("#savetraspaso")[0].reset();
                $("#lblsubtotal").text("0.00");
                $("#lblsubtotal2").text("0.00");
                $("#lbliva").text("0.00");
                $("#lbldescontado").text("0.00");
                $("#lbldescuento").text("0.00");
                $("#lbltotal").text("0.00");
                
                $("#txtsubtotal").val("0.00");
                $("#txtsubtotal2").val("0.00");
                $("#txtIva").val("0.00");
                $("#txtdescontado").val("0.00");
                $("#txtDescuento").val("0.00");
                $("#txtTotal").val("0.00");
                $("#txtTotalCompra").val("0.00");
                $("#btn-submit").attr('disabled', true);
            }
            LimpiarTexto();
        },
        "json"
    );
    return false;
}