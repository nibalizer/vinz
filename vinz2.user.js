// ==UserScript==
// @name        vinz2
// @namespace   vinz2
// @description vinz2
// @include     https://review.openstack.org/#/c/164357*
// @version     1
// @grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
//

function gerritGet (url, func){
  console.log("looking up: " + url);
  $.get( url, function( data ) {
  })
  .fail(function(data) {
    var ret = jQuery.parseJSON(data.responseText.slice(4));
    func(ret);
  });
}

window.onload = undefined

var get_url = "changes/330250/revisions/09ee4176e7394e0c29ca3fe948033d8ebae230ec/files";
$( document ).ready(function() {
  // Handler for .ready() called.

  // Cleanup Gerrit
  $( "#gerrit_header" ).remove();
  $( "#gerrit_ui").remove();
  $( "#toggleci").remove();

  var window_url    = window.location.href;
  var change_number = window_url.split('/')[5];
  gerritGet("changes/" + change_number +  "/detail?O=404", function (data) {
    console.log(data);
    $( "body" ).add("<h1/>").text("Change #"+ data._number + " " + data.subject + " -- " + data.owner.name);
  });

  // Create our structure
  $( "body" ).add("<p>").text("Files changed: ");

  // Create list of files that have been changed
  gerritGet( get_url, function (data) {
    var items = [];
    $.each( data, function( index ) {
      items.push( "<li id='" + index + "'>" + index + "</li>" );
    });
    $( "<ul/>", {
      "class": "files-modified-list",
      html: items.join( "" )
    }).appendTo( "body" );
  });

});
