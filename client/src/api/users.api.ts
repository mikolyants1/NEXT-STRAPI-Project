
import { AxiosInstance } from "axios";
import { HttpClient } from "../../utils/HttpClient";
import { Axios, IStrapiData, IUserAttrs } from "@/lib/type";

export class UsersApi {
   private readonly httpClient:AxiosInstance;
   private static users:UsersApi | null;

   private constructor(){
     this.httpClient = HttpClient.getClient();
   }

   static getClient(){
     if (!this.users){
       this.users = new UsersApi();
     }
     return this.users;
   }
   
   async createUser(data:IUserAttrs):Promise<IStrapiData<IUserAttrs>>{
     return this.httpClient.post("my-users",{data})
     .then(({data}:Axios<IUserAttrs,unknown>) => data.data);
   }

   async getUserById(id:string):Promise<IStrapiData<IUserAttrs>>{
     return this.httpClient.get(`my-users/?populate=*`)
     .then(({data}:Axios<IUserAttrs,[]>) => {
       
       const r = data.data.filter(u =>String(u.attributes.uuid) == String(id))[0]
       console.log(r)
       return r
     });
   }
}