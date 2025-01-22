import { DistrictsProps, RegionsProps } from "@/src/Types/CordinatesProps";
import { getAPIDATA } from "../ApiCalls/apiActions";

const DataBaseTable = "Districts";

export const createBulkDistricts = async (
  districts: DistrictsProps[],
  regions: RegionsProps[]
) => {
  try {
    for (const dsQuery of districts) {
      for (const rgQuery of regions) {
        if (dsQuery.region == rgQuery.regionsName) {
          try {
            const res = await fetch(getAPIDATA(DataBaseTable), {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                districtsName: dsQuery.districtsName,
                latitude: dsQuery.latitude,
                longitude: dsQuery.longitude,
                region: rgQuery._id,
              }),
            });
            if (!res.ok) {
              throw new Error("Failed to update record");
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const createDistrict = async (data: DistrictsProps) => {
  //const router = useRouter();
  try {
    console.log(data);
    const res = await fetch(getAPIDATA(DataBaseTable), {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        districtsName: data.districtsName,
        latitude: data.latitude,
        longitude: data.longitude,
        region: data.region,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to update record");
    }

    //router.refresh();
    //router.push(`/${DataBaseTable}`);

    // // const user = await prisma.user.create({
    // //   data: {
    // //     districtsName: data.districtsName,
    // //     latitude: data.latitude,
    // //     longitude: data.longitude,
    // //     region: data.region,
    // //   },
    // // });
    // // revalidatePath("/");
    // // return user;
  } catch (error) {
    console.log(error);
  }
};
