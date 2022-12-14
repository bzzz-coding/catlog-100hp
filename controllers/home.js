const Cat = require("../models/Cat")
const utils = require('../helpers/utils')
const moment = require('moment')

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getContact: (req, res) => {
    res.render("contact.ejs")
  },
  getFeed: async (req, res) => {
    try {
      const cats = await Cat.find().sort({archived: "asc", urgent:'desc', needsHomeBy: 'asc' }).lean();
      cats.forEach(cat => cat.age = utils.getAgeFromBirthday(cat.birthday))
      res.render("feed.ejs", { cats, moment: moment });
    } catch (err) {
      console.log(err);
    }
  },
};
