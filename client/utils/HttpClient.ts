import axios, { AxiosInstance } from 'axios';

export class HttpClient {
    private static httpClient: AxiosInstance | null = null;

    static getClient() {
        if (!this.httpClient) {
            this.httpClient = axios.create({
                baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
            });
        }
        return this.httpClient;
    }
}