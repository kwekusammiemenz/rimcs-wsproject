import { ObjectId } from "mongodb";

export type Countries = {
  countriesCode: string;
  countriesName: string;
  latitude: string;
  longitude: string;
  _id?: ObjectId;
};
