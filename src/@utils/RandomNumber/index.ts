export function RandomNumber() {
  let random = Math.random();
  while (random < 1000) random *= 10;
  return Math.floor(random);
}
