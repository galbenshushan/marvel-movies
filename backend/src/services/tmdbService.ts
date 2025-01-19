import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const accessToken = process.env.ACCESS_TOKEN;

const fetchFromAPI = async (endpoint: string): Promise<any> => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json;charset=utf-8",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status}: ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
    throw error;
  }
};

export const getMovieById = async (movieId: number): Promise<any> => {
  return fetchFromAPI(`/movie/${movieId}`);
};

export const getMovieCredits = async (movieId: number): Promise<any> => {
  return fetchFromAPI(`/movie/${movieId}/credits`);
};

export const getPersonDetails = async (personId: number): Promise<any> => {
  return fetchFromAPI(`/person/${personId}`);
};
