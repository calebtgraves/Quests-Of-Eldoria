import { createServer } from "http";
import {Server} from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer,{
    cors: {
        origin: ["http://localhost:5173","http://localhost:5174","http://10.9.29.194:5173","http://10.9.29.194:5174"]
    }
})

let users = {};
let hosts = {};
let gameIds = []

function generateGameId(){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 4) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    if(result in gameIds){
        result = generateGameId()
    }
    gameIds.push(result)
    return result;
}

io.on("connection", socket=> {
    console.log(`User ${socket.id} connected`)
    io.to(socket.id).emit('connected')
    socket.on('host', (socketId) =>{
        console.log(`User ${socketId} is hosting`)
        let thisHost = {
            socketId:socketId,
            questId: generateGameId(),
            connectedUsers:[]
        }
        hosts[thisHost.questId] = thisHost;
        io.to(socketId).emit("questCode",thisHost.questId)
    })
    socket.on('player',(socketInfo)=>{
        console.log(`user ${socketInfo[0]} is attempting to join ${socketInfo[1].toUpperCase()}`)
        if(gameIds.includes(socketInfo[1].toUpperCase())){
            users[socketInfo[0]] = {
                socketId:socketInfo[0],
                host:hosts[socketInfo[1].toUpperCase()],
                characterInfo:socketInfo[2]
            }
            hosts[socketInfo[1].toUpperCase()].connectedUsers.push(socketInfo[0])
            io.to(hosts[socketInfo[1].toUpperCase()].socketId).emit('connectedPlayer',users[socketInfo[0]])
            io.to(socketInfo[0]).emit('playerConnected',hosts[socketInfo[1].toUpperCase()].connectedUsers[0]==socketInfo[0])
        }
        else{
            io.to(socketInfo[0]).emit('invalidCode');
        }
    })
})

httpServer.listen(3000, () => console.log('listening on port 3000'))