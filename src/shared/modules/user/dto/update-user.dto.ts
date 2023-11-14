import { UserType } from '../../../types/user-type.enum.js';

export class UpdateUserDto {
  public avatarPath?: string;
  public firstname?: string;
  public userType?: UserType;
  public favorites?: string[];
}
