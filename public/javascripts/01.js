/**
 * Created by zezhang on 2017/1/6.
 */
/*$(document).ready(function() {
    $('div.poem-stanza').addClass('highlight');
    $('#selected-plays > li').addClass('horizontal');
    $('#selected-plays li:not(.horizontal)').addClass('sub-level');

    $('a[href^="mailto:"]').addClass('mailto');
    $('a[href$=".pdf"]').addClass('pdflink');
    $('a[href^="http"][href*="henry"]').addClass('henrylink');

    $('tr:nth-child(odd)').addClass('alt');

    $('td:contains(Henry)').addClass('highlight');

    $('a').filter(function () {
        return this.hostname && this.hostname != location.hostname;
    }).addClass('external');

    $('td:contains(Henry)').parent().children()
        .addClass('highlight');

    console.log($('div.poem-stanza'));

    $('#switcher-default').addClass('selected');


});

$(document).ready(function () {
//在样式转换器按钮上启用悬停效果
    $('#switcher').hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });

    //让样式转换器能够扩展和折叠
    var toggleSwitcher = function(event) {
        if (!$(event.target).is('button')) {
            $('#switcher button').toggleClass('hidden');
        }};

    $('#switcher button').click(function (event) {
        $('#switcher').off('click', toggleSwitcher);
        if (this.id == 'switcher-default') {
            $('#switcher').on('click', toggleSwitcher);
            $("body").css('fontSize', '1em');
        }
        var bodyClass = this.id.split('-')[1];
        $('body').removeClass().addClass(bodyClass);
        $('#switcher button').removeClass('selected');
        $(this).addClass('selected');
        // event.stopPropagation();
        return false;
    });

    $('#switcher').on('click', toggleSwitcher);
    //模拟一次单击，以便开始时处理折叠状态
    $('#switcher').click();

    //setBodyClass()用于修改页面样式
    //样式转换器的状态也会被更新
    var setBodyClass = function(className) {
        $('body').removeClass().addClass(className);
        $('#switcher button').removeClass('selected');
        $('#switcher-' + className).addClass('selected');
        $('#switcher').off('click', toggleSwitcher);
        if (className == 'default') {
            $('#switcher').on('click', toggleSwitcher);
        }
    };
    //开始的时候先选中switcher-default按钮
    $('#switcher-default').addClass('selected');

    //当按钮被单击时调用setBodyClass()
    $('#switcher').click(function(event) {
    if ($(event.target).is('button')) {
        var bodyClass = event.target.id.split('-')[1];
        setBodyClass(bodyClass);
    }});

});


$(document).ready(function() {
    var triggers = {
        D: 'default',
        N: 'narrow',
        L: 'large'
    };
    $(document).keyup(function(event) {
        var key = String.fromCharCode(event.which);
        if (key in triggers) {
            $('#switcher-' + triggers[key]).click();
        }
    }); });

$(document).ready(function() {
    var $body = $('body');
    $('#switcher-bigger').click(function() {
        var num = parseFloat($body.css('fontSize'));
        num *= 1.4;
        $body.css('fontSize', num + 'px');
    });
    $('#switcher-smaller').click(function() {
        var num = parseFloat($body.css('fontSize'));
        num /= 1.4;
        $body.css('fontSize', num + 'px');
    });
});
*/

$(document).ready(function() {
    var $firstPara = $('p').eq(1);
    $firstPara.hide();
    $('a.more').click(function(event) {
        event.preventDefault();
        $firstPara.animate(
            {
                height: 'toggle',
                opacity: 'toggle'
            }, 'slow');
        var $link = $(this);
        if ($link.text() == 'read more') {
            $link.text('read less');
        } else {
            $link.text('read more');
        }
        });

    $('p').eq(2)
        .css('border', '1px solid #333')
        .click(function() {
            var $clickedItem = $(this);
            $clickedItem.next().slideDown('slow', function() {
                $clickedItem.slideUp('slow');
            });
        });
    $('p').eq(3).css('backgroundColor', '#ccc').hide();
});