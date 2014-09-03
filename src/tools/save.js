(function () {

  window.PagenotesDefaultToolkit = window.PagenotesDefaultToolkit || {};

  var save = {

    on : function(Parent){

      var data = Parent.canvas.get(0).toDataURL(),
          evt = document.createEvent("Event");

      this.anchor = $('<a href="'+data+'" download="pagenote-image.jpg"></a>');
      evt.initEvent("click", true, true);

      this.anchor.get(0).dispatchEvent(evt);

    },

    off : function(Parent){

      this.anchor.remove();

    }

  }

  window.PagenotesDefaultToolkit.save = save;

})();
