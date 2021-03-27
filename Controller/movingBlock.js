function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev,el) {
  ev.preventDefault();
  var src = document.getElementById(ev.dataTransfer.getData("text"));
  var srcParent = src.parentNode;
  var tgt = el.firstElementChild;
  el.replaceChild(src, tgt);
  srcParent.appendChild(tgt);
  var index1 = parseInt(srcParent.id.match(/\d+/)[0])-1;
  var index2 = parseInt(el.id.match(/\d+/)[0])-1;
  swapVarSong(index1, index2);



}
