window.onload = function timeAndDate(){
  // creates a new variable with information about the date and time
  var d = new Date();
  // set variables for hour, minutes, and seconds
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  // connects to the HTML IDs to print out the date and the time
  document.getElementById("date").innerHTML = d.toDateString();
  document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
  // calls the function timeAndDate after 500 milliaseconds
  var t = setTimeout(timeAndDate, 500);
}
