import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
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
      return userAccount ? this.login({ email, password }) : userAccount;
    } catch (error) {
      // Log the entire error object
      console.error("Login error:", error);

      // Create a more detailed error message
      let errorMessage = "Login failed. Please try again.";
      const errorCode = error.code || "Unknown code"; // Default if code is missing
      const errorType = error.type || "Unknown type"; // Default if type is missing

      if (error && typeof error === "object" && error.message) {
        errorMessage = error.message; // Use the specific message if available
      }

      // Throw an object that includes the message and other properties
      throw { message: errorMessage, code: errorCode, type: errorType };
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log("Login successful:", session);
      return session;
    } catch (error) {
      // Log the entire error object
      console.error("Login error:", error);

      // Create a more detailed error message
      let errorMessage = "Login failed. Please try again.";
      const errorCode = error.code || "Unknown code"; // Default if code is missing
      const errorType = error.type || "Unknown type"; // Default if type is missing

      if (error && typeof error === "object" && error.message) {
        errorMessage = error.message; // Use the specific message if available
      }

      // Throw an object that includes the message and other properties
      throw { message: errorMessage, code: errorCode, type: errorType };
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return { success: true, message: "Successfully logged out." };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, message: "Failed to log out." };
    }
  }
}

const authService = new AuthService();
export default authService;
