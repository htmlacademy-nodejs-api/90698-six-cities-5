import { IsBoolean } from 'class-validator';
import { FAVORITE_OFFER_MESSAGES } from './favorite-offer.messages.js';

export class FavoriteOfferDto {
  @IsBoolean({ message: FAVORITE_OFFER_MESSAGES.favorite.INVALID_FORMAT })
  public favorite: boolean;
}
