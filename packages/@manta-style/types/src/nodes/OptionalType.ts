import Type, { Annotation } from './Type';

export default class OptionalType extends Type {
  private type: Type;
  constructor(type: Type) {
    super();
    this.type = type;
  }
  public deriveLiteral(annotations: Annotation[]) {
    return this.type.deriveLiteral(annotations);
  }
}
