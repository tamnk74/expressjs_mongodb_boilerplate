export class AnalysisController {
  constructor({ analysisService }) {
    this.analysisService = analysisService;
  }

  index = async (req, res, next) => {
    try {
      const result = await this.analysisService.statistic(req.query);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}
