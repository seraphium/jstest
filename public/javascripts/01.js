/**
 * Created by zezhang on 2017/1/6.
 */
$(document).ready(function() {
    $('div.poem-stanza').addClass('highlight');
    $('#selected-plays > li').addClass('horizontal');
    $('#selected-plays li:not(.horizontal)').addClass('sub-level');

    $('a[href^="mailto:"]').addClass('mailto');
    $('a[href$=".pdf"]').addClass('pdflink');
    $('a[href^="http"][href*="henry"]').addClass('henrylink');

    $('tr:nth-child(odd)').addClass('alt');

    $('td:contains(Henry)').addClass('highlight');

    $('a').filter(function() {
        return this.hostname && this.hostname != location.hostname;
    }).addClass('external');

    $('td:contains(Henry)').parent().children()
        .addClass('highlight');

    console.log($('div.poem-stanza'));
});