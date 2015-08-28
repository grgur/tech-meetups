let meetups = [];

const defaultMeetup = {
  name: 'xz',
  link: 'xy',
  description: 'Lorem ipsum',
  organizer: {
    name: 'John'
  }
};

function findMeetup(id) {
  return function(element) {
    return element.urlname === id;
  };
}

export function getMeetups() {
  return meetups;
}

export function setMeetups(data) {
  meetups = data;
  return meetups;
}

export function getMeetup(id) {
  // temporary fix
  meetups.find = find;
  return meetups.find(findMeetup(id)) || false;
}

function find(predicate) {
  let list;
  let length;
  let value;
  let i;
  let thisArg;

  if (this === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }
  list = Object(this);
  length = list.length >>> 0;
  thisArg = arguments[1];

  for (i = 0; i < length; i++) {
    value = list[i];
    if (predicate.call(thisArg, value, i, list)) {
      return value;
    }
  }
  return undefined;
};
