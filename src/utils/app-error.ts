export class AppError {
  statusCode: number;
  message: string;
  details: any;

  constructor(statusCode: number, message: string, details: any = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}
