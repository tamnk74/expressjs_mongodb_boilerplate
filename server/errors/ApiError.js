class ApiError extends Error {
  constructor({ code, status, title, detail, stack }) {
    super();
    this.code = code;
    this.status = status;
    this.title = title;
    this.detail = detail;
    this.stack = stack;
  }
}

export default ApiError;
