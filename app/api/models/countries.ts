import mongoose, { Document, Schema } from "mongoose";

export interface ICountries extends Document {
  countriesCode: string;
  countriesName: string;
  latitude: string;
  longitude: string;
}

// export interface ICountriesModel extends ICountries, Document {
//   createdAt: Date;
//   updatedAt: Date;
// }

const countriesSchema: Schema = new Schema(
  {
    //countriesCode: { type: String, required: true, unique: true },
    countriesCode: { type: String, required: true, unique: true },
    countriesName: { type: String, required: true, unique: true },
    latitude: { type: String, required: true, unique: true },
    longitude: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Countries =
  mongoose.models.Countries ||
  mongoose.model<ICountries>("Countries", countriesSchema);
export default Countries;
