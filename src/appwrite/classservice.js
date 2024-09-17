import { database } from "./appwriteClient";

export const createClass = async (classData) => {
  return database.createDocument("classes", "unique_id", classData);
};

export const fetchClasses = async () => {
  return database.listDocuments("classes");
};
