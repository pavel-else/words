import words from "./words.json" with { type: "json" };
const inputs = process.argv.slice(2)

const inc = new Set()
const exc = new Set()
const hash = {}
const unHash = {}

inputs.forEach((item) => {
  const [word, key] = item.split('-')
  
  for (let i = 0; i < word.length; i += 1) {
    if (key[i] === '2') {
      hash[i] = word[i]
      inc.add(word[i])
    } else if (key[i] === '1') {
      inc.add(word[i])
      unHash[i] = word[i]
    } else if (key[i] === '0') {
      exc.add(word[i])
      if (inc.has(word[i])) {
        unHash[i] = word[i]
      }
    }
  }
})

console.log(unHash)


const filtered1 = words.filter((word) => {
  for (let i in hash) {
    if (hash[i] !== word[i]) {
      return false
    }
    if (unHash[i] === word[i]) {
      return false
    }
  }
  return true
});

const excInc = Array.from(inc)
const excArr = Array.from(exc).filter(letter => !inc.has(letter))

const filtered2 = filtered1.filter((word) => {
  if (excArr.some((letter) => word.includes(letter))) {
    return false;
  }
  return excInc.every((letter) => word.includes(letter));
});

console.log(filtered2);
