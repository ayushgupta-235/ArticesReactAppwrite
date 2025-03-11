import config from "../config/config";
import {Client,Account,ID} from "appwrite"

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);

            if(userAccount){
                //call login method
                return this.login({email,password});
            }else{
                return userAccount;
            }
        } catch (error) {
            console.log("createAccount: ERROR",error)
        }
    }

    async login({email,password}){
        try {
            this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log("login: ERROR",error)
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("getCurrentUser: ERROR",error)
        }
        return null;
    }

    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("logout: ERROR",error)
        }
    }
}

const authService = new AuthService();

export default authService