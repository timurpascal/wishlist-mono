export const userValidator = {
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  avatarId: {
    required: false,
  },
  passHash: {
    type: String,
    required: true,
  },
  password: {
    minlength: 8,
    maxlength: 100,
  },
  login: {
    type: String,
    unique: true,
    minlength: 1,
    maxlength: 15,
  },
  locale: {
    type: String,
    enum: ['ru', 'en'],
    default: 'ru',
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  bio: {
    type: String,
    minlength: 5,
    maxlength: 300,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 40,
  },
  mobilePhone: {
    type: String,
    required: false,
    unique: true,
    minlength: 10,
    maxlength: 13,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
};
