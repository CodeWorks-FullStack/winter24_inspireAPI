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
    const randomNumber = Math.floor(Math.random() * quoteCount)
    const quote = await dbContext.Quotes.findOne().skip(randomNumber).populate('author')
    return quote
  }

}

export const quotesService = new QuotesService()
