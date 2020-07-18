import { Serializer as JSONAPISerializer } from 'jsonapi-serializer';

// eslint-disable-next-line import/prefer-default-export
export const userSerializer = new JSONAPISerializer('users', {
  attributes: ['id', 'name', 'createdAt'],
  keyForAttribute: 'snake_case',
});
