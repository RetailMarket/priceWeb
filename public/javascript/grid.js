function inputTag(id) {
  var input = document.createElement('input');
  input.id = id;
  $(input).addClass('ui-update-input');
  return input;
}

function updateButton(id) {
  var button = document.createElement('input');
  button.type = 'button';
  button.value = 'update';
  button.id = id;
  $(button).addClass('ui-update-button');
  return button;
}

function updateLinkCell(id) {
  var cell = document.createElement('td');
  $(cell).addClass('ui-update-cell');
  cell.appendChild(inputTag(id));
  cell.appendChild(updateButton(id));
  return cell;
}

const DISPLAY_FORMAT = ['name', 'cost', 'update link'];

class Table {
  constructor() {
    this.table = document.createElement('table');
  }

  createHeader() {
    var row = document.createElement('tr');

    DISPLAY_FORMAT.forEach(function (val, i) {
      $(row).addClass('table-header-row');
      var cell = document.createElement('td');
      $(cell).addClass('ui-header-cell');
      cell.innerHTML = val.toUpperCase();
      row.appendChild(cell);
    });

    this.table.prepend(row)
  }

  display() {
    document.body.appendChild(this.table);
  }

  getCell(row, col) {
    return this.cells[row][col];
  }

  appendRow(colsVal) {
    var keys = Object.keys(colsVal);
    var row = document.createElement('tr');
    $(row).addClass('table-row');

    for (var i = 0; i < (DISPLAY_FORMAT.length - 1); i++) {
      var cell = document.createElement('td');
      $(cell).addClass('table-col');
      cell.innerHTML = colsVal[DISPLAY_FORMAT[i]];

      row.appendChild(cell);
    }

    row.append(updateLinkCell(colsVal.id));
    this.table.appendChild(row)
  }
}