import axios from "axios";
// import AxiosMockAdapter from 'axios-mock-adapter';
// 192.168.43.73, 
export const getServerSideProps = () => {
  console.log(process.env.NEXT_PUBLIC_SERVER_URL, "NEXT_PUBLIC_SERVER_URL")
  console.log(process.env.NEXT_PUBLIC_LOCAL_URL, "NEXT_PUBLIC_LOCAL_URL")
}
export const baseUrl= `${process.env.NEXT_PUBLIC_SERVER_URL}/api`
// "http://192.168.100.190:5000/api/";
// http://192.168.43.73:5000/api/
// http://147.182.187.59:8800
const instance = axios.create({
  baseURL: baseUrl
});
if(typeof window !== 'undefined') {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}
export default instance;

