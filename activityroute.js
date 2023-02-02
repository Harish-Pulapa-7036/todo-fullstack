const router = require("express").Router();
const activitymodel = require("./activitymodel");
const bodyparser = require("body-parser");
router.use(bodyparser.json());

router.post("/activities/all", async (req, res) => {
  try {
    // console.log(req.user);

    const data = await activitymodel.create({
      Activity: req.body.Activity,
      userid: req.user,
    });
    return res.json({
      data,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
router.get("/activities/all", async (req, res) => {
  try {
    let data = await activitymodel.find({ userid: req.user });
    res.json({
      data,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
router.get("/activities/start/:id", async (req, res) => {
  try {
    let updatedata = await activitymodel.updateOne(
      { _id: req.params.id },
      { $set: { status: "ongoing" } }
    );
    let data = await activitymodel.find({ userid: req.user });
    res.json({
      data,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
router.get("/activities/end/:id", async (req, res) => {
  try {
    let updatedata = await activitymodel.updateOne(
      { _id: req.params.id },
      { $set: { status: "Completed" } }
    );
    let data = await activitymodel.find({ userid: req.user });
    res.json({
      data,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
router.get("/activities/pause/:id", async (req, res) => {
  try {
    let statuscheck = await activitymodel.findOne({ _id: req.params.id });
    let data = await activitymodel.find({ userid: req.user });

    if (statuscheck.status !== "Completed") {
      let updatedata = await activitymodel.updateOne(
        { _id: req.params.id },
        { $set: { status: "pending" } }
      );
      res.json({
        data,
      });
    } else {
      res.json({
        message: "already completed can't end",
        data,
      });
    }
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
module.exports = router;
