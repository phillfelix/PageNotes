(function(){

  var styles = document.createElement("style");

  function addCanvasStyle(){
    styles.innerHTML += '.pagenotes-canvas {';
    styles.innerHTML += 'position: absolute; top: 0; left: 0;';
    styles.innerHTML += '}';
  }

  function addToolbarStyle(){
    styles.innerHTML += '.pagenotes-toolbar {';
    styles.innerHTML += 'position: fixed; left: 0; bottom: 0;';
    styles.innerHTML += 'padding: 10px;';
    styles.innerHTML += 'background: #ddd;';
    styles.innerHTML += 'z-index: 3;';
    styles.innerHTML += '}';
  }

  addCanvasStyle();
  addToolbarStyle();

  document.getElementsByTagName("head")[0].appendChild(styles);

})();
