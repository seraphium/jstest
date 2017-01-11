/**
 * Created by zezhang on 2017/1/6.
 */

$(document).ready(function() {
    $('<a href="#top">back to top</a>').insertAfter('div.chapter p');
    $('<a id="top"></a>').prependTo('body');

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

    $('#letter-a a').click(function(event) {
        event.preventDefault();
        $("#dictionary").load("a.html");
       // alert('Loaded!');
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
        $.getScript('javascripts/c.js');
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

});