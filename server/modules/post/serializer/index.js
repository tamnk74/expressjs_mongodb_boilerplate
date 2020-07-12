import { Serializer as JSONAPISerializer } from 'jsonapi-serializer';

export const postSerializer = new JSONAPISerializer('posts', {
  attributes: ['id', 'title', 'content', 'publishDate', 'user', 'category', 'tags', 'createdAt', 'updatedAt'],
  user: {
    ref: 'id',
    attributes: ['id', 'name'],
    keyForAttribute: 'snake_case'
  },
  keyForAttribute: 'snake_case',
});
