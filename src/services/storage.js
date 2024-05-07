import {Client, Databases, Query, Storage, ID} from 'appwrite'
import config from "../config/config"

class StorageService {
    client = new Client()
    databases
    bucket

    constructor() {
        this.client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectID)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    createDocument = async ({title, slug, content, featuredImage, status, userID}) => {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    userID,
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Error :: createDocument :: ", error)
        }
    }

    updateDocument = async (slug, {title, content, featuredImage, status}) => {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Error :: updateDocument :: ", error)
        }
    }

    deleteDocument = async (slug) => {
        try {
            return this.databases.deleteDocument(config.appwriteDatabaseID, config.appwriteCollectionID, slug)
        } catch (error) {
            console.log("Appwrite Error :: deleteDocument :: ", error)
            return false;
        }
    }

    getOneDocument = async (slug) => {
        try {
            return this.databases.getDocument(config.appwriteDatabaseID, config.appwriteCollectionID, slug)
        } catch (error) {
            console.log("Appwrite Error :: getDocument :: ", error)
            return false;
        }
    }

    getAllDocuments = async (queries = Query.equal("status", "active")) => {
        try {
            this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Appwrite Error :: getDocumentUsingQueries :: ", error)
            return false;
        }
    }

    uploadFile = async (file) => {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Error :: uploadFile :: ", error)
        }
    }

    deleteFile = async (fileID) => {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileID
            )
            return true;
        } catch (error) {
            console.log("Appwrite Error :: deleteFile :: ", error)
            return false;
        }
    }

    getFilePreview = (fileID) => {
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketID,
                fileID
            )
        } catch (error) {
            console.log("Appwrite Error :: getFilePreview :: ", error)
        }
    }
}

const storageService = new StorageService()

export default storageService