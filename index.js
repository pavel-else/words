import words from "./words.json" with { type: "json" };
const inputs = process.argv.slice(2)

const l = words[0].length || 1
const letters = ['а','б','в','г','д','е','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я']

const filter = () => { 
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

  return filtered2
}

const getWeights = (filteredWords = []) => {
  const map = letters.reduce((acc, l) => {
    acc[l] = 0
    return acc
  }, {})
  
  words.forEach(word => {
    for (let i = 0; i < l; i += 1) {
      map[word[i]] += 1
    }
  })

  const wordsWithWeigths = filteredWords.map(word => {
    const uniqLettersSet = word.split('').reduce((acc, l) => acc.add(l), new Set())
    const weigth = Array.from(uniqLettersSet).reduce((acc, l) => acc += map[l], 0)
    return [word, weigth]
  })

  return wordsWithWeigths.sort((a, b) => b[1] - a[1]).map(([word]) => word)
}

const filtered = filter()

const weigths = getWeights(filtered)

console.log(weigths);
