import { environment } from "src/environments/environment";

export const ROUTES_CONSTANTS = {
  API_URL: environment.apiUrl,

  LOGIN: "/api/auth/login",
  SIGN_UP: "/api/auth/register",

  CONTACTS_LIST: "/api/contact/getAll",
  CONTACT: "/api/contact",
};
