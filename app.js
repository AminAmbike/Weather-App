const express = require("express");

const https = require("https");

const app = express();

const bodyParser = require("body-parser");

const ejs = require("ejs")

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", function(req,res) {
    // res.sendFile(__dirname +"/index.html")
    res.render("index")
});

app.post("/", function(req,res) {
    req.body.cityName

    const APIKey = "5db6b61aa79ddceacc340824e170fd4b";
    const unit = "metric";
    const query = req.body.cityName;
    const URL = "https://api.openweathermap.org/data/2.5/weather?&q=" + query + "&appid=" + APIKey + "&units=" + unit;
    https.get(URL, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = Math.round(weatherData.main.temp);
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
            const humidity = Math.round(weatherData.main.humidity);
            const wind = Math.round(weatherData.wind.speed);
            const feelslike = Math.round(weatherData.main.feels_like);
            const icon = weatherData.weather[0].icon;
            const imageURL = " https://openweathermap.org/img/wn/" + icon +"@2x.png"
            console.log(weatherData);
            res.render("search", {
                cityname: query,
                temp: temp,
                weatherDescription: weatherDescription,
                icon: icon,
                imageURL: imageURL,
                wind: wind,
                humidity: humidity,
                feelslike: feelslike
            });
        })
    });

})



app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
