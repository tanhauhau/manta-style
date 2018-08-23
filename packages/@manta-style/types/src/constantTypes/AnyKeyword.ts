import Type from '../nodes/Type';

export default class AnyKeyword extends Type {
  public deriveLiteral() {
    return this;
  }
}
