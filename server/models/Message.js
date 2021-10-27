const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: "You need to leave a message!",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
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
