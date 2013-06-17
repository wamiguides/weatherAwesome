/*!	
* weatherAwesome.js 0.1 BETA
*
* Copyright 2013, Wami SRL http://wami.it
* Released under the creative commons
* http://creativecommons.org
*
*/
/*
var locality;
var currentWeather;
var currentIcon;
var currentTemp;
var currentImg;
var generalImg;

function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

function createSliderPage(e){
	//add menu
	for(var i=1; i<=e.length; i++) {
		$(".iosSliderButtons").append("<div class ='button' id='item"+i+"'><div class = 'border'></div></div>");
	}
	//add items
	for(var i=1; i<=e.length; i++) {
		$(".iosSlider .slider").append("<div class='item hidden-phone' id='item"+i+"' style='background: url("+e[i-1]+") no-repeat 0 0;'><div class = 'caption'><div class = 'bg'></div></div></div>");
	}		
}

function getImage(q){
	var image = "";
	$.ajax({
	    url: "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=venice%20cloudy&imgsz=medium&imgtype=photo&rsz=1&safe=moderate&callback=?",
	    dataType: "jsonp",
	    success: function(data) {
			currentImg =  data.responseData.results[0].url;
			console.log(currentImg);
			console.log(generalImg);
			//create slider
			//createSliderPage([currentImg, generalImg, currentImg, generalImg]);
			//slider
			$('.iosSlider').iosSlider({
				scrollbar: true,
				snapToChildren: true,
				desktopClickDrag: true,
				infiniteSlider: true, 
				navSlideSelector: $('.iosSliderButtons .button'),
				scrollbarHeight: '2',
				scrollbarBorderRadius: '0',
				scrollbarOpacity: '0.5',
				onSlideChange: slideContentChange,
				onSliderLoaded: slideContentChange,
				keyboardControls: true
			});

			function slideContentChange(args) {

			$('.iosSliderButtons .button').removeClass('selected');
			$('.iosSliderButtons .button:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');

			}

			
	    }
	});
	
}

function weatherAwesome(local) {
	locality = local;
	
	//current weather
	$.ajax({
	  	url : "http://api.wunderground.com/api/47b9333939d85677/geolookup/conditions/lang:IT/q/Italy/"+local+".json",
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
