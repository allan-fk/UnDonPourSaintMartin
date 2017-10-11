var Step1 = {

    max_height: '',
    min_once_amount: '',
    max_once_amount: '',
    min_regular_amount: '',
    max_regular_amount: '',
    adapted_height: false,
    lang: 'fr_FR',
    payment_modes_once : {},
    payment_modes_regular : {},
    current_donation : '',

    // Init elements of the form
    init: function() {
        Step1.lang = $('html').attr('lang');

        Step1.hideReductionInfo();
        Step1.initValues();
        Step1.current_donation = Step1.getDonation();

        // Attach events to elements
        var famount_once = $('#famount-once');
        var famount_regular = $('#famount-regular');
        var amount_once = $('#once input[type="radio"]');
        var amount_regular = $('#regular input[type="radio"]');

        var change_amount = $.Event( "change_amount" );

        function set_donation(elem){
            Step1.hideReductionInfo();
            var id_elem = elem.attr('id');
            $('#step-1 [id^=famount-], #step-1 [id^=amount-]').each(function(){
                if($(this).attr('id') != id_elem){
                    if($(this).attr('type') == 'text') $(this).val('');
                    else{
                        $(this).removeAttr("selected");
                        $(this).attr('checked',false);
                    }
                }
            });
            var donation = Step1.getDonation();
            var frequency = donation.frequency;
            if (frequency == 'once') {
                if (typeof Step3 != 'undefined') {
                    Step3.showPaymentModes('once');
                    Step3.hidePaymentModes('regular');
                    Step3.regularFrequenciesHide();
                }
                Step1.regularBlocksHide();
                Step1.onceBlocksShow();
            } else {
                if (typeof Step3 != 'undefined') {
                    Step3.showPaymentModes('regular');
                    Step3.hidePaymentModes('once');
                    Step3.regularFrequenciesShow();
                }
                Step1.regularBlocksShow();
                Step1.onceBlocksHide();
            }

            Step1.showReductionInfo(donation.amount, frequency);
            Step1.adaptHeight();

            if(Step1.current_donation.frequency != donation.frequency || Step1.current_donation.amount != donation.amount)
                $('body').trigger(change_amount);

            Step1.current_donation = donation;
        }

        famount_once.change(function() {
            set_donation($(this));
        });
        famount_once.keyup(function() {
            setTimeout(function(){}, 100);
            set_donation($(this));
        });
        famount_regular.change(function() {
            set_donation($(this));
        });
        famount_regular.keyup(function() {
            setTimeout(function(){}, 100);
            set_donation($(this));
        });
        amount_once.click(function() {
            set_donation($(this));
        });

        amount_regular.click(function() {
            set_donation($(this));
        });

        $("#famount-once, #famount-regular").irPriceInput({'decimal_sep': Step1.decimal_sep});

        try{
            var donation = Step1.getDonation();

            if (typeof Step3 != 'undefined') {
                Step1.payment_modes_once = $('#payment_modes_once').detach();
                Step1.payment_modes_regular = $('#payment_modes_regular').detach();
                Step3.showPaymentModes(donation.frequency);
            }

            if(donation && typeof(donation)!= 'undefined' && donation.amount>0){
                set_donation(donation.element);
            }

            $('form#form-steps').append('<input type="hidden" name="private_stats_config" />');
            $('input[name=private_stats_config]').val(JSON.stringify(Step1.get_user_params()));

        }catch(err){}
    },

    get_user_params: function(){
        var e=0,t=0;
        var ratio = window.devicePixelRatio || 1;
        try{
            "number"==typeof window.innerWidth?(e=window.innerWidth,t=window.innerHeight):document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)?(e=document.documentElement.clientWidth,t=document.documentElement.clientHeight):document.body&&(document.body.clientWidth||document.body.clientHeight)&&(e=document.body.clientWidth,t=document.body.clientHeight)
        }catch(n){console.log(n.message)}
        var i=  {
            "visitor_resolution_width":screen.width * ratio,
            "visitor_resolution_height":screen.height * ratio,
            "visitor_color":screen.colorDepth,
            "window_width":e,
            "window_height":t
        };
        return i
    },

    submit: function() {
        // Check form when submitting
        $('#form-steps').submit(function() {
            if (!Step1.check()) {
                return false;
            }
        });
    },

    // Check form
    check: function() {
        var donation = Step1.getDonation();

        // Check amount
        var ok = true;
        if (donation.amount == 0) {
            DntErrors.addError('choose_amount');
            ok = false;
        } else {
            DntErrors.removeError('choose_amount');
        }
        var min_amount = Step1.min_once_amount * 100;
        var max_amount = Step1.max_once_amount * 100;
        if (donation.frequency == 'regular') {
            min_amount = Step1.min_regular_amount * 100;
            max_amount = Step1.max_regular_amount * 100;
        }

        DntErrors.removeError('min_once_amount');
        DntErrors.removeError('min_regular_amount');

        if (min_amount != '' && donation.amount < min_amount) {
            DntErrors.addError('min_' + donation.frequency +'_amount');
            ok = false;
        }
        DntErrors.removeError('max_once_amount');
        DntErrors.removeError('max_regular_amount');
        if (max_amount != '' && donation.amount > max_amount) {
            DntErrors.addError('max_'+ donation.frequency +'_amount');
            ok = false;
        }

        if (!Common.check_qualification('step1')) ok = false;

        if (ok == false) {
            DntErrors.displayErrors();
        }

        return ok;
    },

    unCheckRadio: function(frequency) {
        var selector = '';
        if (frequency != '') {
            selector+= '#'+ frequency;
        }
        selector+= ' input[type="radio"]';
        $(selector).each(function() {
            this.checked = false;
        });
    },

    hideReductionInfo: function() {
        if (Step1.active_tax_reduction == 0) return;
        $('p.tax-info').hide();
		Step1.adaptHeight();
    },

    showReductionInfo: function(value, frequency) {
        var body_id = $('body').attr('id');

        if (Step1.active_tax_reduction == 0 || value == 0) return;

        if (frequency == 'regular') {
            value*= 12;
        }

		var tax_text = '';
        if (value > 0 && value != '') {
            var company = $('#company').val();
			var is_company = $('#iscompany').prop('checked');

            // Calculate reduction
            var tax_info = Step1.tax_info;
			var tax_notice='';

			var real_value;
            var deduction;
            var real_values = {"ir":0,"isf":0,"corp":0,"custom1":0,"custom2":0};
            var deductions = {"ir":0,"isf":0,"corp":0,"custom1":0,"custom2":0};
            for(var key in real_values){
                real_values[key] = Step1.computeReduction(value,
                    Step1.tax_reduction_rates[key],
                    Step1.tax_reduction_ceils[key],
                    Step1.tax_reduction_triggers[key]);
                deductions[key] = value/100-real_values[key];
                if (frequency == 'regular') {
                    real_values[key] /= 12;
                    deductions[key] /= 12;
                }
            }
            if ((body_id == 'type-b' || body_id == 'type-c')
				&& is_company) {
				// Company
                if(Step1.tax_reduction_notices["corp"]!='') tax_notice=' '+Step1.tax_reduction_notices["corp"];
                real_value = real_values["corp"];
				deduction = deductions["corp"];
            } else {
				// Individual
                if (Step1.is_french_isf == 1) {
					if(Step1.tax_reduction_notices["isf"]!='') tax_notice=' '+Step1.tax_reduction_notices["isf"];
					real_value = real_values["isf"];
					deduction = deductions["isf"];
                } else {
					if(Step1.tax_reduction_notices["ir"]!='') tax_notice=' '+Step1.tax_reduction_notices["ir"];
					real_value = real_values["ir"];
					deduction = deductions["ir"];
                }
            }

			if(!isNaN(deduction) && !isNaN(real_value) && deduction>0){
				tax_text = tax_info.replace(
                        '[notice]',
                        tax_notice
                    ).replace(
                        /\[(amount|deduction) ([^\]]*)\]/g,function(match,$1,$2){
                            if($1=='amount')
                                return Steps.number_format(real_values[$2],2,Step1.decimal_sep).replace(Step1.decimal_sep+"00","")
                            else
                                return Steps.number_format(deductions[$2],2,Step1.decimal_sep).replace(Step1.decimal_sep+"00","")
                        }
                    ).replace(
					'%s',
                        Steps.number_format(real_value,2,Step1.decimal_sep).replace(Step1.decimal_sep+"00","")
                    ).replace(
					'%d',
                        Steps.number_format(deduction,2,Step1.decimal_sep).replace(Step1.decimal_sep+"00","")
                    );
			}
        }
		$('#' + frequency + ' p.tax-info').html(tax_text).show();
        Step1.adaptHeight();
    },

    initValues: function(amount) {
        var amount = amount || $.parseJSON($.cookie('dnt_amount'));
        var result = null;
        $('input[id^=famount-]').val('');
        $('input[id^=amount-]').attr('checked', false);
        if(!amount) return null;
        try {
            if (amount != null && amount.amount != undefined && amount.frequency != undefined) {
                var amounts = $('input[name="amount-' + amount.frequency + '"]').each(function () {
                    var amt = $(this).val();
                    if (amt == amount.amount) {
                        result = $('input#amount-' + amount.frequency + '-' + amt).attr('checked', 'checked');
                        result.click();
                        Step1.showReductionInfo(amt, amount.frequency);
                    }
                });
            }
            if (result) return result;
            result = $('input#famount-' + amount.frequency);
            if (amount.amount < 100) {
                amount.amount = 0;
            }
            result.val(String(amount.amount / 100).replace('.', Step1.decimal_sep));
            result.irPriceInput({'decimal_sep': Step1.decimal_sep});
            result.keyup();
            Step1.showReductionInfo(amount.amount, amount.frequency);
        }catch(err){}
        return result;
    },

    // Adapt height of both pricelist
    adaptHeight: function() {
		if(Step1.adapt_tax_bloc){
			if(!Step1.adapted_height){
				$('#once').children().wrapAll('<div id="adapt_once"></div>');
				$('#regular').children().wrapAll('<div id="adapt_regular"></div>');
			}
			Step1.adapted_height = true;
			Step1.max_height = Math.max($('#adapt_once').height(), $('#adapt_regular').height());
			$('#once').height(Step1.max_height);
			$('#regular').height(Step1.max_height);
		}

        var body_id = $('body').attr('id');
        if (body_id == 'type-b' || body_id == 'type-c') {
            Steps.adaptHeight();
        }
    },

    getDonation: function() {
        var famount_once_element = $('#famount-once');
        var famount_regular_element = $('#famount-regular');
        var amount_once_element = $('#once input[type="radio"]:checked');
        var amount_regular_element = $('#regular input[type="radio"]:checked');

        var famount_once = famount_once_element.val();
        var famount_regular = famount_regular_element.val();
        var amount_once = amount_once_element.val();
        var amount_regular = amount_regular_element.val();

        // Define donation
        var donation = {};
        donation.amount = 0;
        donation.frequency = $('#step-1 #regular,#step-1 #once').first().attr('id');
        if(donation.frequency == 'once') donation.element = famount_once_element;
        else donation.element = famount_regular_element;

        if (famount_once == undefined && famount_regular == '') {
            donation.frequency = 'regular';
            donation.element = famount_regular_element;
        }
        if (amount_once != undefined) {
            donation.amount = amount_once;
            donation.frequency = 'once';
            donation.element = amount_once_element;
        } else if (famount_once != '' && famount_once != undefined) {
            donation.amount = parseFloat(famount_once.replace(',', '.')) * 100;
            donation.frequency = 'once';
            donation.element = famount_once_element;
        } else if (amount_regular != undefined) {
            donation.amount = amount_regular;
            donation.frequency = 'regular';
            donation.element = amount_regular_element;
        } else if (famount_regular != '' && famount_regular != undefined) {
            donation.amount = parseFloat(famount_regular.replace(',', '.')) * 100;
            donation.frequency = 'regular';
            donation.element = famount_regular_element;
        }
        return donation;
    },

    computeReduction: function(value, rates, ceils, trigger) {
		if(value<trigger*100) return value/100;
        //console.log(value, rates, ceils, trigger);
		var deduction = 0;
		var remain = value;
		var last_ceil = 0;
		for(var i=0;i<rates.length;i++){
			var amount = remain;
			if(ceils.length>i && ceils[i]>0) amount = Math.min(remain,ceils[i]*100-last_ceil*100);
			deduction += amount*rates[i]/100;
			remain -= amount;
			last_ceil = ceils[i];
		}
        //console.log(deduction);
		deduction = Math.round(deduction/100)*100;
		return (value-deduction)/100;
    },

    onceAmountSelected: function onceAmountSelected() {
        var donation = Step1.getDonation();
        return (donation.frequency == 'once');
    },

    regularBlocksHide:function() {
        $('.regularblock').hide();
        $('.regularblock input, .regularblock select, .regularblock textarea').prop('disabled', true);
    },
    regularBlocksShow:function() {
        $('.regularblock').show();
        $('.regularblock input, .regularblock select, .regularblock textarea').prop('disabled', false);
    },
    onceBlocksHide:function() {
        $('.onceblock').hide();
        $('.onceblock input, .onceblock select, .onceblock textarea').prop('disabled', true);
    },
    onceBlocksShow:function() {
        $('.onceblock').show();
        $('.onceblock input, .onceblock select, .onceblock textarea').prop('disabled', false);
    }

};
