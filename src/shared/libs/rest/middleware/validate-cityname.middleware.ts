import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { City } from '../../../types/city-type.enum.js';

export class ValidateCityNameMiddleware implements Middleware {
  constructor(private param: string) {}

  public execute({ params }: Request, _res: Response, next: NextFunction): void {
    const cityName = params[this.param];
    if (Object.values(City).map((item) => item.toLowerCase()).includes(cityName.toLowerCase())) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${cityName} is invalid city name`,
      'ValidateCityNameMiddleware'
    );
  }
}
