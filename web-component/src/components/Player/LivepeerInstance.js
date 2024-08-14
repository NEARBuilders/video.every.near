import { Livepeer } from "livepeer";

const API_KEY = process.env.REACT_APP_LIVEPEER_STUDIO_API_KEY;

let livepeerInstance = null;

function createLivepeerInstance(apiKey = API_KEY) {
  if (!livepeerInstance) {
    livepeerInstance = new Livepeer({
      apiKey,
    });
  } else {
    console.log("Returning existing Livepeer instance");
  }
  return livepeerInstance;
}

function updateLivepeerInstance(apiKey) {
  livepeerInstance = new Livepeer({ apiKey });
  return livepeerInstance;
}

export { createLivepeerInstance, updateLivepeerInstance };
