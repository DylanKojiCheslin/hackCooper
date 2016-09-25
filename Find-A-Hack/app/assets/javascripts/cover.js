$(document).ready(function() {
    var hack = 10;
    for (var i = 0; i < hack; i++) {
        createHackViews('Hack-Cooper', 'September 25, 2016', 'The Cooper Union', '96');
    }

});

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
