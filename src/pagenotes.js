(function(){

  var Pagenotes = function(){

  }

  Pagenotes.prototype = {

    init: function(){

      this.canvas = $('<canvas/>', { 'class': 'pagenotes-canvas' })

    }

  }

  var pagenotes = new Pagenotes();
  pagenotes.init();

})();
