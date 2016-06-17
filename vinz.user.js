// ==UserScript==
// @name        vinz
// @namespace   vinz
// @description vinz
// @include     https://review.openstack.org/#/c/*
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


$( document ).ready(function() {
  // Handler for .ready() called.
  var token;

  // Cleanup Gerrit
  $( "#gerrit_header" ).remove();
  $( "#gerrit_ui").remove();
  $( "#toggleci").remove();

  // Get auth Token
  $.get("/", function (data) {
    console.log("foo");
    //console.log(data);
    idx = data.search('xGerritAuth');
    var token = data.slice(idx + 13, idx + 13 + 32);
    //var token = data.search('xGerritAuth').slice(34,66);
    console.log("Token is " + token);

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
    $( "body" ).after( "<p>Press here to +1: <input type='button' id='vote'></p>" );
    $( "#vote" ).click(function() {
      var review = {"labels":{"Code-Review":1,"Workflow":0},"strict_labels":true,"drafts":"KEEP","comments":{},"message":"test"};
      console.log(review);
      $.ajax({
              type:"POST",
              beforeSend: function (request)
              {
                  request.setRequestHeader("X-Gerrit-Auth", token);
              },
              url: "changes/330860/revisions/ac2c4ea7ec7158f68813390324a1731a3e7043e5/review",
              data: JSON.stringify(review),
              async: false,
              dataType: "json",
              contentType: 'application/json; charset=utf-8',
      });
      console.log( "Sent review" );
    });

  }).fail(function(data) {
    console.log("Failed " + data);
  });
});

// overload this to disable the hideci.js trickery
window.onload = undefined
