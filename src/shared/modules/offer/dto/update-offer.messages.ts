export const CreateUpdateOfferMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  premium: {
    invalidFormat: 'Field premium must be boolean',
  },
  favourites: {
    invalidFormat: 'Field favourites must be boolean',
  },
  offerType: {
    invalid: 'type must be Apartment or House or Room or Hotel',
  },
  room: {
    invalidValue: 'Minimum room is 1 and Maximum room is 8',
  },
  guests: {
    invalidValue: 'Minimum guests is 1 and Maximum guests is 10',
  },
  comfort:{
    invalid: 'Comfort must be Breakfas or',
  },
  price: {
    invalidValue: 'Minimum price is 100 and Maximum price is 200000',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;