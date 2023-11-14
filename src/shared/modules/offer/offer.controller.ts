import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, DocumentExistsMiddleware, HttpMethod, PrivateRouteMiddleware,ValidateObjectIdMiddleware, ValidateDtoMiddleware, ValidateCityNameMiddleware, UserAccessMiddleware } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CommentRdo, CommentService } from '../comment/index.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { ParamCityName } from './type/param-city-name.type.js';
import { DetailOfferRdo } from './index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show, middlewares: [
      new ValidateObjectIdMiddleware('offerId'),
      new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
    ] });

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [
      new PrivateRouteMiddleware(),
      new ValidateDtoMiddleware(CreateOfferDto)] });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.findFavoritesByUserId,
      middlewares: [new PrivateRouteMiddleware()]
    });

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });

    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete, middlewares: [
      new PrivateRouteMiddleware(),
      new UserAccessMiddleware(this.offerService, 'offerId'),
      new ValidateObjectIdMiddleware('offerId'),
      new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
    ] });

    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update, middlewares: [
      new PrivateRouteMiddleware(),
      new UserAccessMiddleware(this.offerService, 'offerId'),
      new ValidateObjectIdMiddleware('offerId'),
      new ValidateDtoMiddleware(UpdateOfferDto),
      new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
    ] });

    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.Get, handler: this.getComments, middlewares: [
      new ValidateObjectIdMiddleware('offerId'),
      new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
    ] });

    this.addRoute({
      path: '/:offerId/favorites',
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId/favorites',
      method: HttpMethod.Delete,
      handler: this.deleteFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/premium/:cityName',
      method: HttpMethod.Get,
      handler: this.showPremium,
      middlewares: [
        new ValidateCityNameMiddleware('cityName')
      ]
    });
  }

  public async show({ params: {offerId}, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const userId = tokenPayload ? tokenPayload.id : undefined;
    const offer = await this.offerService.getDetailedOffer(offerId, userId);
    this.ok(res, fillDTO(DetailOfferRdo, offer));

  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({...body, userId: tokenPayload.id});
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(DetailOfferRdo, offer));
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async findFavoritesByUserId({ tokenPayload: { id: userId } }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findFavoritesByUserId(userId);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async addFavorite({ params: {offerId}, tokenPayload: {id: userId} }: Request<ParamOfferId>, res: Response): Promise<void> {
    await this.offerService.addFavorite(offerId, userId);
    this.noContent(res, {});
  }

  public async deleteFavorite({ params: {offerId}, tokenPayload: {id: userId} }: Request<ParamOfferId>, res: Response): Promise<void> {
    await this.offerService.deleteFavorite(offerId, userId);
    this.noContent(res, {});
  }

  public async showPremium({ params: { cityName } }: Request<ParamCityName>, res: Response): Promise<void> {
    const capitalizedCityName = `${cityName.at(0)?.toUpperCase()}${cityName.slice(1)}`;
    const result = await this.offerService.findPremium(capitalizedCityName);
    this.ok(res, fillDTO(OfferRdo, result));
  }

}
