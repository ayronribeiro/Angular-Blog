export interface RequestData {
    body?: {[key: string]: any} | FormData;
    params?: Record<string,string>;
}
