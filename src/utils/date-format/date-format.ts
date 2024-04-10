export const isoDateToDateConverter = (isoString: string) => {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error('Is not a valid date.');
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
