import { Serializer as JSONAPISerializer } from 'jsonapi-serializer';

export const getPostSerializer = (links, meta) =>
  new JSONAPISerializer('posts', {
    attributes: ['id', 'title', 'content', 'publishDate', 'user', 'category', 'tags', 'comments', 'createdAt', 'updatedAt'],
    user: {
      ref: 'id',
      attributes: ['id', 'name'],
      keyForAttribute: 'snake_case',
    },
    category: {
      ref: 'id',
      attributes: ['id', 'name'],
      keyForAttribute: 'snake_case',
    },
    tags: {
      ref: 'id',
      attributes: ['id', 'name'],
      keyForAttribute: 'snake_case',
    },
    comments: {
      ref: 'id',
      attributes: ['id', 'content'],
      keyForAttribute: 'snake_case',
    },
    meta,
    topLevelLinks: links,
    keyForAttribute: 'snake_case',
  });
