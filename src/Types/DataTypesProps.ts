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

export type LocationTypesProps = {
  locationTypesName: string;
  _id?: string;
};

export type OperatorsProps = {
  operatorsName: string;
  _id?: string;
};

export type SponsorsProps = {
  sponsorsName: string;
  _id?: string;
};

export type StationsNaturesProps = {
  stationsNaturesName: string;
  _id?: string;
};

export type WeatherStationsProps = {
  weatherStationsName: string;
  locationType: string;
  location: string;
  country: string;
  region: string;
  district: string;
  dateOfInstallation: number;
  operator: string;
  dataFrequency: number;
  stationStatus: string;
  observedParameters: string;
  accuracyLevel: number;
  communicationSystem: string;
  latitude: string;
  longitude: string;
  elevation: number;
  stationsNature: string;
  _id?: string;
};
