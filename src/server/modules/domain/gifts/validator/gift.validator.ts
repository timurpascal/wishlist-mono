export const giftValidator = {
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200,
  },
  reason: {
    type: String,
    minlength: 3,
    maxlength: 500,
  },
  tag: {
    minlength: 3,
    maxlength: 50,
    default: 'default',
    type: String,
  },
  description: {
    minlength: 1,
    maxlength: 1500,
    type: String,
  },
  price: {
    min: 1,
    max: 99000000,
    type: Number,
  },
  mainPhoto: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
};
