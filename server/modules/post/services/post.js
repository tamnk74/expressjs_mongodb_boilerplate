import Post from '../../../models/post';

// eslint-disable-next-line import/prefer-default-export
export const paginate = async (options) => {
  const { limit, skip, filter = {} } = options;
  const [items, total] = await Promise.all([
    Post.find(filter)
      .populate('user')
      .populate('category')
      .populate('tags')
      .skip(skip)
      .limit(limit),
    Post.count(filter),
  ]);

  return {
    total,
    items,
  };
};
