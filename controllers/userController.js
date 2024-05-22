const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.addUser = async (req, res) => {
  const { username, firstName, lastName, mobile, isAdmin } = req.body;
  try {
    await models.User.create({
      username,
      firstName,
      lastName,
      mobile,
      isAdmin: isAdmin ? true : false,
    });
    res.redirect("/users");
  } catch (error) {
    res.status(401).send("Can not add user!");
    console.error(error);
  }
};

controller.editUser = async (req, res) => {
  const { id, firstName, lastName, mobile, isAdmin } = req.body;
  try {
    await models.User.update(
      {
        firstName,
        lastName,
        mobile,
        isAdmin: isAdmin ? true : false,
      },
      { where: { id } }
    );
    res.send('ok');
  } catch (error) {
    res.status(401).send("Can not update user!");
    console.error(error);
  }
}

controller.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await models.User.destroy({ where: { id } });
    res.send('ok');
  } catch (error) {
    res.status(401).send("Can not delete user!");
    console.error(error);
  }
}

module.exports = controller;
