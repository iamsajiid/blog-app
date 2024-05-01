import { Client, Account, ID } from "appwrite";
import config from "../config/config"

class AuthService {
    client = new Client()
    account

    constructor(){
        this.client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectID)
        this.account = new Account(this.client)
    }

    createUser = async ({email, password, name}) => {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                this.login(email, password)
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("Appwrite Error :: Create User :: ", error)
        }
    }

    login = async (email, password) => {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwrite Error :: Login :: ", error)
            return false;
        }
    }

    getCurrentUser = async () => {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Error :: Current User :: ", error)
        }
        return null;
    }

    logOut = async () => {
        try {
            return await this.account.deleteSession("current")
        } catch (error) {
            console.log("Appwrite Error :: Current User :: ", error)
        }
    }
}

const authService = new AuthService()

export default authService