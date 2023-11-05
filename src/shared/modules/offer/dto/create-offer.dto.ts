import { IsArray, IsDateString, IsEnum, MaxLength, MinLength, IsBoolean, Min, Max } from 'class-validator';
import { OfferType } from '../../../types/index.js';
import { Comfort } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  public city: string;
  public preview: string;
  public image: string;

  @IsBoolean({ message: CreateOfferValidationMessage.premium.invalidFormat })
  public premium: boolean;

  @IsBoolean({ message: CreateOfferValidationMessage.favourites.invalidFormat })
  public favourites: boolean;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalid })
  public type: OfferType;

  @Min(1, { message: CreateOfferValidationMessage.room.invalidValue })
  @Max(8, { message: CreateOfferValidationMessage.room.invalidValue })
  public room: number;

  @Min(1, { message: CreateOfferValidationMessage.guests.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guests.maxValue })
  public guests: number;

  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.comfort.invalidFormat })
  @IsEnum(Comfort, { message: CreateOfferValidationMessage.comfort.invalid })
  public comfort: Comfort[];

  public userId: string;

  public coordinates: string;
}
