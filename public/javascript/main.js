var ajaxCalls = {
  getRecords(table) {
    $.get('/records', function (data) {
      var records = JSON.parse(data);
      console.log(records[0]);
      if (data[0] != undefined) {
        table.createHeader(Object.keys(records[0]));
        records.forEach(function (value) {
          table.appendRow(value, table);
        });
      }
    });
  },
  updatePrice(id, price){
    $.post('/price/update', {id: id, price: price}, function (data) {

    })
  }
};

$(document).on("click", ".ui-update-button", function (dom) {
  var id = dom.toElement.id;
  var val = $('input#' + id).val();
  var price = Number(val);
  if (!price) {
    var errorBox = document.createElement("div");
    errorBox.id = "input-price-error";
    var errorMessage = document.createElement("p");
    errorMessage.innerText = "Invalid val : " + val;
    errorBox.appendChild(errorMessage);
    document.body.prepend(errorBox);
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
