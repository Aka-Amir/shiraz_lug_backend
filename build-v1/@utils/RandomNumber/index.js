"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomNumber = void 0;
function RandomNumber() {
    let random = Math.random();
    while (random < 1000)
        random *= 10;
    return Math.floor(random);
}
exports.RandomNumber = RandomNumber;
//# sourceMappingURL=index.js.map