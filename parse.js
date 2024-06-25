import { createInterface } from "readline";
import { createReadStream, appendFileSync, writeFileSync } from "fs";

const file = createInterface({
  input: createReadStream("./russian_nouns.txt"),
  output: process.stdout,
  terminal: false,
});

const filtered = [];

writeFileSync("words.json", "");

file
  .on("line", (line) => {
    if (line.length === 5) {
      const word = line.replace("ё", "е");
      filtered.push(word);
    }
  })
  .on("close", () => appendFileSync("words.json", JSON.stringify(filtered)))
  .on("close", () => console.log("Done!", filtered.length));
