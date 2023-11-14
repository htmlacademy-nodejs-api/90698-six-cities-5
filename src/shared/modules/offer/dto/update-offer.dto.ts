import { City, Comfort, OfferType } from '../../../types/index.js';
import { IsDateString, IsEnum, IsOptional, Max, MaxLength, Min, MinLength, IsBoolean, IsArray, IsIn} from 'class-validator';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';
import { MAX_DESCRIPTION, MAX_GUEST, MAX_PRICE, MAX_TITLE, MIN_DESCRIPTION, MIN_GUEST, MIN_PRICE, MIN_ROOM, MIN_TITLE } from '../offer.constant.js';

export class UpdateOfferDto {

  @IsOptional()
  @MinLength(MIN_TITLE,{ message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(MAX_TITLE, { message: CreateUpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(MIN_DESCRIPTION, { message: CreateUpdateOfferMessage.description.minLength })
  @MaxLength(MAX_DESCRIPTION, { message: CreateUpdateOfferMessage.description.maxLength })
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
  public image?: string;

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.premium.invalidFormat })
  public premium?: boolean;

  @IsOptional()
  @IsEnum(OfferType, { message: CreateUpdateOfferMessage.offerType.invalid })
  public type?: OfferType;

  @IsOptional()
  @Min(MIN_ROOM, { message: CreateUpdateOfferMessage.room.invalidValue })
  @Max(MIN_ROOM, { message: CreateUpdateOfferMessage.room.invalidValue })
  public room?: number;

  @IsOptional()
  @Min(MIN_GUEST, { message: CreateUpdateOfferMessage.guests.invalidValue })
  @Max(MAX_GUEST, { message: CreateUpdateOfferMessage.guests.invalidValue })
  public guests?: number;

  @IsOptional()
  @Min(MIN_PRICE, { message: CreateUpdateOfferMessage.price.invalidValue })
  @Max(MAX_PRICE, { message: CreateUpdateOfferMessage.price.invalidValue })
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

