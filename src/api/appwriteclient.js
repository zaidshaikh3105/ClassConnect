import { Databases, Client, Account, ID } from "appwrite"; // Correctly importing all necessary items

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("66d622c60021b5a3b3f9"); // Your project ID (removed the angle brackets)
const databases = new Databases(client);

export const account = new Account(client);

export { ID, databases };
