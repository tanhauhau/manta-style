import Type from './Type';

export type Literals = string | boolean | number;
export default class Literal<T extends Literals> extends Type {
  private readonly literal: T;
  constructor(literal: T) {
    super();
    this.literal = literal;
  }
  public deriveLiteral() {
    return this;
  }
  public mock() {
    return this.literal;
  }
}
