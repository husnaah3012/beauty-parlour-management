const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");

const PORT = process.env.PORT || 5000;


const server = http.createServer(app);

app.get("/", (req, res) => {
    res.send("Beauty Parlour Server + Socket.IO is Running");
});


const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("testMessage", (message) => {
    console.log("Message received:", message);
});

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});