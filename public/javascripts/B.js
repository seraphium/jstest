/**
 * Created by jackiezhang on 2017/1/17.
 */
$(document).ready(function() {
    $('#selected-plays > li').addClass('horizontal');
    $('a[href^="mailto:"]').addClass('mailto');
    $('a[href$=".pdf"]').addClass('pdflink')
});
