// ==UserScript==
// @name        vinz-shim
// @namespace   vinz-shim
// @description shim for vinz
// @include     https://review.openstack.org/vinz
// @version     1
// @grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
//
//
//



console.log("sup");
$( document ).ready(function() {
  $("html").load("https://localhost:1234/static/vinz.html");
});
