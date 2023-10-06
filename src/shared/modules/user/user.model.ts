import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {}

const userSchema = new Schema({
  firstname: String,
  email: String,
  avatarPath: String,
  password: String,
  userType: String,
});

export const UserModel = model<UserDocument>('User', userSchema);
