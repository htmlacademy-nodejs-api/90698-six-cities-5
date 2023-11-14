import { IsEmail, IsString, Length, IsEnum, IsOptional } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';
import { UserType } from '../../../types/user-type.enum.js';

export class CreateUserDto {

  @IsString({ message: CreateUserMessages.firstname.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.firstname.lengthField })
  public firstname: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsOptional()
  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
  public avatarPath: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password: string;

  @IsEnum(UserType, { message: CreateUserMessages.userType.invalidFormat })
  public userType: UserType;
}
