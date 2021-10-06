var url = "http://localhost:8080/inventario/";


$(document).ready(function () {
    //funciones
    getproductos();

});

//Ventanas modales
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var recipient = button.data('whatever')
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
});


function agregarElementos() {
    var ProductoNUevo = {};
    ProductoNUevo.nombre = $('#TextoCrearNombre').val();
    ProductoNUevo.cantidad = $('#TextoCrearCantidad').val();
    ProductoNUevo.active = 1;
    var dataEnvio = {'nombre': $('#TextoCrearNombre').val(), 'cantidad': $('#TextoCrearCantidad').val()};
    if (ProductoNUevo) {

        $.ajax({
            url: url,
            data: JSON.stringify(dataEnvio),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            success: function (result) {
                alert("Elemento agregado")
            },
            error: function (msg) {
                alert(msg)
            }
        });
    }

}

function eliminarElementos() {
    var id = $('#IDBORRAR').val();
    $.ajax({
        url: url+id ,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        type: "DELETE",
        success: function (result) {
            limpiar(result,id);
            getproductos();
        },
        error: function (msg) {
            alert(JSON.stringify(msg));
        }
    });
}

function getproductos() {

    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                $('#TablaPrincipal').dataTable(
                    {
                        "data": result,
                        columns: [{data: 'id'}, {data: 'nombre'}, {data: 'cantidad'}],
                        searching: false, ordering: false
                    }
                );
            }
        },
        error: function (msg) {
            alert(msg)
        }
    });
}

function ordenarPorNombre() {
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            bubble(result);
            $('#TablaPrincipal').dataTable(
                {
                    "data": result,
                    columns: [{data: 'id'}, {data: 'nombre'}, {data: 'cantidad'}],
                    searching: false, ordering: false, destroy: true
                }
            );
        },
        error: function (msg) {
            alert(msg)
        }
    });
}

function ordenarPorCantidad() {
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            result = quicksort(result);
            $('#TablaPrincipal').dataTable(
                {
                    "data": result,
                    columns: [{data: 'id'}, {data: 'nombre'}, {data: 'cantidad'}],
                    searching: false, ordering: false, destroy: true
                }
            );
        },
        error: function (msg) {
            alert(msg)
        }
    });
}


console.time('bubblesort');
function bubble(result) {
    for (var i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - 1; j++) {
            if (result[j].nombre.charAt(0) > result[j + 1].nombre.charAt(0)) {
                var a = result[j]
                var b = result[j + 1]
                result[j] = b
                result[j + 1] = a
            }
        }
    }
    return result;
}
console.timeEnd('bubblesort');

console.time('quicksort');

function quicksort(result) {

    if (result.length <= 1) {
        return result;
    }
    var left = [];
    var right = [];
    var pivot = result[0].cantidad;

    for (var i = 1; i < result.length; i++) {
        if (result[i].cantidad < pivot) {
            left.push(result[i]);
        } else {
            right.push(result[i]);
        }
    }

    return [].concat(quicksort(left), result[0], quicksort(right));
}
console.timeEnd('quicksort');