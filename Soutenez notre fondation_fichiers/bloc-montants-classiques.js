
function fdfBlocMontantsClassiques(){	
	// montants
	var title = $('body').data('titre-montant-mono-affect');
	$('#step-1 .step-title h2').remove();
	$('#colG').append('<div id="affectationstitle" class="col-md-12 col-sm-12 col-xs-12 boxl mt"><h2>'+title+'</h2></div><div class="clearfix"></div>');
	$('#step-1 .step-title').hide();
	$('#step-1 .step-info').hide();

	$('#step-1').addClass('col-md-12 col-sm-12 col-xs-12 boxl').removeClass('size1of3 unit');
	
	$('#step-1').appendTo('#colG');
	$('#step-1').after('<div class="clearfix"></div>');

	$('.amount li').each(function() {
		var parentTitle=$(this).parent();
		$(this).addClass('col-md-3 col-sm-3 col-xs-6 pam');
	});

	$('input[name="amount-once"]').each(function() {
		wrapToBox($(this),'verti');
	});

	$('input[name="amount-regular"]').each(function() {
		wrapToBox($(this),'verti');
	});

	$('input[name="famount-once"], input[name="famount-regular"]').each(function() {
		wrapToBox($(this),'hori');
	});


	$('fieldset.amount > ul').addClass('montants col-md-12 col-sm-12 col-xs-12 boxl');
	$('#bloc-amount-once > fieldset.free-amount').addClass('col-md-6 col-sm-8 col-xs-12 pam');
	$('#bloc-amount-regular > fieldset.free-amount').addClass('col-md-6 col-sm-8 col-xs-12 pam');

		
	var freq=$('<div class="rad radType"><label><input checked="checked" value="once" name="frequence" type="radio">Je donne une fois</label><br><label><input value="regular" name="frequence" type="radio">Je donne tous les mois</label></div>');
	$(freq).appendTo('#step-1');

	$('#or').hide();
};
