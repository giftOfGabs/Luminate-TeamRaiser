//GLOBAL VARS
var apiKey = '[[S0:CONVIO_API_KEY]]';
var apiUrl = 'https://secure2.convio.net/CLIENTSHORTNAME/site/CRTeamraiserAPI';//CLIENT URL
var eventType = 'PRIMARY EVENT TYPE';//PUT PRIMARY EVENT TYPE YOU WANT TO SEARCH

$(document).ready(function(){    
    // When user clicks submit button, show results from zip search rather than geo location 
    $('#zipSubmit').click(function() {
        var theInputZip = $('#inputZip').val();
        var inputType = "Zip";
        cleanResults();
        zipSearch(inputType,theInputZip);    
    });
    getLocation();    
});

var zipSearch = function(inputType,theLocation){
    console.log("entered zipSearch ",inputType,theLocation);
    $.ajax({
      type: 'GET',
      url: apiUrl, 
      data: {
        method: 'getTeamraisersByDistance',
        api_key: apiKey,
        v: '1.0',
        starting_postal: theLocation,
        distance_units: 'mi',
        search_distance: '100',
        event_type: eventType,
        list_sort_column: 'event_date',
        list_ascending: 'true',
        response_format: 'json'
      },
      dataType: 'json'
    }).done(function(data){
        cleanResults();
        processReturnedData(data,inputType,theLocation);
    });
};
var stateSearch = function(inputType,stateAbb){
    console.log("entered stateSearch ",inputType,stateAbb);
    $.ajax({
        type: 'GET',
        url: apiUrl, 
        data: {
        method: 'getTeamraisersByInfo',
        api_key: apiKey,
        v: '1.0',
        state: stateAbb,
        event_type: eventType,
        list_sort_column: 'event_date',
        list_ascending: 'true',
        response_format: 'json'
        },
        dataType: 'json'
    }).done(function(data){
        cleanResults();
        processReturnedData(data,inputType,stateAbb);
    });    
};
var citySearch = function (inputType,city) {
    console.log('entered event search ',inputType,city);
    $.ajax({
        type: 'GET',
        url: apiUrl, 
        data: {
        method: 'getTeamraisersByInfo',
        api_key: apiKey,
        v: '1.0',
        city: city,
        event_type: eventType,
        list_sort_column: 'event_date',
        list_ascending: 'true',
        response_format: 'json'
        },
        dataType: 'json'
    }).done(function(data){
        cleanResults();
        processReturnedData(data,inputType,city);
    });
};
var processReturnedData = function(data,inputType,theLocation){
    console.log(data);
    // Process array data, convert dates, build strings of upcoming and past events
    var frIdArray = new Array();
    var regUrlArray = new Array();
    var nameArray = new Array();
    var urlArray = new Array();
    var cityArray = new Array();
    var stateArray = new Array();
    var dateArray = new Array();
    var regTeamArray = new Array();
    var regIndArray = new Array();
    var locationArray = new Array();
    var mapArray = new Array();
    var mapLinkArray = new Array();
    var mapLink = new Array();
    var streetArray = new Array();
    var zipArray = new Array();
    var offsetFromNow = new Array();
    var tomorrowDate = Date.now() + 86400000; // (86400000 ms in a day) 
    var excludeDate = -15552000000;  // 86400000 ms/day * 
    var eventStringLine = "";//Setting up to hold response data that will be presented in html
    var j = 0;//event counter, will act as index for building arrays

    if(data.getTeamraisersResponse.totalNumberResults == "0"){
        cleanResults();
        noResults();
        
    }else if(data.getTeamraisersResponse.totalNumberResults == "1"){
        console.log('returned  1 results');
        if(data.getTeamraisersResponse.teamraiser.accepting_registrations == "true" || data.getTeamraisersResponse.teamraiser.accepting_donations == "true"){
            frIdArray[j] = data.getTeamraisersResponse.teamraiser.id;
            urlArray[j] = data.getTeamraisersResponse.teamraiser.greeting_url;
            nameArray[j] = data.getTeamraisersResponse.teamraiser.name;
            cityArray[j] = data.getTeamraisersResponse.teamraiser.city;
            stateArray[j] = data.getTeamraisersResponse.teamraiser.state;
            dateArray[j] = data.getTeamraisersResponse.teamraiser.event_date;
            regTeamArray[j] = data.getTeamraisersResponse.teamraiser.reg_new_team_url;
            regIndArray[j] = data.getTeamraisersResponse.teamraiser.reg_indiv_url;
            locationArray[j] = data.getTeamraisersResponse.teamraiser.location_name;
            streetArray[j] = data.getTeamraisersResponse.teamraiser.street_address;
            zipArray[j] = data.getTeamraisersResponse.teamraiser.zip;
            mapArray[j] = locationArray[j]+','+streetArray[j]+','+cityArray[j]+','+stateArray[j];
            mapLinkArray[j] = encodeURI(mapArray[j]);
            mapLink[j] = 'http://maps.google.com/?q='+mapLinkArray[j];
            j += 1;
        }
    }
    else{
        $.each(data.getTeamraisersResponse.teamraiser, function() {  
            console.log('returned multiple results');         
            if(this.accepting_registrations == "true" || this.accepting_donations == "true"){
                //Updating arrays with data from response
                frIdArray[j] = this.id;
                urlArray[j] = this.greeting_url;
                nameArray[j] = this.name;
                cityArray[j] = this.city;
                stateArray[j] = this.state;
                dateArray[j] = this.event_date;
                regTeamArray[j] = this.reg_new_team_url;
                regIndArray[j] = this.reg_indiv_url;
                locationArray[j] = this.location_name;
                streetArray[j] = this.street_address;
                zipArray[j] = this.zip;
                mapArray[j] = locationArray[j]+','+streetArray[j]+','+cityArray[j]+','+stateArray[j];
                mapLinkArray[j] = encodeURI(mapArray[j]);
                mapLink[j] = 'http://maps.google.com/?q='+mapLinkArray[j];
                j = j+1;
            }
        });
    }
    // if j>0 we have a result, process.  If j=0 we have no result, so skip computations and proceed with closing up the divs.
    if (j > 0){ 
        var i = 0; 
        for(k = 0;k <  j; k++){
            //convert date data
            var dateStr=dateArray[k]; 
            var a=dateStr.split("T");
            var d=a[0].split("-");
            var t=a[1].split(":");
            t[2] = t[2].slice(0,2); 
            var fullDate = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);  //Check to see if event has already passed  
            offsetFromNow[k] = fullDate.valueOf() - tomorrowDate.valueOf();
            dateArray[k] = (fullDate.getMonth()+1)+"."+fullDate.getDate()+"."+(fullDate.getFullYear()-2000);
            if(inputType === 'all'){
                if(cityArray[k] == null || cityArray[k] == 'None') {
                    console.log('not valid');                    
                                    
                }else{
                    if (offsetFromNow[k] < excludeDate){
                        continue;
                    } 
                    //if not past event, spit data into html     
                    if (offsetFromNow[k] > 0){          
                        eventStringLine = "";
                        eventStringLine += "<div class='eventEntry'><div class='left'><p><a href='"+urlArray[k]+"'>"+nameArray[k]+"</a><br /><span class='eventCity'>"+cityArray[k]+", "+stateArray[k]+"</span></p></div><div class='right'><p><span class='eventDate'>"+dateArray[k]+"</span><br /><span class='eventLocation'><a target='_blank' href="+mapLink[k]+">"+locationArray[k]+"</a>&nbsp;&nbsp;<span class='addressIcon'></span></span></p></div><div class='clear'></div></div>";
                        $(eventStringLine).appendTo('.upcomingEvents');
                        i += 1;            
                    }
                }
            }else{
                if (offsetFromNow[k] < excludeDate){
                    continue;
                }      
                if (offsetFromNow[k] > 0){          
                    eventStringLine = "";
                    eventStringLine += "<div class='eventEntry'><div class='left'><p><a href='"+urlArray[k]+"'>"+nameArray[k]+"</a><br /><span class='eventCity'>"+cityArray[k]+", "+stateArray[k]+"</span></p></div><div class='right'><p><span class='eventDate'>"+dateArray[k]+"</span><br /><span class='eventLocation'><a target='_blank' href="+mapLink[k]+">"+locationArray[k]+"</a>&nbsp;&nbsp;<span class='addressIcon'></span></span></p></div><div class='clear'></div></div>";
                    $(eventStringLine).appendTo('.searchResults .container .results');
                    i += 1;            
                } 
            }          
        }
        console.log(i);
        if(i == 0) {
            cleanResults();
            noResults();
        }
    }else {
        cleanResults();
        noResults();
    } 
    if (inputType == 'searchCity') {
        //scroll up to search results for city search
        var aTag = $("a[name='results']");
        $('html,body').animate({scrollTop: aTag.offset().top},'slow');
    }      
};
var getLocation = function(){
  console.log("Entered getLocation");
  var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 'infinity'
  };
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition,showError,options);
  }
  else{
    alert("Geolocation is not supported by this browser.");
    noGeo();
  }
};
var showPosition = function(position) {
  console.log("Entered showPosition lat: ",position.coords.latitude);
  console.log("Entered showPosition long: ",position.coords.longitude);  
  var input = position.coords.latitude + "," + position.coords.longitude;
  var latlngStr = input.split(',', 2);
  var latlng = new google.maps.LatLng(latlngStr[0], latlngStr[1]);
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'location': latlng }, function (result, status) {
    var zipCode = result[0]['address_components'][7]['short_name'];
    zipSearch("Zip",zipCode);
  });
};

var showError = function(error){
    switch(error.code){
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      noGeo(); 
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is currently unavailable.");
      noGeo(); 
      break;
    case error.TIMEOUT:
      alert("The request to get location timed out.  Please refresh the page to use this feature.");
      noGeo(); 
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      noGeo(); 
      break;
    }
};
var cleanResults = function() {
  $('.searchResults .container .results .eventEntry').remove();
  $('.searchResults .container .results .upcoming').remove();
  $('#inputZip').val('');
  $('#state').val('');
};
var noResults = function() {
    var error = '<p class="upcoming">Your search returned no results. Please try another search by zip code or state to see what upcoming events are happening in your community.</p>';
     $(error).appendTo('.searchResults .container .results');
}
var noGeo() = function() {
    var error = '<p class="upcoming">Search by zip code or state to see what upcoming events are happening in your community.</p>';
     $(error).appendTo('.searchResults .container .results');
}
