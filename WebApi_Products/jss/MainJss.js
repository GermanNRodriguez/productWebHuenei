$(function () {
    gridUpdater();
    $("#btnSave").click(function () {
        validate();
        if (validate() == true) {
            saveProduct();
        } else {
            alert("Se deben completar todos los campos");
        }
    });
    $("#btnCancel").click(function () {
        cleanTxt();
        alert("Cancelado");
    });
    $("#btnErase").click(function () {
            eraseProduct(); 
    });
});

function validate() {

    var validacion = true;

    if ($('#Nombre').val() == "") {
        validacion = false;
    }

    if ($('#Descripcion').val() == "") {
        validacion = false;
    }

    if ($('#Precio').val() <= 0) {
        validacion = false;
    }

    if ($('#Stock').val() <= 0) {
        validacion = false;
    }

    return validacion;
}

function validateID() {
    var validacion = true;
    var id;
    id = sessionStorage.getItem("ID");
    if (i == 0) {
        validacion = false;
    } else {
        validacion = true;
    }

    return validacion;
}

function ajaxGET() {
    var result;
    $.ajax({
        url: 'https://localhost:44352/api/productos',
        type: 'GET',
        async: false
    }).done(function (data) {
        result = data;
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });
    return result;
}

function ajaxDelete(id) {
    var result;
    $.ajax({
        url: 'https://localhost:44352/api/productos/' + id,
        type: 'DELETE',
        async: false,
    }).done(function (data) {
        result = data;
        alert('El producto fue BORRADO con éxito')
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });
    return result;
}

function ajaxPost(id) {
    var result;
    var obj = obtainProduct();
    $.ajax({
        url: 'https://localhost:44352/api/productos/' + id,
        type: 'POST',
        async: false,
        data: {
            "IDProducto": obj.id, "Nombre": obj.Nombre,
            "Descripcion": obj.Descripcion, "Precio": obj.Precio,
            "Stock": obj.Stock
        }
    }).done(function (data) {
        result = data;
        alert('El producto fue INSERTADO con éxito')
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });
    return result;
}

function ajaxPut(id) {
    var result;
    var obj = obtainProduct();
    $.ajax({
        url: 'https://localhost:44352/api/productos/' + id,
        type: 'PUT',
        async: false,
        data: obj
    }).done(function (data) {
        result = data;
        alert('El producto fue MODIFICADO con éxito')
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });
    return result;
}

function obtainProduct() {
    var product = {};
    product.Nombre = $('#Nombre').val();
    product.Descripcion = $('#Descripcion').val();
    product.Precio = $('#Precio').val();
    product.Stock = $('#Stock').val();

    return product;
}

function saveProduct() {
    var id = sessionStorage.getItem("ID");
    if (id == null) {
        id = 0;
        ajaxPost(id);
    } else {
        ajaxPut(id);
    }
    cleanTxt();
    gridUpdater();
    sessionStorage.setItem("ID", null);
}

function eraseProduct() {
    var id = sessionStorage.getItem("ID");
    ajaxDelete(id);
    gridUpdater();
    cleanTxt();
    sessionStorage.setItem("ID", null);
}

function cleanTxt() {
    $('#Nombre').val("");
    $('#Descripcion').val("");
    $('#Precio').val(0);
    $('#Stock').val(0);

    sessionStorage.setItem("ID", null);

    $('#btnSave').val("Guardar");
}

function gridUpdater() {
    var data = ajaxGET();
    gridBuilder(data);
}

function gridBuilder(data) {
    var grd = $('#gvProducts');
    grd.html("");
    var tbl = $('<table border=1 class="table table-dark" class="d-flex"></table>');

    var header = $('<thead></thead>');
    header.append('<th class="col-md2">Id</th>');
    header.append('<th class="col-md4">Nombre</th>');
    header.append('<th class="col-md4">Descripcion</th>');
    header.append('<th class="col-md1">Precio</th>');
    header.append('<th class="col-md1">Stock</th>');

    tbl.append(header);

    for (d in data) {
        var row = $('<tr class="jqClickeable" class="d-flex"></tr>');
        row.append('<th class="col col-lg-2">' + data[d].Id + '</th>');
        row.append('<th class="col-md4 col-lg-4">' + data[d].Nombre + '</th>');
        row.append('<th class="col-md4 col-lg-4">'+ data[d].Descripcion + '</th>');
        row.append('<th class="col-md1 col-lg-1">' + data[d].Precio + '</th>');
        row.append('<th class="col-md1 col-lg-1">' + data[d].Stock + '</th>');

        tbl.append(row);
    }
    grd.append(tbl);
    $('.jqClickeable').click(function () { showElement($(this)); });
}

function showElement(elem) {
    var id;
    id = elem.children().eq(0).text();

    sessionStorage.setItem("ID", id);

    $('#Nombre').val(elem.children().eq(1).text());
    $('#Descripcion').val(elem.children().eq(2).text());
    $('#Precio').val(elem.children().eq(3).text());
    $('#Stock').val(elem.children().eq(4).text());
    
    $('#btnSave').val("Modificar");
}
