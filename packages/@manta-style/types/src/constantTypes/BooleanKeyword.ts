import Type from '../nodes/Type';
import Literal from '../nodes/Literal';

export default class BooleanKeyword extends Type {
  public deriveLiteral() {
    return new Literal(Math.random() >= 0.5);
  }
}
