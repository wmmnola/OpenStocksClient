function buyStockHandler(event) {

  event.stopPropagation();
  console.log(event.target.id);
  var toBuy = find_by_identifer(event.target.id);
  var order = find_order(toBuy);
  if (!order) {
    order = new Order(toBuy);
  }
  var total = parseFloat(total_orders() + order.priceOfOne());
  if (total <= playerCompany.money) {
    $("." + toBuy.identifer + "buy").remove();
    order.buy();
    if (!find_order(toBuy)) orders.push(order);
    $('.' + toBuy.identifer).append("<td class=" + toBuy.identifer + "buy>" +
      order.buyAmount + " </td>");
    $('.numboughtshares').text(num_orders());
    $(".costboughtshares").text(total_orders());
  } else {
    window.alert("not enough money");
  }


}

function endTurnHandler(event) {
  event.stopPropagation();
  var payload = {
    id: id,
    orders: orders
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

function num_orders() {
  var sum = 0;
  for (var i = 0; i < orders.length; i++) {
    sum += parseFloat(orders[i].buyAmount);
  }
  console.log(sum);
  return sum;
}


function total_orders() {
  var sum = 0;
  for (var i = 0; i < orders.length; i++) {
    sum += parseFloat(orders[i].total);
  }
  console.log(sum);
  return sum;
}
