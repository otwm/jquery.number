/**
 * <pre>
 * mit license 
 * https://github.com/otwm/jquery.number.git
 * </pre>
 * 
 * @author kdo
 */
$.fn.number = function(number) {
	var getFormattedNumber = function(number) {
		number += '';
		number = number.replace(/\,/g, '');
		temp = number.split('.');
		value1 = temp[0];
		value2 = temp.length > 1 ? '.' + temp[1] : '';
		// value2 = value2.replace(/0$/,'');
		var regex = /(\d+)(\d{3})/;
		while (regex.test(value1)) {
			value1 = value1.replace(regex, '$1' + ',' + '$2');
		}
		return value1 + value2;
	};

	if (!(typeof number == "undefined")) {
		return getFormattedNumber(number).replace(/[0]*$/, '');
	}

	var originalVal = $.fn.val;

	$.fn.val = function(value) {
		var $this = $(this);
		if (!$this.data("jquery.number.bykdo"))
			return originalVal.call(this);
		if (arguments.length >= 1) {
			return originalVal.call(this, value);
		}
		return originalVal.call(this).replace(/\,/g, '').replace(/[0]*$/, '');
	};

	return this.each(function() {
		var $this = $(this);
		$this.data("jquery.number.bykdo", true);
		$this.keypress(function() {
			var _$this = $(this);
			if (!isVaild(event.which))
				event.preventDefault();

			function isVaild(key) {
				if (key >= 48 && key <= 57)
					return true;
				if (key == 46 && !/\./g.test(_$this.val()))
					return true;
				return false;
			}
		});
		$this.keyup(function() {
			var _$this = $(this);
			_$this.val(getFormattedNumber(originalVal.call(_$this)));
		});
		$this.blur(function() {
			var _$this = $(this);
			_$this.val(originalVal.call(_$this).replace(/[0]*$/, '').replace(
					/[.]$/, ''));
		});
		return $this;
	});
};
