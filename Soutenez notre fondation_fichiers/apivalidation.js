if (jQuery.ui) {
	
	DntErrors.errorMsg.streetNumber = "Gelieve uw huisnummer in te vullen";
	var oldStep2Check;
	var ApiValidation = {
		
		init: function(options) {
			
			var keyapivalidation = 			((!options || !options.keyapivalidation) ? 'AIzaSyBOg5MVVNZbhv688S7pcfjvLKjLtVhZKQI' : options.keyapivalidation);
			//var userapivalidationnl = 		((!options || !options.userapivalidationnl) ? 'RVS4UB15WKeJBJkJLiyjcugpJ78Ox3h2yjrakTdC5lZ' : options.userapivalidationnl);
			//var passapivalidationnl = 		((!options  || !options.passapivalidationnl) ? 'Nxew4nA7MDBKF2hqT2rzbmqeaRJgGgrTFX5j93DRJsK' : options.passapivalidationnl);
			var addedFieldAddressForNL = 	((!options || !options.addedFieldAddressForNL) ? false : options.addedFieldAddressForNL);
			
			var addedReservedFieldForZipAutocomplete = 	((!options || !options.addedReservedFieldForZipAutocomplete) ? false : options.addedReservedFieldForZipAutocomplete);
			
			var addedReservedFieldForAddressAutocomplete = 	((!options || !options.addedReservedFieldForAddressAutocomplete) ? false : options.addedReservedFieldForAddressAutocomplete);
			var reservedFieldForStreet = 	((!options || !options.reservedFieldForStreet) ? null : options.reservedFieldForStreet);
			var reservedFieldForStreetNumber = 	((!options || !options.reservedFieldForStreetNumber) ? null : options.reservedFieldForStreetNumber);
			
			
			var postcode = $('#postcode');
			var email = $('#email');
			var country = $('#country');
			var city = $('#city');
			var address = $('#address1');
			
			if (ApiValidation.isNLPostcodeValidation()) {
					ApiValidation.addFieldStreetNumber();
					addedFieldAddressForNL = true;
				};
				
			country.change(function(event) {
				if (ApiValidation.isNLPostcodeValidation()) {
					ApiValidation.addFieldStreetNumber();
					addedFieldAddressForNL = true;
				} else if (addedFieldAddressForNL) {
					ApiValidation.removeFieldStreetNumber();
					addedFieldAddressForNL = false;
				}
			});
			
			email.blur(function() {
				ApiValidation.checkEmail(email.val());
			});
			
			if (addedReservedFieldForZipAutocomplete) {
				postcode.autocomplete({
						source : function(requete, response){
							if (!addedFieldAddressForNL&&$('#country').val()=='FR'&&$('#city').val()=='') {
								$.ajax({
										type: "GET",
										url : ApiValidation.geturlapipostcode(),
										dataType : 'jsonp', 
										success : function(donnee){
											if (donnee.length>0&&donnee[0].status == 'OK') {
												response($.map(donnee, function(item) {
													return {
														city: item.city,
														zipcode: item.zipcode,
														};
												}));
											}
										}
									});
								}
						},
						minLength: 5,
						select: function( event, ui ) {
							if (ui.item.city!=undefined&&ui.item.city!='') {
								city.val( ui.item.city );
								DntErrors.removeError('city');
								city.removeClass('error');
								city.addClass('valid');
							}
							if (ui.item.zipcode!=undefined&&ui.item.zipcode!='') {
								postcode.val( ui.item.zipcode );
								DntErrors.removeError('postcode');
								postcode.removeClass('error');
								postcode.addClass('valid');
							}
							return false;
						}
					})
					.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
						return $( "<li>" )
						.append( "<a>" + item.zipcode + " " + item.city + "</a>" )
						.appendTo( ul );
					};
			}
			
			if (!addedReservedFieldForAddressAutocomplete && document.getElementById("address1") != null) {
			    		
				address.autocomplete({
					source : function(requete, response){
						if (!addedFieldAddressForNL) {
							$.ajax({
									type: "GET",
									url : ApiValidation.geturlapi(keyapivalidation),
									dataType : 'jsonp', 
									success : function(donnee){
										if (donnee.status == 'OK') {
										    response($.map(donnee.results, function(item) {
												return {
													label: item.address,
													value: item.address,
													city: item.city,
													zip: item.postal_code,
													ctry: item.ctry,
													adress: (item.number!=null ? item.number + ' ' + item.street : item.street)
													};
												}));
										}
									}
								});
							}
					},
					minLength: 5,
					select: function( event, ui ) {
						if (ui.item.adress!=undefined&&ui.item.adress!='') {
							address.val( ui.item.adress );
							address.removeClass('error');
							DntErrors.removeError('address1');
							address.addClass('valid');
						}
						if (ui.item.ctry!=undefined&&ui.item.ctry!='') {
							country.val( ui.item.ctry );
							DntErrors.removeError('country');
							country.removeClass('error');
						}
						
						if (ui.item.city!=undefined&&ui.item.city!='') {
							city.val( ui.item.city );
							DntErrors.removeError('city');
							city.removeClass('error');
							city.addClass('valid');
						}
						
						if (ui.item.zip!=undefined&&ui.item.zip!='') {
							postcode.val( ui.item.zip );
							DntErrors.removeError('postcode');
							postcode.removeClass('error');
							postcode.addClass('valid');
						}
						
						return false;
					},
					open: function(event, ui) {
						$('.ui-autocomplete').append('<li><a><img src="https://apivalidation.iraiser.eu/static/img/powered-by-google-on-white.png" align="right"></a></li>');
					}
				})
				.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
					return $( "<li>" )
					.append( "<a>" + item.label + "</a>" )
					.appendTo( ul );
				};
			} else if (addedReservedFieldForAddressAutocomplete) {
				
				var rue = $('input[name='+ reservedFieldForStreet +']');
				var numero = $('input[name='+ reservedFieldForStreetNumber +']')
				
				if (rue != null) {
					rue.autocomplete({
						source : function(requete, response){
							if (!addedFieldAddressForNL) {
								$.ajax({
										type: "GET",
										url : ApiValidation.geturlapi(keyapivalidation),
										dataType : 'jsonp', 
										success : function(donnee){
											if (donnee.status == 'OK') {
												response($.map(donnee.results, function(item) {
													if (item.street!=null&&item.postal_code!=null&&item.city!=null&&item.ctry!=null) {
														return {
    														label: (item.number!=null ? item.number + ' ' + item.street + ', ' + item.postal_code + ' ' + item.city + ', ' + item.country : item.street  + ', ' + item.postal_code + ' ' + item.city + ', ' + item.country),
    														value: (item.number!=null ? item.number + ' ' + item.street + ', ' + item.postal_code + ' ' + item.city + ', ' + item.country : item.street  + ', ' + item.postal_code + ' ' + item.city + ', ' + item.country),
    														city: item.city,
    														zip: item.postal_code,
    														ctry: item.ctry,
    														street: item.street,
    														number: item.number
    														};
													}
													}));
											}
										}
									});
								}
						},
						minLength: 5,
						select: function( event, ui ) {
							if (ui.item.street!=undefined&&ui.item.street!=null&&ui.item.street!='') {
								rue.val( ui.item.street );
								rue.removeClass('error');
								DntErrors.removeError('address1');
								rue.addClass('valid');
							}
							if (ui.item.number!=undefined&&ui.item.number!=null&&ui.item.number!='') {
								numero.val( ui.item.number );
								numero.removeClass('error');
								DntErrors.removeError('address1');
								numero.addClass('valid');
							}
							if (ui.item.ctry!=undefined&&ui.item.ctry!=null&&ui.item.ctry!='') {
								country.val( ui.item.ctry );
								DntErrors.removeError('country');
								country.removeClass('error');
							}
							
							if (ui.item.city!=undefined&&ui.item.city!=null&&ui.item.city!='') {
								city.val( ui.item.city );
								DntErrors.removeError('city');
								city.removeClass('error');
								city.addClass('valid');
							}
							
							if (ui.item.zip!=undefined&&ui.item.zip!=null&&ui.item.zip!='') {
								postcode.val( ui.item.zip );
								DntErrors.removeError('postcode');
								postcode.removeClass('error');
								postcode.addClass('valid');
							}
							
							return false;
						},
						open: function(event, ui) {
							$('.ui-autocomplete').append('<li><a><img src="https://apivalidation.iraiser.eu/static/img/powered-by-google-on-white.png" align="right"></a></li>');
						}
					})
					.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
						return $( "<li>" )
						.append( "<a>" + item.label + "</a>" )
						.appendTo( ul );
					};
				}
			}
		},
		
		

		addFieldStreetNumber : function() {
		
			var champStreetNumber = '<p class="unit size1of2"><label for="streetNumber">Huisnummer <span class="required">*</span></label><input type="text" id="streetNumber" name="streetNumber" value=""/></p>';
			var champStreetAdd = '<p class="unit size2of2 lastUnit"><label for="streetNumberAddition">Toevoeging <span class="help">bv. A</span></label><input type="text" id="streetNumberAddition" name="streetNumberAddition" value=""/></p>';
			var ligneStreetNumber = '<div class="line" id="addressCptNL" style="width:95%;">'+champStreetNumber+champStreetAdd+'</div>';
			var labelAdress = $("label[for='address1']").html().replace('address1','inputAddressNL');
			var inputAdress = '<input type="text" name="inputAddressNL" id="inputAddressNL" />'
			var ligneNouvelleAdresse = '<p>'+labelAdress+inputAdress+'</p>';
			var newInput = "<div id='adressForNL'>"+ligneStreetNumber + ligneNouvelleAdresse+"</div>";
			$("p:has(label[for='postcode'])").after(newInput);
			
			$('#inputAddressNL').addClass($('#address1').attr('class'));
			$('#inputAddressNL').val($('#address1').val());
			
			ApiValidation.recoverFromError();
			
			ApiValidation.recoverFromTaggedUrl();
			
			$("p:has(label[for='address1'])").hide();
			$("p:has(label[for='address2'])").hide();
			
			$('#streetNumber').blur(function() {
				ApiValidation.checkStreetNum();
			});
			$('#streetNumber').keyup(function() {
				ApiValidation.getAddressFromZip();
			});
			$('#postcode').keyup(function() {
				ApiValidation.getAddressFromZip();
			});
			$('#streetNumberAddition').keyup(function() {
				ApiValidation.copyAdressNLtoAdress1();
			});
			$('#inputAddressNL').blur(function() {
				ApiValidation.checkAdressNL();
			});
			$('#inputAddressNL').keyup(function() {
				ApiValidation.copyAdressNLtoAdress1();
			});
			
			var newStep2check = (function() {
				oldStep2Check = Step2.check;
				return function() {
					return oldStep2Check()&&ApiValidation.checkStreetNum()&&ApiValidation.checkAdressNL();
				}
			})();
			
			Step2.check = newStep2check;
			
			return false;
		},
		
		recoverFromError : function() {
			var patternstrnumadd = /[0-9]+[\s|\+]*[-][\s|\+]*\w/g;
			var strnumbreadd = $('#address1').val().match(patternstrnumadd);
			if (strnumbreadd != undefined && strnumbreadd != '') {
				var patternstrnumadd2 = /[-][\s|\+]*\w/g;
				var strnumbreadd2 = $('#address1').val().match(patternstrnumadd2);
				$('#inputAddressNL').val($('#address1').val().replace(strnumbreadd2[strnumbreadd2.length-1],''));
				var patternstrnumadd3 = /[-][\s|\+]*/g;
				$('#streetNumberAddition').val(strnumbreadd2[strnumbreadd2.length-1].replace(patternstrnumadd3,''));
			}
			
			var patternstrnum = /[\s|\+]*[0-9]+(\w)*/g;
			var strnumbre = $('#inputAddressNL').val().match(patternstrnum);
			if (strnumbre != undefined && strnumbre != '') {
				$('#inputAddressNL').val($('#inputAddressNL').val().replace(strnumbre[strnumbre.length-1],''));
				var patternstrnum2 = /[\s|\+]/g;
				$('#streetNumber').val(strnumbre[strnumbre.length-1].replace(patternstrnum2,''));
			}
		},
		
		recoverFromTaggedUrl : function() {
			var nl_coords = $.parseJSON($.cookie('dnt_coords'));
			if (nl_coords != null) {
				if (nl_coords.nl_streetnumber != undefined && ($('#streetNumber').val() == undefined || $('#streetNumber').val() == '')) {
					$('#streetNumber').val(nl_coords.nl_streetnumber);
				}
				if (nl_coords.nl_streetnumberaddition != undefined && ($('#streetNumberAddition').val() == undefined || $('#streetNumberAddition').val() == '')) {
					$('#streetNumberAddition').val(nl_coords.nl_streetnumberaddition);
				}
				if (nl_coords.nl_inputaddress != undefined && ($('#inputAddressNL').val() == undefined || $('#inputAddressNL').val() == '')) {
					$('#inputAddressNL').val(nl_coords.nl_inputaddress.replace("+"," "));
				}
				if (($('#inputAddressNL').val()==undefined||$('#inputAddressNL').val()=='')
				   &&($('#city').val()==undefined||$('#city').val()=='')) {
					ApiValidation.getAddressFromZip();
				}
			}
		},
		
		removeFieldStreetNumber : function() {
			$('#address1').addClass($('#inputAddressNL').attr('class'));
			$('#adressForNL').remove();
			$("p:has(label[for='address1'])").show();
			$("p:has(label[for='address2'])").show();
			
			DntErrors.removeError('streetNumber');
			
			DntErrors.displayErrors();
			Step2.check = oldStep2Check;
			return false;
		},
		
		checkStreetNum: function() {
			var retour = true;
			if (ApiValidation.isNLPostcodeValidation()) {
				if ($('#streetNumber').val()!=undefined&&$('#streetNumber').val()!='') {
					DntErrors.removeError('streetNumber');
					$('#streetNumber').removeClass('error');
					$('#streetNumber').addClass('valid');
				}
				else {
					DntErrors.addError('streetNumber');
					$('#streetNumber').removeClass('valid');
					$('#streetNumber').addClass('error');
					retour = false;             
				}
			}
			DntErrors.displayErrors();
			return retour;
		},
		
		checkAdressNL: function() {
			var retour = true;
			if (ApiValidation.isNLPostcodeValidation()) {
				if ($('#inputAddressNL').val()!=undefined&&$('#inputAddressNL').val()!='') {
					DntErrors.removeError('address1');
					$('#inputAddressNL').removeClass('error');
					$('#inputAddressNL').addClass('valid');
				}
				else {
					DntErrors.addError('address1');
					$('#inputAddressNL').removeClass('valid');
					$('#inputAddressNL').addClass('error');
					retour = false;         
				}
			}
			DntErrors.displayErrors();
			return retour;
		},
		
		copyAdressNLtoAdress1 : function() {
			var adressEnCours = '';
			if ($('#inputAddressNL').val()!=undefined&&$('#inputAddressNL').val()!='') {
				adressEnCours += $('#inputAddressNL').val();
			}
			if ($('#streetNumber').val()!=undefined&&$('#streetNumber').val()!='') {
				adressEnCours += ' '+$('#streetNumber').val();
			}
			if ($('#streetNumberAddition').val()!=undefined&&$('#streetNumberAddition').val()!='') {
				adressEnCours += '-'+$('#streetNumberAddition').val();
			}
			$('#address1').val(adressEnCours);
		},
		
		getAddressFromZip : function() {
			if (ApiValidation.isNLPostcodeValidation()) {
				var ziptemp = $('#postcode').val();
				var zipreplaced = ''
				if (ziptemp!=undefined && ziptemp!='') {
					zipreplaced = ApiValidation.validzipcod(ziptemp);
				}
				else {
					zipreplaced = 'a';
				}
				var stnum = $('#streetNumber').val();
				$.ajax({
					type: "GET",
					url: "https://apivalidation.iraiser.eu/services/address/validation_nl/jsonp/"+zipreplaced+"?n="+stnum+"&u=&p=",
					dataType: 'jsonp',
					success : ApiValidation.onGetAddressFromZipSuccess,
					error: ApiValidation.onGetAddressFromZipError
				});
			}
		},
		
		validzipcod : function(zip) {
			var zipnew = zip.replace(/ /g,"").replace(/\-/g, "");
			return zipnew;
		},
		
		onGetAddressFromZipSuccess : function(data, statut) {
			if(data.status=="OK") {
					var result = data.results[0];
					if (result.street != undefined) {
						$('#inputAddressNL').val(result.street);
						DntErrors.removeError('address1');
						$('#inputAddressNL').removeClass('error');
						$('#inputAddressNL').addClass('valid');
					}
					else {
						$('#inputAddressNL').val('');
						$('#address1').val('');
						$('#inputAddressNL').removeClass('valid');
					}
					if (result.city != undefined) {
						$('#city').val(result.city);
						DntErrors.removeError('city');
						$('#city').removeClass('error');
						$('#city').addClass('valid');
					}
					if (result.number != undefined) {
						$('#streetNumber').addClass('valid');
						$('#streetNumber').removeClass('error');
						DntErrors.removeError('streetNumber');
					}
					if (result.postal_code != undefined) {
						DntErrors.removeError('postcode');
						$('#postcode').removeClass('error');
						$('#postcode').addClass('valid');
					}
					DntErrors.displayErrors();
					if (typeof(Steps)!='undefined') {
						Steps.is_submitted = '0';
					}
			}
			else {
				$('#city').removeClass('valid');
				$('#city').val('');
				$('#inputAddressNL').removeClass('valid');
				$('#inputAddressNL').val('');
				$('#streetNumber').removeClass('valid');
				$('#postcode').removeClass('valid');
			}
			ApiValidation.copyAdressNLtoAdress1();
		},

		onGetAddressFromZipError : function(data, statut, erreur) {
			
		},
		
		checkEmail : function(email) {
			if (email == undefined || email=='') {
				email = 'a';
			}
			$.ajax({
				type: "GET",
				url: "https://apivalidation.iraiser.eu/services/email/validation/jsonp/"+email,
				dataType: 'jsonp',
				success : ApiValidation.onCheckEmailSuccess,
				error: ApiValidation.onCheckEmailError
			});
		},
		
		onCheckEmailSuccess : function(data, statut) {
			if(data.status!="OK") {
				DntErrors.addError('email');
				$('#email').removeClass('valid');
				$('#email').addClass('error');
			} else {
				DntErrors.removeError('email');
				$('#email').removeClass('error');
				$('#email').addClass('valid');
			}
			DntErrors.displayErrors();
		},
		
		onCheckEmailError : function(data, statut, erreur) {
		
		}, 
		
		
		
		geturlapi : function(key) {
			var urlapi = "https://apivalidation.iraiser.eu/services/address/validation/jsonp/";
			var address = $('#address1').val();
			
			urlapi += address;
			
			var postcode = $('#postcode');
			var city = $('#city');
			var country = $('#country').val();
			var language = $('html').attr('lang');
			
			if (postcode!='undefined'&&postcode.val()!='undefined'&&postcode.val()!='') {
			    urlapi+="+"+postcode.val();
			}
			if (city!='undefined'&&city.val()!='undefined'&&city.val()!='') {
			    urlapi+="+"+city.val();
			}
			
			urlapi += "?key="+key;
			if (country!='undefined'&&country!='') {
				urlapi+="&c="+country;
			}
			
			if (language!='undefined'&&language!='') {
				urlapi+="&l="+language;
			}
			
			return urlapi;
			
		},
		
		geturlapipostcode : function() {
			var urlapi = "https://apivalidation.iraiser.eu/services/city/jsonp/";
			var postcode = $('#postcode');
			if (postcode!='undefined'&&postcode.val()!='undefined'&&postcode.val()!='') {
			    urlapi+=postcode.val();
			}
			return urlapi;
			
		},
		
		isNLPostcodeValidation : function() {
			return $('html')[0].lang=='nl_NL'&&$('#country').val()=='NL';
		} 
	}
}