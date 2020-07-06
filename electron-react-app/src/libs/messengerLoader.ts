(function(){

    window.wrapmsgrWidgetParameters = getWidgetParameters();

	if (!window.jQuery) {
		var jQuery = getJQuery();
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(jQuery);
	}

    if(typeof window.angular === 'undefined'){
        var angularJS = getAngularJS();
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(angularJS);

        if(angularJS.complete){
            document.write = document._write;
        }else{
            angularJS.onload = function(){
                setTimeout(function(){
                    document.write = document._write;
                }, 0);
                main();
            }
        }
    }else{
        main();
    }

    function getWidgetParameters() {
    	var url;
    	if (document.hasOwnProperty('currentScript')) {
    		url = document.currentScript.src;
    	} else {
    		url = document.getElementById('wrapmsgr').nextElementSibling.src;
    	}
        var urlSplit = url.split("?");
        var parameters = urlSplit[1] ? urlSplit[1] : null;
        var objectListParameters = [];
        if(parameters) {
            parameters = parameters.split("&");
	        for (var i = 0; i < parameters.length; i++) {
	            var splitParam = parameters[i].split("=");
	            objectListParameters[splitParam[0]] = splitParam[1];
	        }
        }
        var urlParameter = urlSplit[0].substring(0, urlSplit[0].indexOf("/js"));
        objectListParameters['url'] = urlParameter;
        
        if (!objectListParameters['host']) {
			var hostIndex = location.href.indexOf( location.host ) + location.host.length;
			objectListParameters['host'] = location.href.substring( 0, location.href.indexOf('/', hostIndex + 1) );
        }
        
        return objectListParameters;
    }

    function getJQuery() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = getParameter("url") + "/webjars/jquery/dist/jquery.min.js";
        return script;
    }
    
    function getAngularJS() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = getParameter("url") + "/webjars/angular/angular.min.js";
        return script;
    }

    function main() {
        buildWidgetHtml(function(){
            var widgetJS = document.createElement("script");
            widgetJS.type = "text/javascript";
            widgetJS.src = getParameter("url") + "/js/wrapmsgr.js?ver=" + getParameter("ver", "4");
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(widgetJS);
        });
    }

    function buildWidgetHtml(callback) {
        var widgetContainer = document.getElementById("wrapmsgr");
        widgetContainer.setAttribute("style", "display: none");
        
        //var appDiv = document.createElement("div");
        //appDiv.setAttribute("id", "WrapMsgr");
        
        //widgetContainer.appendChild(appDiv);
        loadTemplate(callback);
    }

    function loadTemplate(callback) {
        var ajax = new XMLHttpRequest();
		ajax.open("GET",getParameter("url") + "/messenger?ver=" + getParameter("ver", "4"));
		ajax.send();
		ajax.onreadystatechange=function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				var response = ajax.responseText;
				document.getElementById("wrapmsgr").innerHTML = response;
                callback();
			}
		};
    }

    function getParameter(name, defaultValue) {
    	return window.wrapmsgrWidgetParameters[name] || defaultValue;
    }


})();