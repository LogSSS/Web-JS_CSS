import { speakHello } from "./SpeakHello.js";
import { speakGoodBye } from "./SpeakGoodBye.js";

let names = [
  "Bill",
  "John",
  "Jen",
  "Jason",
  "Paul",
  "Frank",
  "Steven",
  "Larry",
  "Paula",
  "Laura",
  "Jim",
  "Jack",
  "Nazar",
  "MAX",
  "Romanus",
  "VlaD1CK",
  "Andial",
  "Andrii",
  "BOB",
  "Bruh",
  "Zuhn",
  "Zywoo",
  "S1mple",
  "Niko",
  "Coldzera",
  "Fallen",
  "Fer",
  "Taco",
  "sdy",
  "b1t",
  "nipl",
];

console.log("<--------------------------->");
console.log("If name starts with J, Good Bye, else Hello");

for (let name in names)
  if (names[name].charAt(0).toLowerCase() === "j") speakGoodBye(names[name]);
  else speakHello(names[name]);

console.log("<--------------------------->");
console.log("If name ASCII sum is even, Hello, else Good Bye");

for (let name in names) {
  let sum = 0;
  for (let i = 0; i < names[name].length; i++) {
    sum += names[name].charCodeAt(i);
  }
  if (sum % 2 === 0) speakHello(names[name]);
  else speakGoodBye(names[name]);
}

console.log("<--------------------------->");
console.log("If name ends with n, Good Bye, else Hello");

for (let name in names) {
  if (names[name].charAt(names[name].length - 1).toLowerCase() === "n")
    speakGoodBye(names[name]);
  else speakHello(names[name]);
}

console.log("<--------------------------->");
