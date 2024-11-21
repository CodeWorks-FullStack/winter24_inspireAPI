import { dbContext } from "../db/DbContext.js"



class QuotesService {
  async createQuote(quoteData) {
    const quote = await dbContext.Quotes.create(quoteData)
    await quote.populate('author')
    return quote
  }
  async getRandomQuote() {
    // const quotes = await dbContext.Quotes.find()
    // const quote = quotes[Math.floor(Math.random() * quotes.length)]
    const quoteCount = await dbContext.Quotes.countDocuments() // give ma a number of how many quotes I have
    const randomNumber = Math.floor(Math.random() * quoteCount) // get a random number based on number of quotes
    const quote = await dbContext.Quotes.findOne().skip(randomNumber).populate('author') // findone but so it doesn't always find the first skip past those
    return quote
  }

}

export const quotesService = new QuotesService()
