import {
  Type,
  // ArrayLiteral,
  // Literal,
  ConstantTypes,
  Annotation,
  // resolveReferencedType,
} from '@manta-style/types';

export default class QueryType extends Type {
  private type: Type;
  constructor(type: Type) {
    super();
    this.type = type;
  }
  public deriveLiteral(annotations: Annotation[]) {
    // const {
    //   context: { query },
    // } = MantaStyle;
    // const { type } = resolveReferencedType(this.type);
    // if (type instanceof LiteralType && typeof query === 'object') {
    //   // TODO: Fix typings
    //   const content = (query as {
    //     [key: string]: string | string[] | undefined;
    //   })[type.mock()];
    //   if (content) {
    //     if (typeof content === 'string') {
    //       return new Literal(content);
    //     } else if (Array.isArray(content)) {
    //       // TODO: Expose ArrayLiteral and use it directly
    //       return new ArrayLiteral(content.map((item) => new Literal(item)));
    //     }
    //   }
    // }
    return ConstantTypes.Never;
  }
}
