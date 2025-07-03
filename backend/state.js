//here we initialize class to use the rooms in a singleton pattern

//this logic only does one room per server code
//i want to create multiple rooms in one server separated by code number
// class Room {
//   static #room = null;
//   #code = "";
//   #players = [];

//   constructor(code) {
//     if (Room.#room) {
//       return Room.#room;
//     }
//     this.#code = code;
//     this.#players = [];
//     Room.#room = this;
//   }

//   addPlayer(user) {
//     this.#players.push(user);
//     console.log(
//       `${user} has joined the room ${this.#code}, Players In: ${
//         this.#players.length
//       }`
//     );
//   }

//   removePlayer(user) {
//     this.#players = this.#players.filter((s) => s !== user);
//     console.log(
//       `${user} has left the room ${this.#code}, Remaining Occupants : ${
//         this.#players.length
//       }`
//     );
//   }
//   getAllPlayers() {
//     return this.#players;
//   }
// }

class Room {
  constructor(code) {
    this.code = code;
    this.players = [];
  }
  add(user, socket) {
    const isPresent = this.players.find(
      (u) => u.user === user || u.socket === socket
    );
    if (isPresent) {
      console.log(`User ${user} already exists in room.`);
      return false;
    } else {
      this.players.push({ user, socket });
      console.log(
        `User ${user} has joined the room ${this.code}, total players:${this.players.length}`
      );
      return true;
    }
  }
  broadcast(Obj) {
    const message = JSON.stringify(Obj);
    console.log(`broadcasting to ${this.players.length} players`);

    this.players.forEach(({ socket }) => {
      if (socket.readyState === socket.OPEN) {
        socket.send(message);
      }
    });
  }
  allusers() {
    return this.players.map((s) => s.user);
  }

  delete(user) {
    try {
      this.players = this.players.filter((s) => s.user !== user);
      console.log(
        `User ${user} has left the room ${this.code}, remaining players:${this.players.length}}`
      );
      return true;
    } catch (error) {
      console.log("Error");
      return false;
    }
  }
}

class RoomManager {
  static #rooms = new Map();

  static getRoom(code) {
    if (!RoomManager.#rooms.has(code)) {
      return RoomManager.#rooms.set(code, new Room(code));
    }
    return RoomManager.#rooms.get(code);
  }

  static removeRoom(code) {
    if (RoomManager.#rooms.has(code)) {
      RoomManager.#rooms.delete(code);
      console.log(`Room ${code} has been removed from the Rooms`);
    }
  }

  static AllRooms() {
    return RoomManager.#rooms;
  }
}

module.exports = RoomManager;
