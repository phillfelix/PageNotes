(function(){

  var Pagenotes = function(){

  }

  Pagenotes.prototype = {

    init: function(){

      var that = this,
          width = $(document.body).outerWidth(),
          height = $(document.body).outerHeight();

      this.canvas = $('<canvas id="pagenotes-canvas" class="pagenotes-canvas"></canvas>')
                      .attr('width', width).attr('height', height)
                      .appendTo($(document.body));
      this.stage = new createjs.Stage('pagenotes-canvas');


      html2canvas(document.body, {

        onrendered: function(screenshot){

          that.bg = new createjs.Bitmap(screenshot);

          that.stage.addChild(that.bg);

          var overlay = new createjs.Shape();
          overlay.graphics.beginFill("rgba(0, 0, 0, 0.6");
          overlay.graphics.drawRect(0, 0, width, height);

          that.stage.addChild(overlay);


          that.stage.update();

        }

      });

    }

  }

  var pagenotes = new Pagenotes();

  $(function(){
    pagenotes.init();
  });

})();
