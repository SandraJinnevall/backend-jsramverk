const { Schema, model } = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [
        {
          token: {
            type: String,
            required: true
          }
        }
      ]
})

userSchema.pre("save", async function(next) {
    var user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 12);
    }
    next();
  });
  
userSchema.methods.generateAuthToken = async function() {
    var user = this;
    var payload = { _id: user._id, name: user.name, email: user.email };
    var token = jwt.sign(payload, "secret", { expiresIn: '1h'});
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};
  
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error({ error: "Check authentication credentials" });
    }
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      throw new Error({ error: "Check authentication credentials" });
    }
    return user;
};
  

const User = model("User", userSchema);
module.exports = User;