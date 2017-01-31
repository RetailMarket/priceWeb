var ajaxCalls = {
  getRecords(table) {
    $.get('/records', function (data) {
      var records = JSON.parse(data);
      table.createHeader();
      records.forEach(function (value) {
        table.appendRow(value, table);
      });
    });
  },
  updatePrice(id, price){
    $.post('/price/update', {id: id, price: price}, function (data) {

    })
  }
};

$(document).on("click", ".ui-update-button", function (dom) {
  var id = dom.toElement.id;
  var inputTag = $('input#' + id);
  var val = inputTag.val();
  debugger;
  inputTag[0].value = "";
  var price = Number(val);
  if (!price) {
    var errorMessage = document.createElement("p");
    errorMessage.innerText = "Invalid val : " + val;
    $('#input-price-error').html(errorMessage)
  }
  else {
    ajaxCalls.updatePrice(id, price);
  }
});

$(document).ready(function () {
  var table = new Table();
  ajaxCalls.getRecords(table);
  table.display();
});
