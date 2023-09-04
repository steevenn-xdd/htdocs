function pulsar(e, valor) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) comprueba(valor)
}

$(document).ready(function() {

    $('#AgregaProducto').click(function() {
        AgregaProductos();
    });

    $('.agregaproducto').keypress(function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
          AgregaProductos();
          e.preventDefault();
          return false;
      }
  });

    function AgregaProductos () {

            var code = $('input#codproducto').val();
            var prod = $('input#search_producto_combos').val();
            var cantp = $('input#cantidad').val();
            var prec = $('input#preciocompradet').val();
            var prec2 = $('input#precioventadet').val();
            var er_num = /^([0-9])*[.]?[0-9]*$/;
            cantp = parseInt(cantp);
            cantp = cantp;

            if (code == "") {
                $("#search_producto_combos").focus();
                $("#search_producto_combos").css('border-color', '#f0ad4e');
                swal("Oops", "POR FAVOR REALICE LA BÚSQUEDA DEL PRODUCTO CORRECTAMENTE!", "error");
                return false;
            

            } else if ($('#cantidad').val() == "" || $('#cantidad').val() == "0") {
                $("#cantidad").focus();
                $("#cantidad").css('border-color', '#f0ad4e');
                swal("Oops", "POR FAVOR INGRESE UNA CANTIDAD VÁLIDA!", "error");
                return false;

            } else if (isNaN($('#cantidad').val())) {
                $("#cantidad").focus();
                $("#cantidad").css('border-color', '#f0ad4e');
                swal("Oops", "POR FAVOR INGRESE SOLO DIGITOS EN CANTIDAD!", "error");
                return false;
                
            } else {

            var Carrito = new Object();
            Carrito.Codigo = $('input#codproducto').val();
            Carrito.Producto = $('input#search_producto_combos').val();
            Carrito.Categoria = $('input#categoria').val();
            Carrito.Precio      = $('input#preciocompradet').val();
            Carrito.Precio2      = $('input#precioventadet').val();
            Carrito.Cantidad = $('input#cantidad').val();
            Carrito.opCantidad = '+=';
            var DatosJson = JSON.stringify(Carrito);
            $.post('carritoproducto.php', {
                    MiCarrito: DatosJson
                },
            function(data, textStatus) {
            $("#carrito tbody").html("");
            var TotalDescuento = 0;
            var PrecioCompra = 0;
            var PrecioVenta = 0;
            var contador = 0;

                $.each(data, function(i, item) {
                    var cantsincero = item.cantidad;
                    cantsincero = parseFloat(cantsincero);
                    if (cantsincero != 0) {
                        contador = contador + 1;

                //CALCULO DEL PRECIO COMPRA
                var TotalCompra= parseFloat(item.precio) * parseFloat(item.cantidad);
                PrecioCompra = parseFloat(PrecioCompra) + parseFloat(TotalCompra);
                var OperacionCompra= parseFloat(item.precio) * parseFloat(item.cantidad);

                //CALCULO DEL PRECIO VENTA
                var TotalVenta= parseFloat(item.precio2) * parseFloat(item.cantidad);
                PrecioVenta = parseFloat(PrecioVenta) + parseFloat(TotalVenta);
                var OperacionVenta= parseFloat(item.precio2) * parseFloat(item.cantidad);

                var nuevaFila =
                    "<tr align='center'>" +
                        "<td>" +
                        '<button class="btn btn-xs" style="cursor:pointer;border-radius:5px 0px 0px 5px;background-color:#cd874a;" onclick="addItem(' +
                        "'" + item.txtCodigo + "'," +
                        "'-1'," +
                        "'" + item.producto + "'," +
                        "'" + item.categoria + "'," +
                        "'" + item.precio + "', " +
                        "'" + item.precio2 + "', " +
                        "'-'" +
                        ')"' +
                        " type='button'><span class='fa fa-minus'></span></button>" +
                        "<input type='text' id='" + item.cantidad + "' class='bold' style='width:40px;height:34px;border:#f9d655;' value='" + item.cantidad + "'>" +
                        '<button class="btn btn-xs" style="cursor:pointer;border-radius:0px 5px 5px 0px;background-color:#cd874a;" onclick="addItem(' +
                        "'" + item.txtCodigo + "'," +
                        "'+1'," +
                        "'" + item.producto + "'," +
                        "'" + item.categoria + "'," +
                        "'" + item.precio + "', " +
                        "'" + item.precio2 + "', " +
                        "'+'" +
                        ')"' +
                        " type='button'><span class='fa fa-plus'></span></button></td>" +
                        "<td align='left'><h5><strong>" + item.producto + "</strong></h5></td>" +
                        "<td><strong>" + OperacionCompra.toFixed(2) + "</strong></td>" +
                        "<td><strong>" + OperacionVenta.toFixed(2) + "</strong></td>" +
                        "<td><strong>" + item.categoria + "</strong></td>" +
                        "<td>" +
                        '<button class="btn btn-dark btn-xs btn-rounded" style="cursor:pointer;border-radius:5px 5px 5px 5px;color:#fff;" ' +
                        'onclick="addItem(' +
                        "'" + item.txtCodigo + "'," +
                        "'0'," +
                        "'" + item.producto + "'," +
                        "'" + item.categoria + "'," +
                        "'" + item.precio + "', " +
                        "'" + item.precio2 + "', " +
                        "'='" +
                        ')"' +
                        ' type="button"><span class="fa fa-trash-o"></span></button>' +
                                    "</td>" +
                                    "</tr>";
                                $(nuevaFila).appendTo("#carrito tbody");
                                $("#preciocompra").val(PrecioCompra.toFixed(2));
                                $("#precioventa").val(PrecioVenta.toFixed(2));
                        
                            }

                        });

                        $("#search_producto_combos").focus();
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
        Carrito.Codigo = "vaciar";
        Carrito.Producto = "vaciar";
        Carrito.Categoria = "vaciar";
        Carrito.Precio      = "vaciar";
        Carrito.Precio2      = "0.00";
        Carrito.Cantidad = "0";
        var DatosJson = JSON.stringify(Carrito);
        $.post('carritoproducto.php', {
                MiCarrito: DatosJson
            },
            function(data, textStatus) {
                $("#carrito tbody").html("");
                var nuevaFila =
         "<tr>"+"<td class='text-center' colspan=6><h4>NO HAY DETALLES AGREGADOS</h4></td>"+"</tr>";
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
        "<tr>"+"<td class='text-center' colspan=6><h4>NO HAY DETALLES AGREGADOS</h4></td>"+"</tr>";
        $(nuevaFila).appendTo("#carrito tbody");
        $("#preciocompra").val("");
        $("#precioventa").val("");
    });
});

function LimpiarTexto() {
    $("#codproducto").val("");
    $("#search_producto_combos").val("");
    $("#categoria").val("");
    $("#preciocompradet").val("");
    $("#precioventadet").val("");
    $("#cantidad").val("");
}


$("#carrito tbody").on('keydown', 'input', function(e) {
        var element = $(this);
        var pvalue = element.val();
        /*var code = e.charCode || e.keyCode;
        var avalue = String.fromCharCode(code);*/
        var regx = /^[A-Za-z0-9 _.-]+$/;
        var action = element.siblings('button').first().attr('onclick');
        var params;
        //if (code !== 11 && /[^\d]/ig.test(avalue)) {
        if (!regx.test(e.charCode) || !regx.test(e.keyCode)){
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
                    value,
                    params[2],
                    params[3],
                    params[4],
                    params[5],
                    '='
                );
                element.attr('data-proc', '0');
            }
        }, 300);
    });
});


