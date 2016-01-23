let topics        = {};
let subscriberId  = -1;

export function publish(topic, data) {
  if (!topics[topic]) {
    return false;
  }

  let subscribers = topics[topic];
  let len = subscribers ? subscribers.length : 0;

  while (len--) {
    subscribers[len].handler(data);
  }

  return true;
}

export function subscribe(topic, handler) {
  if (!topics[topic]) {
    topics[topic] = [];
  }

  let token = (++subscriberId).toString();

  topics[topic].push({
    token: token,
    handler: handler,
  });

  return token;
}
