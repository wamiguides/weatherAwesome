/**
 * from: jquery.zWeatherFeed Thanks :)
**/

(function($){

	$.fn.weatherfeed = function(locations, options, fn) {	
	
		// Set plugin defaults
		var defaults = {
			unit: 'c',
			image: true,
			country: false,
			highlow: true,
			wind: true,
			humidity: false,
			visibility: false,
			sunrise: false,
			sunset: false,
			forecast: false,
			link: true,
			showerror: true,
			linktarget: '_self',
			woeid: false
		};  
		var options = $.extend(defaults, options); 
		var row = 'odd';

		// Functions
		return this.each(function(i, e) {
			var $e = $(e);
			
			// Add feed class to user div
			if (!$e.hasClass('weatherFeed')) $e.addClass('weatherFeed');

			// Check and append locations
			if (!$.isArray(locations)) return false;

			var count = locations.length;
			if (count > 10) count = 10;

			var locationid = '';

			for (var i=0; i<count; i++) {
				if (locationid != '') locationid += ',';
				locationid += "'"+ locations[i] + "'";
			}

			// Cache results for an hour to prevent overuse
			now = new Date();

			// Select location ID type
			var queryType = options.woeid ? 'woeid' : 'location';
					
			// Create Yahoo Weather feed API address
			var query = "select * from weather.forecast where "+ queryType +" in ("+ locationid +") and u='"+ options.unit +"'";
			var api = 'http://query.yahooapis.com/v1/public/yql?q='+ encodeURIComponent(query) +'&rnd='+ now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() +'&format=json&callback=?';

			// Send request
			$.ajax({
				type: 'GET',
				url: api,
				dataType: 'json',
				success: function(data) {

					if (data.query) {
			
						if (data.query.results.channel.length > 0 ) {
							
							// Multiple locations
							var result = data.query.results.channel.length;
							for (var i=0; i<result; i++) {
							
								// Create weather feed item
								_process(e, data.query.results.channel[i], options);
							}
						} else {

							// Single location only
							_process(e, data.query.results.channel, options);
						}

						// Optional user callback function
						if ($.isFunction(fn)) fn.call(this,$e);

					} else {
						if (options.showerror) $e.html('<p>Weather information unavailable</p>');
					}
				},
				error: function(data) {
					if (options.showerror) $e.html('<p>Weather request failed</p>');
				}
			});

			// Function to each feed item
			var _process = function(e, feed, options) {
				var $e = $(e);

				// Check for invalid location
				if (feed.description != 'Yahoo! Weather Error') {

					// Format feed items
					var wd = feed.wind.direction;
					if (wd>=348.75&&wd<=360){wd="N"};if(wd>=0&&wd<11.25){wd="N"};if(wd>=11.25&&wd<33.75){wd="NNE"};if(wd>=33.75&&wd<56.25){wd="NE"};if(wd>=56.25&&wd<78.75){wd="ENE"};if(wd>=78.75&&wd<101.25){wd="E"};if(wd>=101.25&&wd<123.75){wd="ESE"};if(wd>=123.75&&wd<146.25){wd="SE"};if(wd>=146.25&&wd<168.75){wd="SSE"};if(wd>=168.75&&wd<191.25){wd="S"};if(wd>=191.25 && wd<213.75){wd="SSW"};if(wd>=213.75&&wd<236.25){wd="SW"};if(wd>=236.25&&wd<258.75){wd="WSW"};if(wd>=258.75 && wd<281.25){wd="W"};if(wd>=281.25&&wd<303.75){wd="WNW"};if(wd>=303.75&&wd<326.25){wd="NW"};if(wd>=326.25&&wd<348.75){wd="NNW"};
					var wf = feed.item.forecast[0];
		
					// Determine day or night image
					wpd = feed.item.pubDate;
					n = wpd.indexOf(":");
					tpb = _getTimeAsDate(wpd.substr(n-2,8));
					tsr = _getTimeAsDate(feed.astronomy.sunrise);
					tss = _getTimeAsDate(feed.astronomy.sunset);

					// Get night or day
					if (tpb>tsr && tpb<tss) { daynight = 'day'; } else { daynight = 'night'; }

					// Add item container
					var html = '<div class="weatherItem '+ row +' '+ daynight +'"';
					if (options.image) html += ' style=" url(http://l.yimg.com/a/i/us/nws/weather/gr/'+ feed.item.condition.code + daynight.substring(0,1) +'.png); background-repeat: no-repeat;"';
					html += '>';
			
					//colors
					function colorWeather(c) {
						if(c == "0" ||c == "1" ||c == "2" ||c == "3" ||c == "4" ||c == "11" ||c == "12" ||c == "26" ||c == "28" ||c == "30" ||c == "35" ||c == "38" ||c == "39" ||c == "40" ||c == "44" ||c == "45" ||c == "47"){
							c = "day_blue"
						}else if(c == "5" ||c == "6" ||c == "7" ||c == "8" ||c == "9" ||c == "10" ||c == "13" ||c == "14" ||c == "15" ||c == "16" ||c == "17" ||c == "18" ||c == "20" ||c == "21" ||c == "22" ||c == "42" ||c == "43" ||c == "46"){
								c = "day_white"
						}
						else if(c == "24" ||c == "25" ||c == "32" ||c == "36" ||c == "34"){
								c = "day_clear"
						}
						else if(c == "27" ||c == "29"){
								c = "night_blue"
						}
						else if(c == "31" ||c == "25" ||c == "33" ){
								c = "night_clear"
						}
						return c
					}
			
					//icons
					function iconWeather(i) {
						switch(i)
						{
						case "0":
						  i = "F"
							break;
						case "1":
							i = "Z"
							break;
						case "2":
							i = "Z"
							break;
						case "3":
						  i = "Z"
							break;
						case "4":
							i = "Z"
							break;
						case "5":
							i = "X"
							break;			
						case "6":
						  i = "X"
							break;
						case "7":
							i = "X"
							break;
						case "8":
							i = "X"
							break;
						case "9":
						  i = "Q"
							break;
						case "10":
							i = "X"
							break;
						case "11":
							i = "R"
							break;							
						case "12":
						  i = "R"
							break;
						case "13":
							i = "W"
							break;
						case "14":
							i = "Q"
							break;
						case "15":
						  i = "W"
							break;
						case "16":
							i = "V"
							break;
						case "17":
							i = "X"
							break;			
						case "18":
						  i = "X"
							break;
						case "19":
							i = "F"
							break;
						case "20":
							i = "M"
							break;
						case "21":
						  i = "E"
							break;
						case "22":
							i = "E"
							break;
						case "23":
							i = "F"
							break;	
						case "24":
						  i = "F"
							break;
						case "25":
							i = "G"
							break;
						case "26":
							i = "N"
							break;
						case "27":
						  i = "%"
							break;
						case "28":
							i = "Y"
							break;
						case "29":
							i = "4"
							break;			
						case "30":
						  i = "H"
							break;
						case "31":
							i = "B"
							break;
						case "32":
							i = "B"
							break;
						case "33":
							i = "B"
							break;	
						case "34":
						  i = "B"
							break;
						case "35":
							i = "X"
							break;
						case "36":
							i = "B"
							break;							
						case "37":
						  i = "P"
							break;
						case "38":
							i = "P"
							break;
						case "39":
							i = "P"
							break;
						case "40":
						  i = "Q"
							break;
						case "41":
							i = "V"
							break;
						case "42":
							i = "X"
							break;			
						case "43":
						  i = "V"
							break;
						case "44":
							i = "H"
							break;
						case "45":
							i = "P"
							break;
						case "46":
						  i = "W"
							break;
						case "47":
							i = "P"
							break;
						default:
						  i = ")"
						}
						return i;
					}
		
					// Add item data
					html += '<div class="'+colorWeather(feed.item.condition.code)+'">'
					html += '<div class="weatherCity"><span class="date">SUN 12 APR 12.20</span><span class="city">'+ feed.location.city +'</span></div>';
					html+= '<div id="main_day">';
					html += '<div id="icon_top" data-icon="'+iconWeather(feed.item.condition.code)+'"></div>';
					html += '<div class="weatherDesc">'+ feed.item.condition.text +'</div>';
					html += '<div class="weatherTemp">'+ feed.item.condition.temp +'&deg;</div></div>';
				
					// Add optional data
				  html += '<div class="weatherRange list_day"><span data-icon="\'"></span> High: '+ wf.high +'&deg; Low: '+ wf.low +'&deg;</div>';
					html += '<div class="weatherWind list_day"><span data-icon="F"></span> Wind: '+ wd +' '+ feed.wind.speed + feed.units.speed +'</div>';
					html += '<div class="weatherHumidity list_day"><span data-icon="%"></span> Humidity: '+ feed.atmosphere.humidity +'%</div>';
					//html += '<div class="weatherVisibility list_day"><span data-icon="("></span> Visibility: '+ feed.atmosphere.visibility +'</div>';
					html += '<div class="weatherSunrise list_day"><span data-icon="A"></span> Sunrise: '+ feed.astronomy.sunrise +'</div>';
					html += '<div class="weatherSunset list_day"><span data-icon="C"></span> Sunset: '+ feed.astronomy.sunset +'</div></div>';

					// Add item forecast data
					if (options.forecast) {

						html += '<div class="weatherForecast ">';

						var wfi = feed.item.forecast;

						for (var i=0; i<wfi.length; i++) {
							html += '<div class="list_item">';
							html += '<div class="icon_top_list font-weather" data-icon="'+iconWeather(wfi[i].code)+'"></div>';
							html += '<div class="weatherForecastDay">'+ wfi[i].day +'</div>';
							html += '<div class="weatherForecastRange"><span>'+ wfi[i].high +' &deg</span> <span>'+ wfi[i].low +' &deg</span></div>';
							html += '</div>'
						}
						html += '</div>'
					}

					if (options.link) html += '<div class="weatherLink"><a href="'+ feed.link +'" target="'+ options.linktarget +'" title="Read full forecast">Full forecast</a></div>';

				} else {
					var html = '<div class="weatherItem '+ row +'">';
					html += '<div class="weatherError">City not found</div>';
				}

				html += '</div>';

				// Alternate row classes
				if (row == 'odd') { row = 'even'; } else { row = 'odd';	}
		
				$e.append(html);
			};

			// Get time string as date
			var _getTimeAsDate = function(t) {
		
				d = new Date();
				r = new Date(d.toDateString() +' '+ t);

				return r;
			};

		});
	};

})(jQuery);
class="weatherForecastDate">'+ wfi[i].date +'</div>';
							//html += '<div class="weatherForecastText">'+ wfi[i].text +'</div>';
							html += '<div class="weatherForecastRange"><span>'+ wfi[i].high +' &deg</span> <span>'+ wfi[i].low +' &deg</span></div>';
							html += '</div>'
						}

						html += '</div>'
					}

					if (options.link) html += '<div class="weatherLink"><a href="'+ feed.link +'" target="'+ options.linktarget +'" title="Read full forecast">Full forecast</a></div>';

				} else {
					var html = '<div class="weatherItem '+ row +'">';
					html += '<div class="weatherError">City not found</div>';
				}

				html += '</div>';

				// Alternate row classes
				if (row == 'odd') { row = 'even'; } else { row = 'odd';	}
		
				$e.append(html);
			};

			// Get time string as date
			var _getTimeAsDate = function(t) {
		
				d = new Date();
				r = new Date(d.toDateString() +' '+ t);

				return r;
			};

		});
	};

})(jQuery);
