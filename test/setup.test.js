process.env.NODE_ENV = "test";

const User = require("../models/User");

before((done) => {
  User.deleteMany({}, function (err) {});

  const admin = {
    email: "admin@ad.min",
    password: "$2b$10$eCVBs7VW/XwlzHbYE6IeLONwtaeJfh9Pmx7Rfvl0GbGi5BqXEKmQ6",
    isAdmin: true,
  };
  const user = {
    email: "user@us.er",
    password: "$2b$10$eCVBs7VW/XwlzHbYE6IeLONwtaeJfh9Pmx7Rfvl0GbGi5BqXEKmQ6",
  };
  User.create(admin);
  User.create(user);
  done();
});

after((done) => {
  User.deleteMany({}, function (err) {});
  done();
});
