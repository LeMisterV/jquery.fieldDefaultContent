(function (window, Error, RegExp, $, undef) {
    if ($ === undef) {
        throw new Error('Dépendence non satisfaite : jQuery');
    }

    var fieldDefaultContent = function (elem, sContent, sColor, bBold) {
        var $elem = $(elem),
        sOriginalColor, sOriginalBackground, bOriginalBold, rPattern;

        function focus() {
            $elem
                .stop()
                .css({
                    color            : sOriginalColor,
                    'font-weight'    : bOriginalBold ? 'bold' : 'normal'
                });

            if ($elem.val() === sContent) {
                $elem.val('');
            }
        }

        function blur() {
            if (rPattern.test($elem.val())) {
                if ($.fx.step.color) {
                    $elem
                        .css({
                            color           : sOriginalBackground,
                            'font-weight'   : (bBold || bOriginalBold) ? 'bold' : 'normal'
                        })
                        .val(sContent)
                        .animate(
                            {color          : sColor},
                            {
                                duration    : 'slow',
                                queue       : false
                            }
                        );
                }
                else {
                    $elem
                        .css({
                            color           : sColor,
                            'font-weight'   : bBold ? 'bold' : 'normal'
                        })
                        .val(sContent);
                }
            }
        }

        function submit() {
            if (rPattern.test($elem.val())) {
                $elem
                    .stop()
                    .each(focus);
            }
        }

        function init() {
            if (typeof sColor === 'boolean') {
                bBold = sColor;
                sColor = undef;
            }
            sColor = sColor || '#999';
            sContent = sContent || $('label[for=' + $elem.attr('id') + ']:not(visible)').text();
            rPattern = new RegExp('^(\\s+|' + sContent + ')?$');
            sOriginalColor = $elem.css('color');
            bOriginalBold = $elem.css('font-weight') === 'bold';
            sOriginalBackground = $elem.css('background-color') || 'white';

            bBold = bBold === undef ? bOriginalBold : bBold;

            $elem
                .focus(focus)
                .blur(blur)
                .each(function () {
                    $(this.form)
                        .submit(submit);
                })
                .blur();
        }

        init();
    };

    $.fn.fieldDefaultContent = function (sContent, sColor, bBold) {
        return this
            .filter('input, textarea')
                .each(function () {
                    fieldDefaultContent(this, sContent, sColor, bBold);
                })
            .end();
    };

}(this, this.Error, this.RegExp, this.jQuery));