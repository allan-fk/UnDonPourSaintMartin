function error(msg) {
  var version = "2.5.9";
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

  if (typeof tldc === 'undefined') {
    window.tldc = {
      advid: '431204',
      domain: ''
    };
  }

  tldc.keyStr = "ABCDEFGHIJKLMNOP" +
    "QRSTUVWXYZabcdef" +
    "ghijklmnopqrstuv" +
    "wxyz0123456789+/" +
    "=";
  
  tldc.lSc = document.getElementsByTagName("script")[0];

tldc.decode64=function(a){var b="",d,c,f="",g,h="",e=0;/[^A-Za-z0-9\+\/\=]/g.exec(a);a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do d=tldc.keyStr.indexOf(a.charAt(e++)),c=tldc.keyStr.indexOf(a.charAt(e++)),g=tldc.keyStr.indexOf(a.charAt(e++)),h=tldc.keyStr.indexOf(a.charAt(e++)),d=d<<2|c>>4,c=(c&15)<<4|g>>2,f=(g&3)<<6|h,b+=String.fromCharCode(d),64!=g&&(b+=String.fromCharCode(c)),64!=h&&(b+=String.fromCharCode(f));while(e<a.length);return unescape(b)};
tldc.tl_urlencode=function(a){a=(a+"").toString();return encodeURIComponent(a).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")};
tldc.tl_stringify=function(a){var b=typeof a;if("object"!=b||null===a)return"string"==b&&(a='"'+a+'"'),String(a);var d,c,f=[],g=a&&a.constructor==Array;for(d in a)a.hasOwnProperty(d)&&(c=a[d],b=typeof c,"string"==b?c='"'+c+'"':"object"==b&&null!==c&&(c=tldc.tl_stringify(c)),f.push((g?"":'"'+d+'":')+String(c)));return(g?"[":"{")+String(f)+(g?"]":"}")};tldc.tl_getDomain=function(a){var b=/^(?:(?:https?|ftp):)?\/*(?:[^@]+@)?([^:/#]+)/.exec(a);return b?b[1].split(".").slice(-2).join("."):a};
tldc.tl_getReferrer=function(){var a="";if(top===self)a=document.referrer;else try{a=parent.document.referrer}catch(b){a=""}a=a.substr(a.indexOf("://")+3);return a=a.substr(0,255)};tldc.tl_getLocation=function(){var a="",a=top===self?window.location.href:document.referrer;""===a&&(a=parent.document.location.href);a=a.substr(a.indexOf("://")+3);return a=a.substr(0,255)};
tldc.tl_setCookie=function(a,b,d,c,f,g){var h;d&&(h=new Date,h.setTime(h.getTime()+d));document.cookie=a+"="+b+(d?";expires="+h.toGMTString():"")+";path="+(c||"/")+(f?";domain="+f:"")+(g?";secure":"")};tldc.tl_getCookie=function(a){return(a=(new RegExp("(^|;)[ ]*"+a+"=([^;]*)")).exec(document.cookie))?a[2]:0};tldc.tl_insertInDom=function(a){var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)};
tldc.injectScript=function(a,b){var d=a.id,c=a.code,f=a.src,g=a.async,h=a.defer,e=document.createElement("script");e.type="text/javascript";d&&(e.id=d);g&&e.setAttribute("async","async");h&&e.setAttribute("defer","defer");e.readyState?e.onreadystatechange=function(){if("loaded"==e.readyState||"complete"==e.readyState)e.onreadystatechange=null,b()}:e.onload=function(){b()};f?e.src=f:e.text=tldc.decode64(c);tldc.lSc.parentNode.insertBefore(e,tldc.lSc)};
tldc.rLoad=function(a){for(var b=0;b<a.length;b++)tldc.injectScript(a[b],function(){})};tldc.tl_check4xconv=function(a){for(var b=0;b<tldc.ses.xconv.length;b++)if(parseInt(tldc.ses.xconv[b])===a)return!0;return!1};tldc.tl_addXconv=function(a){tldc.ses.xconv.push(a);tldc.tl_setSessionCookie(tldc.ses)};tldc.tl_addSeg=function(a){tldc.ses.seg.push(a);tldc.tl_setSessionCookie(tldc.ses)};tldc.tl_isSiteDomain=function(a){var b;b=tldc.domain.toLowerCase();return a===b?!0:!1};
tldc.tl_updateAnalyticsData=function(){if(!tldc.analytics_loaded){var a=Math.round((new Date).getTime()/1E3),b=tldc.tl_getDomain(tldc.referrer_url),d=tldc.vis||tldc.tl_loadVisitorCookie(),c=tldc.ses||tldc.tl_loadSessionCookie(),f=tldc.ref||tldc.tl_loadCampaignCookie(),g=!c.session;tldc.analytics_loaded=!0;d.total_page_cnt++;g?(c.session=!0,d.vis_cnt++,d.prev_vis_ts=d.curr_vis_ts,d.prev_page_cnt=d.curr_page_cnt,d.curr_page_cnt=1):d.curr_page_cnt++;d.curr_vis_ts=a;if(g||b!==tldc.domain&&tldc.referrer_url!==
f.ref_url)f.ref_url=tldc.referrer_url.slice(0,512),f.ref_ts=a,f.page_url=tldc.locationHref.slice(0,512),f.dm=tldc.domain,tldc.tl_setCampaignCookie(f),a=document.createElement("img"),a.style.position="absolute",a.style.height=0,a.style.width=0,a.setAttribute("id","imgTP"),a.src=document.location.protocol+"//its.tradelab.fr/?type=tp&advid="+tldc.advid+"&adata="+tldc.tl_getAnalyticsData(),tldc.tl_insertInDom(a);tldc.tl_setVisitorCookie(d);tldc.tl_setSessionCookie(c)}};
tldc.firePixel=function(a,b){var d=document.createElement("img"),c;d.style.position="absolute";d.style.height=0;d.style.width=0;c=document.location.protocol;c=("https:"===c?c+"//secure.adnxs.com/":c+"//ib.adnxs.com/")+("seg?add="+[].concat(a).join(","));null!==b&&(c+=":"+b);c+="&t=2";d.src=c;tldc.tl_insertInDom(d)};tldc.tl_sync=function(a){tldc.ses.uuid2=a;tldc.tl_setSessionCookie(tldc.ses);a=a.slice(-2);tldc.firePixel("2491894",a)};
tldc.tl_loadVisitorCookie=function(){var a=tldc.tl_getCookie("_tlv"),b=Math.round((new Date).getTime()/1E3);return a.length?(a=a.split("."),{vis_cnt:a[0],frst_vis_ts:a[1],prev_vis_ts:a[2],curr_vis_ts:a[3],total_page_cnt:a[4],prev_page_cnt:a[5],curr_page_cnt:a[6]}):{vis_cnt:0,frst_vis_ts:b,prev_vis_ts:0,curr_vis_ts:b,total_page_cnt:0,prev_page_cnt:0,curr_page_cnt:1}};
tldc.tl_loadCampaignCookie=function(){var a=tldc.tl_getCookie("_tlc"),b={ref_url:"",ref_ts:0,page_url:"",dm:""};return a.length?(a=-1<a.indexOf("|")?a.split("|"):a.split(":"),4!==a.length?b:{ref_url:a[0],ref_ts:a[1],page_url:a[2],dm:a[3]}):b};
tldc.tl_loadSessionCookie=function(){var a=tldc.tl_getCookie("_tls");return a?(a=a.split("."),"undefined"===typeof a[1]&&(a[1]=""),"undefined"===typeof a[2]&&(a[2]=""),"undefined"===typeof a[3]&&(a[3]=""),{session:!0,xconv:""===a[1]?[]:a[1].split(","),seg:""===a[2]?[]:a[2].split(","),uuid2:""===a[3]?"":a[3]}):{session:!1,xconv:[],seg:[],uuid2:""}};
tldc.tl_loadParamsCookie=function(){var a=tldc.tl_getCookie("_tlp"),b;b=[];var d={};if(a.length){b=a.split("#");b=b[0].split(",");for(a=0;a<b.length;a++){var c=[],c=b[a].split(":");d[c[0]]=c[1]}return{fsegs:d}}return{fsegs:{}}};tldc.tl_loadAnalyticsCookies=function(){tldc.ref=tldc.tl_loadCampaignCookie();tldc.vis=tldc.tl_loadVisitorCookie();tldc.ses=tldc.tl_loadSessionCookie()};
tldc.tl_getAnalyticsData=function(){var a=tldc.ref||tldc.tl_loadCampaignCookie(),b=tldc.vis||tldc.tl_loadVisitorCookie();return tldc.tl_urlencode(tldc.tl_stringify({c:a,v:b}))};tldc.tl_getParamsData=function(){var a=tldc.params||tldc.tl_loadParamsCookie();return tldc.tl_urlencode(tldc.tl_stringify(a))};
tldc.tl_setVisitorCookie=function(a){tldc.tl_setCookie("_tlv",a.vis_cnt+"."+a.frst_vis_ts+"."+(a.prev_vis_ts||"")+"."+a.curr_vis_ts+"."+a.total_page_cnt+"."+a.prev_page_cnt+"."+a.curr_page_cnt,tldc.config_visitor_cookie_timeout,tldc.config_cookie_path,tldc.config_cookie_domain)};tldc.tl_setSessionCookie=function(a){a="*."+a.xconv.join(",")+"."+a.seg.join(",")+"."+a.uuid2;tldc.tl_setCookie("_tls",a,tldc.config_session_cookie_timeout,tldc.config_cookie_path,tldc.config_cookie_domain)};
tldc.tl_setCampaignCookie=function(a){var b=[];b.push(encodeURIComponent(a.ref_url));b.push(a.ref_ts);b.push(encodeURIComponent(a.page_url));b.push(a.dm);tldc.tl_setCookie("_tlc",b.join(":"),tldc.config_referrer_cookie_timeout,tldc.config_cookie_path,tldc.config_cookie_domain)};tldc.tl_setParamsCookie=function(a){var b="";a=a.fsegs;var d=[],c;for(c in a)a.hasOwnProperty(c)&&d.push(c+":"+a[c]);b+=d.join(",");tldc.tl_setCookie("_tlp",b,tldc.config_params_cookie_timeout,tldc.config_cookie_path,tldc.config_cookie_domain)};
tldc.tl_initTagman=function(){if(""===tldc.domain||"undefined"===tldc.domain||"null"===tldc.domain)tldc.domain=tldc.tl_getDomain(location.hostname);tldc.analytics_loaded=!1;tldc.locationHref=tldc.tl_getLocation();tldc.referrer_url=tldc.tl_getReferrer();tldc.config_visitor_cookie_timeout=864E5;tldc.config_params_cookie_timeout=864E5;tldc.config_session_cookie_timeout=18E5;tldc.config_referrer_cookie_timeout=864E5;tldc.config_cookie_path="/";tldc.config_cookie_domain="."+tldc.domain;tldc.tl_setCookie("_tlc",
"",-1E4,"/",location.hostname);tldc.tl_setCookie("_tls","",-1E4,"/",location.hostname);tldc.tl_setCookie("_tlv","",-1E4,"/",location.hostname);tldc.tl_loadAnalyticsCookies();tldc.params=tldc.tl_loadParamsCookie();tldc.tl_updateAnalyticsData()};

   var dUrl = tldc.tl_getLocation(),
    scriptArray = [],
    n = 0;

  window.tl_sync = tldc.tl_sync;
  window.injectScript = tldc.injectScript;
  window.lSc = tldc.lSc;

  tldc.tl_initTagman();
  
  
  
  if ( dUrl.match(/checkout\/onepage\/success/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/conv/481693.js"};
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/299.js?add=2386265"};
}
if ( dUrl.match(/formulaire/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/seg.js?add=2790775"};
}
if ( dUrl.match(/DON\_NOEL/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/823.js?add=4264083"};
}
if ( dUrl.match(/cestplusquuncadeau\.fr\/les\-cadeaux\-par\-occasion\-d\-offrir/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/823.js?add=4229327"};
}
if ( dUrl.match(/les\-cadeaux\-par\-occasion\-d\-offrir\/fete\-du\-moment\/bonnes\-fetes\.html/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/823.js?add=4264144"};
}
if ( dUrl.match(/les\-cadeaux\-par\-occasion\-d\-offrir\/fete\-du\-moment\/bonne\-fete\.html/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/823.js?add=4264145"};
}
if ( dUrl.match(/les\-cadeaux\-par\-occasion\-d\-offrir\/fete\-du\-moment\/meilleurs\-voeux\.html/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/823.js?add=4264150"};
}
if ( dUrl.match(/checkout\/cart/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/823.js?add=4264203"};
}
if ( dUrl.match(/checkout\/onepage/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/823.js?add=4264188"};
}
if ( dUrl.match(/merci\-de\-votre\-don/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/conv/481693.js"};
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/299.js?add=2386265"};
}
if ( dUrl.match(/ISF\_TOUTES\_CAUSES\/\~mon\-don/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/299.js?add=5166753"};
}
if ( dUrl.match(/mono\-affectation/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/299.js?add=5166753"};
	scriptArray[n++] = {"code":"CiAgICBjb25zb2xlLmxvZygnb2snKTsK"};
}
if ( dUrl.match(/projet/i) ) {
	scriptArray[n++] = {"code":"CnZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnQmxvY01hc2sgcG9wdXBNZXJjaScpOwpzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IAoJaWYgKHguc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyIpewoJCS8vdmFyIGVsZW0gPSB7InNyYyI6Ii8vY2RuLnRyYWRlbGFiLmZyL2NvbnYvMTQ0NzgxLmpzIn07CgkJLy9pbmplY3RTY3JpcHQoZWxlbSwgZnVuY3Rpb24oKXt9KTsKCQljb25zb2xlLmxvZygnb2snKTsKCX0KfSwgMzAwMCk7Cg=="};
}
if ( dUrl.match(/unnoeldigne\/\~mon\-don/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/seg.js?add=7302939"};
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/conv/794403.js"};
}
if ( dUrl.match(/mon\-don/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/299.js?add=8461579"};
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/conv/794403.js"};
}
if ( dUrl.match(/leslauriersdupublic/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/conv/894638.js"};
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/299.js?add=10044153"};
}
scriptArray[n++] = {"src":"//cdn.tradelab.fr/seg.js?add=2383373"};
scriptArray[n++] = {"src":"//cdn.tradelab.fr/conv/481695.js"};
scriptArray[n++] = {"src":"//cdn.tradelab.fr/seg.js?add=488034"};
scriptArray[n++] = {"code":"CmZ1bmN0aW9uIENsaWNrVmlkKGVsLGNvbnYpewogICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLGZ1bmN0aW9uICgpewogICAgICAgIHRsZGMuaW5qZWN0U2NyaXB0KHsic3JjIjoiLy9jZG4udHJhZGVsYWIuZnIvY29udi8iK2NvbnYrIi5qcyJ9LCBmdW5jdGlvbigpe30pCiAgICB9LGZhbHNlKTsKfQpzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7CiAgICBjb25zb2xlLmxvZygiYWRkZWQzMyIpCiAgICB2YXIgc2VncyA9IFsiNzg4MDAzIiwiNzg4MDA1IiwiNzg4MDA3IiwiNzg4MDA4IiwiNzg4MDA5IiwiNzg4MDEwIiwiNzg4MDExIiwiNzg4MDEyIiwiNzg4MDEzIiwiNzg4MDE0IiwiNzg4MDE1IiwiNzg4MDE2Il0KICAgIHZhciB2aWRlb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCIudmlkZW8td2FsbC1pdGVtIik7CiAgICBmb3IgKHZhciBJID0gMDsgSSA8IHZpZGVvcy5sZW5ndGg7IEkrKykgewogICAgICAgIENsaWNrVmlkKHZpZGVvc1tJXSxzZWdzW0ldKQogICAgICAgIAogICAgfQogICAgbGFzdHZpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIi5zaW5nbGUtdmlkZW8tY29udGFpbmVyIikKICAgIGlmIChsYXN0dmlkKSBDbGlja1ZpZChsYXN0dmlkLCI3ODgwMjUiKQogICAgCn0sIDMwMDApOwo="};
  
	
	if ( tldc.ses.uuid2 === '' ) {
  	scriptArray[n++] = {'src': '//ib.adnxs.com/getuid?//its.tradelab.fr/?type=tlsync&uuid2=$UID&callback=tl_sync'};
  }

  tldc.rLoad(scriptArray);

})();

} catch(err) {
  error('tagmanv2|'+err.message);
}