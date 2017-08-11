function() {
     $.get("/api/securities?symbol=AAPL"), function( data ) {
          console.log( "Got data: " + data );
     }
}
