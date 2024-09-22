import { Client, Account, ID } from "appwrite"; // Ensure to import ID
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log(session);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return { success: true, message: "Successfully logged out." };
    } catch (error) {
      console.error("Error in logout:", error); // Log for debugging
      return { success: false, message: "Failed to log out." };
    }
  }
}

const authService = new AuthService();
export default authService;
