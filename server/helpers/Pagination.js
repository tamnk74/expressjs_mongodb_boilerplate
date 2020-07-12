import querystring from 'querystring';

class Pagination {

  constructor({ page, limit }) {
    let { page = 1, limit = 10 } = req.query;
    this.page = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    this.limit = parseInt(limit, 10) >= 0 ? parseInt(limit, 10) : 10;
    this.skip = (page - 1) * limit;
  }
  setBaseUrl(req) {
    this.baseUrl = '';
  }

  setTotal(total) {
    this.total = parseInt(total, 10);
    this.lastPage = Math.ceil(this.total / this.limit) || 1;
    return this;
  }
  parseUrl(page) {
    return `${this.baseUrl}?${querystring.stringify({
      page,
      limit: this.limit
    })}`
  }
  getLinks() {
    return {
      first: this.first,
      last: this.last,
      prev: this.prev,
      next: this.next,
      self: this.baseUrl
    };
  }

}

export default Pagination;

