import Type from './Type';

export default class ErrorType extends Type {
  private readonly message: string;
  constructor(errorMessage: string) {
    super();
    this.message = errorMessage;
  }
  public deriveLiteral() {
    return this;
  }
  public mock() {
    throw new Error(this.message);
  }
}