function addItem(codigo, cantidad, producto, categoria, precio, precio2, opCantidad) {
    var Carrito = new Object();
    Carrito.Codigo = codigo;
    Carrito.Producto = producto;
    Carrito.Categoria = categoria;
    Carrito.Precio = precio;
    Carrito.Precio2 = precio2;
    Carrito.Cantidad = cantidad;
    Carrito.opCantidad = opCantidad;
    var DatosJson = JSON.stringify(Carrito);
    $.post('carritoproducto.php', {
            MiCarrito: DatosJson
        },
        function(data, textStatus) {
            $("#carrito tbody").html("");
            var TotalDescuento = 0;
            var PrecioCompra = 0;
            var PrecioVenta = 0;
            var contador = 0;

            $.each(data, function(i, item) {
                var cantsincero = item.cantidad;
                cantsincero = parseFloat(cantsincero);
                if (cantsincero != 0) {
                    contador = contador + 1;

                //CALCULO DEL PRECIO COMPRA
                var TotalCompra= parseFloat(item.precio) * parseFloat(item.cantidad);
                PrecioCompra = parseFloat(PrecioCompra) + parseFloat(TotalCompra);
                var OperacionCompra= parseFloat(item.precio) * parseFloat(item.cantidad);

                //CALCULO DEL PRECIO VENTA
                var TotalVenta= parseFloat(item.precio2) * parseFloat(item.cantidad);
                PrecioVenta = parseFloat(PrecioVenta) + parseFloat(TotalVenta);
                var OperacionVenta= parseFloat(item.precio2) * parseFloat(item.cantidad);

                   var nuevaFila =
                    "<tr align='center'>" +
                        "<td>" +
                        '<button class="btn btn-xs" style="cursor:pointer;border-radius:5px 0px 0px 5px;background-color:#cd874a;" onclick="addItem(' +
                        "'" + item.txtCodigo + "'," +
                        "'-1'," +
                        "'" + item.producto + "'," +
                        "'" + item.categoria + "'," +
                        "'" + item.precio + "', " +
                        "'" + item.precio2 + "', " +
                        "'-'" +
                        ')"' +
                        " type='button'><span class='fa fa-minus'></span></button>" +
                        "<input type='text' id='" + item.cantidad + "' class='bold' style='width:40px;height:34px;border:#f9d655;' value='" + item.cantidad + "'>" +
                        '<button class="btn btn-xs" style="cursor:pointer;border-radius:0px 5px 5px 0px;background-color:#cd874a;" onclick="addItem(' +
                        "'" + item.txtCodigo + "'," +
                        "'+1'," +
                        "'" + item.producto + "'," +
                        "'" + item.categoria + "'," +
                        "'" + item.precio + "', " +
                        "'" + item.precio2 + "', " +
                        "'+'" +
                        ')"' +
                        " type='button'><span class='fa fa-plus'></span></button></td>" +
                        "<td align='left'><h5><strong>" + item.producto + "</strong></h5></td>" +
                        "<td><strong>" + OperacionCompra.toFixed(2) + "</strong></td>" +
                        "<td><strong>" + OperacionVenta.toFixed(2) + "</strong></td>" +
                        "<td><strong>" + item.categoria + "</strong></td>" +
                        "<td>" +
                        '<button class="btn btn-dark btn-sm btn-rounded" style="cursor:pointer;border-radius:5px 5px 5px 5px;color:#fff;" ' +
                        'onclick="addItem(' +
                        "'" + item.txtCodigo + "'," +
                        "'0'," +
                        "'" + item.producto + "'," +
                        "'" + item.categoria + "'," +
                        "'" + item.precio + "', " +
                        "'" + item.precio2 + "', " +
                        "'='" +
                        ')"' +
                        ' type="button"><span class="fa fa-trash-o"></span></button>' +
                                    "</td>" +
                                    "</tr>";
                       $(nuevaFila).appendTo("#carrito tbody");
                        $("#preciocompra").val(PrecioCompra.toFixed(2));
                        $("#precioventa").val(PrecioVenta.toFixed(2));
                                    
                }
            });
            if (contador == 0) {

                $("#carrito tbody").html("");

                var nuevaFila =
               "<tr>"+"<td class='text-center' colspan=6><h4>NO HAY DETALLES AGREGADOS</h4></td>"+"</tr>";
                $(nuevaFila).appendTo("#carrito tbody");
                $("#preciocompra").val("");
                $("#precioventa").val("");
            }
            LimpiarTexto();
        },
        "json"
    );
    return false;
}