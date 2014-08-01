(function(){

  var styles = document.createElement("style");

  function addCanvasStyle(){
    styles.innerHTML += '.pagenotes-canvas {';
    styles.innerHTML += 'width: 100%; height: 100%;';
  }

  addCanvasStyle();

  document.getElementsByTagName("head")[0].appendChild(styles);

})();
