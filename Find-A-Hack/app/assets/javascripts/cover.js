//var API_KEY = AIzaSyBIjOJzR0pqvMwvP8i8qL7f19TyKbVa-24;
//var GEO_KEY = AIzaSyC5ass_llapW5C5DXioWCTGtxnkBCF0xC4;
$(document).ready(function() {
    //  var newList = getNearBy();
    var jsonhacks = generateFakeJson();
    var numberOfHacks = jsonhacks.length;
    for (var i = 0; i < numberOfHacks; i++) {

        createHackViews( jsonhacks[i].name, jsonhacks[i].date,
        jsonhacks[i].location, jsonhacks[i].popularity);

        //createHackViews('Hack-Cooper', 'September 25, 2016', 'The Cooper Union', '96');
    }

   // var distance = document.getElementById('distance');
    var latLngB = getGeoCodeOf("The Cooper Union");
    getLocation(latLngB, 30);

});

/* hard coding some json data until we can implement it on the backend */
function generateFakeJson(){

 var json = {};
 var hackathons = {};

 var hackathon1 = {};
 hackathon1["name"] = "Hack-Cooper";
 hackathon1["date"] = "September 25, 2016";
 hackathon1["location"] = "The Cooper Union";
 hackathon1["popularity"] = "100";

 var hackathon2 = {};
 hackathon2["name"] = "HackRu";
 hackathon2["date"] = "Oct 2, 2016";
 hackathon2["location"] = "Rutgers University";
 hackathon2["popularity"] = "100";

 var hackathon3 = {};
 hackathon3["name"] = "YettyYU";
 hackathon3["date"] = "Oct 5, 2016";
 hackathon3["location"] = "Yetty University";
 hackathon3["popularity"] = "90";

 var hackathon4 = {};
 hackathon4["name"] = "Data Hack";
 hackathon4["date"] = "Oct 15, 2016";
 hackathon4["location"] = "Chicago NYU";
 hackathon4["popularity"] = "50";

 var hackathon5 = {};
 hackathon5["name"] = "Global Hack";
 hackathon5["date"] = "Nov 12, 2016";
 hackathon5["location"] = "SoHo Texas";
 hackathon5["popularity"] = "10";

 var hackathon6 = {};
 hackathon6["name"] = "Comedy Hack";
 hackathon6["date"] = "Dec 28, 2016";
 hackathon6["location"] = "Mexico City";
 hackathon6["popularity"] = "76";

 json["hackathons"] = [hackathon1, hackathon2, hackathon3, hackathon4, hackathon5, hackathon6];

 return json["hackathons"];

}


function getLocation(latLngB, maxDist) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latLngA = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       // var latLngB = new google.maps.LatLng(lat, lon);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);

        if(distance < maxDist){
         alert(distance);

         return true;
        } else {
         return false;
        }

    }, function() {
        alert("geolocation not supported!!");
    });
}

function getGeoCodeOf(address){

 var geocoder= new google.maps.Geocoder();
 geocoder.geocode( { 'address': address}, function(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
   var lat = results[0].geometry.location.lat();
   var lon = results[0].geometry.location.lng();
   var latLngB = new google.maps.LatLng(lat, lon);

   return latLngB;
  }
 });
}

function createHackViews(rname, rdate, rloc, rpop) {
    var myDiv = document.getElementById('hack-container');
    var newDiv = document.createElement('div');
    newDiv.className = 'hackathons-view';

    var name = document.createElement('div');
    name.id = 'name';
    name.innerHTML = rname;

    var date = document.createElement('div');
    var pdate = document.createElement('p');
    date.id = 'date';
    $(date).append(pdate);
    pdate.innerHTML = rdate;

    var location = document.createElement('div');
    var ploc = document.createElement('p');
    location.id = 'location';
    $(location).append(ploc);
    ploc.innerHTML = rloc;

    var icon = document.createElement('div');
    icon.id = 'icon';
    var popularity = document.createElement('p');
    popularity.id = 'popularity';
    icon.innerHTML = rpop;
    popularity.innerHTML = '★'

    $(popularity).append(icon);
    $(newDiv).append(name);
    $(newDiv).append(date);
    $(newDiv).append(location);
    $(newDiv).append(popularity);

    $(myDiv).append(newDiv);
}

function getHackathons() {
    var element = document.getElementById("name");
    element.innerHTML = "New Hackathon";
}
