import words from "./words.json" with { type: "json" };

const inc = (process.argv.find((arg) => arg.startsWith("--inc")) || "").slice(6).split("");
const exc = (process.argv.find((arg) => arg.startsWith("--exc")) || "").slice(6).split("");

const filtered = words.filter((word) => {
  if (exc.some((letter) => word.includes(letter))) {
    return false;
  }
  return inc.every((letter) => word.includes(letter));
});

console.log(filtered);
