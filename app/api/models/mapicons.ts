import mongoose, { Document, Schema } from "mongoose";

export interface IMapIcons extends Document {
  mapIconsName: string;
  operator: string;
}

// export interface ICategoriesModel extends ICategories, Document {
//   createdAt: Date;
//   updatedAt: Date;
// }

const MapIconsSchema: Schema = new Schema(
  {
    mapIconsName: { type: String, required: true, unique: true },
    operator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Operators",
    },
  },
  { timestamps: true }
);

const MapIcons =
  mongoose.models.MapIcons ||
  mongoose.model<IMapIcons>("MapIcons", MapIconsSchema);
export default MapIcons;
