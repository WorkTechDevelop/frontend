export const formFieldsConfig = {
    lastName: { label: 'Фамилия', type: 'text', required: true, placeholder: 'Egorov', modes: ['register'] },
    firstName: { label: 'Имя', type: 'text', required: true, placeholder: 'Egor', modes: ['register'] },
    middleName: { label: 'Отчество', type: 'text', required: true, placeholder: 'Egorovich', modes: ['register'] },
    email: { label: 'Email', type: 'email', required: true, placeholder: 'your@email.com', modes: ['login', 'register'] },
    password: { label: 'Пароль', type: 'password', required: true, placeholder: '********', modes: ['login', 'register'] },
    confirmPassword: { label: 'Подтвердите пароль', type: 'password', required: true, placeholder: '********', modes: ['register'] },
    gender: { 
      label: 'Пол', 
      type: 'select',
      required: true, 
      modes: ['register'], 
      options: [
        { value: '', label: 'Выберите пол' },
        { value: 'MALE', label: 'Мужской' },
        { value: 'FEMALE', label: 'Женский' }
      ]
    },
};