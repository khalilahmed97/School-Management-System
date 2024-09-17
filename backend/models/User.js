const { mongoose } = require("mongoose")

const UserSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique:true
        },

        firstName: {
           
        },
        lastName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: false,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw2H-Cxah0dKUXbIyJ4aUgB6&ust=1720682340910000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICe9LP3m4cDFQAAAAAdAAAAABAE"
        },

        isAdmin: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        }


    },
    {
        timestamps: true
    }
)

const user = mongoose.model("User", UserSchema)

module.exports = user