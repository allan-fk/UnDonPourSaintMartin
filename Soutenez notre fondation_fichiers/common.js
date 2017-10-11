var Common = {
    /*
     * Parse required qualification fields and check they are filled in
     */
    check_qualification: function(scope) {
        // Lists to check input type checkbox/radio are checked or not
        var with_response_list = [];
        var without_response_list = [];

        // Parse required qualification fields
        $('[data-scope="' + scope + '"][data-required="1"]').each(function( index ) {
            var id = $(this).attr('name');
            DntErrors.removeError(id);
            switch($(this).prop("type")){
                case 'radio':case 'checkbox':
                    if ($(this).is(':checked')){
                        // The id is checked, store it and delete from "no response list"
                        if ($.inArray(id, with_response_list) == - 1)
                            with_response_list.push(id);
                        if ((index = $.inArray(id, without_response_list)) != - 1)
                            without_response_list.splice(index, 1);
                    }else{
                        // The id is not checked, store it if there was no response before
                        if ($.inArray(id, with_response_list) == - 1
                            && $.inArray(id, without_response_list) == - 1)
                            without_response_list.push(id);
                    }
                    break;
                default:
                    if ($(this).val() == '') {
                        without_response_list.push(id);
                    }
                    break;
            }
        });
        // Show error
        for(var i in without_response_list) DntErrors.addError(without_response_list[i]);
        return (without_response_list.length == 0);
    }
};

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

try{
    $(document).ready(function(){
        var ira_stats_capture = [];
        var ira_stats_last_dt = Date.now();
        var ira_stats_last = '';
        // 17374: Correction pour tenir compte de l'étape 3
        //var form = $('#form-steps');
        //form.append('<input type="hidden" name="private_stats_capture"/>');
        $('form[id!="form_lang"]').each(function () {
            $( this ).append('<input type="hidden" name="private_stats_capture"/>');
        });
        function private_stats_capture(val){
            try{
                var tmp_dt = Date.now()-ira_stats_last_dt;
                ira_stats_last_dt = Date.now();
                if(ira_stats_last == val){
                    ira_stats_capture += (','+tmp_dt);
                }else{
                    ira_stats_capture += (' ['+val+'] '+tmp_dt);
                }
                ira_stats_last = val;
                $('input[name=private_stats_capture]').val(Base64.encode(ira_stats_capture.toString()));
            }catch(exc){}
        }
        $('input,select').keydown(function(){private_stats_capture(($(this).attr('id') || $(this).attr('name'))+'/k');})
                    .click(function(){private_stats_capture(($(this).attr('id') || $(this).attr('name'))+'/c');});

        $(document).keydown(function(e){
            /* F5 */
            if((e.which || e.keyCode) == 116){
                var params = {};
                var inputs = ['context_form_id','civility','firstname','lastname','company','address1','address2','postcode','city','country','email','nl_streetnumber','nl_streetnumberaddition','nl_inputaddress'];
                $.each(inputs, function( index, value ) {
                    var nval = $("#"+value).val() || $("input[name="+value+"]").val() ;
                    if(nval) params[value] = nval;
                });
                if(typeof Step1 != 'undefined'){
                    var amount = Step1.getDonation();
                    if(amount){
                        params.amount = amount.amount;
                        params.frequency = amount.frequency;
                    }
                }
                e.preventDefault();
                var version = '';
                if(typeof ira_form_version != 'undefined') version = ira_form_version;
                window.location.href = '/'+version+'?'+ $.param(params);
            }
        });
    });
}catch(exc_){}
