const BASE_URL = "https://rimcs-wsproject.vercel.app";
//const BASE_URL = "http://localhost:3000";

export const GET_API_DATA = (tableName: string) => {
  return `${BASE_URL}/api/${tableName.toLowerCase()}`;
};

export const GET_API_UPDATE_PATH = (tableName: string) => {
  return `${BASE_URL}/api${tableName.toLowerCase()}`;
};

export const GET_All = async (tableName: string) => {
  try {
    const res = await fetch(GET_API_DATA(tableName.toLowerCase()), {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${tableName.toLowerCase()}`);
    }

    return res.json();
  } catch (error) {
    console.log(`Error loading ${tableName.toLowerCase()}: `, error);
  }
};

export const GET_DATA_BY_iDs = async (tabeiD: string, tableName: string) => {
  const Query = `${GET_API_DATA(tableName.toLowerCase())}/${tabeiD}`;
  try {
    const res = await fetch(Query, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${tableName.toLowerCase()}`);
    }

    return res.json();
  } catch (error) {
    console.log(`Error loading ${tableName.toLowerCase()}: `, error);
  }
};

// // export const SAVEData = async (tabeiD: string, tableName: string, {params}) => {
// export const SAVEData = async (request:Request) => {
//    const { body } = await request.json();
//   //const Query = `${GET_APIDATA(tableName)}/${tabeiD}`;
//   console.log(body);
//   const res = await fetch(body, {
//     method: "DELETE",
//   });

//   return res;
// };

export const DELETE_Data = async (tabeiD: string, tableName: string) => {
  const Query = `${GET_API_DATA(tableName)}/${tabeiD}`;
  //console.log(Query);
  const res = await fetch(Query, {
    method: "DELETE",
  });

  return res;
};
