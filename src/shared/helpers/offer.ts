import { Offer, OfferType, Comfort } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postData,
    city,
    preview,
    image,
    premium,
    favourites,
    rating,
    type,
    room,
    guests,
    price,
    comfort,
    firstname,
    email,
    avatarPath,
    password,
    userType,
    comments,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    postData,
    city,
    preview,
    image,
    premium: premium === 'true',
    favourites: favourites === 'true',
    rating: Number.parseFloat(rating),
    type: OfferType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
    room: Number.parseInt(room, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    comfort: comfort.split(';')
      .map((comforts) => Comfort[comforts as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge']),
    user: { firstname, email, avatarPath, password, userType },
    comments: Number.parseInt(comments, 10),
    coordinates,
  };
}
