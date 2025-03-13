import mongoose, { Document, Schema } from "mongoose";

export interface ISponsors extends Document {
  sponsorsName: string;
}

// export interface ISponsorsModel extends ISponsors, Document {
//   createdAt: Date;
//   updatedAt: Date;
// }

const sponsorsSchema: Schema = new Schema(
  {
    sponsorsName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Sponsors =
  mongoose.models.Sponsors ||
  mongoose.model<ISponsors>("Sponsors", sponsorsSchema);
export default Sponsors;
