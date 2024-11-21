import { dbContext } from "../db/DbContext.js"



class ImagesService {
  async createImage(imageData) {
    const image = await dbContext.Images.create(imageData)
    await image.populate('author')
    return image
  }
  async getRandomImage() {
    const imageCount = await dbContext.Images.countDocuments()
    const randomNumber = Math.floor(Math.random() * imageCount)
    const image = await dbContext.Images.findOne().skip(randomNumber).populate('author')
    return image
  }

}

export const imagesService = new ImagesService()
