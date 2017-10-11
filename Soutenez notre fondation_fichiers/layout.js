function fdfLayout(){
	//container: change id & add class
	
	
	$('#container').addClass('container');
	//$('#container').css('width','auto');
	//$('#container').attr('id','');
	
	//section cloc1 bloc2 bloc3 bloc4
	
	$('#form-steps').append('<section id="mySection"></section>');
	$('#mySection').append('<div id="colG" class="col-md-8 col-sm-8 col-xs-12 pdl"></div><div id="colD" class="col-md-4 col-sm-4 col-xs-12 pdr"></div><div class="clearfix"></div>');

	$('#powered').removeClass('unit size1of3').addClass('col-md-12');
	
	$('.tax-info').addClass(' col-md-12 col-sm-12 col-xs-12');

	

};