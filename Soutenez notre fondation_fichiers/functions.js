function wrapToBox(elem,direction){
	var spanLi = elem.parent('label');
	var inputId = elem.attr('id');
	spanLi.attr('for', inputId);

	spanLi.addClass('wrap_amount selectBox '+direction+'');
	spanLi.wrap('<span class="extra-wrapper"></span>');
}

function montantSelectToBox(elem,direction){
	var inputId = elem.parent('p').attr('id');
	elem.parent('p').wrapInner('<label for="'+inputId+'" class="wrap_amount selectBox '+ direction +'"></label>');
	elem.parents('p').wrapInner('<span class="extra-wrapper"></span>');	
}

function montantRadioToBox(elem,direction){
	elem.parent('label').wrapInner('<label for="" class="wrap_amount selectBox '+ direction +'"></label>');
	elem.parent('label').wrap('<span class="extra-wrapper"></span>');	
}

function selectBloc(item) {
	$('input[name="'+item+'"]').each(function(){
		if ($(this).prop("checked")){ $(this).parent().parent().addClass("selected"); } 
		else { $(this).parent().parent().removeClass("selected"); }
	});

	if (item=="amount-once" || item=="amount-regular") {
		if ($('#f'+item).val()!="") { $('#free-'+item).addClass('selected'); }
		else { $('#free-'+item).removeClass('selected'); }
	}
}
function updateStyle(){
	console.log('updateStyle()');
	$('.selectBox').each(function() {
		
		if ($(this).children(':checked').length == 1){
			$(this).addClass('selected');
		}
		
		if ($('#famount-regular').val() != ''){
			$('#famount-regular').parent('.selectBox').addClass('selected');
		}
		if ($('#famount-once').val() != ''){
			$('#famount-once').parent('.selectBox').addClass('selected');
		}
	});

	$('.selectBox').click(function(){
		var elem = $(this);
		var step = $(this).parents('#step-1, #step-2, #step-3');

		$(step).find('.selectBox').removeClass('selected');
		$(step).find('.selectBox :radio').prop('checked', false);
		$(step).find(elem).addClass('selected');
		$(step).find(elem).find(':radio').prop('checked', true);
		
	});

	$('body').trigger('change_amount');
}
function updateAffectStyle(parent , element){
	console.log('updateAffectStyle()');
	
	$(parent).find('.selectBox').removeClass('selected');
	$(parent).find(':radio').prop('checked', false);
	$(parent).find('select').prop('selected', false)

	$(element).addClass('selected');
	$(element).find(':radio').prop('checked', true);

}

function changeAmountNoaffect(){
	console.log('changeAmountNoaffect()');	
	if( typeof Step1 != 'undefined'){
		var frequency = $('input[name="frequence"]:checked').val() || 'once';
		var donation = Step1.getDonation() || {amount:0,frequency:frequency};
		var amount = donation.amount;
		
		$('#once,#regular').each(function(){$(this).toggle($(this).attr('id') == frequency);});
		donation.frequency = frequency;
		Step1.initValues(donation).click();
	}
};

function changeAmount(select){
	if (typeof select != 'undefined') {isSelectActive(select)};

	var frequency = $('input[name="frequence"]:checked').val();
	var total = getFullTotal();

	updateTotaux();

}

function catHasValue(category){
	
	var stotal = 0;
	$('p[data-section="'+category+'"]').not('.title').each(function(index, el){
		var montant = parseInt($('option:selected', this).val());
				
		if ($.isNumeric(montant)){
			stotal += montant;
		};
	});

	if (stotal > 0){
		return stotal;	
	} else {
		return false;
	};

};

function toggleReduc(){
		console.log('toggleReduc()');
		if ($('#iscompany').prop('checked')){
			
			$('.reduc_particulier').hide();
			$('.reduc_corp').show();
		}else {

			$('.reduc_particulier').show();
			$('.reduc_corp').hide();
		};

		if ( $('.ira-affectations').length >= 1 ) {

			var fullTotal = getFullTotal();

			var frequency = $('input[name="frequence"]:checked').val();
			Step1.hideReductionInfo();
			Step1.showReductionInfo(fullTotal*100,frequency);
			if ($('#iscompany').prop('checked')){
				
				$('.reduc_particulier').hide();
				$('.reduc_corp').show();
			}else {

				$('.reduc_particulier').show();
				$('.reduc_corp').hide();
			};
		}

};

