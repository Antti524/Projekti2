// this will make sidebars list of theathers
function welcome() {
    var xmlhttp = new XMLHttpRequest();
    var urlTheater = "https://www.finnkino.fi/xml/TheatreAreas/";
    var LT = "";
    xmlhttp.open("GET",urlTheater,true); //xml request
    xmlhttp.send();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200){ // check that xml is ready
        var xmlTheaters = xmlhttp.responseXML; // XML respond repository
        document.getElementById("Movies").innerHTML = xmlTheaters;
        var allTheaters = xmlTheaters.getElementsByTagName("Name"); //Name is used to sidebar
        var theaterID = xmlTheaters.getElementsByTagName("ID"); // ID is use to make next call functions.
        console.log(allTheaters.length); // check for theaters length number
        for (i = 1; i < allTheaters.length; i++){
            LT += '<a href="#" onclick="movies(' + theaterID[i].childNodes[0].nodeValue + ')" class="list">' + allTheaters[i].childNodes[0].nodeValue + "</a>"; //Side menus theater list generate here
            teatteri(); //This make same as about link
        }
        document.getElementById("dropdown-theaters").innerHTML = LT;
        } else if (xmlhttp.readyState==0 && xmlhttp.status==404) { //if there is erros will show error message
            LT = '<a href="#">No list of theater avaible</a>'
            teatteri(); //This make same as about link
        }
        }
}
// time manager for show list
var today = new Date();
var dd = today.getDate();
if (dd<10) {
  dd = '0'+dd
}
var mm = today.getMonth() + 1; // arrays starts whit 0... 
if(mm<10) {
  mm = '0'+mm
}
var yyyy = today.getFullYear();
today = dd + '.' + mm + '.' + yyyy; // for movie request date
console.log(today); // Date control

var Id; // Theater ID number for XML request

//Function to get shows to view.
function movies(Id) {
  console.log("Show me the MOVIES!")
  var xmlhttp2 = new XMLHttpRequest();
  var mov;
  var shows = "";
  xmlhttp2.open("GET","https://www.finnkino.fi/xml/Schedule/?area=" + Id + "&dt=" + today,true); //xml request
  xmlhttp2.send();
  xmlhttp2.onreadystatechange=function() {
      if (xmlhttp2.readyState==4 && xmlhttp2.status==200){ // check that xml is ready
        mov = xmlhttp2.responseXML; // XML respond repository
        var x = mov.getElementsByTagName("Show"); // make show list
        shows += "<div>";
        shows += "<table>";
        shows += "<tr>";
        shows += "<th>Cover</th>";
        shows += "<th>Movie</th>";
        shows += "<th>Starting time</th>";
        shows += "<th>Length</th>";
        shows += "<th>Auditorium</th>";
        shows += "<th>Theatre</th>";
        shows += "</tr>";
        for (i = 0; i < x.length; i++) { //generate list of shows and make table of it
            shows += "<tr>";
            shows += "<td><img src='" + x[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue + "'/></td>"; // movies image
            shows += "<td>" + x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue; + "</td>"; // name of movie
            var showtime = x[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue; //time is orginaly = 2022-04-20T12:30:00
            var showtimecutter = showtime.slice(-8); //Date cutter
            var time = showtimecutter.slice(0,-3); //second cutter
            shows += "<td>" + time + "</td>";
            shows += "<td>" + x[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue; + "</td>"; // length of movie in minutes 
            shows += "<td>" + x[i].getElementsByTagName("TheatreAuditorium")[0].childNodes[0].nodeValue; + "</td>"; // Show room number
            shows += "<td>" + x[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue; + "</td>"; // Theater name
            shows += "</tr>";
        }
        shows += "</table>";//end table after all 
        shows += "</div>";
        document.getElementById("Movies").innerHTML = shows;
        document.getElementById("dropdown-theaters").style.display ="none";
      }
  }
}
//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
// https://www.w3schools.com/howto/howto_js_dropdown.asp place where dropdown is copied.
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() { // eventlistener for Theaters putton side bar, hide and show theathters
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
// End of copy

// About page view
function teatteri() {
  var about = "<h1>Welcome to Fillkino movies sites</h1><br><h3>Theater menu you can find todays movies.</h3>";
  document.getElementById("Movies").innerHTML = about;
}

//Search view made whit this
function searchview() {
  var field = '<p>Find movie whit name:</p> <input type="text" name="Movie search" id="input"><br/><input type="submit" value="Submit" onClick="search1()">' + 
  '<br><div id="result"></div>';
  document.getElementById("Movies").innerHTML = field;
}

// Search of movie name
function search1() {
  var xmlhttp3 = new XMLHttpRequest();
    var url = "https://www.finnkino.fi/xml/Schedule/";
    input = document.getElementById("input").value;
    xmlhttp3.open("GET",url,true); //xml request
    xmlhttp3.send();
    xmlhttp3.onreadystatechange=function() {
        if (xmlhttp3.readyState==4 && xmlhttp3.status==200){ // check that xml is ready
        var xml = xmlhttp3.responseXML; // XML respond repository
        var x = xml.getElementsByTagName("Show"); //this is list of shows
        var y = input.length; //For check empty search
        var shows = "";
          if (input == null || input =="") {  //for empty search message to user
            document.getElementById("Movies").innerHTML = "<br><h4>Empty Search! Try agen!</h4>"
          }
          shows += "<div>"; //if there is some movie here is upper part of table
          shows += "<table>";
          shows += "<tr>";
          shows += "<th>Cover</th>";
          shows += "<th>Movie</th>";
          shows += "<th>Starting time</th>";
          shows += "<th>Length</th>";
          shows += "<th>Auditorium</th>";
          shows += "<th>Theatre</th>";
          shows += "</tr>";
          for ( i = 0; i < x.length; i++ ) { // get trought all movies
            title = x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue; //Movie name to next line check
            if (title.search(input) != -1) { //check if there is part of movie it will generate table row of it
              shows += "<tr>";
              shows += "<td><img src='" + x[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue + "'></td>"; // movies image
              shows += "<td>" + x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue; + "</td>"; // name of movie
              var showtime = x[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue; //time is orginaly = 2022-04-20T12:30:00
              var showtimecutter = showtime.slice(-8); //Date cutter
              var time = showtimecutter.slice(0,-3); //second cutter
              shows += "<td>" + time + "</td>";
              shows += "<td>" + x[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue; + "</td>"; // length of movie in minutes 
              shows += "<td>" + x[i].getElementsByTagName("TheatreAuditorium")[0].childNodes[0].nodeValue; + "</td>"; // Show room number
              shows += "<td>" + x[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue; + "</td>"; // Theater name
              shows += "</tr>";
            }
          }
          shows += "</table>"; //end table after all 
          shows += "</div>";
          document.getElementById("result").innerHTML = shows; //Place result of user view in search menu.
    }
  }
}