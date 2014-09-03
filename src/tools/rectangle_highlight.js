(function () {

  window.PagenotesDefaultToolkit = window.PagenotesDefaultToolkit || {};

  var rectangle_highlight = {

    on : function(Parent){
      this.root = Parent;
      tool    = this;

      Parent.canvas.on('mousedown', function(ev){
        tool.openMask(ev.offsetX, ev.offsetY);
      }).on('mousemove', function(ev){
        if(Parent.temp.rectangle_highlight) tool.updateMask(ev.offsetX, ev.offsetY)
      }).on('mouseup', function(ev){
        if(Parent.temp.rectangle_highlight) tool.saveMask()
      });

    },

    off : function(Parent){

      this.canvas.off("mousedown, mousemove, mouseup");

    },

    openMask: function(x, y){
      var Parent  = this.root;

      var newMask = new createjs.Shape();
      newMask.x = x;
      newMask.y = y;
      newMask.graphics.drawRect(0, 0, 1, 1);

      var display = new createjs.Bitmap(Parent.screenshot);
      display.mask = newMask;

      Parent.stage.addChild(display);
      Parent.stage.update();

      Parent.temp.rectangle_highlight = {
        mask : newMask,
        display: display
      };

    },

    updateMask: function(x, y){
      var Parent  = this.root;

      var tempMask = Parent.temp.rectangle_highlight,
          w = x - tempMask.mask.x,
          h = y - tempMask.mask.y;

      tempMask.mask.graphics.clear();
      tempMask.mask.graphics.drawRect(0, 0, w, h);

      Parent.stage.update();

    },

    saveMask: function(){
      var Parent  = this.root;

      Parent.temp.rectangle_highlight = false;

    }

  }

  window.PagenotesDefaultToolkit.rectangle_highlight = rectangle_highlight;

})();
