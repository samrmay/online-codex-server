import loadExpress from "./express";
import loadMongoose from "./mongoose";

export default async (app) => {
  console.log("Loading express...");
  loadExpress(app);
  console.log("Express loaded.");

  console.log("Loading Mongoose...");
  loadMongoose(app);
  console.log("Mongoose loaded.");
};
