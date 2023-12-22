import { Schema } from 'mongoose';
import { giftValidator as valid } from '../validator/gift.validator';

export const GiftSchema = new Schema(
  {
    name: {
      required: valid.name.required,
      minlength: valid.name.minlength,
      maxlength: valid.name.maxlength,
      type: valid.name.type,
    },
    reason: {
      minlength: valid.reason.minlength,
      maxlength: valid.reason.maxlength,
      type: valid.reason.type,
    },
    tag: [
      {
        minlength: valid.tag.minlength,
        maxlength: valid.tag.maxlength,
        default: valid.tag.default,
        type: valid.tag.type,
      },
    ],
    description: {
      minlength: valid.description.minlength,
      maxlength: valid.description.maxlength,
      type: valid.description.type,
    },
    photos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'fs.files',
      },
    ],
    mainPhoto: {
      ref: 'fs.files',
      type: Schema.Types.ObjectId,
    },
    price: {
      min: valid.price.min,
      max: valid.price.max,
      type: valid.price.type,
    },
    completed: {
      type: valid.completed.type,
      default: valid.completed.default,
      required: valid.completed.required,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: valid.ownerId.required,
    },
    deleted: {
      type: valid.deleted.type,
      required: valid.deleted.required,
      default: valid.deleted.default,
    },
  },
  {
    timestamps: true,
  },
);

GiftSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
