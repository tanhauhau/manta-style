import Type from '../nodes/Type';

export default class NeverKeyword extends Type {
  public deriveLiteral() {
    return this;
  }
}
