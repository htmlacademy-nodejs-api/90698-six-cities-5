import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferType, Comfort, City } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true, required: true})
  public description!: string;

  @prop({})
  public postDate!: Date;

  @prop({
    type: () => String,
    enum: City
  })
  public city!: City;

  @prop({required: true})
  public preview!: string;

  @prop({ required: true, type: () => [String], default: []})
  public images!: string[];

  @prop({required: true})
  public premium!: boolean;

  @prop({required: true, default: 0})
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType
  })
  public type!: OfferType;

  @prop({required: true})
  public room!: number;

  @prop({required: true})
  public guests!: number;

  @prop({required: true})
  public price!: number;

  @prop({
    required: true,
    type: () => [String],
    enum: Comfort
  })
  public comfort!: Comfort[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentCount!: number;

  @prop({required: true})
  public latitude!: number;

  @prop({required: true})
  public longitude!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
