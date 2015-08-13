window.addEventListener ? window.addEventListener('load', fullSize, false) : window.attachEvent('onload', fullSize);
window.addEventListener ? window.addEventListener('resize', fullresize, false) : window.attachEvent('onresize', fullresize);

function fullSize() {
    if ($('.iframefull').length > 0){
        $('html').css('overflow','hidden');
        $('.portlet-column-content').css('padding','0');
        var iframe = $('iframe');
        var contDiv = iframe.parent();
        contDiv.css('overflow','hidden');
        contDiv.css('width','100%');
        contDiv.css('height','200px');
        iframe.css('width','100%');
        contDiv.parent().css('overflow','hidden');
        $('#content').resize(fullresize());
        fullresize();
    }
}

function getHeight() {
    var windowHeight = document.body.parentNode.clientHeight;
    var headerHeight = 0;

    var northDIV = ['.portlet-dockbar','#header'];

    for (idiv = 0; idiv < northDIV.length; idiv++) {
        if ($(northDIV[idiv]).length > 0) {
            headerHeight += $(northDIV[idiv]).height();
        }
    }

    var height = windowHeight - headerHeight;
    return height;
}

function fullresize() {
    if ($('.iframefull').length > 0){
        var iframe = $('iframe');
        var contDiv = $('iframe').parent();
        var width = $('#content').width();
        var iframeHeight = getHeight();
        contDiv.height(iframeHeight);
        iframe.height(iframeHeight);
        contDiv.width(width);
        iframe.width(width);
        iframe.attr('width',width);
        iframe.attr('height',iframeHeight);
    }
}
