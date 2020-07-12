import Post from '../../../models/post';
import { errorFactory } from '../../../errors';

class AnalysisService {
  statistic = async ({ from, to }) => {
    // const res = await Post.updateMany({ title: /^[k|l|m]\// }, {
    //   status: 'published',
    //   publishDate: new Date('2017-02-02')
    // });
    // console.log(res);
    const posts = await Post.aggregate([
      { $project: { createdAt: 0, updatedAt: 0, slug: 0, __v: 0 } },
      { $skip: 2 },
      { $limit: 2 },
    ]);
    const hotPosts = await Post.aggregate([
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
    const categories = await Post.aggregate([
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
    return {
      total: posts.length,
      hotPosts: hotPosts.total,
      categories,
    };
  };
}

export default AnalysisService;
