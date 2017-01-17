module('Selecting', {
    setup: function () {

        this.topLis = $('#selected-plays > li.horizontal');
    }
});

test('Child Selector', function() {
    expect(1);
    equal( this.topLis.length, 3, 'Top LIs have horizontal class');
});
test('Attribute Selectors', function() {
    expect(2);
    ok(this.topLis.find('.mailto').length == 1, 'a.mailto');
    equal(this.topLis.find('.pdflink').length, 1, 'a.pdflink');
});
module('Ajax');