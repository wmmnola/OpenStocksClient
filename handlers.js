var records = [];
var sell_orders = [];

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

function sellHandler(event) {
  event.stopPropagation();
  var id = (event.target.className).replace("_sell", "");
  var company = find_by_identifer(id);
  var record = find_record(company.identifer);
  var order = find_sell_order(company);
  $("." + company.identifer + "_amountSold").remove();
  if (!order) {
    order = new Sell_Order(company);
  } else {
    var i = sell_orders.indexOf(order);
    sell_orders.splice(i, 1);
  }
  console.log(order);
  console.log(record);
  if (order.sellAmount < record.amount) {
    order.sell();
    sell_orders.push(order);
    console.log(sell_orders)
  } else {
    $("." + company.identifer + "_sell").hide();
  }
  $("." + company.identifer + "_record").append("<td class=" + company.identifer +
    "_amountSold><p>" + order.sellAmount + "</p></td>");
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

function stockUpdateHandler(com) {
  for (var i = 0; i < com.length; i++) {
    $("." + com[i].identifer + "_amount").text(com[i].selfOwnedSock.length);
  }
}
