function sayHello() {
  var ele=document.getElementById('element');
      var city = window.document.f1.city.value;
      var apikey='52fc3e030e92c51638ce749bb26f6fbc';
      var duration=window.document.f1.duration.value;
      var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&type=like&units=metric&cnt="+duration*8+"&appid="+apikey+"";
      postRequest(apiUrl);
      ele.style.display="none";
  };
  
    function updatePage(responseText) {
      var duration=window.document.f1.duration.value;
      const response = JSON.parse(responseText);
      const cityName = response.city.name;
      const weatherData = response.list;
      const coord1=response.city.coord.lat;
      const coord2=response.city.coord.lon;
      let tableHtml = "<table align='center' border='1'><thead><tr><th colspan='4'>" + cityName + " Weather Forecast for "+ duration + " days</th></tr><tr><th colspan='4'>Latitude:" +coord1+ "***Longitude:"+coord2+"</th></tr><tr><th>Date</th><th>Time</th><th>Temperature (C)</th><th>Weather</th></tr></thead><tbody>";

       weatherData.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const date1=new Date(item.dt_txt);
        const time=date1.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
       
         if(time== '12:00 PM'){
        const temperature = item.main.temp;
         const weatherDescription = item.weather[0].description; 
         
         tableHtml += "<tr><td>" + date + "</td><td>" + time + "</td><td>" + temperature + "</td><td>" + weatherDescription + "</td></tr>";}
       });
       tableHtml += "</tbody></table>";
       document.getElementById("result").innerHTML = tableHtml;
    };
   

   

  function postRequest(strURL) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', strURL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        updatePage(xmlHttp.responseText);
      }
    };
    xmlHttp.send(null); // No data to be sent in the body for POST request
  };


  
