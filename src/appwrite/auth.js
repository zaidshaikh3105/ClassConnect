import { Client, Account, ID } from "appwrite"; // Ensure to import ID
import conf from "../conf/conf";

export class AuthService {
  client = new Client();

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userId = ID.unique(); // Generate a unique user ID
      console.log("Generated User ID:", userId);
      const userAccount = await this.account.create(
        userId,
        email,
        password,
        name
      );
      if (userAccount) {
        return await this.login({ email, password });
      } else {
        return { success: false, message: "Account creation failed." };
      }
    } catch (error) {
      console.error("Error in createAccount:", error); // Log for debugging
      return {
        success: false,
        message: "Failed to create account. Please try again.",
      };
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createSession(email, password);
      return { success: true, session };
    } catch (error) {
      console.error("Error in login:", error); // Log for debugging
      return {
        success: false,
        message: "Failed to log in. Please check your credentials.",
      };
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return { success: true, user };
    } catch (error) {
      console.error("Error in getCurrentUser:", error); // Log for debugging
      return { success: false, message: "Failed to get current user." };
    }
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
