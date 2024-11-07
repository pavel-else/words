import words from "./words.json" with { type: "json" };
const inputs = process.argv.slice(2)

const l = inputs[0].split('-')[0].length
const letters = ['а', 'б','в','г','д','е','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я']

const mask = Array(l).fill(0).map(() => new Set(letters))

const enabledLetters = new Set()

const hasInc = (index, word, key) => {
  const letter = word[index];

  for (let i = 0; i < l; i += 1) {
    if (i === index) {
      continue
    }

    if (letter === word[i]) {
      if (['1', '2'].includes(key[i])) {
        return true
      }
    }
  }
  return false
}

inputs.forEach((item) => {
  const [word, key] = item.split('-')

  for (let i = 0; i < l; i += 1) {
    if (key[i] === '2') {
      mask[i] = new Set(word[i])
      enabledLetters.add(word[i])
    } else if (key[i] === '1') {
      mask[i].delete(word[i])
      enabledLetters.add(word[i])
    } else if (key[i] === '0') {
      if (hasInc(i, word, key)) {
        mask[i].delete(word[i])
      } else {
        mask.forEach(set => set.delete(word[i]))
      }
    }
  }
})

const filtered1 = words.filter((word) => {
  for (let i = 0; i < l; i += 1) {
    if (!(mask[i].has(word[i]))) {
      return false
    }
  }
  return true
})

const filtered2 = filtered1.filter((word) => {
  for (let letter of enabledLetters) {
    if (!word.includes(letter)) {
      return false
    }
  }
  return true
})

console.log(filtered2);
