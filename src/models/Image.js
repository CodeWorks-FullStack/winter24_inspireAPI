import { Schema } from "mongoose";



export const ImageSchema = new Schema({
  image: { type: String, maxLength: 1000, required: true },
  authorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
}, { toJSON: { virtuals: true } })

ImageSchema.virtual('author', {
  localField: 'authorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
