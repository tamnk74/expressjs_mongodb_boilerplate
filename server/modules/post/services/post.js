import Post from '../../../models/post';
import Category from '../../../models/category';

export const paginate = async (options) => {
  const { limit, skip, filter = {} } = options;
  const [items, total] = await Promise.all([
    Post.find(filter).populate('user').populate('category').populate('tags').skip(skip).limit(limit),
    Post.count(filter),
  ]);

  return {
    total,
    items,
  };
};
