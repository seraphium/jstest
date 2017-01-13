/**
 * Created by zezhang on 2017/1/6.
 */


$(document).ready(function() {
    $('<a href="#top">back to top</a>').insertAfter('div.chapter p');
    $('<a id="top"></a>').prependTo('body');
    $.fn.shadow.defaults.copies = 10;
    $('h1').shadow({
        copyOffset: function(index) {
            return {x: -index, y: -2 * index};
        }
    });
    $.sum();
    $('h1').tooltip();
    $('h1').on("tooltipopen", function()  {
        console.log("on tooltip open");
    });

    $('#slider').slider({
        min: 0,
        max: $('#books li').length - 1,
        slide: function(event, ui) {
            $('#books').cycle(ui.value);
        }
    });

   $('#books').cycle({
        timeout: 2000,
        speed: 200,
        pause: true,
        before: function() {
            $('#slider')
                .slider('value', $('#books li').index(this));
        }
    });


    var $notes = $('<ol id="notes"></ol>').insertBefore('#footer');
    $('span.footnote').each(function(index) {
        $(this)
            .before([
                '<a href="#footnote-',
                index + 1,
                '" id="context-', index + 1,
                '" class="context">',
                '<sup>',
                index + 1,
                '</sup></a>'
            ].join('')).appendTo($notes)
            .append([
                '&nbsp;(<a href="#context-',
                index + 1,
                '">context</a>)'
            ].join(''))
            .wrap('<li id="footnote-' + (index + 1) + '"></li>');
    });


    $('span.pull-quote').each(function(index) {
        var $parentParagraph = $(this).parent('p');
        $parentParagraph.css('position', 'relative');
        var $clonedCopy = $(this).clone();
        $clonedCopy
            .addClass('pulled')
            .find('span.drop')
            .html('&hellip;')
            .end()
            .text($clonedCopy.text())
            .prependTo($parentParagraph);
    });

    $('body').on('click', 'h3.term', function() {
        $(this).siblings('.definition').slideToggle();
    });

    $('#letter-a a').click(function(event) {
        event.preventDefault();
        $('#dictionary').hide().load('a.html', function() {
            $(this).fadeIn();
        });
    });

    $('#letter-b a').click(function(event) {
        event.preventDefault();
        $.getJSON("b.json", function(data)  {
            var html = '';
            $.each(data, function(entryIndex, entry) {
                html += '<div class="entry">';
                html += '<h3 class="term">' + entry.term + '</h3>';
                html += '<div class="part">' + entry.part + '</div>';
                html += '<div class="definition">';
                html += entry.definition;
                if (entry.quote) {
                    html += '<div class="quote">';
                    $.each(entry.quote, function(lineIndex, line) {
                        html += '<div class="quote-line">' + line + '</div>';
                    });
                    if (entry.author) {
                        html += '<div class="quote-author">' + entry.author + '</div>';
                    }
                    html += '</div>';
                }
                html += '</div>';
                html += '</div>';
            });
            $('#dictionary').html(html);
         //   alert('Loaded!');

        });
    });

    $('#letter-c a').click(function(event) {
        event.preventDefault();
        $.getScript('javascripts/c.js').fail(function(jqXHR){
            $('#dictionary')
                .html('An error occurred: ' + jqXHR.status)
                .append(jqXHR.responseText);
        })
    });

    $('#letter-d a').click(function(event) {
            event.preventDefault();
            $.get('d.xml', function(data) {
                $('#dictionary').empty();
                $(data).find('entry:has(quote[author])').each(function() {
                    var $entry = $(this);
                    var html = '<div class="entry">';
                    html += '<h3 class="term">' + $entry.attr('term');
                    html += '</h3>';
                    html += '<div class="part">' + $entry.attr('part');
                    html += '</div>';
                    html += '<div class="definition">';
                    html += $entry.find('definition').text();
                    var $quote = $entry.find('quote');
                    if ($quote.length) {
                        html += '<div class="quote">';
                        $quote.find('line').each(function () {
                            html += '<div class="quote-line">';
                            html += $(this).text() + '</div>';
                        });
                        if ($quote.attr('author')) {
                            html += '<div class="quote-author">';
                            html += $quote.attr('author') + '</div>';
                        }
                        html += '</div>';
                    }
                    html += '</div>';
                    html += '</div>';
                    $('#dictionary').append($(html));
                });
        });
    });

    $('#letter-h a').click(function(event) {
        event.preventDefault();
        $('#dictionary').load('h.html .entry');
    });

});

