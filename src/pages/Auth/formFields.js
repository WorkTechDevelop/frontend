export const formFieldsConfig = {
    lastName: { label: 'Фамилия', type: 'text', required: true, placeholder: 'Egorov', modes: ['register'] },
    firstName: { label: 'Имя', type: 'text', required: true, placeholder: 'Egor', modes: ['register'] },
    middleName: { label: 'Отчество', type: 'text', required: true, placeholder: 'Egorovich', modes: ['register'] },
    email: { label: 'Email', type: 'email', required: true, placeholder: 'your@email.com', modes: ['login', 'register'] },
    password: { label: 'Пароль', type: 'password', required: true, placeholder: '********', modes: ['login', 'register'] },
    confirmPassword: { label: 'Подтвердите пароль', type: 'password', required: true, placeholder: '********', modes: ['register'] },
  };
  
  export const initialFormData = Object.keys(formFieldsConfig).reduce((acc, key) => ({ ...acc, [key]: '' }), {});
  export const initialErrors = Object.keys(formFieldsConfig).reduce((acc, key) => ({ ...acc, [key]: '' }), { general: '' });