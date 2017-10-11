function fdfInitPaiement(){

	if(typeof Step3 != 'undefined'){

		$('#step-3 .height_adaptor').unwrap('.step-content');
		Step3.select('#card-number, #card-expiry, #card-scode, #card-submit').each(function(index, el) {
			$(this).siblings('#card-type').append($(this));	
		});

		Step3.select('#check-submit').wrap('<fieldset id="cheque"></fieldset>');
		
		//if carte #card-type
		if(Step3.select('#card-type').length > 0) {
			Step3.select('#card-type').before('<div id="button-card-type" class="paiement-item col-md-3 col-sm-6 col-xs-6 pam"><label class="wrap_amount selectBox verti"><span class="cb"><span>Carte Bancaire</span><label class="custom"><span><span></span></span></label></span></label></div>');
		}
			//<div id="button-card-type" class="paiement-item col-md-3 col-sm-6 col-xs-6 pam"><div class="selectBox verti"><div><input type="radio" name="paiement" value="card-type"></div><div class="cb">Carte Bancaire</div></div></div>
		
		//if paypal #paypal
		if(Step3.select('#paypal').length > 0) {
			Step3.select('#paypal').before('<div id="button-paypal" class="paiement-item col-md-3 col-sm-6 col-xs-6 pam"><label class="wrap_amount selectBox verti"><span class="pp"><span>PayPal</span><label class="custom"><span><span></span></span></label></span></label></div>');
			Step3.select('#paypal h4').hide();
			Step3.select('#paypal input[type=image][name=paypal_submit]').attr('src','https://libs.iraiser.eu/users/fdf/validation.png');
			
			/*
			if($('#ogone-pm input[type=image][name=ogone_ext_submit]').length > 0){
				var img = $('#ogone-pm input[type=image][name=ogone_ext_submit]').attr('src')
				Step3.select('#paypal input[type=image][name=paypal_submit]').attr('src','https://libs.iraiser.eu/users/fdf/validation.png');
			}
			*/
		}
					//<div id="button-paypal" class="paiement-item col-md-3 col-sm-6 col-xs-6 pam"><div class="selectBox verti"><div><input type="radio" name="paiement" value="paypal"></div><div class="pp">PayPal</div></div></div>
		
		//if iban #iban
		if(Step3.select('#iban').length > 0) {
			Step3.select('#iban').before('<div id="button-iban" class="paiement-item col-md-3 col-sm-6 col-xs-6 pam"><label class="wrap_amount selectBox verti"><span class="rb"><span>Rib</span><label class="custom"><span><span></span></span></label></span></label></div>');
		}
			//<div id="button-iban" class="paiement-item col-md-3 col-sm-6 col-xs-6 pam"><div class="selectBox verti"><div><input type="radio" name="paiement" value="iban"></div><div class="rb">Rib</div></div></div>

		//if cheque #check-submit
		if(Step3.select('#check-submit').length > 0) {
			Step3.select('#cheque').before('<div id="button-cheque" class="paiement-item col-md-3 col-sm-6 col-xs-6 pam"><label class="wrap_amount selectBox verti"><span class="ch"><span>Chèque</span><label class="custom"><span><span></span></span></label></span></label></div>');
		}
		
		//if #ddebit-submit
		if(Step3.select('#ddebit-submit').length > 0) {
			Step3.select('#ddebit-submit').before('<div id="button-pa" class="paiement-item col-md-3 col-sm-6 col-xs-6 pam"><label class="wrap_amount selectBox verti"><span class="rb"><span>Prélèvement</span><label class="custom"><span><span></span></span></label></span></label></div>');
			Step3.select('#ddebit-submit').wrap('<fieldset id="pa"></fieldset');
		}
		
		//if ogone #ogone-pm
		if(Step3.select('#ogone-pm').length > 0) {
			$('#ogone-pm input[name=pm]').each(function(){
					var data_pm = $(this).val().replace('Paylib','Paylib#Paylib');
					var pm = $(this).val().replace('CreditCard','CB').toLowerCase();
					var pm_name = $(this).val().replace('CreditCard','Carte Bancaire');
					Step3.select('#ogone-pm').before('<div id="button-ogone-pm_'+pm+'" data-pm="'+data_pm+'" class="paiement-item col-md-3 col-sm-6 col-xs-6 pam"><label class="wrap_amount selectBox verti"><span class="'+pm+'"><span>'+pm_name+'</span><label class="custom"><span><span></span></span></label></span></label></div>');		
				});
			Step3.select('#ogone-pm h4').hide();
			Step3.select('#ogone-pm').append('<input type="hidden" name="pm" ></input>');
			Step3.select('#ogone-pm ul').remove();
		}
		
		$('#button-ogone-pm_paylib',Step1['payment_modes_regular']).remove();
		
		//if 
		if($('.paiement-item.spacer').length <= 0){
			$(Step1['payment_modes_regular']).prepend('<div class="paiement-item clearfix"></div>');
			$(Step1['payment_modes_once']).prepend('<div class="paiement-item clearfix"></div>');
		}

		Step3.select('.paiement-item').each(function(index, el) {
			$(this).siblings('.paiement-item.clearfix').before($(this));

		});
		
		Step3.select('fieldset').hide();
		
		$('#security-info').hide();

		
	}
}
function togglePaiement(){
	if(typeof Step3 != 'undefined'){
		Step3.select('.paiement-item').each(function(index, el) {
			var myID = $(this).attr('id');
			myID = String(myID).replace('button-','');
		});

		Step3.select('.paiement-item').click(function(event) {
			$('.paiement-item .selectBox').removeClass('selected');
			$(this).find('.selectBox').addClass('selected');
			var myID = $(this).attr('id');
			myID = String(myID).replace('button-','');
			if(myID.indexOf('_')>0) myID = myID.substring(0,myID.indexOf('_'));
			$('.payment fieldset').hide();
			$('#'+myID).show();
			if(myID == 'ogone-pm'){
				var pm = $(this).attr('data-pm');
				$('#'+myID+' input[name=pm]').val(pm);
			}
		});
	}
}
function fdfPaiement(){
	fdfInitPaiement();
	togglePaiement();
	if(typeof Step3 != 'undefined'){
		//$('body').bind('change_amount', togglePaiement);

		$('#step-3').removeClass('unit').removeClass('size1of3').removeClass('lastUnit').addClass('col-md-12 col-sm-12 col-xs-12 boxl mt').appendTo('#colG');
		
		var titreReglementIsRecap = $('body').data('titre-reglement-is-recap');
	    if (typeof titreReglementIsRecap == 'undefined'){ titreReglementIsRecap = $('#step-3 .step-title h2').text();};

		$('#step-3 .step-title').html('<h2>'+titreReglementIsRecap+'</h2>').insertBefore('#step-3').addClass('col-md-12 col-sm-12 col-xs-12 mt');

	}

}



