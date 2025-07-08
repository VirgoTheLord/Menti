//here we initialize class to use the rooms in a singleton pattern
class Room {
  constructor(code) {
    this.code = code;
    this.players = [];
    this.scores = [];
    this.admin = null;
    this.qid = 1;
  }

  setAdmin(socket) {
    this.admin = socket;
    console.log(`Admin has been set for room ${this.code}`);
  }
  isAdmin(socket) {
    return this.admin === socket;
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
      this.scores.push({ user, score: 0 });
      console.log(
        `User ${user} has joined the room ${this.code}, total players:${this.players.length}`
      );
      return true;
    }
  }
  updateScore(user, socket, score) {
    const isPresent = this.players.find(
      (u) => u.user === user || u.socket === socket
    );
    if (!isPresent) {
      console.log(`User ${user} is not in room and hence cannot set score.`);
      return false;
    } else {
      const existingScore = this.scores.find((s) => s.user === user);
      if (existingScore) {
        existingScore.score += score;
        console.log(`Current Updated Score:${existingScore.score}`);
        return true;
      }
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
  getLeaderboard() {
    const leaderboard = [...this.scores]
      .sort((a, b) => b.score - a.score)
      .map((entry, index) => ({
        rank: index + 1,
        user: entry.user,
        score: entry.score,
      }));
    return leaderboard;
  }

  delete(user) {
    try {
      this.players = this.players.filter((s) => s.user !== user);
      this.scores = this.scores.filter((s) => s.user !== user);
      console.log(
        `User ${user} has left the room ${this.code}, remaining players:${this.players.length}`
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
      RoomManager.#rooms.set(code, new Room(code));
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
