(function(){

  var Pagenotes = function(toolkit){
    this.temp = { mask: false };
    this.masks = [];
    this.toolkit = toolkit || {};
  }

  Pagenotes.prototype = {

    init : function(){

      var self = this;

      $('<button class="pagenotes-shot">Shot</button>').on('click', function(ev){
        ev.preventDefault();
        $(this).remove();
        self.shot();
      }).appendTo($(document.body));

    },

    shot : function(){

      var self = this,
          width = $(document.body).outerWidth(),
          height = $(document.body).outerHeight();

      this.canvas = $('<canvas id="pagenotes-canvas" class="pagenotes-canvas"></canvas>');

      html2canvas(document.body, {

        onrendered: function(screenshot){

          self.canvas.attr('width', screenshot.width).attr('height', screenshot.height).appendTo($(document.body));
          self.stage = new createjs.Stage('pagenotes-canvas');
          self.screenshot = screenshot;

          var bg = new createjs.Bitmap(screenshot);
          bg.filters = [new createjs.BlurFilter(5,5,1)];
          bg.cache(0, 0, screenshot.width, screenshot.height);

          var overlay = new createjs.Shape();
          overlay.graphics.beginFill("rgba(0, 0, 0, 0.6)").drawRect(0, 0, screenshot.width, screenshot.height);

          self.stage.addChild(bg);
          self.stage.addChild(overlay);


          self.stage.update();

          self.selectTool('rectangle_highlight');
          self.renderToolbar();

        }

      });

    },

    renderToolbar : function(){

      var self = this;
      var toolbar = $('<div class="pagenotes-toolbar"></div>').appendTo($(document.body));

      $.each(this.toolkit, function(toolName, tool){
        $('<button data-tool="'+toolName+'">'+toolName+'</button>').appendTo(toolbar);
      });
      $("#pagenotes-toolbar button").on('click', function(e){
        e.preventDefault();
        self.selectTool($(this).data('tool'));
      })
    },

    selectTool : function(tool){
      if(this.activeTool) this.toolkit[this.activeTool].off(this);
      if(this.toolkit[tool]) {
        this.activeTool = tool;
        this.toolkit[tool].on(this);
      }
    }



  }

  var pagenotes = new Pagenotes(PagenotesDefaultToolkit);
  pagenotes.init();

})();
