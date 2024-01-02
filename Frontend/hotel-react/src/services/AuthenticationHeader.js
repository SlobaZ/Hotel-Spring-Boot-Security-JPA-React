import { LoggedUser } from "./UserContext";

export default function AuthenticationHeader() {

  const user = JSON.parse(LoggedUser.user);

  if (user && user.accessToken) {
   return { Authorization: 'Bearer ' + user.accessToken }; 
  } else {
    return {};
  }
}

