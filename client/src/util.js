const baseURL = (window.location.hostname === "localhost") ?
          "http://localhost:4000" : "https://student-list-dys2.onrender.com";
const end = '/api/students/';
export const fullURL = `${baseURL}${end}`;
