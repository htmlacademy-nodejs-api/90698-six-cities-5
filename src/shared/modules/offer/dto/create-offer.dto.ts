import { IsArray, IsDateString, IsIn, IsEnum, MaxLength, MinLength, IsBoolean, Min, Max, IsOptional, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { OfferType, City } from '../../../types/index.js';
import { Comfort } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { TITLE, DESCRIPTION, ROOM, GUEST, PRICE, IMAGES_COUNT} from '../offer.constant.js';

export class CreateOfferDto {
  @MinLength(TITLE.MIN, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(TITLE.MAX, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(DESCRIPTION.MIN, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(DESCRIPTION.MAX, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsOptional()
  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  public preview: string;

  @ArrayMinSize(IMAGES_COUNT, { message: CreateOfferValidationMessage.images.invalidSize })
  @ArrayMaxSize(IMAGES_COUNT, { message: CreateOfferValidationMessage.images.invalidSize })
  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.premium.invalidFormat })
  public premium: boolean;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalid })
  public type: OfferType;

  @Min(ROOM.MIN, { message: CreateOfferValidationMessage.room.invalidValue })
  @Max(ROOM.MAX, { message: CreateOfferValidationMessage.room.invalidValue })
  public room: number;

  public rating: number;

  @Min(GUEST.MIN, { message: CreateOfferValidationMessage.guests.minValue })
  @Max(GUEST.MAX, { message: CreateOfferValidationMessage.guests.maxValue })
  public guests: number;

  @Min(PRICE.MIN, { message: CreateOfferValidationMessage.price.minValue })
  @Max(PRICE.MAX, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.comfort.invalidFormat })
  @IsIn(['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'], {each: true, message: CreateOfferValidationMessage.comfort.invalid})
  public comfort: Comfort[];

  public userId: string;

  public latitude: number;

  public longitude: number;
}
