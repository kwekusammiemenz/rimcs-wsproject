import mongoose, { Document, Schema } from "mongoose";

export interface ILocationTypes extends Document {
  locationTypesName: string;
}

// export interface ILocationTypesModel extends ILocationTypes, Document {
//   createdAt: Date;
//   updatedAt: Date;
// }

const locationTypesSchema: Schema = new Schema(
  {
    locationTypesName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const LocationTypes =
  mongoose.models.LocationTypes ||
  mongoose.model<ILocationTypes>("LocationTypes", locationTypesSchema);
export default LocationTypes;