function toggleSousCat(label){
	if(catHasValue($(label).parent().data('section'))){	
		return;
	}else {
		
		$(label).parent('p').next().toggle('slow');

		$(label).parent('p').toggleClass('state-active');
	};
};
function iniToggleAffect(){
	$(getAffectationsTitle()).each(function(index, el) {
		if (catHasValue($(this)[1])) {
			$('p[data-section="'+ $(this)[1]+'"].title').next().show();
			$('p[data-section="'+ $(this)[1]+'"].title').toggleClass('state-active');		
		}
	});
};

function isSelectActive(select) {
	$(select).each(function(index, el) {
		var value = parseInt($('option:selected', $(el)).val());

		if (value && !isNaN(value)){
			//console.log('->'+$('option:selected', $(el)).text());
			$(el).parents('.ira-affectations').addClass('active');

		}else {
			$(el).parents('.ira-affectations').removeClass('active');
			$('option:selected',$(el)).prop('selected', false);
		}	
	});
};

function getAffectationsTitle(){
	var listeAffectationGroup = [];
	$('#affectations p[data-category="1"]').each(function(index, el) {	
		listeAffectationGroup.push([$(this).find('label').text(),$(this).data('section')]);
	});
	/*
	$('#affectations > p[data-category="0"]').each(function(index, el) {	
		listeAffectationGroup.push([$(this).find('label').text(),'standalone_'+$(this).attr('name')]);
	});
	*/
	$('body').data('listeAffectationGroup',listeAffectationGroup);
	return listeAffectationGroup;
};

function getTotalBySousAffectation(){
	getAffectationsTitle();
	var listeAffectationGroup = $('body').data('listeAffectationGroup');
	for (affectation in listeAffectationGroup) {
		var stotal = 0;


			$('p[data-section="'+listeAffectationGroup[affectation][1]+'"]').each(function(index, el){
				var montant = parseInt($('option:selected', this).val());
				if ($.isNumeric(montant)){
					stotal += montant;
				}
			});
		$('body').data('listeAffectationGroup')[affectation].push(stotal);
	}

	return listeAffectationGroup;
};

