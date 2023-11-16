import { Expose, Type } from 'class-transformer';
import { OfferType } from '../../../types/offer-type.enum.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { City } from '../../../types/city-type.enum.js';

export class OfferRdo {

  @Expose()
  public title: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public preview: string;

  @Expose()
  public premium: boolean;

  @Expose()
  public favourites: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public price: number;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  public commentCount: number;

}
