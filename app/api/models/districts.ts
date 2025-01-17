import mongoose, { Document, Schema } from "mongoose";

export interface IDistricts extends Document {
  districtsName: string;
  latitude: string;
  longitude: string;
  region: string;
}

// export interface IDistrictsModel extends IDistricts, Document {
//   createdAt: Date;
//   updatedAt: Date;
// }

const districtsSchema: Schema = new Schema(
  {
    districtsName: { type: String, required: true, unique: true },
    latitude: { type: String, required: true, unique: true },
    longitude: { type: String, required: true, unique: true },
    region: { type: Schema.Types.ObjectId, ref: "Regions", required: true },
  },
  { timestamps: true }
);

const Districts =
  mongoose.models.Districts ||
  mongoose.model<IDistricts>("Districts", districtsSchema);
export default Districts;
