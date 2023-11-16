import { City, Comfort, OfferType } from '../../../types/index.js';
import { IsDateString, IsEnum, IsOptional, ArrayMinSize, ArrayMaxSize, Max, MaxLength, Min, MinLength, IsBoolean, IsArray, IsIn} from 'class-validator';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';
import { TITLE, DESCRIPTION, ROOM, GUEST, PRICE, IMAGES_COUNT } from '../offer.constant.js';

export class UpdateOfferDto {

  @IsOptional()
  @MinLength(TITLE.MIN,{ message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(TITLE.MAX, { message: CreateUpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(DESCRIPTION.MIN, { message: CreateUpdateOfferMessage.description.minLength })
  @MaxLength(DESCRIPTION.MAX, { message: CreateUpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateUpdateOfferMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: CreateUpdateOfferMessage.city.invalid })
  public city?: City;

  @IsOptional()
  public preview?: string;

  @IsOptional()
  @ArrayMinSize(IMAGES_COUNT, { message: CreateUpdateOfferMessage.images.invalidSize })
  @ArrayMaxSize(IMAGES_COUNT, { message: CreateUpdateOfferMessage.images.invalidSize })
  @IsArray({ message: CreateUpdateOfferMessage.images.invalidFormat })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.premium.invalidFormat })
  public premium?: boolean;

  @IsOptional()
  @IsEnum(OfferType, { message: CreateUpdateOfferMessage.offerType.invalid })
  public type?: OfferType;

  @IsOptional()
  @Min(ROOM.MIN, { message: CreateUpdateOfferMessage.room.invalidValue })
  @Max(ROOM.MAX, { message: CreateUpdateOfferMessage.room.invalidValue })
  public room?: number;

  @IsOptional()
  @Min(GUEST.MIN, { message: CreateUpdateOfferMessage.guests.invalidValue })
  @Max(GUEST.MAX, { message: CreateUpdateOfferMessage.guests.invalidValue })
  public guests?: number;

  @IsOptional()
  @Min(PRICE.MIN, { message: CreateUpdateOfferMessage.price.invalidValue })
  @Max(PRICE.MAX, { message: CreateUpdateOfferMessage.price.invalidValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.comfort.invalid })
  @IsIn(['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'], {each: true, message: CreateUpdateOfferMessage.comfort.invalid})
  public comfort?: Comfort[];

  @IsOptional()
  public latitude?: number;

  @IsOptional()
  public longitude?: number;
}

