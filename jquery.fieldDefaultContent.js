(function(window, $, undef) {
	if($ === undef) {
		throw 'Dépendence non satisfaite : jQuery';
	}

	var FieldDefaultContent = function(elem, sContent, sColor) {
		var $this = this;

		this.elem = $(elem);
		this.sColor = sColor || '#999';
		this.sContent = sContent || $('label[for='+this.elem.attr('id')+']:not(visible)').text();
		this.rPattern = new RegExp('^(\\s+|'+this.sContent+')?$');
		this.sOriginalColor = this.elem.css('color');
		this.sOriginalBackground = this.elem.css('background-color') || 'white';

		if($.browser.opera && this.sOriginalBackground == 'transparent') {
			this.sOriginalBackground = 'white';
		}

		this.elem
			.focus(function() {
				$this.focus();
			})
			.blur(function() {
				$this.blur();
			})
			.each(function() {
				$(this.form)
					.submit(function() {
						return $this.submit();
					});
			})
			.blur();
	};

	FieldDefaultContent.prototype = {
		focus	: function() {
					this.elem
						.stop()
						.css('color', this.sOriginalColor);
					if(this.elem.val() === this.sContent) {
						this.elem.val('');
					}
				},
		blur	: function() {
					if(this.rPattern.test(this.elem.val())) {
						if($.fx.step.color) {
							this.elem
								.css('color', this.sOriginalBackground)
								.val(this.sContent)
								.animate(
									{color		: this.sColor},
									{
										duration	: 'slow',
										queue		: false
									}
								);
						}
						else {
							this.elem
								.css('color', this.sColor)
								.val(this.sContent);
						}
					}
				},
		submit	: function() {
					var $this = this;
					if(this.rPattern.test(this.elem.val())) {
						if($.fx.step.color && $.fx.step.backgroundColor) {
							this.elem
								.stop()
								.each(function() {
									$this.blur();
								})
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
																backgroundColor	: $this.sOriginalBackground,
																color			: $this.sOriginalBackground
															},
															{
																duration	: 'slow',
																queue		: false,
																complete	: function() {
																				$this.elem
																					.focus();
																			}
															}
														);
													}
									}
								);
						}
						else {
							this.elem
								.focus();
						}
						return false;
					}
				}
	};

	$.fn.fieldDefaultContent = function(sContent, sColor) {
		return this
			.filter('input, textarea')
				.each(function() {
					new FieldDefaultContent(this, sContent, sColor);
				});
	};

})(this, this.jQuery);