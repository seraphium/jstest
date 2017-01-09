/**
 * Created by zezhang on 2017/1/6.
 */

$(document).ready(function() {
    $('div.chapter a[href*="wikipedia"]').attr({
        rel: 'external',
        title: function() {
            return 'Learn more about ' + $(this).text()
                + ' at Wikipedia.';
        },
        id: function(index, oldValue) {
            return 'wikilink-' + index;
        }
    });
});