/**
* @file jquery.maskx.js
* @author William Bruno <wbrunom@gmail.com>
* @date 2013-03-25
*
* @use jQuery('$input[name="cc"]').maskx({maskx: 'cc'});
*/
; (function ($) {
	'use strict';
	/*global nomen:true, jQuery: false, setTimeout:false */

	var plugin = function (settings) {
		var $input, mask,
			_execmascara = function () {
				$input.value = mask($input.value, 'input');
			},
			_mascara = function (o, f) {
				$input = o;
				mask = f;
				setTimeout(_execmascara, 1);
			};
		return this.each(function () {
			var $this = $(this),
				opts = $.extend({}, $.fn.maskx.defaults, settings),
				maskxFunc = $.fn.maskx[opts.maskx];

			if (typeof maskxFunc === 'function') {

				$this[0].type = 'tel';//$this.attr('type','tel');

				$this.bind('keypress paste', function () {
					_mascara(this, maskxFunc);
					$this.removeClass('is-empty');
				});
				$this.bind('blur', function () {
					if ($this.val() === '') {
						$this.addClass('is-empty');
					}
				});
			}
		});
	};

    $.fn.maskx = plugin;
    $.maskx = plugin;

	plugin.defaults = {
		maskx: '',
		classEmpty: 'is-empty'
	};
	plugin.cc = function (v) {
		v = String(v || '');
		v = v.replace(/\D/g, "");
		v = v.replace(/^(\d{4})(\d)/g, "$1 $2");
		v = v.replace(/^(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3");
		v = v.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3 $4");
		return v;
	};
	plugin.cep = function (v) {
		v = String(v || '');
		v = v.replace(/\D/g, "");
		v = v.replace(/^(\d{5})(\d)/, "$1-$2");
		return v;
	};
	plugin.cnpj = function (v) {
		v = String(v || '');
		v = v.replace(/\D/g, "");
		v = v.replace(/^(\d{2})(\d)/, "$1.$2");
		v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
		v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
		v = v.replace(/(\d{4})(\d)/, "$1-$2");
		return v;
	};
	plugin.cpf = function (v) {
		v = String(v || '');
		v = v.replace(/\D/g, "");
		v = v.replace(/(\d{3})(\d)/, "$1.$2");
		v = v.replace(/(\d{3})(\d)/, "$1.$2");
		v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
		return v;
	};
	plugin.dateBR = function (v) {
		v = String(v || '');
		v = v.replace(/\D/g, "");
		v = v.replace(/(\d{2})(\d)/, "$1/$2");
		v = v.replace(/(\d{2})(\d)/, "$1/$2");
		v = v.replace(/(\d{2})(\d{2})$/, "$1$2");
		return v;
	};
	plugin.hour = function (v) {
		v = String(v || '');
		v = v.replace(/\D/g, "");
		v = v.replace(/(\d{2})(\d)/, "$1h$2");
		return v;
	};
	plugin.money = function (v, input) {
		if (!input && /^\d+$/.test(v)) {
			v = parseInt(v, 10) * 100;
    	}		
		v = String(v || '');
		v = v.replace(/(\d)\.(\d{1}$)/, "$1.$20");
		v = v.replace(/\D/g, "");
		v = v.replace(/(\d)(\d{8})$/, "$1.$2");
		v = v.replace(/(\d)(\d{5})$/, "$1.$2");
		v = v.replace(/(\d)(\d{2})$/, "$1,$2");
		return v;
	};
	plugin.phone = function (v) {
		v = String(v || '');
		v = v.replace(/\D/g, "");
		v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
		v = v.replace(/(\d)(\d{4})$/, "$1-$2");
		return v;
	};
	plugin['phone-usa'] = function (v) {
		v = String(v || '');
		v = v.replace(/\D/g, "");
		v = v.replace(/^(\d{3})(\d)/g, "($1) $2");
		v = v.replace(/(\d)(\d{4})$/, "$1-$2");
		return v;
	};
	plugin.rg = function (v) {
		v = String(v || '');
		v = v.replace(/\D/g, "");
		v = v.replace(/(\d)(\d{7})$/, "$1.$2");
		v = v.replace(/(\d)(\d{4})$/, "$1.$2");
		v = v.replace(/(\d)(\d)$/, "$1-$2");
		return v;
	};
	plugin.time = function (v) {
		v = String(v || '');
		v = v.replace(/\D/g, "");
		v = v.replace(/(\d{1})(\d{2})(\d{2})/, "$1:$2.$3");
		return v;
	};
}(jQuery));
