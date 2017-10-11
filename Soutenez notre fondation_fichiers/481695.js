if ( typeof tldc === 'undefined' ) window.tldc = {};
if ( typeof tlrp_transaction === 'object' ) tldc.xtra = tlrp_transaction;
if ( typeof extra_info === 'object' ) tldc.xtra = extra_info;
if ( typeof tldc.xtra === 'undefined' ) tldc.xtra = {};
if ( typeof tlrp_transaction === 'object' && typeof tlrp_transaction.products === 'object' ) tldc.xtra.uids = tlrp_transaction.products;
if ( typeof tldc.advid === 'undefined' ) tldc.advid = '431204';
function error(msg) {
  var version = "3.0.3";
  var now = new Date();
  var dUrl = '';
  if (top === self) dUrl = window.location.href;
  else dUrl = document.referrer;
  if (dUrl === "") dUrl = parent.document.location.href;
  var content = [now, version, msg, dUrl].join('|');
  content += '|' + navigator.userAgent;
  var errorUrl = "//its.tradelab.fr/?type=debug&content=" + encodeURIComponent(content);
  var img = new Image();
  img.src = errorUrl;
  if ( typeof console != "undefined" ) console.log(content);
}
try { 
(function(){

if ( typeof tldc.cvPx === 'undefined' ) tldc.cvPx = {};
tldc.cvPx['481695'] = {};
tldc.cvPx['481695'].a = 481695;
tldc.cvPx['481695'].l = [1608571,1610739,1610954,1965792,1965829,1965872,2125598,2564903,2564905,2564906,2585840,2969201,2969208,2969793,3374188,3374190,3374208,3557133,3557134,3557136,3557155,3557157,3560899,3595852,3595855,3595861,3595878,4050713,4050749,4050761,4050939,4050944,4051390,4051393,4051412,4051423,4051455,4051458,4475644,4475658,4475659];
tldc.cvPx['481695'].i = 7; 
tldc.cvPx['481695'].c = 30; 
tldc.cvPx['481695'].t = 'h';
tldc.cvPx['481695'].m = 'null';
tldc.cvPx['481695'].vi = 0;
tldc.cvPx['481695'].vc = 0;
tldc.cvPx['481695'].hf = 0;
tldc.cvPx['481695'].x = tldc.xtra;
var urlencode=function(e){e=(e+"").toString();return encodeURIComponent(e).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")};var stringify=function(e){var t=typeof e;if(t!="object"||e===null){if(t=="string"){e='"'+e+'"'}return String(e)}else{var n;var r;var i=[];var s=e&&e.constructor==Array;for(n in e){if(e.hasOwnProperty(n)){r=e[n];t=typeof r;if(t=="string"){r='"'+r+'"'}else if(t=="object"&&r!==null){r=stringify(r)}i.push((s?"":'"'+n+'":')+String(r))}}return(s?"[":"{")+String(i)+(s?"]":"}")}}
function insertInDom (el) {return true;}
tldc.tl_getCookie=function(a){return(a=(new RegExp("(^|;)[ ]*"+a+"=([^;]*)")).exec(document.cookie))?a[2]:0};tldc.tl_loadUUIDCookie=function(){var a=tldc.tl_getCookie("_tli");return a?a:"0"};
var TradeLabConvTracker = function (cdata) {
    var xval = 1, isrc; 
  if ( typeof tldc.tl_check4xconv === 'undefined' && typeof tl_check4xconv === 'function' ) tldc.tl_check4xconv = tl_check4xconv;
  if ( typeof tldc.tl_addXconv === 'undefined' && typeof tl_addXconv === 'function' ) tldc.tl_addXconv = tl_addXconv;
  if ( typeof tldc.tl_getAnalyticsData === 'undefined' && typeof tl_getAnalyticsData === 'function' ) tldc.tl_getAnalyticsData = tl_getAnalyticsData;   
    if ( typeof tldc.tl_check4xconv === 'function' ) {
    if ( !tldc.tl_check4xconv(481695) ) {
        if ( typeof tldc.tl_addXconv === 'function' ) tldc.tl_addXconv(481695);
      }
      else xval = 0;
  }
  if ( typeof document.cookie != 'undefined' ) {
    tldc.uuid = tldc.tl_loadUUIDCookie();
  }
    var i = document.createElement("img");
    i.style.position = "absolute";
    i.style.height = 0;
    i.style.width = 0;
    i.setAttribute('id', 'imgConv');
    if ( typeof tldc.ses == 'object' && typeof tldc.ses.uuid2 == 'string' && tldc.ses.uuid2 != ''  ) {
      isrc = "//its.tradelab.fr/?type=convr&x=" + xval + "&cdata=" + urlencode(cdata) + "&advid=" + tldc.advid;
    }
    else {
    isrc = "//ib.adnxs.com/getuid?//its.tradelab.fr/?type=convr&x=" + xval + "&uuid2=$UID&cdata=" + urlencode(cdata) + "&advid=" + tldc.advid; 
    }
    if ( typeof tldc.tl_getAnalyticsData === 'function' ) {
      isrc += "&xur=" + urlencode(tldc.locationHref) + "&adata=" + tldc.tl_getAnalyticsData();
    }
    if ( typeof tldc.uuid !== 'undefined' && tldc.uuid !== "0" ) {
      isrc += "&uuid=" + tldc.uuid;
    }
    i.src = isrc;
    insertInDom(i);
    var a=document.createElement("img");
    var asrc = '';
    a.style.position = "absolute";
    a.style.height = 0;
    a.style.width = 0;    
    if ( document.location.protocol == 'http:' ) asrc="http://ib.adnxs.com/px?id=481695";
    else asrc="https://secure.adnxs.com/px?id=481695";
    if ( typeof tldc.xtra.redirect_url != 'undefined' ) asrc += '&redir='+tldc.xtra.redirect_url;
    if ( typeof tldc.xtra.order_id != 'undefined' ) asrc += '&order_id='+tldc.xtra.order_id;
    if ( typeof tldc.xtra.value != 'undefined' ) asrc += '&value='+tldc.xtra.value;
    asrc += "&t=2";
    a.src = asrc;
    insertInDom(a);
    return true;  
}
if ( tldc.cvPx['481695'].hf == 0 ) {  
  if ( TradeLabConvTracker(stringify(tldc.cvPx['481695'])) ) tldc.cvPx['481695'].hf = 1;
}

})();

} catch(err) { error('CvPx3|'+err.message); }
