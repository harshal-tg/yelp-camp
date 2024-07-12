const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
const Campground = require("../models/campground");
const Review = require("../models/review");

const cities = require('./cities');
const { places, descriptors } = require("./seedHelpers")

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Databse Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {

    await Campground.deleteMany({});
    await Review.deleteMany({});

    for (let i = 0; i < 50; i++) {

        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author:'6665a6590d38064728aa633a',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dicta quaerat totam est odit officiis, repellendus, iusto eos quasi ipsam, nesciunt culpa omnis error pariatur exercitationem! Corrupti ea eos sed?',
            price: price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dajrnji6r/image/upload/v1718187165/YelpCamp/wej0wgnskyruquaulyff.jpg',
                  fileName:'YelpCamp/wej0wgnskyruquaulyff'
                },
                {
                  url: 'https://res.cloudinary.com/dajrnji6r/image/upload/v1718187165/YelpCamp/jpmvjx6rfd2pzjgklrcu.jpg',
                  fileName:'YelpCamp/jpmvjx6rfd2pzjgklrcu'
                }
              ]
        })

        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})
