import { isoDateToDateConverter } from './date-format';

describe('Testing date format', () => {
  it('Should return a Date DD/MM/YYYY when receives a isoString.', () => {
    // arrange
    const isoDateString = '2024-04-08T14:25:23.123Z';
    const expectedDate = '08/04/2024';

    // act
    const convertedDate = isoDateToDateConverter(isoDateString);

    // assert
    expect(convertedDate).toBe(expectedDate);
  });

  it('Should return a error when add a no Date format.', () => {
    // arrange
    const isoDateString = '2024-04-XXADT14:25:23.123Z';

    // act
    const converterCb = () => {
      isoDateToDateConverter(isoDateString);
    };

    // assert
    expect(converterCb).toThrow('Is not a valid date.');
  });
});