function getFullTotal(){
	getTotalBySousAffectation();
	
	var fullTotal = 0;

	if ($('#affectations select option:selected').length > 0){
		// sous affect
		$('#affectations select option:selected').each(function(index, el) {
			var montant = parseInt($(this).val());
			if ($.isNumeric(montant)){
				fullTotal += montant;
			}
		});

	}else {
		if(typeof Step1 != 'undefined'){
			fullTotal = Step1.getDonation().amount/100;
		}
	}

	return fullTotal;
};
/* ANH
function infosPanier(){
	var panier = [];
	$('#affectations select option:selected').each(function(index, el) {
		if($(this).val() > 0){
			var panierCode = $(this).attr('name');
			var panierMontant = $(this).val();
			var panierTitle = $(this).parents('.ira-affectations').find('label').text();
			panier.push(panierCode+'||'+panierMontant+'||'+panierTitle);
		}
	});
	return panier;
}
*/	
function newGetHtmlRecap(){
	var htmlRecap = '';
	var recap = '\n';
	$('#recap .sousTotaux p').each(function(index, el) {
		recap += $(this).find('.intitule').text().replace(/(\r\n|\n|\r)/gm,'').replace(/\//g,'#');
		recap += '|';
		recap += $(this).find('input').val().trim();
		recap += '||\n';
	});
	var recapTotal = $('#recap .total .intitule').text();
		recapTotal += '|';
		recapTotal += $('#recap .total input').val();
	
	htmlRecap = recap+recapTotal;
	return htmlRecap;
}	
function getHtmlRecap(){
	var htmlRecap = '';
	var recap = '\n';
	$('#recap .sousTotaux p').each(function(index, el) {
		recap += $(this).find('.intitule').text().replace(/(\r\n|\n|\r)/gm,'').replace(/\//g,'#');
		recap += '|';
		recap += $(this).find('input').val().trim();
		recap += '||\n';
	});
	var recapTotal = $('#recap .total .intitule').text();
		recapTotal += '|';
		recapTotal += $('#recap .total input').val();
	
	htmlRecap = recap+recapTotal;
	return htmlRecap;
}
function updateTotaux(){
	console.log('updateTotaux');
	var fullTotal = getFullTotal();
	$('#recap .sousTotaux').empty();
	$('.tax-info').empty();
	$('#private_panier').val();

	var totaux = $('body').data('listeAffectationGroup');
	if (totaux.length <1) {
		$('[data-category=0] :selected').each(function(index, el) {
			if($(this).val() > 0 ){
				$('#recap .sousTotaux').append('<p class="no-parent"><label><span class="intitule"><span>'+$(this).parent().siblings('label').text().trim()+'</span></span><input type="text" disabled=disabled value="'+$(this).val()+'"><span class="devise">&euro;</span></label></p>');
			}
		});
	}else {
		for (total in totaux) {
			if (totaux[total][2] != 0) {
				
				var sousCat = '';
				$('[data-section='+totaux[total][1]+'][data-category=0] :selected').each(function(index, el) {
					if($(this).val() > 0 ){
						sousCat += '/ '+$(this).parent().siblings('label').text();
					}
				});

				$('#recap .sousTotaux').append('<p class=""><label><span class="intitule"><span class="upper">'+totaux[total][0]+'</span> '+sousCat+'</span><input type="text" disabled=disabled value="'+totaux[total][2]+'"><span class="devise">&euro;</span></label></p>');
				
			};
		};
	};

	$('#recap p.total input').val(fullTotal);

	var frequency = $('input[name="frequence"]:checked').val();
	
	if (frequency == 'once') {
        if (typeof Step3 != 'undefined') {
            Step3.showPaymentModes('once');
            Step3.hidePaymentModes('regular');
            $('#famount-regular').val('');
            $('#famount-once').val(getFullTotal())
        }
    } else {
        if (typeof Step3 != 'undefined') {
            Step3.showPaymentModes('regular');
            Step3.hidePaymentModes('once');
        	$('#famount-once').val('');
        	$('#famount-regular').val(getFullTotal());
        }
    }

	$('#recap').append($('#once'));
	$('#recap').append($('#regular'));
	$('#reserved_private_panier').val(getHtmlRecap());

	toggleReduc();
	$('body').trigger('change_amount');
	updateSynchroMulti();
	basket();

};

function prefillReserved(){
	$('select[name*="reserved_NETFUL_"]').each(function(index, el) {
			$(this).find('option').prop('selected', false);
			$(this).find('option').removeAttr('selected');
	});
};

function customSelect(elem){
	if(typeof elem != 'undefined'){

	}

	$('select[name*="reserved_NETFUL_"]').addClass('cs-select cs-skin-border');
	
	$('#monoAff select:visible').addClass('cs-select cs-skin-border');
	
	if( typeof Step3 != 'undefined') {
	Step3.select('#card').addClass('cs-select cs-skin-border');
	Step3.select('select[name="cardmonth"]').addClass('cs-select cs-skin-border');
	Step3.select('select[name="cardyear"]').addClass('cs-select cs-skin-border');
		(function() {
			[].slice.call( $('#monoAff select.cs-select')).forEach( function(el) {	
				new SelectFx(el);
			} );
		})();

		(function() {
			[].slice.call( $('#step-2 select.cs-select')).forEach( function(el) {	
				new SelectFx(el);
			} );
		})();

		(function() {
			[].slice.call( Step3.select('select.cs-select')).forEach( function(el) {	
				new SelectFx(el);
			} );
		})();
	}
}

function customInputRadio(){
	//radio button
	//$('.selectBox input').after('<label class="custom"><span><span></span></span></label>');

	$('.selectBox input').after(function(){
		return '<label class="custom" for="'+$(this).attr('id')+'"><span><span></span></span></label>';
	});
	$('.ira-frequence input').after('<label class="custom"><span><span></span></span></label>');

	$('.selectBox select').after('<label class="custom"><span><span></span></span></label>');
}

function emailCheck(){
	$('#emailC').blur(function() {
			Step2.checkField($(this), 'required');
	 });

	$( "#emailC" ).blur(function() {
		if ($(this).hasClass("valid")){
			
			var checkValidimg=('<img alt="checkValid" src="https://libs.iraiser.eu/users/fdf/valid.jpg" class="checkValid"/>');
			$(this).after(checkValidimg);
		}
		if ( $('#emailC').val() != $('#email').val()){
			$('#emailC').val('');
			$('#emailC').addClass('error');
			$(this).nextAll().remove();
		}
	});
}

function checkValid(){
	$('#step-2 p.form-group input').blur(function() {
		if ($(this).hasClass("valid")){
			var checkValidimg=('<img alt="checkValid" src="https://libs.iraiser.eu/users/fdf/valid.jpg" class="checkValid"/>');
			$(this).after(checkValidimg);
		} else{
			$(this).addClass('error');
			$(this).parent('p').find('.warning').show();
			var thisId = $(this).attr('id');
			$(this).after('<span></span>');
			$(this).nextAll().remove();
		}
	 });
}

function resetValid(){
	$('#step-2 .form-group input').each(function() {
		if ($(this).hasClass('error')){
			$(this).removeClass('error');
			$(this).parent('p').find('.warning').hide();
		}
		else {
			$(this).removeClass('valid');
			$('.checkValid').remove();
		}
	 });
}

function prefixeTitle(){
	$('#colG h2').each(function(index, el) {

	});
}


function updateSynchroMulti(){
	var reserved_ALIZE_amount = '';
	var reserved_ALIZE_affectations = '';
	$('#affectations select :selected').each(function(index, el) {
		if($(this).val() == '' || $(this).val() <= 0){return;}

		//console.log(' BIM '+$(this).val());
		//console.log(' BIM '+$(this).parent('select').attr('name'));
		
		var stringAffectation = $(this).parent('select').attr('name');
		var n = stringAffectation.lastIndexOf('_');

		if (reserved_ALIZE_amount == ''){
			reserved_ALIZE_amount += $.trim($(this).val()*100);
			reserved_ALIZE_affectations += stringAffectation.substr(n+1);
		}
		else {
			reserved_ALIZE_amount += '#'+$.trim($(this).val()*100);
			reserved_ALIZE_affectations += '#'+stringAffectation.substr(n+1);
		}
	
	});
	if($('[name="reserved_ALIZE_amount"]').length == 0) {
		$('#form-steps').append('<input type="hidden" name="reserved_ALIZE_amount" val="'+reserved_ALIZE_amount+'">');
		$('#form-steps').append('<input type="hidden" name="reserved_ALIZE_affectations" val="'+reserved_ALIZE_affectations+'">');	
	}
	else {
		$('[name="reserved_ALIZE_amount"]').val(reserved_ALIZE_amount);
		$('[name="reserved_ALIZE_affectations"]').val(reserved_ALIZE_affectations);
	}
	
}

function fillField(name,value){
	
	
	if(name == 'country'){
		$('#country option').each(function(index, el) {
			if($(this).val() == value) {
				var titleCountry = $(this).text();
				$('#c-country .cs-placeholder').text(titleCountry);
			}

		});
		
	}

	if(name == 'civility'){
		$('#civility option').each(function(index, el) {
			if($(this).val() == value) {
				var titleCivility = $(this).text();
				$('#c-civ .cs-placeholder').text(titleCivility);
			}

		});

	}
	
	if( $('[name='+name+']').length >0 ){
		$('[name='+name+']').val(value)
	}
}

/*
var anonymous = {
	requiredField : {},
	notRequiredField : {},

	toggle_required : function toggle_required(){

		$('#colGCoordo').before('<div id="new_coordo"></div>');

		var clonedEl = $('<div id="notRequiredCoordo"></div>').append($('#colGCoordo,#colDCoordo').clone());

		var el = $('<div id="requiredCoordo"></div>').append($('#colGCoordo,#colDCoordo'));


		var listInput = $(clonedEl).find('#firstname, #lastname, #civility, #address1, #address2, #postcode, #city, #country');
		var default_val = 	{
							'firstname':'Anonyme Web',
							'lastname':'Anonyme Web',
							'civility':'1',
							'address1':'S/C Fondation de France',
							'address2':'S/C Fondation de France',
							'postcode':'75008',
							'city':'Paris',
							'country':'France'
						};

		listInput.each(function() {
			var input_name = $(this).attr('name');
			var copy = $(this).clone();
			var id = copy.attr('id') || ('tmp_hidden_'+input_name);
			copy.removeAttr('id');
			copy.attr('optional','1');
			$(this).before('<input type="hidden" id="'+id+'" name="'+input_name+'" value="'+default_val[input_name]+'"/>').after(copy);
			$(this).remove();
			copy.closest('p').find('.required').hide();
		});

		$('#new_coordo').append(clonedEl,el);

		$('#notRequiredCoordo [name="civility"]').addClass('cs-select cs-skin-border');
		$('#notRequiredCoordo [name="country"]').addClass('cs-select cs-skin-border');

		$('#requiredCoordo [name="civility"]').addClass('cs-select cs-skin-border');
		$('#requiredCoordo [name="country"]').addClass('cs-select cs-skin-border');

		(function() {
			[].slice.call( $('#new_coordo select.cs-select')).forEach( function(el) {	
				new SelectFx(el);
			} );
		})();


		anonymous.notRequiredField = $('#notRequiredCoordo').detach();

		anonymous.requiredField = $('#requiredCoordo').detach();

	},

	hideRequiredCoordo : function hideRequiredCoordo(){
		$('#requiredCoordo').detach();
		$('#new_coordo').append(anonymous.notRequiredField);

	},

	showRequiredCoordo : function showRequiredCoordo(){
	    $('#notRequiredCoordo').detach();
		$('#new_coordo').append(anonymous.requiredField);
	},

	init_anonmous_coordo: function init_anonmous_coordo(){
		if ( $(this).prop('checked')) {
			anonymous.hideRequiredCoordo();
			$('#bloc_ano strong').show();
		}else {
			anonymous.showRequiredCoordo();
			$('#bloc_ano strong').hide();
		};


		$('#new_anonyme input').change(function(event) {
			if ( $(this).prop('checked')) {
				anonymous.hideRequiredCoordo();
				$('#bloc_ano strong').show();
			}else {
				anonymous.showRequiredCoordo();
				$('#bloc_ano strong').hide();
			}
		});
	}

};
*/

function changeFrequency(){
	console.log('changeFrequency()');
	if( typeof Step1 != 'undefined'){
		var frequency = $('body').find('input[name="frequence"]:checked').val() || 'once';
		var amount = Step1.getDonation().amount || 0;

		if (frequency == 'once'){
			
			$('[name="famount-regular"]').val('');

			$('#once').show();
			$('#regular').hide();
			
			if($('#amount-once-'+amount).length == 1){
				//$('#amount-once-'+amount).click();
			}
			else {
				//$('[name="famount-once"]').val(parseInt(amount)/100);
				//$('[name="famount-once"]').click();
			}
			
		}
		else if (frequency == 'regular'){
			$('[name="famount-once"]').val('');
			
			$('#regular').show();
			$('#once').hide();
			
			if($('#amount-regular-'+amount).length == 1){
				//$('#amount-regular-'+amount).click();
			}
			else {
				//$('[name="famount-regular"]').val(parseInt(amount)/100);
				//$('[name="famount-regular"]').click();
			}
		}
		//toggleReduc();
		//$('body').trigger('change_amount');
	}
};

function debugchangeAmountNoaffect(){
	console.log('debugchangeAmountNoaffect()');	
	//if( typeof Step1 != 'undefined'){
		var frequency = $('input[name="frequence"]:checked').val() || 'once';
		var donation = Step1.getDonation() || {amount:0,frequency:frequency};
		var amount = donation.amount;
		
		$('#once,#regular').each(function(){$(this).toggle($(this).attr('id') == frequency);});
		donation.frequency = frequency;
		Step1.initValues(donation).click();
	//}
};


function basket(){
	console.log('basket()');
	if(typeof Step1 != 'undefined'){
/* create private basket if not exist*/
		if( $('[name=reserved_private_basket]').length == 0 ) {$('form#form-steps').append('<input type="hidden" name="reserved_private_basket" val=""/>');}
/* create private pdf if not exist*/
		if( $('[name=reserved_private_pdf]').length == 0 ) {$('form#form-steps').append('<input type="hidden" name="reserved_private_pdf" val=""/>');}
/*var */		
		var basket = '';
		var pdf = '';
		var tempBasket = '';
		var tempPdf = '';
        var pdfAffectation = $('body').data('pdf_affectation');
        if(typeof pdfAffectation == 'undefined'){pdfAffectation = ''};
        var pdfTotal = '';
        var panierAffectation = $('body').data('panier_affectation');
        if(typeof panierAffectation == 'undefined'){panierAffectation = ''};
        var panierTotal = '';
        if( $('[name=reserved_ALIZE_amount]').val() != ''){
        	var basketMontants = $('[name=reserved_ALIZE_amount]').val().split('#');
        }
        else {
        	var basketMontants = '';	
        }
        var basketAffectations = $('[name=reserved_ALIZE_affectations]').val().split('#');
        var totalBasket = 0;
        var totalPdf = 0;
/* for each affectation */
        if(basketMontants != '' || basketMontants != 'undefined' || basketMontants.length != 0){
	        var i = 0;
	        $(basketMontants).each(function(index, el) {
	        	i += 1;
	        	totalBasket = parseFloat(totalBasket) + parseFloat(el)/100;
	        	totalPdf = parseFloat(totalPdf) + parseFloat(el)/100;

	        	tempBasket = panierAffectation.replace('[%code]', basketAffectations[index]);
	        	if(typeof tempBasket == 'undefined'){tempBasket = ''};
	        	tempBasket = tempBasket.replace('[%amount]', el/100+' €');
	        	tempBasket = tempBasket.replace('[%libelle]', $('label[for*='+basketAffectations[index]+']').first().text().trim());
	        	tempBasket += '\n';

	        	tempPdf = pdfAffectation.replace('[%code]', basketAffectations[index]);
	        	if(typeof tempPdf == 'undefined'){tempPdf = ''};
	        	tempPdf = tempPdf.replace('[%amount]', el/100+' €');
	        	tempPdf = tempPdf.replace('[%libelle]', $('label[for*='+basketAffectations[index]+']').first().text().trim());
	        	tempPdf += '\n';

	        	basket += tempBasket;
	        	pdf += tempPdf;

	        });
	        pdfTotal = $('body').data('pdf_total');
	        if (typeof pdfTotal == 'undefined'){pdfTotal = ''};
	        panierTotal = $('body').data('panier_total');
	        if (typeof panierTotal == 'undefined'){panierTotal = ''};
	        totalBasket = panierTotal.replace('[%amount]', totalBasket+' €');
	    	totalPdf = pdfTotal.replace('[%amount]', totalPdf+' €');
	    	$('[name=reserved_private_basket]').val(totalBasket+'\n'+basket);
	        //console.log($('[name=reserved_private_basket]').val());
	        
	        
	        $('[name=reserved_private_pdf]').val(totalPdf+'\n'+pdf);
	        //console.log($('[name=reserved_private_pdf]').val());
	    }
	    else {
	        $('[name=reserved_private_basket]').val('');
	        //console.log($('[name=reserved_private_basket]').val());
	        
	        $('[name=reserved_private_pdf]').val('');
	        //console.log($('[name=reserved_private_pdf]').val());
	    }

    }
};
