declare type Field = {
  label: string
  type: string
  name: string
  value?: string,
  message?: string
  errMessage?: string
  regExp?: RegExp
}
declare type SignInParams = {
  [k:string],
  login: string,
  password: string,
}
declare type SignUpParams = SignInParams & {
  first_name: string,
  second_name: string,
  email: string,
  phone: string,
}
declare type UserType = Omit<SignUpParams, "password"> & {
  id: number,
  display_name?: string,
  avatar?: string,
}
declare type ProfileParams = Omit<UserType, "id">
declare type PasswordParams = {
  [k:string],
  oldPassword: string,
  newPassword: string,
  repeatPassword?: string,
}
