const express = require("express")
const { roleCreation, loginUser, getAllUsers, addUser, deleteUser} = require("../controllers/User")
const { verify } = require("jsonwebtoken")

const router = express.Router()

router.route("/login").post(loginUser)
router.route("/role/created",roleCreation )
router.route("/allUsers/:id").get(getAllUsers)
router.route("/addUser").post(addUser)
router.route("/delete/:id").delete(deleteUser)



module.exports = router