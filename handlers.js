function buyStockHandler(event) {

  event.stopPropagation();
  console.log(event.target.id);
  var toBuy = find_by_identifer(event.target.id);
  var order = find_order(toBuy);
  if (!order) {
    order = new Buy_Order(toBuy);
  }
  if (order.priceOfOne() > 0) {
    var total = parseFloat(total_orders() + order.priceOfOne());
    if (total <= playerCompany.money) {
      $("." + toBuy.identifer + "buy").remove();
      order.buy();
      if (!find_order(toBuy)) buy_orders.push(order);
      $('.' + toBuy.identifer).append("<td class=" + toBuy.identifer + "buy>" +
        order.buyAmount + " </td>");
      $('.numboughtshares').text(num_orders());
      $(".costboughtshares").text(total_orders());
    } else {
      window.alert("not enough money");
    }
  }
}


function endTurnHandler(event) {
  event.stopPropagation();
  $(".endTurn").hide();
  var payload = {
    id: id,
    buy_orders: buy_orders
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
  for (var i = 0; i < buy_orders.length; i++) {
    if (buy_orders[i].company == company) return buy_orders[i];
  }
  return false;
}

function num_orders() {
  var sum = 0;
  for (var i = 0; i < buy_orders.length; i++) {
    sum += parseFloat(buy_orders[i].buyAmount);
  }
  console.log(sum);
  return sum;
}

function stockUpdateHandler(com) {
  for (var i = 0; i < com.length; i++) {
    $("." + com[i].identifer + "_amount").text(com[i].selfOwnedSock.length);
  }
}

function total_orders() {
  var sum = 0;
  for (var i = 0; i < buy_orders.length; i++) {
    sum += parseFloat(buy_orders[i].total);
  }
  console.log(sum);
  return sum;
}

function parse_shares(company) {
  var owned_shares {

  };
  for (var i = 0; i < company.ownedShares.length; i++) {

  }
}
