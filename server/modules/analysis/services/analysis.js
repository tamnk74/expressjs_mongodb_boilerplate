import Post from '../../../models/post';

export class AnalysisService {
  statistic = async () => {
    const posts = await this.getPosts();
    return {
      total: posts.length,
      posts,
    };
  };

  getPosts = async (skip = 0, limit = 10) =>
    Post.aggregate([
      {
        $addFields: {
          description: { $substr: ['$content', 0, 100] },
        },
      },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          slug: 0,
          __v: 0,
          content: 0,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

  popularPost = async () =>
    Post.aggregate([
      {
        $match: {
          view: {
            $gt: 100000,
          },
        },
      },
      {
        $count: 'total',
      },
    ]);

  groupByCategory = async () =>
    Post.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'categories',
        },
      },
      {
        $project: {
          total: 1,
          category: { $arrayElemAt: ['$categories', 0] },
        },
      },
    ]);
}
