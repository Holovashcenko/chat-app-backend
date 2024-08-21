const axios = require('axios')

async function getRandomQuote() {
  try {
    const response = await axios.get('https://api.quotable.io/random')
    return response.data.content
  } catch (error) {
    console.error('Error fetching quote:', error)
    throw new Error('Failed to fetch quote')
  }
}

module.exports = { getRandomQuote }
