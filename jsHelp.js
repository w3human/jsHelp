/* ------ Start Of jsHelp ------ */
	var jsHelp=new Boolean(true);
	
	var doc=document;
	var doc_body=((document.documentElement)?document.documentElement:document.body);

	/* IE Detection */ var ieDetected=new Boolean((navigator.appName=="Microsoft Internet Explorer")?true:false);

	/* ------ Start Of "not natively available" ------ */
		// isArray
		if(! Array.isArray) {Array.isArray=function(vArg) {return Object.prototype.toString.call(vArg) === "[object Array]";  };  }
		
		// Convert "array" For "in" Use
		Array.cfIn=function() {for (x=0; x<varX.length; x++) {varX[varX[x]]=varX[x]; delete varX[x];}}
		
		// Adding Events To...
		function addEvent(elem, evnt, func) {
			if (elem.addEventListener) {elem.addEventListener(evnt,func,false);}
			else if (elem.attachEvent) {elem.attachEvent("on"+evnt, func);}
		}
		
		// Capitalize Any String
		String.prototype.capitalize=function() {return this.charAt(0).toUpperCase() + this.slice(1);}
		
		// String Array Replacement
		String.prototype.arrayReplace=function(theMatch, theReplace, regExp) {var x=this; if (Array.isArray(theMatch) && Array.isArray(theReplace)) {for (a in theMatch) {if (regExp!=undefined) {x=x.replace(new RegExp("\\"+ theMatch[a] +"", "g"), theReplace[a]);} else {x=x.replace(theMatch[a], theReplace[a]);}}} return x;};
		
		// document.getElementsByType();
		document.getElementsByType=function(value) {
			var allElements=document.getElementsByTagName("*"), elements=new Array();
			
			for (a=0; a<allElements.length; a++) {
				var ele=allElements[a];
				
				if (ele.hasAttribute("type") && (new RegExp("("+ value +")", "g")).test(ele.getAttribute("type"))) {
					elements.splice(elements.length, 0, ele);
				}
			}
			
			return elements;
		};
	/* ------ End Of "not natively available" ------ */
	
	/* ------ Start Of SGR Cookies ------ */
	var cookieTime=360;
	
	function setCookie(c_name, value, exdays, host) {var exdate=new Date(); exdate.setDate(exdate.getDate() + exdays); var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()); document.cookie=c_name + "=" + c_value+ ((host==null)?"":";domain="+ host +"");}
	
	function getCookie(c_name) {var i,x,y,ARRcookies=document.cookie.split(";"); for (i=0;i<ARRcookies.length;i++) {x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("=")); y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1); x=x.replace(/^\s+|\s+$/g,""); if (x==c_name) {return unescape(y);}}}
	
	function deleteCookie(name, path, domain) {if (getCookie(name)) {document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";}}	
	/* ------ End Of SGR Cookies ------ */
	
	/* ------ Start Of ClassNames ------ */
	function classRegExp(xClass) {return new RegExp("(( |)("+ xClass +"))");}
	
	function hClass(ele, xClass, all) {
		if (ele!=undefined && xClass!=undefined && ele.className!=undefined) {			
			if (Array.isArray(xClass)) {
				if (all) {return (classRegExp(xClass.join(" "))).test(ele.className);}
				else {
					for_class: for (a in xClass) {
						if ((classRegExp(xClass[a])).test(ele.className)) {
							return true;
							break for_class;
						}
					}
				}
			}
			else {
				return (classRegExp(xClass)).test(ele.className);
			}
		}
	};
		
	function aClass(ele, xClass) {
		if (ele!=undefined && xClass!=undefined) {
			if (Array.isArray(xClass)) {
				for (a in xClass) {if (! hClass(ele, xClass[a])) {ele.className+=" "+xClass[a];}}
			}
			else if (! hClass(ele, xClass)) {
				ele.className+=" "+xClass;
			}
		}
	};
		
	function rClass(ele, xClass) {
		if (ele!=undefined && xClass!=undefined && ele.className!=undefined) {
			if (Array.isArray(xClass)) {
				for (a in xClass) {
					if (hClass(ele, xClass[a])) {ele.className=ele.className.replace(classRegExp(xClass[a]), "");}
				}
			}
			else if (hClass(ele, xClass)) {				
				ele.className=ele.className.replace((classRegExp(xClass)), "");
			}
		}
	};
	
	function tClass(ele, xClass, addIf) {
		function apply(className) {
			if ((addIf!=undefined && typeof(addIf)==="function" && addIf()) && (! hClass(ele, aClass))) {aClass(ele, className);}
			else {rClass(ele, className);}
		}
		
		if (ele!=undefined && xClass!=undefined) {
			if (Array.isArray(xClass)) {for (a in xClass) {apply(xClass[a]);}}
			else {apply(xClass);}
		}
	}
	/* ------ End Of ClassNames ------ */
	
	/* ------ Start Of gStyle ------ */
	function gStyle(ele, styleProp) {	
		if (ele!=undefined && styleProp!=undefined) {
			if (ele.currentStyle) {var y=ele.currentStyle[styleProp];}
			else if (window.getComputedStyle) {var y=document.defaultView.getComputedStyle(ele,null).getPropertyValue(styleProp);}
			
			return y;
		}
	}
	/* ------ End Of gStyle ------ */
	
	/* ------ Start Of AJAX ------ */
	function ajax(element, meth, URL, readyFun, error404) {
		var xmlhttp=(window.XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
						
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				element.innerHTML=xmlhttp.responseText;
				if (typeof readyFun==="function") {readyFun();}
			}
			else if (typeof error404==="function" && xmlhttp.status==404) {error404();}
		}
		
		xmlhttp.open(((meth)?meth:"GET"), URL, true);
		xmlhttp.send();
	}
	/* ------ End Of AJAX ------ */

	/* ------ Start Of "USER" ------ */
	var user=new Array();
		user.onMobileD=hClass(doc_body, "mobile");
	
	function setItem(name, value, sea) {
		if (sea!=undefined && sea==true) {
			if (sessionStorage) {sessionStorage.setItem(name, value);}
			else {setCookie(name, value);}
		}
		else {
			if (localStorage) {localStorage.setItem(name, value);}
			else {setCookie(name, value, cookieTime);}
		}
	}
	
	function getItem(name, value, sea) {
		if (sea!=undefined && sea==true && sessionStorage) {return sessionStorage.getItem(name);}
		else if (localStorage) {return localStorage.getItem(name);}
		else {return getCookie(name);}
	}
	
	function removeItem(name, sea) {
		if (sea!=undefined && sea==true &&  sessionStorage) {sessionStorage.removeItem(name);}
		else if (localStorage) {localStorage.removeItem(name);}
		else {deleteCookie(name);}
	}
	/* ------ End Of "USER" ------ */

	/* ------ Start Of WindowVars ------ */
	if (window.scrollX==undefined && window.scrollY==undefined) {
		window.scrollX=window.pageXOffset || doc_body.scrollLeft;
		window.scrollY=window.pageYOffset || doc_body.scrollTop;
		
		addEvent(window, "scroll", function() {
			window.scrollX=window.pageXOffset || doc_body.scrollLeft;
			window.scrollY=window.pageYOffset || doc_body.scrollTop;
		});
	}
	
	function windowVars(what) {
		window.width=window.innerWidth || doc_body.clientWidth;
		window.height=window.innerHeight || doc_body.clientHeight
		window.orientation=((window.width > window.height) ? "landscape" : "portrait");
		
		if (what!=undefined && window[what]!=undefined) {
			return window[what];
		}
	}
	
	windowVars();
	addEvent(window, "resize", windowVars);
	/* ------ Start Of WindowVars ------ */

	/* ------ Start Of PHP($_GET) TO JS ------ */
	function _get(q,s) { 
		s = s ? s : window.location.search; 
		var re = new RegExp('&'+q+'(?:=([^&]*))?(?=&|$)','i'); 
		var xGOT=(s=s.replace("?",'&').match(re)) ? (typeof s[1] == 'undefined' ? '' : decodeURIComponent(s[1])) : undefined;
		return xGOT;
	}
	/* ------ End Of PHP($_GET) TO JS ------ */

	/* ------ Start Of Others ------ */
		/* Current Date */ var cDate=new Date();
		/* Easier Console.Log */ function logBook(logThis) {console.log(logThis);}
		
		/* Add Style Sheet */
		function addSheet(sStyle, mediaQuery) {
			var lastSheet=document.getElementsByType("text/css"), newSheet=document.createElement("style");
				if (mediaQuery!=undefined) {newSheet.setAttribute("media", mediaQuery);}
				newSheet.innerHTML=sStyle;
			
			doc_body.insertBefore(newSheet, lastSheet[lastSheet.length]);
		}
	/* ------ End Of Others ------ */
/* ------ End Of jsHelp ------ */
