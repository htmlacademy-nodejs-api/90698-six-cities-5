import { User } from '../../types/index.js';

export class UserEntity implements User {
  public firstname: string;
  public email: string;
  public avatarPath: string;
  public password: string;
  public userType: string;
}
