import { Comfort, OfferType } from '../../../types/index.js';
import { IsDateString, IsEnum, IsOptional, Max, MaxLength, Min, MinLength, IsBoolean} from 'class-validator';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';

export class UpdateOfferDto {

  @IsOptional()
  @MinLength(10,{ message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: CreateUpdateOfferMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateUpdateOfferMessage.postDate.invalidFormat })
  public postDate?: Date;

  public city?: string;
  public preview?: string;
  public image?: string;

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.premium.invalidFormat })
  public premium?: boolean;

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.favourites.invalidFormat })
  public favourites?: boolean;

  @IsOptional()
  @IsEnum(OfferType, { message: CreateUpdateOfferMessage.offerType.invalid })
  public type?: OfferType;

  @IsOptional()
  @Min(100, { message: CreateUpdateOfferMessage.room.invalidValue })
  @Max(20000, { message: CreateUpdateOfferMessage.room.invalidValue })
  public room?: number;

  @IsOptional()
  @Min(100, { message: CreateUpdateOfferMessage.guests.invalidValue })
  @Max(20000, { message: CreateUpdateOfferMessage.guests.invalidValue })
  public guests?: number;

  @IsOptional()
  @Min(100, { message: CreateUpdateOfferMessage.price.invalidValue })
  @Max(10000, { message: CreateUpdateOfferMessage.price.invalidValue })
  public price?: number;

  @IsOptional()
  @IsEnum(Comfort, { message: CreateUpdateOfferMessage.comfort.invalid })
  public comfort?: Comfort[];

  public coordinates?: string;
}

