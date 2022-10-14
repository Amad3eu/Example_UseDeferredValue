import { BootstrapStaticResponse } from "./models";

const get = async <T>(url: string): Promise<T> => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    return data as T;
  } catch (error) {
    console.log(`An error occurred when fetching data from ${url}`);
    console.log(error);
    throw error;
  }
};
export const getPlayers = (): Promise<BootstrapStaticResponse> =>
  get<BootstrapStaticResponse>("/api/bootstrap-static/");
