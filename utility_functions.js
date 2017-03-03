function is_record(id) {
  for (var i = 0; i < records.length; i++) {
    if (records[i].company.identifer == id) return true;
  }
  return false;
}

function find_record(id) {
  for (var i = 0; i < records.length; i++) {
    if (records[i].company.identifer == id) return records[i];
  }
  throw "Fatal Error";
}

function total_orders() {
  var sum = 0;
  for (var i = 0; i < buy_orders.length; i++) {
    sum += parseFloat(buy_orders[i].total);
  }
  console.log(sum);
  return sum;
}

function num_orders() {
  var sum = 0;
  for (var i = 0; i < buy_orders.length; i++) {
    sum += parseFloat(buy_orders[i].buyAmount);
  }
  console.log(sum);
  return sum;
}

function find_by_identifer(iden) {
  for (var i = 0; i < companies.length; i++) {
    if (companies[i].identifer == iden) return companies[i];
  }
  throw "Fatal Error, identifer is not valid";
}

function find_order(company) {
  for (var i = 0; i < buy_orders.length; i++) {
    if (buy_orders[i].company == company) return buy_orders[i];
  }
  return false;
}

function parse_shares(company) {

  for (var i = 0; i < company.ownedShares.length; i++) {
    if (!is_record(company.ownedShares[i].identifier)) {
      var r = new Ownership_Record(find_by_identifer(company.ownedShares[i].identifier));

      records.push(r);
    } else {
      var r = find_record(company.ownedShares[i].identifier);
    }
    r.amount += 1;
  }
  console.log(records);
}

function find_sell_order(company) {
  for (var i = 0; i < sell_orders.length; i++) {
    if (sell_orders[i].company == company) return sell_orders[i];
  }
  return false;
}
