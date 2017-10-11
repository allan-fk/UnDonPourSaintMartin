/**
  * Force input of valid price format into <input type="text" /> elements
 */
(function($) {

    $.fn.irPriceInput = function(options) {

        var settings = $.extend({
            'decimal_sep': ',',
        }, options);

        this.each(function() {
            $(this).keyup(function() {
                var input = $(this).val(),
                    output;
				
				var decimal_sep = settings.decimal_sep;
                if (decimal_sep == '.') {
                    decimal_sep = "\.";
                }

                // Only [0-9] and decimal separator.
                // Prevent to start with "0"
                output = input
                    .replace(
                        /[^0-9.,]/g,
                        ''
                    )
                    .replace(/^[^1-9]+/g, '')
					.replace(/[.,]/g, decimal_sep);

                // Only 1 decimal separator
                output = output.replace(
                    /^([^,.]*)[,.]([^,.]*)[,.](.*)$/,
                    '$1$2'+decimal_sep+'$3'
                ).replace(
                    /^([0-9]+[,.][^,.]*)[,.]+.*$/,
                    '$1'
                );

                // Max 2 digits after decimal separator
                output = output.replace(
                    /^([0-9]+[,.][0-9]{2}).+$/,
                    '$1'
                );

                $(this).val(output);
            });
        });
    }

})(jQuery);