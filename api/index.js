const router = require("express").Router();

const {
  models: { User, Car, Sale },
} = require("../db");

router.get("/users", async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (ex) {
    console.log(ex);
  }
});
//route for users

router.get("/cars", async (req, res, next) => {
  try {
    res.send(await Car.findAll());
  } catch (ex) {
    console.log(ex);
  }
});
//route for cars

router.get("/users/:id/sales", async (req, res, next) => {
  try {
    res.send(
      await Sale.findAll({
        where: {
          userId: req.params.id,
          // we only want the sales that have the current users selected id; gives us the sales of any particular user
        },
        include: {
          Car,
          //shows the model of the car used in the sale
        },
      })
    );
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
