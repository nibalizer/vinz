// ==UserScript==
// @name        vinz2
// @namespace   vinz2
// @description vinz2
// @include     https://review.openstack.org/#/c/164357*
// @version     1
// @grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==


//alert("hello world from vim");
$( "#gerrit_header" ).remove();
$( window ).load(function() { 
    // Handler for .ready() called.
    console.log('sup2');
    $("#gerrit_ui").remove();
    $("#toggleci").remove();

 $.getJSON( "https://api.github.com/users/voxpupuli/repos", function( data ) {
    var items = [];
    $.each( data, function( index ) {
      items.push( "<li id='" + data[index].name + "'>" + data[index].name + "</li>" );
    });
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "body" );
        alert( "Load was performed." );
  });


});
$( "body" ).html("");
