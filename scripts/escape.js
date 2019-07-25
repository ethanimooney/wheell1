/* this function allows the user to be able to click anywhere outside the box, and the user will exit the pop-up*/
var boxEsc = document.getElementById('window-pop');

window.onclick = function open(event){
  if(event.target == boxEsc){
    boxEsc.style.display = "none";
  }
}