(function($) {
    $.sum = function(array) {
        console.log("in jquery customized func");
        var total = 0;
        $.each(array, function(index, value) {
            value = $.trim(value);
            value = parseFloat(value) || 0;
            total += value;
        });
        return total;
    };

    $.average = function(array) {
        if ($.isArray(array)) {
            return $.sum(array) / array.length;
        }
        return '';
    };

    $.fn.swapClass = function(class1, class2) {
        return this.each(function() {
            var $element = $(this);
            if ($element.hasClass(class1)) {
                $element.removeClass(class1).addClass(class2);
            }
            else if ($element.hasClass(class2)) {
                $element.removeClass(class2).addClass(class1);
            }
        });
    };

    $.fn.shadow = function(opts) {

        var options = $.extend({}, $.fn.shadow.defaults, opts);
        return this.each(function() {
            var $originalElement = $(this);
            for (var i = 0; i < options.copies; i++) {
                var offset = options.copyOffset(i);
                $originalElement
                    .clone()
                    .css({
                        position: 'absolute',
                        left: $originalElement.offset().left + offset.x,
                        top: $originalElement.offset().top + offset.y,
                        margin: 0,
                        zIndex: -1,
                        opacity: options.opacity
                    })
                    .appendTo('body');
            }
        });
    }

    $.fn.shadow.defaults = {
        copies: 5,
        opacity: 0.1,
        copyOffset: function(index) {
            return {x: index, y: index};
        }
    };


    $.fn.column = function() {
        var $cells = $();
        this.each(function() {
            var $td = $(this).closest('td, th');
            if ($td.length) {
                var colNum = $td[0].cellIndex + 1;
                var $columnCells = $td
                    .closest('table')
                    .find('td')
                    .filter(':nth-child(' + colNum + ')');
                $cells = $cells.add($columnCells);
            }
        });
        return this.pushStack($cells);
    };

    $.widget('ljq.tooltip', {
        _create: function() {
            this._tooltipDiv = $('<div></div>')
                .addClass('ljq-tooltip-text ' +
                    'ui-widget ui-state-highlight ui-corner-all')
                .hide().appendTo('body');
            this.element
                .addClass('ljq-tooltip-trigger')
                .on('mouseenter.ljq-tooltip',
                    $.proxy(this._open, this))
                .on('mouseleave.ljq-tooltip',
                    $.proxy(this._close, this));
        },
        destroy: function() {
            this._tooltipDiv.remove();
            this.element
                .removeClass('ljq-tooltip-trigger')
                .off('.ljq-tooltip');
            $.Widget.prototype.destroy.apply(this, arguments);
        },
        options: {
            offsetX: 10,
            offsetY: 10,
            content: function() {
                return $(this).data('tooltip-text');
            }
        },
        _open: function() {
            if (!this.options.disabled) {
                var elementOffset = this.element.offset();
                this._tooltipDiv.css({
                    position: 'absolute',
                    left: elementOffset.left + this.options.offsetX,
                    top: elementOffset.top + this.element.height() + this.options.offsetY
                }).text(this.options.content.call(this.element[0]));
                this._tooltipDiv.show();
                this._trigger("open");
            }

        },
        _close: function() {
            this._tooltipDiv.hide();
            this._trigger("close");
        }
    });



    $.extend($.expr[':'], {
        group: function(element, index, matches, set) {
            var num = parseInt(matches[3], 10);
            if (isNaN(num)) {
                return false;
            }
            return index % (num * 2) <num;
        }
    });

    function stripe() {
        $('#news')
            .find('tr.alt').removeClass('alt').end()
            .find('tbody').each(function() {
            $(this).children(':visible').has('td')
                .filter(':group(2)').addClass('alt');
        })
    }

    stripe();


    $('#topics a').click(function(event) {
        event.preventDefault();

        var topic = $(this).text();

        $('#topics a.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#news').find('tr').show();
        if (topic != 'All') {
            $('#news').find('tr:has(td)').not(function() {
                return $(this).children(':nth-child(4)').text() == topic;
            }).hide();

        }
        stripe();
    });

    var $cell = $('#release').nextAll().addBack();
    $cell.addClass('highlight');
    console.log($cell.context);
    console.log($cell.selector);
    console.log($cell.prevObject);

    $('#news td').click(function() {
        $('#news td.active').removeClass('active');
        $(this).column().addClass('active');
    });

})(jQuery);

