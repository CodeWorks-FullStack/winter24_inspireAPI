import { Schema } from "mongoose";


export const TodoSchema = new Schema({
  description: { type: String, required: true, minLength: 1, maxLength: 500 },
  completed: { type: Boolean, required: true, default: false },
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Author' }
}, { timestamps: true, toJSON: { virtuals: true } })
