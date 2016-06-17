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

  // Cache selectors
  var $body = $('body');

  // bootstrap
  $( "head" )
    .prepend('<meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->')
    .append('<link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/paper/bootstrap.min.css" rel="stylesheet">')
    .append('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>');

  // Cleanup Gerrit
  $body.empty();
  //$( "#gerrit_header" ).remove();
  //$( "#gerrit_ui").remove();
  //$( "#toggleci").remove();
  $('style').remove();

  $page_header = $("<div class='page-header'>");
  $header = $("<h1 class='jumbotron' id='header'></h1>");
  $container = $("<div class='container'>");
  $("<div class='row'>").append($page_header.append($header)).appendTo($container);
  $row = $("<div class='row'>");

  $info = $("<div class='info col-md-4'>")
    .prepend($("<h2>").text("Information:"))
    .appendTo($row);
  $files = $("<div class='files col-md-8'>")
    .prepend($("<h2>").text("Files changed:"))
    .appendTo($row);
  $row.appendTo($container);
  $container.appendTo($body);


  // Get auth Token
  $.get("/", function (data) {
    idx = data.search('xGerritAuth');
    var token = data.slice(idx + 13, idx + 13 + 32);

    var window_url    = window.location.href;
    var change_number = window_url.split('/')[5];
    gerritGet("changes/" + change_number +  "/detail?O=404", function (data) {
      $('#header').text("#"+ data._number + " ")
        .append($("<small/>").text(data.subject))
        .append($("<h3/>").text(data.owner.username)
          .append($("<small/>").text(" " + data.owner.name))
          .append( "<form class='form-inline pull-right'><div class='form-group'><label class='sr-only' for='vote'>Vote:</label><div class='btn-group' role='group'><button class='form-control btn btn-primary' type='button' id='vote'><span class='glyphicon glyphicon-thumbs-up'></span></button><button class='form-control btn btn-primary' type='button' id='vote'><span class='glyphicon glyphicon-thumbs-down'></span></button></div></form>" ));

console.log(data);
    var root_data = data;


      // Create list of files that have been changed
      var get_url = "changes/" + data._number + "/revisions/" + data.current_revision + "/files";
      gerritGet( get_url, function (data) {
console.log(data);
        var items = [];
        var file_root = '/#/c/' + root_data._number + '/' + root_data.revisions[root_data.current_revision]._number + '/';
        $.each( data, function( index ) {
          items.push( "<a href='" + file_root + index + "' class='list-group-item' id='" + index + "'>" + index + "</a>" );
        });
        $( "<div/>", {
          "class": "files-modified-list list-group",
          html: items.join( "" )
        }).appendTo($files);
console.log('remove the styles');
        setTimeout(function() { $('style').remove(); }, 5000);
      });
    });

    $( "#vote" ).click(function() {
      var review = {"labels":{"Code-Review":1,"Workflow":0},"strict_labels":true,"drafts":"KEEP","comments":{},"message":"test"};
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
    });

  }).fail(function(data) {
    console.log("Failed " + data);
  });
});

// overload this to disable the hideci.js trickery
window.onload = undefined
