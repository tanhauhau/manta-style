import Type from '../nodes/Type';
import TypeLiteral from '../nodes/TypeLiteral';

export default class ObjectKeyword extends Type {
  public deriveLiteral() {
    return new TypeLiteral();
  }
}
