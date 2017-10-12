/**
 * IUserData is a part of server responce and represents some user data
 */

export interface IUserData {
  login: String;
  password: String;
  profileID: String;
  notification_key?: String;
}
