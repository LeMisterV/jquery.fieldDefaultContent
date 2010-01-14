(function(window, $, undef) {
	if($ === undef) {
		throw 'Dépendence non satisfaite : jQuery';
	}

	var fieldDefaultContent = function(elem, sContent, sColor) {
		var $elem = $(elem),
		sOriginalColor, rPattern,

		focus = function() {
			$elem
				.stop()
				.css('color', sOriginalColor);
			if($elem.val() === sContent) {
				$elem.val('');
			}
		},

		blur = function() {
			if(rPattern.test($elem.val())) {
				if($.fx.step.color) {
					$elem
						.css('color', sOriginalBackground)
						.val(sContent)
						.animate(
							{color		: sColor},
							{
								duration	: 'slow',
								queue		: false
							}
						);
				}
				else {
					$elem
						.css('color', sColor)
						.val(sContent);
				}
			}
		},

		submit = function() {
			if(rPattern.test($elem.val())) {
				if($.fx.step.color && $.fx.step.backgroundColor) {
					$elem
						.stop()
						.each(blur)
						.animate(
							{
								backgroundColor	: '#f88',
								color			: 'white'
							},
							{
								duration	: 'slow',
								queue		: false,
								complete	: function() {
												$(this).animate(
													{
														backgroundColor	: sOriginalBackground,
														color			: sOriginalBackground
													},
													{
														duration	: 'slow',
														queue		: false,
														complete	: function() {
																		$elem
																			.focus();
																	}
													}
												);
											}
							}
						);
				}
				else {
					$elem
						.focus();
				}
				return false;
			}
		},

		init = function() {
			sColor = sColor || '#999';
			sContent = sContent || $('label[for='+$elem.attr('id')+']:not(visible)').text();
			rPattern = new RegExp('^(\\s+|'+sContent+')?$');
			sOriginalColor = $elem.css('color');
			sOriginalBackground = $elem.css('background-color') || 'white';
			if($.browser.opera && sOriginalBackground == 'transparent') {
				sOriginalBackground = 'white';
			}

			$elem
				.focus(focus)
				.blur(blur)
				.each(function() {
					$(this.form)
						.submit(submit);
				})
				.blur();
		};

		init();
	};

	$.fn.fieldDefaultContent = function(sContent, sColor) {
		return this
			.filter('input, textarea')
				.each(function() {
					fieldDefaultContent(this, sContent, sColor);
				})
			.end();
	};

})(this, this.jQuery);