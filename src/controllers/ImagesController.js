import { Auth0Provider } from "@bcwdev/auth0provider";
import { imagesService } from "../services/ImagesService.js";
import BaseController from "../utils/BaseController.js";




export class ImagesController extends BaseController {
  constructor() {
    super('api/images')
    this.router
      .get('', this.getRandomImage)
      .use(Auth0Provider.getAuthorizedUserInfo) // everything below this will need to be authorized
      .post('', this.createImage)
  }

  async getRandomImage(request, response, next) {
    try {
      const image = await imagesService.getRandomImage()
      response.send(image)
    } catch (error) {
      next(error)
    }
  }

  async createImage(request, response, next) {
    try {
      const imageData = request.body
      const userInfo = request.userInfo
      imageData.authorId = userInfo.id // assign the author to the logged in persons id
      const image = await imagesService.createImage(imageData)
      response.send(image)
    } catch (error) {
      next(error)
    }
  }
}
