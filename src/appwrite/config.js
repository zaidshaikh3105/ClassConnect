import { Client, Account, ID, Databases, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createNotes({ slug, content, image, title, status, userId }) {
    try {
      // Ensure that all required fields are passed and valid
      if (!slug || !title || !content || !userId) {
        throw new Error("Missing required fields");
      }

      // Create document in the specified collection
      const document = await this.databases.createDocument(
        conf.appwriteDb_Id, // Database ID
        conf.appwriteCollectionId, // Collection ID
        slug, // Document ID (unique)
        {
          title,
          content,
          image,
          status,
          userId,
        }
      );

      return document; // Return created document
    } catch (error) {
      console.error(
        "Appwrite service :: createNotes :: error",
        error.message || error
      );
    }
  }

  async updateNotes(slug, { title, content, image, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDb_Id,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
        }
      );
    } catch (error) {
      console.error("Appwrite error ::: updateNotes :::", error);
    }
  }

  async deleteNotes(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDb_Id,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite error ::: deleteNotes :::", error);
      return false;
    }
  }

  async getNote(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDb_Id,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Appwrite error ::: getNote :::", error);
      return false;
    }
  }

  async getAllNotes(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDb_Id,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite error ::: getAllNotes :::", error);
      return false;
    }
  }

  // File upload
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite error ::: uploadFile :::", error);
      return false;
    }
  }

  // Delete file
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Appwrite error ::: deleteFile :::", error);
      return false;
    }
  }

  // Get file preview
  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Appwrite error ::: getFilePreview :::", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
