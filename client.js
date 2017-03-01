var socket;
var id;
var companies;
$(document).ready(main);
//main();

function main() {
  $("#namecompany").hide();
  $("#waiting").hide();
  $("#game").hide();
  console.log("loaded");
  socket = io('http://localhost:3000');
  id = socket.id;
  console.log(socket.id);
  $("#ready").submit(function(event) {
    event.preventDefault();
    console.log("pressed");
    var data = {
      role: "player"
    }
    socket.emit("clientConnection", data);
    $("#ready").hide();
    $("#waiting").show();
  });

  socket.on("NameRequest", showNameRequest);
  socket.on("sendData", mainGamePhase);
  $(".endTurn").click(endTurnHandler);

}

//$("#nameCompany").submit(nameMyCompany);

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

function showNameRequest(data) {
  id = data;
  $("#waiting").hide();
  console.log("got request");
  $("#namecompany").show();
  $("#namesub").click(nameMyCompany);
  return false;
}

function mainGamePhase(data) {
  $("#market").empty();
  $("#namecompany").hide();
  companies = data.companies;
  playerCompany = data.playerCompany;
  $(".companyName").text(playerCompany.name);
  $("#market").append('<tr>' +
    '<th id="marketIden">Stock Identifier</th>' +
    '<th id="marketValue" >Total Value</th>' +
    '<th id="marketStock">Stock Price</th> ' +
    '<th id="action">Action</th>' + "</tr>"
  );
  for (var i = 0; i < companies.length; i++) {
    var button = "";
    if (companies[i].identifer != playerCompany.identifer) {
      button = '<td><button id=' + companies[i].identifer +
        '>buy</button></td>';
    }
    $('#market').append('<tr><td>' + companies[i].identifer + '</td><td>' +
      companies[i].value + '</td><td>' + companies[i].sharevalue + '</td>' +
      button + '</tr>');
    if (button != "") $('#' + companies[i].identifer).click(buyStockHandler);
  }
  $("#game").show();
}

function buyStockHandler(event) {
  console.log("working?");
  event.stopPropagation();
  console.log(event.target.id);
  var toBuy = find_by_identifer(event.target.id);
  console.log(toBuy);
}

function find_by_identifer(iden) {
  for (var i = 0; i < companies.length; i++) {
    if (companies[i].identifer == iden) return companies[i];
  }
  throw "Fatal Error, identifer is not valid";
}

function endTurnHandler(event) {
  event.stopPropagation();
  var payload = {
    id: id,
    orders: []
  };
  socket.emit("endTurn", payload);
}
