$(document).ready(function(){

	var height = $(window).height();

	ajustesIniciales();

	function ajustesIniciales(){
		$("section#body").css; ({"margin-top": height - 400 + "pixels"})
	}


	$(document).scroll(function(){
		var scrollTop = $(this).scrollTop();
		var pixels = scrollTop / 100;

			if(scrollTop < height){
			$("#entete").css({
				"-webkit-filter": "blur(" + pixels + "px)",  
			});

		}
		

	});

});
