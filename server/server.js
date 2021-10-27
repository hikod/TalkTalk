const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
var cors = require("cors");

const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
// const server = http.createServer(app);

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { authMiddleware },
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/public")));
}

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/public/index.html"));
// });

db.once("open", () => {
  const server = app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("chat message", (msg) => {
      console.log("message: " + msg);
      io.emit("chat message", msg);
    });
  });
});
