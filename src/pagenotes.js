(function(){

  var Pagenotes = function(){

  }

  Pagenotes.prototype = {

    init: function(){

      var that = this,
          width = $(document.body).outerWidth(),
          height = $(document.body).outerHeight();


      html2canvas(document.body, {

        onrendered: function(screenshot){

          that.canvas = $('<canvas id="pagenotes-canvas" class="pagenotes-canvas"></canvas>')
                          .attr('width', screenshot.width).attr('height', screenshot.height)
                          .appendTo($(document.body));
          that.stage = new createjs.Stage('pagenotes-canvas');

          that.bg = new createjs.Bitmap(screenshot);
          that.bg.filters = [new createjs.BlurFilter(5,5,1)];
          that.bg.cache(0, 0, screenshot.width, screenshot.height);

          that.stage.addChild(that.bg);

          that.stage.update();

        }

      });

    },

    mask: function(){

    }

  }

  var pagenotes = new Pagenotes();

  $(function(){
    pagenotes.init();
  });

})();
