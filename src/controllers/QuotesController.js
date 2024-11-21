import { Auth0Provider } from "@bcwdev/auth0provider";
import { quotesService } from "../services/QuotesService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";



export class QuotesController extends BaseController {
  constructor() {
    super('api/quotes')
    this.router
      .get('', this.getRandomQuote)
      // .use((req, res, next) => {
      //   const token = req.headers.authorization // pulls bearer token out
      //   const api_key = req.query.api_key // you could use this to pull an api key out
      //   logger.log('What up this is middleware!', token, api_key)
      //   // res.send("sup")
      //   if (!token) { // if no token respond with error
      //     res.statusCode = 401
      //     res.send("get outta here!")
      //   }
      //   next() // if token continue through to next request
      // })
      .use(Auth0Provider.getAuthorizedUserInfo) // takes in the headers, looks at bearer token, and attaches the corresponding userInfo to the request
      .post('', this.createQuote)
  }


  async getRandomQuote(request, response, next) {
    try {
      const randomQuote = await quotesService.getRandomQuote()
      response.send(randomQuote)
    } catch (error) {
      next(error)
    }
  }

  async createQuote(request, response, next) {
    try {
      const quoteData = request.body
      const userInfo = request.userInfo // new that we are under our middleware, we know who you are
      logger.log('quote', quoteData)
      quoteData.authorId = userInfo.id // and we make you the author
      const quote = await quotesService.createQuote(quoteData)
      response.send(quote)
    } catch (error) {
      next(error)
    }
  }
}
