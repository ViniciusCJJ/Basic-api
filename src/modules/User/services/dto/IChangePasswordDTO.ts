interface IChangePasswordDTO {
  request_id: string;
  user_id: string;
  oldPassword: string;
  newPassword: string;
}

export { IChangePasswordDTO };
