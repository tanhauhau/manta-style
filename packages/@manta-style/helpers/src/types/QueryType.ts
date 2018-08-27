import MantaStyle, {
  Type,
  LiteralType,
  resolveReferencedType,
} from '@manta-style/runtime';

export default class QueryType extends Type {
  private type: Type;
  constructor(type: Type) {
    super();
    this.type = type;
  }
  // TODO: Fix typing
  public async deriveLiteral(annotations: any) {
    const {
      context: { query },
    } = MantaStyle;
    const { type } = await resolveReferencedType(this.type);
    if (type instanceof LiteralType && typeof query === 'object') {
      // TODO: Fix typings
      const content = (query as {
        [key: string]: string | string[] | undefined;
      })[type.mock()];
      if (content) {
        if (typeof content === 'string') {
          return MantaStyle.Literal(content);
        } else if (Array.isArray(content)) {
          // TODO: Expose ArrayLiteral and use it directly
          return MantaStyle.ArrayLiteral(
            content.map((item) => MantaStyle.Literal(item)),
          );
        }
      }
    }
    return MantaStyle.NeverKeyword;
  }
}
