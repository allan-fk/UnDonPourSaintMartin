var Step2 = {

    init: function() {
        Step2.initValues();

        if($('#company').val() != ''){
            $('#iscompany').prop('checked',true);
            $('.company-infos').show();
        }

        Step2.refreshReductionInfo();

        $('#email').blur(function() {
            if (Step2.checkField($(this), 'email')) {
                // If email valid, insert infos on the user
                $.get(Step2.failed_dnt_url, {
                    email: $('#email').val()
                });
            }
        });
        $('#civility').blur(function() {
            Step2.checkField($(this), 'required');
        });
        $('#lastname').blur(function() {
            Step2.checkField($(this), 'required');
        });
        $('#firstname').blur(function() {
            Step2.checkField($(this), 'required');
        });
        $('#address1').blur(function() {
            Step2.checkField($(this), 'required');
        });
        $('#postcode').blur(function() {
            Step2.checkField($(this), 'required');
        });
        $('#city').blur(function() {
            Step2.checkField($(this), 'required');
        });
        $('#company').blur(function() {
            Step2.refreshReductionInfo();
        });

        $('#iscompany').change(function() {
            $('.company-infos').toggle();
            Step2.refreshReductionInfo();
            if (!$('#iscompany').prop('checked')){
                $('#company').val('');
            }
        });

        $('#country').change(function() {
            var country = $(this).val();
            if (country != 'FR') {
                $('#ddebit-submit').hide();
            } else {
                $('#ddebit-submit').show();
            }
        });
    },

    submit: function() {
        // Check form when submitting
        $('#form-steps').submit(function() {
            if (!Step2.check()) {
                return false;
            }
        });
    },

    // Check form elements (required or email)
    checkField: function(elt, type) {
        var ok = false;
        switch(type) {
            case 'required':
                if (elt.val() != '') { ok = true; }
                break;
            case 'email':
                if (Step2.isValidEmail(elt.val())) { ok = true; }
                break;
        }

        var elt_id = elt.attr('id');

        if (!ok) {
            DntErrors.addError(elt_id);
            $('#'+elt_id).removeClass('valid');
            $('#'+elt_id).addClass('error');
        } else {
            DntErrors.removeError(elt_id);
            $('#'+elt_id).removeClass('error');
            $('#'+elt_id).addClass('valid');
        }

        DntErrors.displayErrors();

        return ok;
    },

    // Check all form
    check: function(elt, type) {
        // Check all fields
        var ok = true;
        if (!Step2.checkField($('#email'), 'email')) { ok = false}
        if (!Step2.checkField($('#civility'), 'required')) { ok = false}
        if (!Step2.checkField($('#lastname'), 'required')) { ok = false}
        if (!Step2.checkField($('#firstname'), 'required')) { ok = false}
        if (!Step2.checkField($('#address1'), 'required')) { ok = false}
        if (!Step2.checkField($('#postcode'), 'required')) { ok = false}
        if (!Step2.checkField($('#city'), 'required')) { ok = false}

        if (!Common.check_qualification('step2')) ok = false;

        return ok;
    },

    // Function to check valid email address
    isValidEmail: function(email) {
        ok = (email.search(/^((\"[^\"f\n\r\t\b]+\")|([\w\!\#\$\%\&\'\*\+\-\~\/\^\`\|\{\}]+(\.[\w\!\#\$\%\&\'\*\+\-\~\/\^\`\|\{\}]+)*))@((\[(((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9])))\])|(((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9])))|((([A-Za-z0-9\-])+\.)+[A-Za-z\-]+))$/) != -1);

        if (!ok) { return false; }
        return true;
    },

    // Init values from cookie
    initValues: function() {
        var coords = $.parseJSON($.cookie('dnt_coords'));
        if (coords == null || coords.length == 0) {
            return;
        }

        if (coords.civility != undefined) {
            $('#civility').val(coords.civility);
        }
        if (coords.email != undefined) {
            $('#email').val(coords.email);
        }
        if (coords.firstname != undefined) {
            $('#firstname').val(coords.firstname.replace(/\+/gm, ' ').replace(/&amp;/, '&'));
        }
        if (coords.lastname != undefined) {
            $('#lastname').val(coords.lastname.replace(/\+/gm, ' ').replace(/&amp;/, '&'));
        }
        if (coords.company != undefined) {
            $('#company').val(coords.company.replace(/\+/gm, ' ').replace(/&amp;/, '&'));
        }
        if (coords.address1 != undefined) {
            $('#address1').val(coords.address1.replace(/\+/gm, ' ').replace(/&amp;/, '&'));
        }
        if (coords.address2 != undefined) {
            $('#address2').val(coords.address2.replace(/\+/gm, ' ').replace(/&amp;/, '&'));
        }
        if (coords.postcode != undefined) {
            $('#postcode').val(coords.postcode.replace(/\+/gm, ' ').replace(/&amp;/, '&'));
        }
        if (coords.city != undefined) {
            $('#city').val(coords.city.replace(/\+/gm, ' ').replace(/&amp;/, '&'));
        }

        // the server does not update the country in the cookie
    },

    refreshReductionInfo: function() {
        var body_id = $('body').attr('id');
        if (body_id == 'type-b' || body_id == 'type-c') {
            var donation = Step1.getDonation();
            Step1.showReductionInfo(donation.amount, donation.frequency);
        }
    }
};
