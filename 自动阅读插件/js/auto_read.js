; (function () {
  var t = null,
    playing = false,
    Height = getScrollSize().height,
    viewHeight = getViewportSize().height;
    
  var AutoRead = function (opt) {
    this.sTopBtn = opt.sTopBtn;
    this.playBtn = opt.playBtn;

    _self = this;

    addEvent(window, 'scroll', function () {
      _self.sTopBtnShow.call(_self);
    });

    addEvent(this.sTopBtn, 'click', function () {
      clearInterval(t);
      _self.playBtn.style.backgroundImage = 'url(img/play.png)';
      window.scrollTo(0, 0);
      playing = false;
    });

    addEvent(this.playBtn, 'click', function () {
      _self.setAutoRead();
    });
  }

  AutoRead.prototype = {
    setAutoRead: function () {
      var playBtn = this.playBtn,
        sTop = getScrollOffset().top;

      if(Height === viewHeight + sTop){
        return;
      }

      if(!playing){
        t = setInterval(function () {
          var sTop = getScrollOffset().top;
          if (Height <= viewHeight + sTop) {
            clearInterval(t);
            playBtn.style.backgroundImage = 'url(img/play.png)';
            playing = false;

            return;
          }else{
            playBtn.style.backgroundImage = 'url(img/pause.png)';
            window.scrollBy(0, 1);
          }
        }, 1);
        playing = true;
      }else{
        clearInterval(t);
        _self.playBtn.style.backgroundImage = 'url(img/play.png)';
        playing = false;
      }
      

    },

    sTopBtnShow: function () {
      var sTop = getScrollOffset().top,
        sTopBtn = this.sTopBtn;

      sTopBtn.style.display = sTop ? 'block' : 'none';
    }
  }

  window.AutoRead = AutoRead;
})();