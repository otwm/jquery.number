/**
 * <pre>
 * mit
 * licensehttps://github.com/otwm/jquery.number.git
 * </pre>
 * 
 * @author kdo
 */
var kdo = {};
kdo.number = "jquery.number.bykdo";

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
		var _result = getFormattedNumber(number);
		if (/\./g.test(_result)) {
			return _result.replace(/[0]*$/, '').replace(/[.]$/, '');
		}
		return _result;
	}

	var originalVal = $.fn.val;
	$.fn.number.originalVal = originalVal;

	$.fn.val = function(value) {
		var $this = $(this);
		if (!$this.data(kdo.number))
			return originalVal.call(this);
		if (arguments.length >= 1) {
			return originalVal.call(this, value);
		}
		var _result = originalVal.call(this).replace(/\,/g, '');
		if (/\./g.test(_result)) {
			return _result.replace(/[0]*$/, '').replace(/[.]$/, '');
		}
		return _result.replace(/[.]$/, '');
	};

	return this.each(function() {
		var $this = $(this);
		$this.data(kdo.number, true);
		$this.on("keypress." + kdo.number, function() {
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
		$this.on("keyup." + kdo.number, function() {
			var _$this = $(this);
			_$this.val(getFormattedNumber(originalVal.call(_$this)));
		});
		$this.on("blur." + kdo.number, function() {
			var _$this = $(this);
			var _result = originalVal.call(_$this);
			if (/\./g.test(_result)) {
				_result = _result.replace(/[0]*$/, '').replace(/[.]$/, '');
			}
			_$this.val(_result.replace(/[.]$/, ''));
		});
		return $this;
	});

};

$.fn.number.originalVal = null;

$.fn.unNumber = function(number) {
	$.fn.val = $.fn.number.originalVal;
	return this.each(function() {
		var $this = $(this);
		$this.off("." + kdo.number);
	});
};