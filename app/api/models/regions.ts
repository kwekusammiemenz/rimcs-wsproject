import mongoose, { Document, Schema } from "mongoose";

export interface IRegions extends Document {
  regionsName: string;
  latitude: string;
  longitude: string;
  country: string;
}

// export interface IRegionsModel extends IRegions, Document {
//   createdAt: Date;
//   updatedAt: Date;
// }

const regionsSchema: Schema = new Schema(
  {
    regionsName: { type: String, required: true, unique: true },
    latitude: { type: String, required: true, unique: true },
    longitude: { type: String, required: true, unique: true },
    country: { type: Schema.Types.ObjectId, ref: "Countries", required: true },
  },
  { timestamps: true }
);

const Regions =
  mongoose.models.Regions || mongoose.model<IRegions>("Regions", regionsSchema);
export default Regions;
