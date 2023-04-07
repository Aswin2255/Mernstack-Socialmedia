import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cookie from "cookie-parser";
import http from "http";
import { Server, Socket } from "socket.io";
import authrouter from "./routes/authrouer.js";
import userrouter from "./routes/userroutes.js";
import postrouter from "./routes/postroutes.js";
import adminrouter from "./routes/adminroutes.js";
import chatrouter from "./routes/chatroutes.js";
import messagerouter from "./routes/messageroutes.js";

const app = express();
/* configuration */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*--------------------- for production ------------------------------------------------------------------------*/
/*
// serving react files for production (server side rendering)
const buildpath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildpath));
app.get("/", (req, res) => {
  try {
    res.sendFile(__dirname, "../frontend/build/index.html");
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});*/
/*----------------------------------------------------------------------------------------------------------------*/

dotenv.config();

app.use(express.json());
app.use(cookie());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors({ credentials: true, origin: ["https://www.connectiflix.site","https://connectiflix.site"]}));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const httpserver = http.createServer(app);
const io = new Server(httpserver, {
  cors: {
    //origin: ["http://localhost:3000"],
    origin:["https://www.connectiflix.site","https://connectiflix.site"]
  },
});
console.log(".......");

let users = [];
const adduser = (userid, socketid) => {
  !users.some((user) => user.userid === userid) &&
    users.push({ userid, socketid });
};
const removeuser = (socketid) => {
  users = users.filter((user) => user.socketid !== socketid);
};
const getuser = (userid) => {
  console.log(users);
  return users.find((user) => user.userid === userid);
};
io.on("connection", (Socket) => {
  console.log("connectd");
  console.log(users);
  Socket.on("adduser", (userid) => {
    console.log("useradded");
    adduser(userid, Socket.id);
    io.emit("getusers", users);
  });
  Socket.on("sendmessage", ({ senderid, receiverid, text }) => {
    const user = getuser(receiverid);
    console.log(user);
    if (user) {
      io.to(user.socketid).emit("getmessage", {
        senderid,
        text,
      });
    }
  });
  Socket.on("disconnect", () => {
    console.log("user removed");
    removeuser(Socket.id);
    // io.emit("getusers",users)
  });
  Socket.on("send-message", (data) => {
    Socket.broadcast.emit("message-from-server", data);
  });
  Socket.on("typing", (data) => {
    console.log(data);
    const receiverid = getuser(data.receiverid);
    if (receiverid) {
      io.to(receiverid.socketid).emit("istyping");
    }
    // Socket.broadcast.emit("server-typing");
  });
  Socket.on("stoptyping", (data) => {
    const receiverid = getuser(data.receiverid);

    if (receiverid) {
      Socket.to(receiverid.socketid).emit("server-stoptyping");
    }
  });
});

/* mongose setup */

const port = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  })
  .then(() => {
    httpserver.listen(port, () => console.log(`server running in ${port}`));
  })
  .catch((er) => console.log(er));

/* roues aetup */

app.use("/api/auth", authrouter);
app.use("/api/user", userrouter);
app.use("/api/post", postrouter);
app.use("/api/admin", adminrouter);
app.use("/api/chat", chatrouter);
app.use("/api/message", messagerouter);
