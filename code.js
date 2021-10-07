var storeCity = () => {
    localStorage.setItem('selectedCity', document.getElementById('filter-location-input').value);
    showRecommendation();
}

var showRecommendation = () => {
    document.getElementById('filter-location-input').value = localStorage.getItem('selectedCity')
    var selectedCity  = localStorage.getItem('selectedCity');
    document.getElementById('recommendation').innerText = '';
    if(selectedCity) document.getElementById('recommendation').innerText += ' in';
    currentSelectedCity();
    updateHotels();
}

var url = "https://developerfunnel.herokuapp.com/location"
var hotelUrl = "https://developerfunnel.herokuapp.com/hotels?city="

async function getCity() {
    var response = await fetch(url);
    var data = await response.json();
    while(document.getElementById('filter-location-input').length>1) document.getElementById('filter-location-input').remove(document.getElementById('filter-location-input').length-1);
    data.map((item) => {
        var element = document.createElement('option');
        var text = document.createTextNode(item.city_name);
        element.appendChild(text);
        element.value = item._id;
        document.getElementById('filter-location-input').appendChild(element);
    })
}

getCity();

/*Updating hotels when city is selected*/
async function updateHotels(index=0) {
    var response = await fetch(hotelUrl+localStorage.getItem('selectedCity'));
    var data = await response.json();
    
    for(var i=0; i<2; i++) {
        document.getElementsByClassName('hotel-name')[i].innerText = data[index+i].name;
        document.getElementsByClassName('hotel-address')[i].innerText = data[index+i].locality;
        document.getElementsByClassName('hotel-image')[i].style.backgroundImage = `url(${data[index+i].thumb})`
        document.getElementsByClassName('hotel-ccftwo')[i].innerHTML = '&#8377; ' + data[index+i].cost;
        document.getElementsByClassName('hotel-room-type')[i].innerText = '';
        for(var j=0; j<data[i].type.length; j++) {
            document.getElementsByClassName('hotel-room-type')[i].innerText += data[index+i].type[j].name;
            if(j<data[index+i].type.length-1) document.getElementsByClassName('hotel-room-type')[i].innerText +='||';
        }
    }

    var navbuttons = document.getElementsByClassName('nav-box')
    for(var i=0; i<navbuttons.length; i++) {
        if(i == 1+index/2) {
            document.getElementsByClassName('nav-box')[i].style.color = 'white'
            document.getElementsByClassName('nav-box')[i].style.backgroundColor = '#8c96ab'
        }
        else {
            document.getElementsByClassName('nav-box')[i].style.color = '#192f60'
            document.getElementsByClassName('nav-box')[i].style.backgroundColor = '#fbfbfb'
        }
    }
}

async function currentSelectedCity() {
    var response =  await fetch(url);
    var data = await response.json();
    data.map((item) => {
        if(item._id == localStorage.getItem('selectedCity')) document.getElementById('recommendation').innerText += ' ' + item.city_name;
    })
}

function changeFocus(index) {
    updateHotels(index);
}

function findIndex() {
    var navbuttons = document.getElementsByClassName('nav-box');
    for(var i=0; i<navbuttons.length; i++) {
        if(document.getElementsByClassName('nav-box')[i].style.color == 'white') return i;
    }
}