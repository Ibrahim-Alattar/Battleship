export function Ship(length) {
  let hits = 0;
  return {
    getLength() {
      return length
    },
    hit() {
      if (hits >= length) return;
      hits++
    },
    getHits() {
      return hits
    },
    isSunk() {
      if (hits === length) {
        return true
      } else { return false }
    }
  }
}