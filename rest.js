$(document).ready(function () {
    var field_id;

    $.get("http://10.148.17.158:8080/api/securityinfo", function( data ) {
        for (var i = 0; i < data.length; i++) {
            $("#fieldtable").append("<tr class='entry'>" +
                                     "<td class='name'>" + data[i].name + "</td>" +
                                     "<td class='description'>" + data[i].description + "</td>" +
                                    "</tr>" );
        }
    });

    $( "#fieldtable" ).on("click", "tr", function() {
        $(this).addClass('label-info').siblings().removeClass('label-info');
        field_id = $(this).find('td:first').html();
    });

    $( "#rest" ).click(function() {
        var symbol = $( "#symbolInput" ).val();
            $.get("http://10.148.17.158:8080/api/securityinfo?symbol=" + symbol + "&field=" + field_id, function( data ) {

                $("#data").html( data[field_id][0] );
          });
     });
});
