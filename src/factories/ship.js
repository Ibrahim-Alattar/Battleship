export function Ship(length) {
  let hits = 0;

  return {
    getLength() {
      return length;
    },

    hit() {
      if (hits < length) {
        hits++;
      }
    },

    getHits() {
      return hits;
    },

    isSunk() {
      return hits >= length;
    },
  };
}