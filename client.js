var socket;
var id;
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
  var companies = data.companies;
  $("#namecompany").hide();
  for (var i = 0; i < companies.length; i++) {
    $('#market').append('<tr><td>' + companies[i].identifer + '</td><td>' +
      companies[i].value + '</td><td>' + companies[i].sharevalue +
      '</td></tr>');
  }
  $("#game").show();
}
