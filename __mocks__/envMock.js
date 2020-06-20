
/* global window Event */
let store = {};
const localStorageMock = {
  getItem(key) {
    return store[key];
  },
  setItem(key, value) {
    store[key] = value.toString();
    Event.prototype.newValue = value;
    window.dispatchEvent(new Event('storage'));
  },
  clear() {
    store = {};
  },
};

class BroadcastChannelMock {

  constructor(channel) {
    this.channelName = channel;
    this.listeners = [];
    this.isClosed = false;
  }

  postMessage(data) {
    this.validateChannel();
    this.listeners.forEach((listener) => listener(data));
  }

  addEventListener(func) {
    this.validateChannel();
    this.listeners.push(func);
  }

  removeEventListener(func) {
    this.validateChannel();
    this.listeners = this.listeners.filter((listener) => func !== listener);
  }

  close() {
    this.isClosed = true;
    this.listeners = [];
  }

  /* private */
  validateChannel() {
    if (this.isClosed) {
      throw new Error("Message channel is closed");
    }
  }
}


global.localStorage = localStorageMock;
global.BroadcastChannel = BroadcastChannelMock;
