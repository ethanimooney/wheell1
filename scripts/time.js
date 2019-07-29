window.onload = function timeAndDate(){
  // creates a new variable with information about the date and time
  var d = new Date();
  // set variables for hour, minutes, and seconds
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();

  if (h >= 6 && h < 12){
    document.getElementById("timeOfDay").innerHTML = "good morning";
  } else if (h >= 12 && h < 18){
    document.getElementById("timeOfDay").innerHTML = "good afternoon";
  } else if (h >= 18 && h < 24){
    document.getElementById("timeOfDay").innerHTML = "good evening";
  } else if (h >= 24 && h < 6){
    document.getElementById("timeOfDay").innerHTML = "good night";
  }
  // connects to the HTML IDs to print out the date and the time

  document.getElementById("date").innerHTML = d.toDateString();
  document.getElementById("time").innerHTML = h + ":" + m + ":" + s;


  // calls the function timeAndDate after 500 milliseconds
  var t = setTimeout(timeAndDate, 500);



}
