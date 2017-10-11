function fdfRightCol(){
	var titreReassurance1 = $('#step-1 .step-info h4').text();
	$('#step-1 .step-info h4').remove();
	var texteReassurance1 =	$('#step-1 .step-info').html();
	$('#step-1 .step-info').html('');
	var titreReassurance2 =	$('#step-2 .step-info h4').text();
	$('#step-2 .step-info h4').remove();
	var texteReassurance2 =	$('#step-2 .step-info').html();
	$('#step-2 .step-info').html('');
	var titreReassurance3 =	'<h3> réduction fiscale </h3>';
	$('#step-3 .step-info h4').remove();
	
	var texteReassurance3 = '<strong>Avec votre don</strong> bénéficiez d\'importants avantages fiscaux<br/>\
							• <strong>66%</strong> à déduire de votre impôt sur le revenu<br/>\
							• <strong>75%</strong> de votre ISF<br/>\
							• <strong>60%</strong> de l\'impôt sur les sociétés.<br/>';
	
	$('#step-3 .step-info').html('');

	$('#colD').append('<div class="col-md-12 tool help"><img src="/medias/app/help.png" class="head"> <h3>Besoin d’aide ?</h3> <div class="copy-btn-default">Contactez-nous à<br><a href="mailto:donateurs@fdf.org" class=""><strong>donateurs@fdf.org</strong></a></div> <div class="copy-btn-default" style="cursor:initial;">ou par téléphone au<br><strong>01 44 21 87 00</strong></div></div><div class="col-md-12 tool use"> <img src="/medias/app/use.png" class="head"> <h3>Utilisation des ressources</h3> <img src="https://libs.iraiser.eu/users/fdf/camembert.png" class="graph"> </div><div class="col-md-12 tool lock"> <img src="/medias/app/lock.png" class="head"> <h3>Paiement<br>100% sécurisé</h3> <div class="sec"> Un <strong>codage SSL</strong> assure la confidentialité de vos données. Celles-ci seront traitées de façon sécurisée.</div></div>');
	
	
	$('#colD').append('<div class="col-md-12 tool reduc"> <img src="https://libs.iraiser.eu/users/fdf/reduction_fiscale.png" class="head"> '+titreReassurance3+' <div class="sec">'+texteReassurance3+'</div></div></div><div class="clearfix">');
	
};