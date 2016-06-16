// ==UserScript==
// @name        vinz2
// @namespace   vinz2
// @description vinz2
// @include     https://review.openstack.org/#/c/164357*
// @version     1
// @grant       none
// ==/UserScript==


//alert("hello world from vim");
$( "#gerrit_header" ).html("");
$( "body" ).html("");
$( window ).load(function() { 
    // Handler for .ready() called.
    console.log('sup2');
    $("#gerrit_ui").remove();
    $("#toggleci").remove();
  var items = [];
  data = [1,2,3,4];
  $.each( data, function( index ) {
    items.push( "<li id='" + data[index] + "'>" + data[index] + "</li>" );
  });

  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );

});
