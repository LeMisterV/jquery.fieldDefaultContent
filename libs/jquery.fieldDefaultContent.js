(function (window, Error, RegExp, $, undef) {
    if ($ === undef) {
        throw new Error('Dépendence non satisfaite : jQuery');
    }

    function fieldDefaultContent(elem, options) {
        var $elem = $(elem),
            sContent, sColor, bBold, sFontSize,
            sOriginalBackground, rPattern;

        function focus() {
            $elem
                .stop()
                .removeAttr('style')
                .removeClass('defaultContent');

            if ($elem.val() === sContent) {
                $elem.val('');
            }
        }

        function blur() {
            var val = $elem.val(),
                color = ('color' in $.fx.step) ? sOriginalBackground : sColor;

            if (val == sContent || rPattern.test(val)) {
                $elem
                    .css({
                        color           : color,
                        'font-weight'   : bBold ? 'bold' : 'normal',
                        'font-size'     : sFontSize
                    })
                    .addClass('defaultContent')
                    .val(sContent);

                if ('color' in $.fx.step) {
                    $elem
                        .animate(
                            {
                                color          : sColor
                            },
                            {
                                duration    : 'slow',
                                queue       : false
                            }
                        );
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
            sColor = options.color || '#999';
            sContent = options.content || $('label[for=' + $elem.attr('id') + ']:not(visible)').text();
            rPattern = new RegExp('^(\\s+|' + sContent + ')?$');
            sOriginalBackground = $elem.css('background-color') || 'white';

            bBold = options.bold === undef ? $elem.css('font-weight') === 'bold' : options.bold;
            sFontSize = options.fontSize === undef ? $elem.css('font-size') : options.fontSize;

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

    $.fn.fieldDefaultContent = function (options) {
        if (typeof options !== 'object') {
            options = {
                content     : options,
                color       : arguments[1],
                bold        : arguments[2],
                fontSize    : arguments[3]
            };

            if (typeof arguments[1] === 'boolean') {
                options.bold = options.color;
                delete options.color;
            }
        }

        return this
            .filter('input, textarea')
                .each(function () {
                    fieldDefaultContent(this, options);
                })
            .end();
    };

}(this, this.Error, this.RegExp, this.jQuery));