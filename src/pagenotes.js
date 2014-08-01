(function(){

  var Pagenotes = function(){
    this.temp = { mask: false };
    this.masks = [];
  }

  Pagenotes.prototype = {

    init: function(){

      var that = this,
          width = $(document.body).outerWidth(),
          height = $(document.body).outerHeight();

      this.canvas = $('<canvas id="pagenotes-canvas" class="pagenotes-canvas"></canvas>');

      html2canvas(document.body, {

        onrendered: function(screenshot){

          that.canvas.attr('width', screenshot.width).attr('height', screenshot.height).appendTo($(document.body));
          that.stage = new createjs.Stage('pagenotes-canvas');
          that.screenshot = screenshot;

          var bg = new createjs.Bitmap(screenshot);
          bg.filters = [new createjs.BlurFilter(5,5,1)];
          bg.cache(0, 0, screenshot.width, screenshot.height);

          var overlay = new createjs.Shape();
          overlay.graphics.beginFill("rgba(0, 0, 0, 0.6)").drawRect(0, 0, screenshot.width, screenshot.height);

          that.stage.addChild(bg);
          that.stage.addChild(overlay);


          that.stage.update();

        }

      });

      this.canvas.on('mousedown', function(ev){
        that.openMask(ev.offsetX, ev.offsetY);
      }).on('mousemove', function(ev){
        if(that.temp.mask) that.updateMask(ev.offsetX, ev.offsetY)
      }).on('mouseup', function(ev){
        if(that.temp.mask) that.saveMask()
      });

    },

    mask: function(x, y, w, h){

      x = x || 0;
      y = y || 0;
      w = w || 100;
      h = h || 100;

      var newMask = new createjs.Shape();
      newMask.x = x;
      newMask.y = y;
      newMask.graphics.drawRect(0, 0, w, h);

      var display = new createjs.Bitmap(this.screenshot);
      display.mask = newMask;

      this.stage.addChild(display);
      this.stage.update();

    },

    openMask: function(x, y){

      var newMask = new createjs.Shape();
      newMask.x = x;
      newMask.y = y;
      newMask.graphics.drawRect(0, 0, 1, 1);

      var display = new createjs.Bitmap(this.screenshot);
      display.mask = newMask;

      this.stage.addChild(display);
      this.stage.update();

      this.temp.mask = {
        mask : newMask,
        display: display
      };

    },

    updateMask: function(x, y){

      var tempMask = this.temp.mask,
          w = x - tempMask.mask.x,
          h = y - tempMask.mask.y;

      tempMask.mask.graphics.clear();
      tempMask.mask.graphics.drawRect(0, 0, w, h);

      this.stage.update();

    },

    saveMask: function(){

      var mask = this.temp.mask;

      this.temp.mask = false;

    }

  }

  var pagenotes = new Pagenotes();
  pagenotes.init();

})();
