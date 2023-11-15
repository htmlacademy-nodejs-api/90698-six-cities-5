import { IsArray, IsDateString, IsIn, IsEnum, MaxLength, MinLength, IsBoolean, Min, Max, IsOptional, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { OfferType, City } from '../../../types/index.js';
import { Comfort } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { MAX_DESCRIPTION, MAX_GUEST, MAX_PRICE, MAX_ROOM, MAX_TITLE, MIN_DESCRIPTION, MIN_GUEST, MIN_PRICE, MIN_ROOM, MIN_TITLE } from '../offer.constant.js';

export class CreateOfferDto {
  @MinLength(MIN_TITLE, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(MAX_TITLE, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(MIN_DESCRIPTION, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(MAX_DESCRIPTION, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsOptional()
  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  public preview: string;

  @ArrayMinSize(6, { message: CreateOfferValidationMessage.images.invalidSize })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.images.invalidSize })
  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  public image: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.premium.invalidFormat })
  public premium: boolean;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalid })
  public type: OfferType;

  @Min(MIN_ROOM, { message: CreateOfferValidationMessage.room.invalidValue })
  @Max(MAX_ROOM, { message: CreateOfferValidationMessage.room.invalidValue })
  public room: number;

  public rating: number;

  @Min(MIN_GUEST, { message: CreateOfferValidationMessage.guests.minValue })
  @Max(MAX_GUEST, { message: CreateOfferValidationMessage.guests.maxValue })
  public guests: number;

  @Min(MIN_PRICE, { message: CreateOfferValidationMessage.price.minValue })
  @Max(MAX_PRICE, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.comfort.invalidFormat })
  @IsIn(['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'], {each: true, message: CreateOfferValidationMessage.comfort.invalid})
  public comfort: Comfort[];

  public userId: string;

  public latitude: number;

  public longitude: number;
}
