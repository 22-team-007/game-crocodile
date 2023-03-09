type ValidationKey =
  | 'email'
  | 'login'
  | 'first_name'
  | 'display_name'
  | 'second_name'
  | 'phone'
  | 'password'

export const validation: Record<
  ValidationKey,
  { value: RegExp; message: string }
> = {
  email: {
    value: /^[a-zA-Z0-9_-]+[@][a-zA-Z]+[.][a-zA-Z]+/,
    message:
      'латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.',
  },
  login: {
    value: /^(?=.*?([a-zA-Z]|-|_))(\w|-|_){3,20}$/,
    message:
      'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).',
  },
  first_name: {
    value: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
    message:
      'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
  },
  display_name: {
    value: /.*/,
    message: 'Имя, которое будет отображаться в чате',
  },
  second_name: {
    value: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
    message:
      'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
  },
  phone: {
    value: /^([+]{1})?[0-9]{10,15}$/,
    message: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса.',
  },
  password: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    message:
      'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
  },
}

export const onValidateRepeatPassword = (
  newPassword: string | undefined,
  repeatPassword: string | undefined
) => {
  if (newPassword === repeatPassword) {
    return true
  }
  return 'пароли не совпадают'
}
