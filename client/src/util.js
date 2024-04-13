const baseURL = (window.location.hostname === "localhost") ?
          "http://localhost:4000" : " ";
const end = '/students/add-student';
export const fullURL = `${baseURL}${end}`;
