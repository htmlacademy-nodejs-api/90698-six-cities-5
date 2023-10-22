import { Comfort, OfferType } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: string;
  public preview?: string;
  public image?: string;
  public premium?: boolean;
  public favourites?: boolean;
  public rating?: number;
  public type?: OfferType;
  public room?: number;
  public guests?: number;
  public price?: number;
  public comfort?: Comfort[];
  public coordinates?: string;
}

