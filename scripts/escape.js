/* this function allows the user to be able to click anywhere outside the box, and the user will exit the pop-up*/
var boxEsc = document.getElementById('window-pop');
var boxOp = document.getElementById('submit');

window.onclick = function open(event){
  if(event.target == boxOp){
    boxEsc.style.display = "block";
  }
}

window.onclick = function close(event){
  if(event.target == boxEsc){
    boxEsc.style.display = "none";
  }
}
