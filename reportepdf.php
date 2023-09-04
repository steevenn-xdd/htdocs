<?php
include_once('fpdf/pdf.php');
require_once("class/class.php");
//ob_end_clean();
ob_start();

$casos = array (

                  'PROVINCIAS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarProvincias',

                                    'output' => array('Listado de Provincias.pdf', 'I')

                                  ),

                  'DEPARTAMENTOS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarDepartamentos',

                                    'output' => array('Listado de Departamentos.pdf', 'I')

                                  ),

                  'DOCUMENTOS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarDocumentos',

                                    'output' => array('Listado de Tipos de Documentos.pdf', 'I')

                                  ),

                  'TIPOMONEDA' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarTiposMonedas',

                                    'output' => array('Listado de Tipos de Moneda.pdf', 'I')

                                  ),

                'TIPOCAMBIO' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarTiposCambio',

                                    'output' => array('Listado de Tipos de Cambio.pdf', 'I')

                                  ),
                  
                  'MEDIOSPAGOS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarMediosPagos',

                                    'output' => array('Listado de Medios de Pago.pdf', 'I')

                                  ),
                  
                  'IMPUESTOS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarImpuestos',

                                    'output' => array('Listado de Impuestos.pdf', 'I')

                                  ),

                  'SUCURSALES' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarSucursales',

                                    'output' => array('Listado General de Sucursales.pdf', 'I')

                                  ),

                  'CATEGORIAS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarCategorias',

                                    'output' => array('Listado de Categorias.pdf', 'I')

                                  ),

                  'MEDIDAS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarMedidas',

                                    'output' => array('Listado de Medidas.pdf', 'I')

                                  ),

                  'SALSAS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarSalsas',

                                    'output' => array('Listado de Salsas.pdf', 'I')

                                  ),

                  'SALAS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarSalas',

                                    'output' => array('Listado de Salas.pdf', 'I')

                                  ),

                  'MESAS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarMesas',

                                    'output' => array('Listado de Mesas.pdf', 'I')

                                  ),

                  'USUARIOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarUsuarios',

                                    'output' => array('Listado de Usuarios.pdf', 'I')

                                  ),

                  'LOGS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarLogs',

                                    'output' => array('Listado Logs de Acceso.pdf', 'I')

                                  ),

                  'CLIENTES' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarClientes',

                                    'output' => array('Listado de Clientes.pdf', 'I')

                                  ),

                  'PROVEEDORES' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarProveedores',

                                    'output' => array('Listado de Proveedores.pdf', 'I')

                                  ),

                 'INGREDIENTES' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarIngredientes',

                                    'output' => array('Listado de Ingredientes.pdf', 'I')

                                  ),

                 'INGREDIENTESMINIMO' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarIngredientesMinimo',

                                    'output' => array('Listado de Ingredientes en Stock Minimo.pdf', 'I')

                                  ),

                 'INGREDIENTESMAXIMO' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarIngredientesMaximo',

                                    'output' => array('Listado de Ingredientes en Stock Maximo.pdf', 'I')

                                  ),

                  'INGREDIENTESVENDIDOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarIngredientesVendidos',

                                    'output' => array('Listado de Ingredientes Vendidos.pdf', 'I')

                                  ),

                   'KARDEXINGREDIENTES' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarKardexIngredientes',

                                    'output' => array('Listado de Kardex de Ingrediente.pdf', 'I')

                                  ),

                  'KARDEXVALORIZADOINGREDIENTES' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarKardexValorizadoIngredientes',

                                    'output' => array('Listado de Kardex Valorizado.pdf', 'I')

                                  ),

                 'PRODUCTOS' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarProductos',

                                    'output' => array('Listado de Productos.pdf', 'I')

                                  ),

                 'PRODUCTOSMINIMO' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarProductosMinimo',

                                    'output' => array('Listado de Productos en Stock Minimo.pdf', 'I')

                                  ),

                 'PRODUCTOSMAXIMO' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarProductosMaximo',

                                    'output' => array('Listado de Productos en Stock Maximo.pdf', 'I')

                                  ),


                  'PRODUCTOSVENDIDOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarProductosVendidos',

                                    'output' => array('Listado de Productos Vendidos.pdf', 'I')

                                  ),

                  'PRODUCTOSXMONEDA' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarProductosxMoneda',

                                    'output' => array('Listado de Productos por Moneda.pdf', 'I')

                                  ),

                   'KARDEXPRODUCTOS' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarKardexProductos',

                                    'output' => array('Listado de Kardex de Producto.pdf', 'I')

                                  ),

                  'KARDEXVALORIZADOPRODUCTOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarKardexValorizadoProductos',

                                    'output' => array('Listado de Kardex Valorizado.pdf', 'I')

                                  ),

                  'KARDEXPRODUCTOSVALORIZADOXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarKardexValorizadoProductosxFechas',

                                    'output' => array('Listado de Kardex Productos Valorizado por Fechas.pdf', 'I')

                                  ),

                  'MENU' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarMenu',

                                    'output' => array('Listado de Menu.pdf', 'I')

                                  ),

                 'COMBOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarCombos',

                                    'output' => array('Listado de Combos.pdf', 'I')

                                  ),

                 'COMBOSMINIMO' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarCombosMinimo',

                                    'output' => array('Listado de Combos en Stock Minimo.pdf', 'I')

                                  ),

                 'COMBOSMAXIMO' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarCombosMaximo',

                                    'output' => array('Listado de Combos en Stock Maximo.pdf', 'I')

                                  ),

                  'COMBOSVENDIDOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarCombosVendidos',

                                    'output' => array('Listado de Combos Vendidos.pdf', 'I')

                                  ),

                  'COMBOSXMONEDA' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarCombosxMoneda',

                                    'output' => array('Listado de Combos por Moneda.pdf', 'I')

                                  ),

                   'KARDEXCOMBOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarKardexCombos',

                                    'output' => array('Listado de Kardex de Combo.pdf', 'I')

                                  ),

                  'KARDEXVALORIZADOCOMBOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarKardexValorizadoCombos',

                                    'output' => array('Listado de Kardex Valorizado.pdf', 'I')

                                  ),

                  'KARDEXCOMBOSVALORIZADOXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarKardexValorizadoCombosxFechas',

                                    'output' => array('Listado de Kardex Combos Valorizado por Fechas.pdf', 'I')

                                  ),

                 'FACTURACOMPRA' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'FacturaCompra',

                                    'output' => array('Factura de Compra.pdf', 'I')

                                  ),

                 'COMPRAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarCompras',

                                    'output' => array('Listado de Compras.pdf', 'I')

                                  ),

                 'CUENTASXPAGAR' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarCuentasxPagar',

                                    'output' => array('Listado de Cuentas por Pagar.pdf', 'I')

                                  ),

              'COMPRASXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarComprasxFechas',

                                    'output' => array('Listado de Compras por Fechas.pdf', 'I')

                                  ),

              'COMPRASXPROVEEDOR' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarComprasxProveedor',

                                    'output' => array('Listado de Compras por Proveedor.pdf', 'I')

                                  ),

                 'FACTURATRASPASO' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'FacturaTraspaso',

                                    'output' => array('Factura de Traspasos.pdf', 'I')

                                  ),

                  'TRASPASOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarTraspasos',

                                    'output' => array('Listado de Traspasos.pdf', 'I')

                                  ),

                  'TRASPASOSXSUCURSAL' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarTraspasosxSucursal',

                                    'output' => array('Listado de Traspasos por Sucursal.pdf', 'I')

                                  ),

                  'TRASPASOSXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarTraspasosxFechas',

                                    'output' => array('Listado de Traspasos por Fechas.pdf', 'I')

                                  ),

                  'DETALLESTRASPASOSXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarDetallesTraspasosxFechas',

                                    'output' => array('Listado de Detalles por Fechas.pdf', 'I')

                                  ),

                  'DETALLESTRASPASOSXSUCURSAL' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarDetallesTraspasosxSucursal',

                                    'output' => array('Listado de Detalles por Sucursal.pdf', 'I')

                                  ),

                  'PRODUCTOSTRASPASOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarProductosTraspasos',

                                    'output' => array('Listado de Productos Traspasados.pdf', 'I')

                                  ),

                  'INGREDIENTESTRASPASOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarIngredientesTraspasos',

                                    'output' => array('Listado de Ingredientes Traspasados.pdf', 'I')

                                  ),

                 'FACTURACOTIZACION' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'FacturaCotizacion',

                                    'setPrintFooter' => 'true',

                                    'output' => array('Factura de Cotizacion.pdf', 'I')

                                  ),

                  'COTIZACIONES' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarCotizaciones',

                                    'output' => array('Listado de Cotizaciones.pdf', 'I')

                                  ),

                  'COTIZACIONESXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarCotizacionesxFechas',

                                    'output' => array('Listado de Cotizaciones.pdf', 'I')

                                  ),

                  'DETALLESCOTIZACIONESXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarDetallesCotizacionesxFechas',

                                    'output' => array('Listado de Detalles por Fechas.pdf', 'I')

                                  ),

                  'DETALLESCOTIZACIONESXVENDEDOR' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarDetallesCotizacionesxVendedor',

                                    'output' => array('Listado de Detalles por Vendedor.pdf', 'I')

                                  ),
                  
                'CAJAS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarCajas',

                                    'output' => array('Listado de Cajas.pdf', 'I')

                                  ),
        
                  'TICKETCIERRE' => array(

                                    'medidas' => array('P','mm','cierre'),

                                    'func' => 'TicketCierre',

                                    'setPrintFooter' => 'true',

                                    'output' => array('Ticket de Cierre.pdf', 'I')

                                  ),

               'ARQUEOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarArqueos',

                                    'output' => array('Listado de Arqueos de Cajas.pdf', 'I')

                                  ),

                'MOVIMIENTOS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarMovimientos',

                                    'output' => array('Listado de Movimientos en Caja.pdf', 'I')

                                  ),

                   'ARQUEOSXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarArqueosxFechas',

                                    'output' => array('Listado de Arqueos por Fechas.pdf', 'I')

                                  ),

                  'MOVIMIENTOSXFECHAS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarMovimientosxFechas',

                                    'output' => array('Listado de Movimientos por Fechas.pdf', 'I')

                                  ),

                 'INFORMECAJASXFECHAS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'InformeCajasxFechas',

                                    'output' => array('Informe de Caja x Fechas.pdf', 'I')

                                  ),

                  'PEDIDOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarPedidos',

                                    'output' => array('Listado de Pedidos.pdf', 'I')

                                  ),

                  'PEDIDOSDIARIAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarPedidosDiarias',

                                    'output' => array('Listado de Pedidos del Dia.pdf', 'I')

                                  ),

                  'PEDIDOSXCAJAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarPedidosxCajas',

                                    'output' => array('Listado de Pedidos por Cajas.pdf', 'I')

                                  ),

                  'PEDIDOSXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarPedidosxFechas',

                                    'output' => array('Listado de Pedidos por Fechas.pdf', 'I')

                                  ),

                  'PEDIDOSXFECHASENTREGA' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarPedidosxFechasEntrega',

                                    'output' => array('Listado de Pedidos por Fechas de Entrega.pdf', 'I')

                                  ),
        
                  'GENERAL' => array(

                                    'medidas' => array('P','mm','ticket2'),

                                    'func' => 'TicketGeneral',

                                    'setPrintFooter' => 'true',

                                    'output' => array('Ticket de Comanda/Bar/Reposteria.pdf', 'I')

                                  ),
        
                  'COMANDA' => array(

                                    'medidas' => array('P','mm','ticket2'),

                                    'func' => 'TicketComanda',

                                    'setPrintFooter' => 'true',

                                    'output' => array('Ticket de Comanda.pdf', 'I')

                                  ),
        
                  'BAR' => array(

                                    'medidas' => array('P','mm','ticket2'),

                                    'func' => 'TicketBar',

                                    'setPrintFooter' => 'true',

                                    'output' => array('Ticket de Bar.pdf', 'I')

                                  ),
        
                  'REPOSTERIA' => array(

                                    'medidas' => array('P','mm','ticket2'),

                                    'func' => 'TicketReposteria',

                                    'setPrintFooter' => 'true',

                                    'output' => array('Ticket de Reposteria.pdf', 'I')

                                  ),
        
                  'PRECUENTAGENERAL' => array(

                                    'medidas' => array('P','mm','ticket2'),

                                    'func' => 'TicketPrecuentaGeneral',

                                    'setPrintFooter' => 'true',

                                    'output' => array('Ticket de Precuenta General.pdf', 'I')

                                  ),
        
                  'PRECUENTA' => array(

                                    'medidas' => array('P','mm','ticket2'),

                                    'func' => 'TicketPrecuenta',

                                    'setPrintFooter' => 'true',

                                    'output' => array('Ticket de Precuenta.pdf', 'I')

                                  ),
        
                  'TICKET' => array(

                                    'medidas' => array('P','mm','ticket3'),

                                    'func' => 'TicketVenta',

                                    'setPrintFooter' => 'true',

                                    'output' => array('Ticket de Venta.pdf', 'I')

                                  ),
        
                  'BOLETA' => array(

                                    'medidas' => array('P','mm','ticket3'),

                                    'func' => 'BoletaVenta',

                                    'setPrintFooter' => 'true',

                                    'output' => array('Boleta de Venta.pdf', 'I')

                                  ),

                  'FACTURA' => array(

                                    'medidas' => array('P','mm','mitad'),
                                    //'medidas' => array('P','mm','ticket3'),

                                    'func' => 'FacturaVenta',

                                    'output' => array('Factura de Ventas.pdf', 'I')

                                  ),

                  'VENTAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarVentas',

                                    'output' => array('Listado de Ventas.pdf', 'I')

                                  ),

                  'VENTASDIARIAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarVentasDiarias',

                                    'output' => array('Listado de Ventas del Dia.pdf', 'I')

                                  ),

                  'VENTASXCAJAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarVentasxCajas',

                                    'output' => array('Listado de Ventas por Cajas.pdf', 'I')

                                  ),

                  'VENTASXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarVentasxFechas',

                                    'output' => array('Listado de Ventas por Fechas.pdf', 'I')

                                  ),

                'VENTASXCONDICIONES' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarVentasxCondiciones',

                                    'output' => array('Listado de Ventas por Condiciones.pdf', 'I')

                                  ),

                'VENTASXTIPOS' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarVentasxTipos',

                                    'output' => array('Listado de Ventas por Tipos de Clientes.pdf', 'I')

                                  ),

                'VENTASXCLIENTES' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarVentasxClientes',

                                    'output' => array('Listado de Ventas por Cliente.pdf', 'I')

                                  ),

                  'DELIVERYXFECHAS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'TablaListarDeliveryxFechas',

                                    'output' => array('Listado de Delivery por Fechas.pdf', 'I')

                                  ),

                  'COMISIONXVENTAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarComisionxVentas',

                                    'output' => array('Listado de Comisión por Ventas.pdf', 'I')

                                  ),

                 'INFORMEVENTASXFECHAS' => array(

                                    'medidas' => array('P', 'mm', 'A4'),

                                    'func' => 'InformeVentasxFechas',

                                    'output' => array('Informe de Ventas x Fechas.pdf', 'I')

                                  ),

                  'GANANCIASVENTASXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarGananciasVentasxFechas',

                                    'output' => array('Listado de Ganancias de Ventas por Fechas.pdf', 'I')

                                  ),
        
                  'TICKETCREDITO' => array(

                                    'medidas' => array('P','mm','ticket3'),

                                    'func' => 'TicketCredito',

                                    'output' => array('Ticket de Abonos.pdf', 'I')

                                  ),

                  'CREDITOS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarCreditos',

                                    'output' => array('Listado de Creditos.pdf', 'I')

                                  ),

                  'ABONOSCREDITOSXCAJAS' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarAbonosCreditosxCajas',

                                    'output' => array('Listado de Abonos Creditos por Cajas.pdf', 'I')

                                  ),

                  'CREDITOSXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarCreditosxFechas',

                                    'output' => array('Listado de Creditos por Fechas.pdf', 'I')

                                  ),

                  'CREDITOSXCLIENTES' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarCreditosxClientes',

                                    'output' => array('Listado de Creditos por Clientes.pdf', 'I')

                                  ),

                  'DETALLESCREDITOSXCLIENTES' => array(

                                    'medidas' => array('L', 'mm', 'LETTER'),

                                    'func' => 'TablaListarDetallesCreditosxClientes',

                                    'output' => array('Listado de Detalles Creditos por Clientes.pdf', 'I')

                                  ),
        
                  'NOTACREDITO' => array(

                                    'medidas' => array('P','mm','mitad'),
                                    //'medidas' => array('P','mm','ticket3'),

                                    'func' => 'NotaCredito',

                                    'setPrintFooter' => 'true',

                                    'output' => array('Nota de Credito.pdf', 'I')

                                  ),
                'NOTAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarNotas',

                                    'output' => array('Listado de Notas de Creditos.pdf', 'I')
                                  ),
                'NOTASXCAJAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarNotasxCajas',

                                    'output' => array('Listado de Notas de Creditos x Cajas.pdf', 'I')

                                  ),
                'NOTASXFECHAS' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarNotasxFechas',

                                    'output' => array('Listado de Notas de Creditos x Fechas.pdf', 'I')

                                  ),
                'NOTASXCLIENTE' => array(

                                    'medidas' => array('L', 'mm', 'LEGAL'),

                                    'func' => 'TablaListarNotasxClientes',

                                    'output' => array('Listado de Notas de Creditos x Clientes.pdf', 'I')

                                  ),

                );

 
  $tipo = decrypt($_GET['tipo']);
  $caso_data = $casos[$tipo];
  $pdf = new PDF($caso_data['medidas'][0], $caso_data['medidas'][1], $caso_data['medidas'][2]);
  $pdf->AddPage();
  $pdf->SetAuthor("SDC Developer | Steven Duarte");
  $pdf->SetCreator("FPDF Y PHP");
  $pdf->{$caso_data['func']}();
  if ($tipo == 'TICKET' || $tipo == 'GENERAL' || $tipo == 'COMANDA' || $tipo == 'BAR' || $tipo == 'PRECUENTA' || $tipo == 'TICKETCREDITO') {
  //$pdf->AutoPrint(false);
  } 
  $pdf->Output($caso_data['output'][0], $caso_data['output'][1]);
  ob_end_flush();
?>