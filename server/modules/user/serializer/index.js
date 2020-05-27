import { Serializer as JSONAPISerializer } from 'jsonapi-serializer';

export const userSerializer = new JSONAPISerializer('users', {
  attributes: ['id', 'name', 'createdAt'],
  keyForAttribute: 'snake_case',
});


export const errorSerializer = new JSONAPISerializer('errors', {
  attributes: ['id', 'status', 'message', 'detail'],
  keyForAttribute: 'snake_case',
});

export const authSerializer = new JSONAPISerializer('auth', {
  attributes: ['user', 'token'],
  keyForAttribute: 'snake_case',
});