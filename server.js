
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.static("."));

const cityCoordinates = {

  Bengaluru: { lat: 12.9716, lon: 77.5946 },
  Mysuru: { lat: 12.2958, lon: 76.6394 },
  Mangalore: { lat: 12.9141, lon: 74.8560 },
  Hubli: { lat: 15.3647, lon: 75.1240 },

  Belagavi: { lat: 15.8497, lon: 74.4977 },
  Kalaburagi: { lat: 17.3297, lon: 76.8343 },
  Raichur: { lat: 16.2076, lon: 77.3463 },
  Ballari: { lat: 15.1394, lon: 76.9214 },
  Shivamogga: { lat: 13.9299, lon: 75.5681 },
  Bidar: { lat: 17.9133, lon: 77.5301 },

  Mumbai: { lat: 19.0760, lon: 72.8777 },
  Pune: { lat: 18.5204, lon: 73.8567 },
  Nagpur: { lat: 21.1458, lon: 79.0882 },
  Nashik: { lat: 19.9975, lon: 73.7898 },
  Aurangabad: { lat: 19.8762, lon: 75.3433 },
  Kolhapur: { lat: 16.7050, lon: 74.2433 },
  Thane: { lat: 19.2183, lon: 72.9781 },

  Hyderabad: { lat: 17.3850, lon: 78.4867 },
  Warangal: { lat: 17.9689, lon: 79.5941 },
  Karimnagar: { lat: 18.4386, lon: 79.1288 },
  Nizamabad: { lat: 18.6725, lon: 78.0941 },

  Chennai: { lat: 13.0827, lon: 80.2707 },
  Coimbatore: { lat: 11.0168, lon: 76.9558 },
  Madurai: { lat: 9.9252, lon: 78.1198 },
  Salem: { lat: 11.6643, lon: 78.1460 },

  Kochi: { lat: 9.9312, lon: 76.2673 },
  Thiruvananthapuram: { lat: 8.5241, lon: 76.9366 },
  Kozhikode: { lat: 11.2588, lon: 75.7804 },
  Thrissur: { lat: 10.5276, lon: 76.2144 },

  Vijayawada: { lat: 16.5062, lon: 80.6480 },
  Visakhapatnam: { lat: 17.6868, lon: 83.2185 },
  Guntur: { lat: 16.3067, lon: 80.4365 },
  Nellore: { lat: 14.4426, lon: 79.9865 }

};




app.get("/cities", (req, res) => {
  res.json(Object.keys(cityCoordinates));
});

app.get("/places", async (req, res) => {
  try {

    const city = req.query.city;
    const category = req.query.category;

    const coords = cityCoordinates[city];

    if (!coords) {
      return res.json([]);
    }

    let geoCategory = "";

    switch (category) {

      case "hospital":
        geoCategory = "healthcare.hospital";
        break;

      case "restaurant":
        geoCategory = "catering.restaurant";
        break;

      case "cafe":
        geoCategory = "catering.cafe";
        break;

      case "salon":
        geoCategory = "service.beauty";
        break;

      case "garage":
        geoCategory = "service.vehicle";
        break;

      case "petrol":
        geoCategory = "service.vehicle.fuel";
        break;

      default:
        geoCategory = "catering.restaurant";
    }

    const url =
      `https://api.geoapify.com/v2/places?categories=${geoCategory}&filter=circle:${coords.lon},${coords.lat},5000&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`;

    const response = await axios.get(url);



let categoryImage = "";

switch (category) {

  case "hospital":
    categoryImage = "image\hospitallll.png";
    break;

  case "restaurant":
    categoryImage = "image\resturant.png";
    break;

  case "cafe":
    categoryImage = "image\cafe.png";
    break;

  case "salon":
    categoryImage = "image\salons.png";
    break;

  case "garage":
    categoryImage = "C:\\Users\\DEEPIKA S MATHPATI\\OneDrive\\Desktop\\CityAssist\\image\\garages.png";
    break;

  case "petrol":
    categoryImage = "C:\\Users\\DEEPIKA S MATHPATI\\OneDrive\\Desktop\\CityAssist\\image\\petrolpump.png";
    break;

  default:
    categoryImage = "image\resturant.png";
}




const places =
  response.data.features.map(place => ({

    name:
      place.properties.name ||
      "Unnamed Place",

    address:
      place.properties.formatted ||
      "Address unavailable",

    rating:
      (Math.random() * (5 - 3.8) + 3.8).toFixed(1),

    reviews:
      Math.floor(Math.random() * 4000) + 100,

    image:
      categoryImage,

    mapLink:
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.properties.formatted)}`

  }));



    res.json(places);

  } catch (error) {

    console.log(error.message);
    res.json([]);

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


