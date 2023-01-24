export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  pushNotificationToken: string;
  profilePic: string;
  createdAt: string;
  id: string;
  bio?: string;
  website?: string;
}

// Make sure there's a reducer named 'logOut' <== case sensitive under 'auth' => reducers
export const actions = {
  LOGOUT: 'auth/logOut',
};
