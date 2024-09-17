const mongoose = require("mongoose")

const RoleSchema = mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            unique: true
        },

    },
    {
        timestamps: true
    }
)

const role = mongoose.model("Role", RoleSchema)

module.exports = role