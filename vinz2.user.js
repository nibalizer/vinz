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

// overload this to disable the hideci.js trickery
window.onload = undefined

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
    $( "body" ).append("<h1/>").text("Change #"+ data._number + " " + data.subject + " -- " + data.owner.name);

    $( "<p>").text("Files changed:").appendTo( "body" );

    // Create list of files that have been changed
    var get_url = "changes/" + data._number + "/revisions/" + data.current_revision + "/files";
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
  $( "body" ).after( "<p>Cast Your Vote: <input type='button' id='vote'></p>" );
  $( "#vote" ).click(function() {
    alert( "Handler for .click() called." );
  });
});
