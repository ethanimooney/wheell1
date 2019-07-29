console.log("I am a Nigerian prince");

function onLoad(){

$("#imagemove").click(onClick);
}

function onClick(evt){
  console.log("imagemove");
  $("#imagemove").fadeOut(5000);
  $("#imagemove").fadeIn(5000);
}

window.onload = onLoad;
