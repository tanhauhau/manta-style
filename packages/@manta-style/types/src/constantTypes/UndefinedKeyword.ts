import Type from '../nodes/Type';

export default class UndefinedKeyword extends Type {
  public deriveLiteral() {
    return this;
  }
  public mock() {
    return undefined;
  }
}
