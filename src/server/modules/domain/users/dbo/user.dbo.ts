import { Schema } from 'mongoose';
import { userValidator as valid } from '../validator/user.validator';

export const UserSchema = new Schema(
  {
    firstName: {
      required: valid.firstName.required,
      minlength: valid.firstName.minlength,
      maxlength: valid.firstName.maxlength,
      type: valid.firstName.type,
    },
    lastName: {
      required: valid.lastName.required,
      minlength: valid.lastName.minlength,
      maxlength: valid.lastName.maxlength,
      type: valid.lastName.type,
    },
    avatarId: {
      required: valid.avatarId.required,
      // type: Schema.Types.ObjectId,
      type: String,
      // ref: 'fs.files',
    },
    passHash: {
      required: valid.passHash.required,
      type: valid.passHash.type,
    },
    login: {
      minlength: valid.login.minlength,
      maxlength: valid.login.maxlength,
      type: valid.login.type,
    },
    locale: {
      required: valid.locale.required,
      enum: valid.locale.enum,
      default: valid.locale.default,
      type: valid.locale.type,
    },
    gender: {
      enum: valid.gender.enum,
      type: valid.gender.type,
    },
    bio: {
      type: valid.bio.type,
      minlength: valid.bio.minlength,
      maxlength: valid.bio.maxlength,
    },
    email: {
      type: valid.email.type,
      required: valid.email.required,
      unique: valid.email.unique,
      minlength: valid.email.minlength,
      maxlength: valid.email.maxlength,
    },
    // mobilePhone: {
    //   type: valid.mobilePhone.type,
    //   required: valid.mobilePhone.required,
    //   unique: valid.mobilePhone.unique,
    //   minlength: valid.mobilePhone.minlength,
    //   maxlength: valid.mobilePhone.maxlength,
    // },
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

UserSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

// export type UserDocument = UserSchema;
