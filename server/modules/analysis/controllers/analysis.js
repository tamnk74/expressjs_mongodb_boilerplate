import { analysisService } from '../services';

class AnalysisController {
  index = async (req, res, next) => {
    try {
      const result = await analysisService.statistic(req.query);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default AnalysisController;
