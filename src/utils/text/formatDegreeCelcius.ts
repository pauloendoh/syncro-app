export const formatDegreeCelcius = (
  value: number | string | null | undefined
) => {
  const numValue = Number(value);
  if (isNaN(numValue)) return "?°C";

  return `${numValue}°C`;
};
