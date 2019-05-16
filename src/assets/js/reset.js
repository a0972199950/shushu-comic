!(function(win, doc){
    function setFontSize() {
        var winWidth =  document.documentElement.clientWidth;
        if(winWidth > 640){
            winWidth = 640;
        }
        doc.documentElement.style.fontSize = (winWidth / 320) * 16 + 'px' ;  //1rem=16px
    }
    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
    var timer = null;
    win.addEventListener(evt, function () {
        clearTimeout(timer);
        timer = setTimeout(setFontSize, 300);
    }, false);
    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 300);
        }
    }, false);
    setFontSize();
}(window, document));