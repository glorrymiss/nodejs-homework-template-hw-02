const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const validEmail =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 8,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: validEmail,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL:{
    type: String,
    required: true
      }
  
    
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const validRegisterSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(validEmail).required(),
  subscription: Joi.string(),
  avatar: Joi.string(),
});

const validLoginSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(validEmail).required(),
});

const validStatusSchema = Joi.object({
  subscription: Joi.string().required(),
});

module.exports = {
  User,
  validRegisterSchema,
  validLoginSchema,
  validStatusSchema,
};
