export type CountriesProps = {
  countriesCode: string;
  countriesName: string;
  latitude: string;
  longitude: string;
  _id?: string;
};

export type RegionsProps = {
  regionsName: string;
  latitude: string;
  longitude: string;
  country: string;
  _id?: string;
};

export type DistrictsProps = {
  districtsName: string;
  latitude: string;
  longitude: string;
  region: string;
  _id?: string;
};
