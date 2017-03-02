var socket;
var id;
var companies;
var orders = [];
var playerCompany;
$(document).ready(main);

function main() {
  $("#namecompany").hide();
  $("#waiting").hide();
  $("#game").hide();
  $("#ready").submit(function(event) {
    event.preventDefault();
    event.stopPropagation();
    socket = io('http://localhost:3000');
    socket.on("NameRequest", showNameRequest);
    socket.on("sendData", mainGamePhase);
    socket.on("stockUpdate", stockUpdateHandler);
    console.log("pressed");
    var data = {
      role: "player"
    }
    socket.emit("clientConnection", data);
    $("#ready").hide();
    $("#waiting").show();
  });


  $(".endTurn").click(endTurnHandler);

}

function showNameRequest(data) {
  id = data;
  $("#waiting").hide();
  console.log("got request");
  $("#namecompany").show();
  $("#namesub").click(nameMyCompany);
}

function mainGamePhase(data) {
  orders = []
  $("#market").empty();

  $("#namecompany").hide();
  companies = data.companies;
  playerCompany = data.playerCompany;
  $(".companyValue").text(playerCompany.value);
  $(".companyName").text(playerCompany.name);
  $(".companyMoney").text(playerCompany.money);
  $('.numboughtshares').text("0");
  $(".costboughtshares").text("0");
  $("#market").append('<tr>' +
    '<th id="marketIden">Stock Identifier</th>' +
    '<th id="marketValue" >Total Value</th>' +
    '<th id="marketStock">Stock Price</th> ' +
    '<th id="stockAmount">Amount of Stock</th>' +
    '<th id="action">Action</th>' +
    "</tr>"
  );
  for (var i = 0; i < companies.length; i++) {
    var button = "";
    if (companies[i].identifer != playerCompany.identifer) {
      button = '<td><button id=' + companies[i].identifer +
        '>buy</button></td>';
    }
    $('#market').append('<tr class=' + companies[i].identifer + '><td>' +
      companies[i].identifer + '</td><td>' + companies[i].value + '</td><td>' +
      companies[i].sharevalue + '</td><td><p class=' +
      companies[i].identifer + '_amount>' + companies[i].selfOwnedSock.length +
      '</p></td>' + button + '</tr>');
    if (button != "") $('#' + companies[i].identifer).click(buyStockHandler);
  }
  $("#game").show();
  $(".endTurn").show();
}
