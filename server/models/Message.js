const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: "Message is required",
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
