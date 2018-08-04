$(document).ready(function(){
  var button = $('.night-mode-button');
  var container = $('.content-box');
  
  button.click(function() {
    container.toggleClass('-nightmode');
  });
});