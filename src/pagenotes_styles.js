(function(){

  var styles = document.createElement("style");

  function addCanvasStyle(){
    styles.innerHTML += '.pagenotes-canvas {';
    styles.innerHTML += 'position: absolute; top: 0; left: 0;';
    styles.innerHTML += '}';
  }

  addCanvasStyle();

  document.getElementsByTagName("head")[0].appendChild(styles);

})();
