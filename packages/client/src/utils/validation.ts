type ValidationKey = 'email' | 'login' | 'first_name' | 'display_name' | 'second_name' | 'phone' | 'password' | 'newPassword' | 'oldPassword' | 'repeatPassword'

export const validation: Record<ValidationKey, { regExp?: RegExp, message: string, errMessage: string }> = {
  email: {
    regExp: /^[a-zA-Z0-9_-]+[@][a-zA-Z]+[.][a-zA-Z]+/,
    message:
      'латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.',
    errMessage: 'email адрес введен неправильно',
  },
  login: {
    regExp: /^(?=.*?([a-zA-Z]|-|_))(\w|-|_){3,20}$/,
    message:
      'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).',
    errMessage: 'логин введен не правильно',
  },
  first_name: {
    regExp: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
    message:
      'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
    errMessage: 'имя введено не правильно',
  },
  display_name: {
    regExp: /.*/,
    message: 'Имя, которое будет отображаться в чате',
    errMessage: '',
  },
  second_name: {
    regExp: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
    message:
      'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
    errMessage: 'фамилия введена не правильно',
  },
  phone: {
    regExp: /^([+]{1})?[0-9]{10,15}$/,
    message:
      'от 10 до 15 символов, состоит из цифр, может начинается с плюса.',
    errMessage: 'номер телефона введен не правильно',
  },
  password: {
    regExp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    message:
      'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
    errMessage: 'пароль введен не правильно',
  },
  newPassword: {
    regExp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    message:
      'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
    errMessage: 'пароль введен не правильно',
  },
  oldPassword: {
    regExp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    message:
      'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
    errMessage: 'пароль введен не правильно',
  },
  repeatPassword: {
    message: 'пароли должны совпадать',
    errMessage: 'пароли не совпадают',
  },
};
