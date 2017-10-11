var Step3 = {
    is_submitted: '0',

    cards_no_regular: "",

    init: function() {
        $('input[name="cardtype"], select[name="cardtype"]').change(function(e) {
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
                }else {
                    $('#card-scode .help').show();
                    $('#card-scode .help.amex').hide();
                }

                var card_length = Step3.card_length(card_type);
                var card_cvv_length = Step3.card_cvv_length(card_type);
                $('#cardnumber').attr('maxlength', card_length);
                $('#scode').attr('maxlength', card_cvv_length);
                help = $('#card-scode .help').html().replace(/(\d{1})/, card_cvv_length);
                $('#card-scode .help').html(help)

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
            if (Step3.card_hasalias(Step3.card_type) == 1 && Step3.modal_save_card == '1') {
                $.get(
                    Step3.can_save_card_url,
                    function(data) {
                        if (data.status == 'ok') {
                            e.preventDefault();
                            $.nmManual(Step3.modal_save_card_url);
                        }
                    }
                );
            }
        });
    },

    submit: function() {
        // Check form when submitting
        $('form').submit(function() {
            DntErrors.resetErrors();
            if (!Step3.check($(this).data('scope'))) {
                return false;
            }
        });
        $('form#form-card').submit(function() {
            DntErrors.resetErrors();
            if (!Step3.cardCheck()) {
                return false;
            }

            // Prevent double submit
            if (Step3.is_submitted == '0') {
                Step3.is_submitted = '1';
            } else {
                return false;
            }
        });

        $('form#form-paypal').submit(function() {
            DntErrors.resetErrors();
            if (!Step3.check('paypal')) {
                return false;
            }

            // Prevent double submit
            if (Step3.is_submitted == '0') {
                Step3.is_submitted = '1';
            } else {
                return false;
            }
        });
    },

    // Check card
    cardCheck: function() {
        // Get params
        var card_type_radio = $('input[name="cardtype"]').length;
        var card_type_select = $('select[name="cardtype"]').length;

        if (card_type_radio == 0 && card_type_select == 1) {
            var card_type = $('select[name="cardtype"] option:selected').val();
        } else if (card_type_radio >= 1 && card_type_select == 0) {
            var card_type = $('input[name="cardtype"]:checked').val();
        }

        var card_number = $('#cardnumber').val();
        var scode = $('#scode').val();
        var card_month = $('#cardmonth').val();
        var card_year = $('#cardyear').val();

        var card_length = Step3.card_length(card_type);
        var card_cvv_length = Step3.card_cvv_length(card_type);

        // Prevent submitting the form if bad values
        var ok = true;
        if (card_type == undefined || card_type == '') {
            DntErrors.addError('cardtype');
            ok = false;
        } else {
            DntErrors.removeError('cardtype');
        }
        if (card_number.length != card_length) {
            DntErrors.addError('cardnumber');
            ok = false;
        } else {
            DntErrors.removeError('cardnumber');
        }
        if (card_month == undefined || card_month == '') {
            DntErrors.addError('cardmonth');
            ok = false;
        } else {
            DntErrors.removeError('cardmonth');
        }
        if (card_year == undefined || card_year == '') {
            DntErrors.addError('cardyear');
            ok = false;
        } else {
            DntErrors.removeError('cardyear');
        }

        // Validiter de la carte
        card_date = new Date(card_year, parseInt(card_month));
        now = new Date();
        if (card_date instanceof Date && isFinite(card_date)) {
            if (card_date < now) {
                DntErrors.addError('cardyear');
                DntErrors.addError('cardmonth');
                ok = false;
            } else {
                DntErrors.removeError('cardyear');
                DntErrors.removeError('cardmonth');
            }
        }

        if (scode.length != card_cvv_length) {
            DntErrors.addError('cardscode');
            ok = false;
        } else {
            DntErrors.removeError('cardscode');
        }

        if (!Common.check_qualification('card')) ok = false;

        DntErrors.displayErrors();

        return ok;
    },

    // General check
    check: function(scope) {
        var ok = true;

        if (!Common.check_qualification(scope)) ok = false;

        DntErrors.displayErrors();

        return ok;
    },

    card_length: function(card_type) {
        return parseInt(eval('Step3.cards_'+card_type+'_length'));
    },
    card_cvv_length: function(card_type) {
        return parseInt(eval('Step3.cards_'+card_type+'_cvvlength'));
    },
    card_hasalias: function(card_type) {
        return parseInt(eval('Step3.cards_'+card_type+'_hasalias'));
    },

    regularFrequenciesHide: function() {
        $('#regular-frequencies').hide();
    },
    regularFrequenciesShow: function() {
        $('#regular-frequencies').show();
    },

    hidePaymentModes: function hidePaymentModes(frequency) {
        if (frequency != 'once' && frequency != 'regular') return;

        var str = 'payment_modes_' + frequency;
        var elt = $('#' + str).detach();

        if (Step1[str].length == 0) {
            Step1[str] = elt;
        }
    },

    showPaymentModes: function showPaymentModes(frequency) {
        if (frequency != 'once' && frequency != 'regular') return;

        var str = 'payment_modes_' + frequency;
        $('.payment').append(Step1[str]);
        $('#' + str).show();
    },

    select: function (selector){
        if(typeof Step1 != 'undefined'){
            if(typeof selector == "undefined" || selector == "") return Step1['payment_modes_regular'].add(Step1['payment_modes_once']);
            return $(selector,Step1['payment_modes_regular']).add(selector,Step1['payment_modes_once']);
        }else{
            return $('.payment '+selector);
        }
    },

    regularBlocksHide:function() {
        $('.regularblock').hide();
    },
    regularBlocksShow:function() {
        $('.regularblock').show();
    },
    onceBlocksHide:function() {
        $('.onceblock').hide();
    },
    onceBlocksShow:function() {
        $('.onceblock').show();
    }
};
