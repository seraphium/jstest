/**
 * Created by zezhang on 2017/1/6.
 */


$(document).ready(function() {
    $('<a href="#top">back to top</a>').insertAfter('div.chapter p');
    $('<a id="top"></a>').prependTo('body');

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

})(jQuery);


$(function() {


    $.sum();
});