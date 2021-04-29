export const formatResponseErrorMsg = (err) => err instanceof Error // Ar erroras yra Error prototipo objektas?
  ? err.response !== undefined  // Jei taip, tai ar jis turi atsaką iš serverio?
    ? err.response.data.message !== undefined // jei taip, ar atsakas turi klaidos pranešimą?
      ? err.response.data.message // jei taip, grąžink jį
      : err.response.statusText // priešingu atveju, grąžint atsako statusą
    : err.message // jei ne, grąžint klaidos žinutę
  : err; // jei ne, grąžint klaidą