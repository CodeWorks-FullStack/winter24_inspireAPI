import { Schema } from "mongoose";


export const QuoteSchema = new Schema({
  body: { type: String, minLength: 5, maxLength: 250, required: true },
  authorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
}, { toJSON: { virtuals: true } })


QuoteSchema.virtual('author', {
  localField: 'authorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
