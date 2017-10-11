function fillWithData(data){
/*
$.ajax({
    url: 'https://fdf-login.iraiser.eu/?login='+login+'&password='+password+'&_format=jsonp',
    jsonpCallback: 'loginCallback',
    dataType: 'jsonp'
}).done(function(data){
	console.log('data =>'+JSON.stringify(data)); // array of objects
*/		
	//if (data.error == 'TECHIDENT' ) {
	if (data.error == 'IDENT' ) {
		$('#login_bloc .error').text('Vos identifiants donateur n\'ont pas été reconnus.')
		$('#login_bloc .error').show();
	} else {
		
		fillField('email',data.email);
		fillField('firstname',data.firstname);
		fillField('postcode',data.postcode);
		fillField('address1',data.address1);
		fillField('address2',data.address2);
		fillField('lastname',data.lastname);
		fillField('civility',data.civility);
		fillField('city',data.city);
		fillField('country', data.countryCode);

		$('#login_bloc').hide();
	}
};
	
function fdfCoordonnees(){
	var titreCoordoneesIsRecap = $('body').data('titre-coordonees-is-recap');
    if (typeof titreCoordoneesIsRecap == 'undefined'){ titreCoordoneesIsRecap = $('#step-2 .step-title h2').text();};

	$('#step-2 .step-title').html('<h2>'+titreCoordoneesIsRecap+'</h2>').appendTo('#colG').addClass('col-md-12 col-sm-12 col-xs-12 mt');

	$('#step-2').removeClass('unit').removeClass('size1of3').addClass('col-md-12 col-sm-12 col-xs-12 boxl mt').appendTo('#colG');

	var colGCoordo=$('<div id="colGCoordo" class="col-md-6 col-sm-6 col-xs-12 pam"></div>');
	var colDCoordo=$('<div id="colDCoordo" class="col-md-6 col-sm-6 col-xs-12 pam"></div>');
	$('#c-isc-inf').appendTo(colGCoordo).addClass('form-group').removeClass('hidden');
	$('#c-civ').appendTo(colGCoordo).addClass('form-group');
	$('#c-fname').appendTo(colGCoordo).addClass('form-group');
	$('#c-lname').appendTo(colGCoordo).addClass('form-group');
	$('#c-addr1').appendTo(colGCoordo).addClass('form-group');
	$('#c-addr2').appendTo(colGCoordo).addClass('form-group');
	$('#c-pcode').appendTo(colGCoordo).addClass('form-group');
	$('#c-city').appendTo(colGCoordo).addClass('form-group');
	$('#c-country').appendTo(colGCoordo).addClass('form-group');
	$('#c-email').appendTo(colDCoordo).addClass('form-group');
	$('#required-info').appendTo(colDCoordo);
	$(colDCoordo).prependTo('#step-2');	
	$(colGCoordo).prependTo('#step-2');

	var dejaDonateur=$('<div class="col-md-12 col-sm-12 col-xs-12 text-left pam">Déjà donateur ? <span id="don-link">Vous pouvez saisir vos identifiants en cliquant ici</span><br>ou remplir le formulaire ci-dessous</div><div id="login_bloc" class="col-md-12 col-sm-12 col-xs-12 login" style="display: none;"><a id="lost-id" href="javascript:void(0);" style="font-size: 12px;">Numéro de donateur oublié</a> | <a id="lost-password" href="javascript:void(0);" style="font-size: 12px;">Mot de passe oublié</a><br><br>\
            <div id="login_bloc">\
            	<div><p class="message" style="display:none;">Contacter le service donateurs.</p></div>\
            	<div><p class="error" style="display:none;"></p></div>\
            	<div class="form-group"><label for="login">Numéro de donateur*</label><input type="text" class="form-control" id="login" placeholder="" name="donateur_login"></div>\
            	<div class="form-group"><label for="password">Mot de passe*</label><input type="password" class="form-control" id="password" placeholder=""></div>\
            	<div class="text-center"><button type="button" class="btn btn-default btn-lg">Me connecter</button></div>\
            </div>\
        </div>');
	
	 //bloc3: manage clics
	$(document).ready(function() {
		$('#lost-password, #lost-id').click(function(event) {
			$('#login_bloc .message').show();
		});
		$('#don-link').click(function(){ 
			$('#login_bloc').toggle(); 
		});	

		$( "#login_bloc button" ).click(function() {


			$('#login_bloc .error').text('');
			$('#login_bloc .error').hide();

			var login = $('#login_bloc #login').val();
			var password = $('#login_bloc #password').val();

			var first = login.substring(0,1);

			if (/^[a-zA-Z]+$/.test(first)){
				console.log('ancien login :'+login);
				login = login.substr(1);
				console.log('nouveau login :'+login);
			}

			$('body').after('<script type="text/javascript" src="https://fdf-login.iraiser.eu/?login='+login+'&password='+password+'&_format=jsonp&_callback=fillWithData"></script>');			

			/*
			$.ajax({
			    url: 'https://fdf-login.iraiser.eu/?login='+login+'&password='+password+'&_format=jsonp',
			    jsonpCallback: 'loginCallback',
			    dataType: 'jsonp'
			}).done(function(data){
				console.log('data =>'+JSON.stringify(data)); // array of objects
					
				//if (data.error == 'TECHIDENT' ) {
				if (data.error == 'IDENT' ) {
					$('#login_bloc .error').text('Vos identifiants donateur n\'ont pas été reconnus.')
					$('#login_bloc .error').show();
				} else {
					
					fillField('email',data.email);
					fillField('firstname',data.firstname);
					fillField('postcode',data.postcode);
					fillField('address1',data.address1);
					fillField('address2',data.address2);
					fillField('lastname',data.lastname);
					fillField('civility',data.civility);
					fillField('city',data.city);
					fillField('country', data.countryCode);

					$('#login_bloc').hide();
				}
				
			});
			*/
		});
	});

	
/*
	var anonyme=$('<div id="new_anonyme" class="col-md-6 col-sm-6 col-xs-12 pam"><div><label style="font-size:14px;"><input type="checkbox"> Rester anonyme</label><div id="bloc_ano"><font>Seul le champ Adresse e-mail est obligatoire.<br><strong>Je note que dans ce cas, je ne recevrai pas de reçu fiscal.</strong></font></div></div></div><div class="clearfix"></div>');
	$(anonyme).prependTo('#step-2');
*/
	$('#c-isc').prependTo('#step-2').wrap('<div id="new_iscompany" class="col-md-6 col-sm-6 col-xs-12 pam"></div>');
	$('#c-isc').hide();

	$('#new_iscompany').append('<label><input id="new_corpo" type="radio" name="newIsCompany"> Je suis une entreprise</label>');
	$('#new_iscompany').append('<label><input id="new_part" type="radio" name="newIsCompany"> Je suis un particulier</label>');

	if($('#company').val() != ''){
        $('#new_corpo').prop('checked',true);
        $('.company-infos').show();
    }
    else {
    	$('#new_part').prop('checked',true);
    	$('.company-infos').hide();
    }

	$('#new_iscompany').change(function() {
        $('.company-infos').toggle();
        Step2.refreshReductionInfo();
        if (!$('#new_corpo').prop('checked')){
            $('#company').val('');
        }
    });


	$(dejaDonateur).prependTo('#step-2');
	$('#c-pcode').removeClass('size1of2').removeClass('unit').addClass('col-md-5 col-sm-5 col-xs-12');
	$('#c-city').removeClass('size2of2').removeClass('unit').addClass('col-md-6 col-sm-6 col-xs-12 col-md-offset-1 col-sm-offset-0 col-xs-offset-0');
	$('#step-2 input').addClass('form-control');
	var confemail=$('<div id="new_email2" class="form-group"><label for="emailC">Confirmation e-mail<span class="required">*</span> </label><p class="validator"><input type="email" class="form-control" id="emailC" placeholder=""></p></div>');
	$(confemail).insertAfter('#c-email');    
	var tel=$('<div id="new_phone" class="form-group"><label for="phone">Téléphone</label><p class="validator"><input type="text" name="reserved_phone" class="form-control" id="phone" placeholder=""></p></div>');
	$(tel).insertAfter(confemail);
	var mobile=$(' <div id="new_mobile" class="form-group"><label for="cell">Mobile</label><p class="validator"><input type="text" name="reserved_mobile" class="form-control" id="cell" placeholder=""></p></div>');
	$(mobile).insertAfter(tel);

	$('#step-2 > div.step-container').css('clear','both');
	
	$('#step-2 .height_adaptor').each(function(){
		var parent = $(this).parents('.step-container');
		
		$(this).children().appendTo(parent);

		$(this).parent().remove();
	});
	//removeClass('height_adaptor');

	/* gestion des erreurs du formulaire */
	$('#step-2 #c-civ, #step-2 #c-fname, #step-2 #c-lname, #step-2 #c-addr1, #step-2 #c-pcode, #step-2 #c-city, #step-2 #c-email, #step-2 #new_email2').each(function(index, el) {
		$(this).find('span.required').after('<span class="warning" style="color:#ff0000; font-size:12px; display:none;">merci de compléter le champ</span>');
	});

}
