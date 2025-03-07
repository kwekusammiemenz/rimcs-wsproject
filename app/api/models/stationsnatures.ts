import mongoose, { Document, Schema } from "mongoose";

export interface IStationsNatures extends Document {
  stationsNaturesName: string;
}

// export interface IStationsNaturesModel extends IStationsNatures, Document {
//   createdAt: Date;
//   updatedAt: Date;
// }

const stationsNaturesSchema: Schema = new Schema(
  {
    stationsNaturesName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const StationsNatures =
  mongoose.models.StationsNatures ||
  mongoose.model<IStationsNatures>("StationsNatures", stationsNaturesSchema);
export default StationsNatures;
