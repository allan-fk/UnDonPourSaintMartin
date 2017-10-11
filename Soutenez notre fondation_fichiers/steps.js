var Steps = {
    is_submitted: '0',

    adapted_height: false,

    init: function() {
        Steps.adaptHeight();

        var stepinfo1_height = $('#step-1 .step-info').height();
        var stepinfo2_height = $('#step-2 .step-info').height();
        var stepinfo3_height = $('#step-3 .step-info').height();
        var max_height = Math.max(stepinfo1_height, stepinfo2_height, stepinfo3_height);
        $('.step-info').height(max_height);

        Step3.select('input[name="cardtype"], select[name="cardtype"]').change(function(e) {
            if ($(this).is('input')) {
                var card_type = $('input[name="cardtype"]:checked').val();
            } else {
                var card_type = $('select[name="cardtype"] option:selected').val();
            }
            Step3.card_type = card_type;

            // Adapt constraints for that card_type
            if (card_type != '') {
                if(card_type == 'amex'){
                    $('#card-scode .help').hide();
                    $('#card-scode .help.amex').show();
                }else{
                    $('#card-scode .help').show();
                    $('#card-scode .help.amex').hide();
                }

                var card_length = Step3.card_length(card_type);
                var card_cvv_length = Step3.card_cvv_length(card_type);
                $('#cardnumber').attr('maxlength', card_length);
                $('#scode').attr('maxlength', card_cvv_length);
                help = $('#card-scode .help').first().html().replace(/(\d{1})/, card_cvv_length);
                $('#card-scode .help').first().html(help);

                if (card_cvv_length == 0) {
                    $('#card-scode, .step-content #or, .step-content #regular').hide();
                } else {
                    $('#card-scode, .step-content #or, .step-content #regular').show();
                }
            }

            // Alert and Modal qualification
            if (Step3.alert_msg != '') {
                alert(Step3.alert_msg);
            } else if (Step3.modal_qualif == '1') {
                e.preventDefault();
                $.nmManual(Step3.modal_qualif_url);
            }
        });

        $('select[name=cardyear]').blur(function(e) {
            // Save card?
            if (Step3.card_hasalias(Step3.card_type) == 1 &&
                Step3.modal_save_card == '1' &&
                Step1.onceAmountSelected()) {

                e.preventDefault();
                $.nmManual(Step3.modal_save_card_url);
            }
        });
    },

    submit: function() {
        // Set the scope attribute of the form for the form validation
        $('.payment-submit input').click(function() {
            $('#form-steps').data('scope', $(this).data('scope'));
        });

        $('#form-steps').submit(function() {
            DntErrors.resetErrors();

            valid = true;
            if (!Step1.check()) {
                valid = false;
            }
            if (!Step2.check()) {
                valid = false;
            }

            if ($(this).data('scope') == 'card'){
                if (!Step3.cardCheck()) {
                    valid = false;
                }
            }else{
                if (!Step3.check($(this).data('scope'))) {
                    valid = false;
                }
            }

            if (valid == false) {
                return false;
            }

            // Prevent double submit
            if (Steps.is_submitted == '0') {
                Steps.is_submitted = '1';
            } else {
                return false;
            }
        });
    },

    adaptHeight: function() {
        // Adapt heights
		if(!Steps.adapted_height){
			$('#step-1 .step-content').children().wrapAll('<div class="height_adaptor"></div>');
			$('#step-2 .step-content').children().wrapAll('<div class="height_adaptor"></div>');
			$('#step-3 .step-content').children().wrapAll('<div class="height_adaptor"></div>');
			$(window).load(Steps.adaptHeight);
		}
        Steps.adapted_height = true;

        var step1_height = $('#step-1 .height_adaptor').height();
        var step2_height = $('#step-2 .height_adaptor').height();
        var step3_height = $('#step-3 .height_adaptor').height();
        var max_height = Math.max(step1_height, step2_height, step3_height);
		max_height += 50;

        $('.step-content').height(max_height);
    },

	number_format: function(number, decimals, dec_point, thousands_sep) {
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
		var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		sep = (typeof thousands_sep !== 'undefined') ? thousands_sep : (dec=='.') ? ',':' ',
		s = '',
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	}

};
