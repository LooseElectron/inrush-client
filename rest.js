$(document).ready(function () {
    $.get("http://10.148.17.158:8080/api/securityinfo", function( data ) {
        for (var i = 0; i < data.length; i++) {
            $("#datatable").append("<tr class='entry'>" +
                                "<td class='name'>" + data[i].name + "</td>" +
                                "<td class='description'>" + data[i].description + "</td>" +
                              "</tr>" );
        }
    });

    $( "#rest" ).click(function() {
        var symbol = $( "#symbolInput" ).val();
            $.get("http://10.148.17.158:8080/api/securities?symbol=" + symbol, function( data ) {

                $("#datatable").html("<tr class='entry'>" +
                                  "<td class='time'>" + data[0].time + "</td>" +
                                  "<td class='symbol'>" + data[0].update.symbol + "</td>" +
                                  "<td class='ask'>" + data[0].update.ask + "</td>" +
                                  "<td class='bid'>" + data[0].update.bid + "</td>" +
                                "</tr>" );
                console.log( { "symbol": data[0].update.symbol,
                               "ask_price": data[0].update.ask,
                               "bid_price": data[0].update.bid,
                               "time": data[0].time } );
          });
     });
});
