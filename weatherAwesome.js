/*!	
* weatherAwesome.js 0.1 BETA
*
* Copyright 2013, Wami SRL http://wami.it
* Released under the creative commons
* http://creativecommons.org
*
*/

var jState=false;

(function() {
// Localize jQuery variable
var jQuery;
/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else { // Other browsers
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}
/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    main(); 
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
function main() { 
	var theNewScript = document.createElement("script");
	theNewScript.type = "text/javascript";
	theNewScript.src = "jquery.weatherfeed.js";
	document.getElementsByTagName("head")[0].appendChild(theNewScript);
	var waitForLoad = function () {
	    if (jState && $.fn.weatherfeed != "undefined") {
	        $('#weather-awesome').weatherfeed([locations], {
						woeid: true,
						forecast: true
					});
	    } else {
	        window.setTimeout(waitForLoad, 1000);
	    }
	};
	window.setTimeout(waitForLoad, 1000);
    $(document).ready(function($) { 
		jState = true;
    /******* Load CSS *******/
		var css_link = $("<link>", { 
		    rel: "stylesheet", 
		    type: "text/css", 
		    href: "weatherAwesome.css" 
		});
		css_link.appendTo('head');
    });
}

})(); 
rground.com/api/47b9333939d85677/geolookup/conditions/lang:IT/q/Italy/"+local+".json",
	  	dataType : "jsonp",
	  	success : function(parsed_json) {
	  		//var location = parsed_json['location']['city'];
			currentIcon = parsed_json['current_observation']['icon'];
	  		currentTemp = parsed_json['current_observation']['temp_c'];
			//get current img
			//getImage(local);
			
	  	}
	  });
	
	
}

jQuery(document).ready(function() {
	
	//init weatherAwesome
	weatherAwesome("Venice");
	
	//generalImg
	$.ajax({
	    url: "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+locality+"&imgsz=medium&imgtype=photo&rsz=1&safe=moderate&callback=?",
	    dataType: "jsonp",
	    success: function(data) {
			generalImg =  data.responseData.results[0].url;
	    }
	});
	
	
	
	
});
$(window).resize(function() {    
	console.log("ciao");
});
*/

var jState=false;




(function() {

// Localize jQuery variable
var jQuery;
/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else { // Other browsers
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    //jQuery = window.jQuery.noConflict(true);
    // Call our main function


    main(); 
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function main() { 
	
	var theNewScript = document.createElement("script");
	theNewScript.type = "text/javascript";
	theNewScript.src = "http://192.168.1.205:2000/assets/jquery.zweatherfeed.js";
	document.getElementsByTagName("head")[0].appendChild(theNewScript);
	var waitForLoad = function () {
	    if (jState && $.fn.weatherfeed != "undefined") {
	        $('#weather-awesome').weatherfeed([locations], {
						woeid: true,
						forecast: true
					});
	    } else {
	        window.setTimeout(waitForLoad, 1000);
	    }
	};
	window.setTimeout(waitForLoad, 1000);
	
    $(document).ready(function($) { 
	
		jState = true;
	
        /******* Load CSS *******/
				var css_link = $("<link>", { 
				    rel: "stylesheet", 
				    type: "text/css", 
				    href: "http://192.168.1.205:2000/assets/weather.css" 
				});
				css_link.appendTo('head');
				
	
					
					

				

				
				

    });
}

})(); 
