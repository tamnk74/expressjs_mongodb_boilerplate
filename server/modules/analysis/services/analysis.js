import User from '../../../models/user';
import Post from '../../../models/post';
import { errorFactory } from '../../../errors';

class AnalysisService {
  statistic = async ({ from, to }) => {
    // const res = await Post.updateMany({ title: /^[k|l|m]\// }, {
    //   status: 'published',
    //   publishDate: new Date('2017-02-02')
    // });
    // console.log(res);
    const aggregate = await Post.aggregate([
      { $project: { title: 1, view: 1 } },
      { $skip: 5 },
      { $limit: 10 }
    ]);
    return {
      total: aggregate.length,
      aggregate,
    }
  }
}

export default AnalysisService;
