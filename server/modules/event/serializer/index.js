import { Serializer as JSONAPISerializer } from 'jsonapi-serializer';

export const eventSerializer = new JSONAPISerializer('events', {
  attributes: ['id', 'name', 'startDate', 'dueDate', 'userId', 'createdAt', 'updatedAt'],
  user: {
    ref: 'id',
    attributes: ['id', 'name'],
    keyForAttribute: 'snake_case'
  },
  keyForAttribute: 'snake_case',
});
