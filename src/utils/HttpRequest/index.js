import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.insecureHTTPParser = true;
axios.defaults.credentials = 'include';
axios.defaults.xsrfCookieName = 'token';
axios.defaults.xsrfHeaderName = 'token';
axios.defaults.baseURL = process.env.REACT_APP_BASE_API;

export const CancelToken = axios.CancelToken;

export const Get = async (path, params = {}, option) => {
  return await axios.get(path, { params }, option);
};
Object.defineProperty(Get, 'name', { enumerable: false, value: 'Get' });
export const Post = async (path, params = {}, option) => {
  return await axios.post(path, params, option);
};
Object.defineProperty(Post, 'name', { enumerable: false, value: 'Post' });
export const Put = async (path, params = {}, option) => {
  return await axios.put(path, params, option);
};
Object.defineProperty(Put, 'name', { enumerable: false, value: 'Put' });
export const Delete = async (path, params = {}, option) => {
  return await axios.delete(path, params, option);
};
Object.defineProperty(Delete, 'name', { enumerable: false, value: 'Delete' });
