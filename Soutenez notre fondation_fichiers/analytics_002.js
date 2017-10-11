
/**************************************
	copyright : iRaiser SARL 
	version   : 4.1
***************************************/

function iraiser_analytics(args){
	try{
		var auth_key = null;
		if(typeof(args["auth_key"])!="undefined"){
			auth_key = args["auth_key"];
		}else{return;}
		
		var url = (typeof(args["url"])!="undefined") ?
					args["url"]	:
					'https://analytics.iraiser.eu';
		
		var params = (typeof(args["params"])!="undefined") ?
					('&'+args["params"]) :
					'';
		var calledscript = document.createElement('script');
		calledscript.type = 'text/javascript';
		calledscript.async = true;
		calledscript.src = url+'?auth_key='+auth_key+'&site='+window.location.hostname+params;
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(calledscript, s);
	}catch(e){}
}
