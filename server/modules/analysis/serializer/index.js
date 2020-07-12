import { Serializer as JSONAPISerializer } from 'jsonapi-serializer';

export const userSerializer = new JSONAPISerializer('users', {
  attributes: ['id', 'name', 'createdAt'],
  keyForAttribute: 'snake_case',
});