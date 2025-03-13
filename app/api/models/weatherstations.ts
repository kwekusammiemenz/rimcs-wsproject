import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IWeatherStations extends Document {
  weatherStationsName: string;
  locationType: string;
  location: string;
  country: string;
  region: string;
  district: string;
  dateOfInstallation: Date;
  operator: string;
  dataFrequency: Date;
  stationStatus: string;
  observedParameters: string;
  accuracyLevel: number;
  communicationSystem: string;
  latitude: string;
  longitude: string;
  elevation: number;
  stationsNature: string;
}

// export interface IWeatherStationsModel extends IWeatherStations, Document {
//   createdAt: Date;
//   updatedAt: Date;
// }

const weatherStationsSchema: Schema = new Schema(
  {
    weatherStationsName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    locationType: {
      type: Schema.Types.ObjectId,
      ref: "LocationTypes",
      required: true,
    },
    location: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: "Countries", required: true },
    region: { type: Schema.Types.ObjectId, ref: "Regions", required: true },
    district: { type: Schema.Types.ObjectId, ref: "Districts", required: true },
    dateOfInstallation: { type: Number, required: true },
    operator: { type: Schema.Types.ObjectId, ref: "Operators", required: true },
    dataFrequency: { type: Number, required: true },
    stationStatus: { type: String, required: true },
    observedParameters: { type: String, required: true },
    accuracyLevel: { type: Number, required: true },
    communicationSystem: { type: String, required: true },
    latitude: { type: String, required: true, unique: true },
    longitude: { type: String, required: true, unique: true },
    elevation: { type: Number, required: true },
    stationsNature: {
      type: Schema.Types.ObjectId,
      ref: "StationsNatures",
      required: true,
    },
  },
  { timestamps: true }
);

const WeatherStations =
  mongoose.models.WeatherStations ||
  mongoose.model<IWeatherStations>("WeatherStations", weatherStationsSchema);
export default WeatherStations;
