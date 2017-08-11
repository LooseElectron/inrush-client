$(document).ready(function () {
    $( "#rest" ).click(function() {
        var symbol = $( "#symbolInput" ).val();
            $.get("http://10.148.17.113:8080/api/securities?symbol=" + symbol, function( data ) {

                $("#data").html("<tr class='entry'>" +
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
