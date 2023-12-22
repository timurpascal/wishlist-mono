import { Schema } from 'mongoose';

export const SubscriberSchema = new Schema(
  {
    sourceId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    destinationId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

SubscriberSchema.index(
  {
    sourceId: 1,
    destinationId: 1,
  },
  { unique: true },
);

SubscriberSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
