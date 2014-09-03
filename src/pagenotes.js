(function(){

  var Pagenotes = function(toolkit){
    this.temp = { mask: false };
    this.masks = [];
    this.toolkit = toolkit || {};
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

      this.selectTool('rectangle_highlight');

    },

    selectTool : function(tool){
      if(this.toolkit.active) this.toolkit[this.toolkit.active].off(this);
      if(this.toolkit[tool]) this.toolkit[tool].on(this);
    }

  }

  var pagenotes = new Pagenotes(PagenotesDefaultToolkit);
  pagenotes.init();

})();
