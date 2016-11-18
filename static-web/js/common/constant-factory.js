/**
 * Created by marco.gobbi on 21/03/14.
 */
define(function (require) {
	var ConstantFactoryTypes = require("./types");

	function provide(name, opt_object, opt_objectToExportTo) {
		function exportPath(name, opt_object, opt_objectToExportTo) {
			var parts = name.split('.');
			var cur = opt_objectToExportTo || window;
			for (var part; parts.length && (part = parts.shift());) {
				if (!parts.length && opt_object) {
					cur[part] = opt_object;
				} else if (cur[part]) {
					cur = cur[part];
				} else {
					cur = cur[part] = {};
				}
			}
			return cur;
		}

		return extend(exportPath(name), opt_object);
	}

	var PROTOTYPE_FIELDS = [
		'constructor',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'toLocaleString',
		'toString',
		'valueOf'
	];

	function extend(target, var_args) {
		var key, source;
		for (var i = 1; i < arguments.length; i++) {
			source = arguments[i];
			if(!source)continue;
			for (key in source) {
				target[key] = source[key];
			}
			// For IE the for-in-loop does not contain any properties that are not
			// enumerable on the prototype object (for example isPrototypeOf from
			// Object.prototype) and it will also not include 'replace' on objects that
			// extend String and change 'replace' (not that it is common for anyone to
			// extend anything except Object).
			for (var j = 0; j < PROTOTYPE_FIELDS.length; j++) {
				key = PROTOTYPE_FIELDS[j];
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}
		return target;
	};
	return {
		Type: ConstantFactoryTypes,
		provide: provide,
		extend: extend
	};
});