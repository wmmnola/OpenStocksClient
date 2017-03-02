function buyStockHandler(event) {

  console.log("working?");
  event.stopPropagation();
  console.log(event.target.id);
  var toBuy = find_by_identifer(event.target.id);
  $("." + toBuy.identifer + "buy").remove();
  console.log(toBuy);
  var order = find_order(toBuy)
  if (order) {
    order.buy();
  } else {
    order = new Order(toBuy);
    order.buy();
    orders.push(order);
  }
  $('.' + toBuy.identifer).append("<td class=" + toBuy.identifer + "buy>" +
    order.buyAmount + " </td>");
}

function endTurnHandler(event) {
  event.stopPropagation();
  var payload = {
    id: id,
    orders: []
  };
  socket.emit("endTurn", payload);
}

function nameMyCompany(event) {
  //console.log(id);
  event.stopPropagation();
  var company = $("#name").val();
  var iden = $("#identifier").val()
  var data = {
    id: id,
    name: company,
    identity: iden
  };
  console.log(data);
  socket.emit("NameReply", data);

}

function find_by_identifer(iden) {
  for (var i = 0; i < companies.length; i++) {
    if (companies[i].identifer == iden) return companies[i];
  }
  throw "Fatal Error, identifer is not valid";
}

function find_order(company) {
  for (var i = 0; i < orders.length; i++) {
    if (orders[i].company == company) return orders[i];
  }
  return false;
}
