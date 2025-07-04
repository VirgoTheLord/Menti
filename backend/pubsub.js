const { createClient } = require("redis");

class PubSub {
  static #instance = null;
  #redisClient = null;
  //we are mapping what a room to the particular array of lets say room data like players or scores. Here prolly qns we will see
  #subscriptions = new Map();

  constructor() {
    if (PubSub.#instance) {
      return PubSub.#instance;
    }
    this.#redisClient = createClient();
    this.#redisClient.connect().catch(console.error());
    PubSub.#instance = this;
  }

  static getInstance() {
    if (!PubSub.#instance) {
      PubSub.#instance = new PubSub();
    }
    return PubSub.#instance;
  }
}
