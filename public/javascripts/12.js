/**
 * Created by jackiezhang on 2017/1/14.
 */


$(function () {

    var $table1 = $('#t-1');
    var $headers = $table1.find('thead th').slice(1);

    $headers
        .each(function() {
            var keyType = this.className.replace(/^sort-/, '');
            $(this).data('keyType', keyType);
        })
        .wrapInner('<a href="#"></a>')
        .addClass('sort');


    var sortKeys = {
        alpha: function($cell) {
            var key = $cell.find('span.sort-key').text() + ' ';
            key += $.trim($cell.text()).toUpperCase();
            return key;
        },
        numeric: function($cell) {
            var num = $cell.text().replace(/^[^\d.]*/, '');
            var key = parseFloat(num);
            if (isNaN(key)) {
                key = 0; }
            return key;
        },
        date: function($cell) {
            var key = Date.parse('1 ' + $cell.text());
            return key;
        }
    };


    $headers.on('click', function(event) {
        event.preventDefault();
        var $header = $(this),
            column = $header.index(),
            keyType = $header.data('keyType'),
            sortDirection = 1;
        if ( !$.isFunction(sortKeys[keyType]) ) {
            return; }
        if ($header.hasClass('sorted-asc')) {
            sortDirection = -1;
        }
        var rows = $table1.find('tbody > tr').each(function() {
            var $cell = $(this).children('td').eq(column);
            $(this).data('sortKey', sortKeys[keyType]($cell));
        }).get();

        rows.sort(function(a, b) {
            var keyA = $(a).data('sortKey');
            var keyB = $(b).data('sortKey');
            if (keyA < keyB) return -sortDirection;
            if (keyA > keyB) return sortDirection;
            return 0;
        });
        $headers.removeClass('sorted-asc sorted-desc');
        $header.addClass(sortDirection == 1 ? 'sorted-asc' : 'sorted-desc');

        $.each(rows, function (index, row) {
            $table1.children('tbody').append(row);
        });
    });

    var div = document.createElement('div');
    $.support.textShadow = div.style.textShadow === '';
    $.support.filter = div.style.filter === '';
    div = null;
    if ($.support.textShadow) {
        $.cssHooks.glowColor = {
            set: function(elem, value) {
                if (value == 'none') {
                    elem.style.textShadow = '';
                }
                else {
                    elem.style.textShadow = '0 0 2px ' + value;
                }
            }
        };
    }
    else {
        $.cssHooks.glowColor = {
            set: function(elem, value) {
                if (value == 'none') {
                    elem.style.filter = '';
                }
                else {
                    elem.style.zoom = 1;
                    elem.style.filter =
                        'progid:DXImageTransform.Microsoft' +
                        '.Glow(Strength=2, Color=' + value + ');';
                }
            }
        };
    }


    $('table').each(function(index) {
        var $table = $(this);
        $('<h3></h3>', {
            id: 'table-title-' + index,
            'class': 'table-title',
            text: 'Table ' + (index + 1),
            data: {'index': index},
            click: function (event) {
                event.preventDefault();
                $table.fadeToggle();
            },
            css: {glowColor: '#00ff00'}
        }).insertBefore($table)
    });



})(jQuery);