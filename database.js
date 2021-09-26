let mongoose = require("mongoose");
const dotenv = require("dotenv").config();
let Person = require("./src/models/user");
// const server = "127.0.0.1:27017"; // REPLACE WITH YOUR DB SERVER
// const database = "contact"; // REPLACE WITH YOUR DB NAME
// console.log(process.env.MONGO_URL);
//*************************************
//setting up mongoose
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      // .connect(`mongodb://${server}/${database}`, {
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }
}
//create and save record Model
let rabeb = new Person({
  name: "rabeb",
  age: 27,
  favoriteFoods: ["burrito", "apple pie", "guac"],
});
rabeb.save((err, data) => {
  if (err) {
    console.log(err);
  } else {
    // console.log(data);
  }
});

//create many records
//the argument to be passed in the model.create
let arrayOfPeople = [
  {
    name: "Anja",
    age: 23,
    favoriteFoods: ["sushi", "pizza", "candy"],
  },
  {
    name: "Raja",
    age: 26,
    favoriteFoods: ["chocolate", "brownies", "pizza"],
  },
  {
    name: "Taher",
    age: 34,
    favoriteFoods: ["pizza", "coffee", "steak"],
  },
];
// let pizzaPeople = [
//   {
//     name: "Imad",
//     age: 26,
//     favoriteFoods: ["pizza"],
//   },
//   {
//     name: "Arij",
//     age: 8,
//     favoriteFoods: ["pizza", "apple"],
//   },
//   {
//     name: "Bill",
//     age: 30,
//     favoriteFoods: ["pizza", "coffee", "steak"],
//   },
// ];

//model.create
Person.create(arrayOfPeople, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

//find by name
Person.find({ name: "rabeb" }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

//findOne by favoriteFoods
Person.findOne({ favoriteFoods: { $all: ["burrito"] } }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

//another method for returning just one
// Person.find({ favoriteFoods: { $all: ["prawns"] } }, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data[0]);
//   }
// });

//find by id
Person.findById("615054efeb480d402e34f365", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data[0]);
  }
});

//Perform classic updates runing find edit and save
Person.findById("615054efeb480d402e34f365", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    data.age = 24;
    data.favoriteFoods.push("japanese delecacies");
    console.log(data);
  }
});

//findOneandUpdate
Person.findOneAndUpdate(
  { name: "Raja" },
  { age: 20 },
  { new: true },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }
);

//delete many
Person.remove({ name: "Poppy" }, (err, data) => {
  if (err) {
    console.log(err);
  }
});

// Person.findOneAndRemove({ name: "Taher" }, (err, data) => {
//   if (err) {
//     console.log(err);
//   }
// });

//helpers
Person.find({ favoriteFoods: { $all: ["pizza"] } })
  .sort({ name: "asc" })
  .limit(5)
  .select("-favoriteFoods")
  .exec((err, filteredData) => {
    if (err) {
      console.log(err);
    } else {
      console.log(filteredData);
      done(null, filteredResults);
    }
  });

module.exports = new Database();
