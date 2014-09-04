(function () {

  window.PagenotesDefaultToolkit = window.PagenotesDefaultToolkit || {};

  var text = {

    on : function(Parent){
      this.root = Parent;

      var tool    = this;

      Parent.canvas.on('click', function(ev){
        ev.preventDefault();
        tool.textField(ev.offsetX, ev.offsetY);
      });
    },

    off : function(Parent){

      Parent.canvas.off("click");

    },

    textField : function(x, y){
      var tool = this,
          Parent = this.root;

      if(Parent.temp.text) return;

      var textField = $('<textarea></textarea>').css({
        'position' : 'fixed',
        'left' : x,
        'top' : y
      }).on('keydown', function(ev){
        if(ev.keyCode == 13 && !ev.shiftKey) {
          tool.saveText($(this).val(), x, y);
          $(this).remove();
          Parent.temp.text = false;
        }
      }).appendTo($(document.body)).focus();

      Parent.temp.text = textField;
    },

    saveText : function(txt, x, y){
      var Parent = this.root,
          text = new createjs.Text(txt, "14px Arial", "#ddd");

      text.x = x;
      text.y = y;

      Parent.stage.addChild(text);
      Parent.stage.update();

    }

  }

  window.PagenotesDefaultToolkit.text = text;

})();
