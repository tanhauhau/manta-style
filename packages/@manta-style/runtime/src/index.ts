import {
  TypeAliasDeclaration,
  Type,
  Annotation,
  TypeLiteral,
  MappedType,
  IndexedAccessType,
  UnionType,
  ParenthesizedType,
  IntersectionType,
  Literal,
  ArrayType,
  ArrayLiteral,
  TupleType,
  RestType,
  OptionalType,
  ConditionalType,
  KeyOfKeyword,
  ConstantTypes,
  Literals,
} from '@manta-style/types';
import LazyTypeAliasDeclaration from './nodes/LazyTypeAliasDeclaration';

class MantaStyle {
  public static context: { [key: string]: unknown } = {};
  public static TypeAliasDeclaration(
    typeName: string,
    typeCallback: (currentType: TypeAliasDeclaration) => Type,
    annotations: Annotation[],
  ) {
    const newType = new LazyTypeAliasDeclaration(typeName, annotations);
    newType.setInitialize(typeCallback);
    return newType;
  }
  public static TypeLiteral(typeCallback: (currentType: TypeLiteral) => void) {
    const newType = new TypeLiteral();
    typeCallback(newType);
    return newType;
  }
  public static MappedType(typeCallback: (currentType: MappedType) => Type) {
    const newType = new MappedType();
    newType.setType(typeCallback(newType));
    return newType;
  }
  public static IndexedAccessType(objectType: Type, indexType: Type) {
    return new IndexedAccessType(objectType, indexType);
  }
  public static UnionType(types: Type[]) {
    return new UnionType(types);
  }
  public static ParenthesizedType(type: Type) {
    return new ParenthesizedType(type);
  }
  public static IntersectionType(types: Type[]) {
    return new IntersectionType(types);
  }
  public static Literal(literal: Literals) {
    return new Literal(literal);
  }
  public static ArrayType(elementType: Type) {
    return new ArrayType(elementType);
  }
  public static ArrayLiteral(elements: Type[]) {
    return new ArrayLiteral(elements);
  }
  public static TupleType(elementTypes: Type[]) {
    return new TupleType(elementTypes);
  }
  public static RestType(elementType: Type) {
    return new RestType(elementType);
  }
  public static OptionalType(type: Type) {
    return new OptionalType(type);
  }
  public static ConditionalType(
    checkType: Type,
    extendsType: Type,
    trueType: Type,
    falseType: Type,
  ) {
    return new ConditionalType(checkType, extendsType, trueType, falseType);
  }
  public static NumberKeyword = ConstantTypes.Number;
  public static BooleanKeyword = ConstantTypes.Boolean;
  public static StringKeyword = ConstantTypes.String;
  public static NeverKeyword = ConstantTypes.Never;
  public static NullKeyword = ConstantTypes.Null;
  public static UndefinedKeyword = ConstantTypes.Undefined;
  public static AnyKeyword = ConstantTypes.Any;
  public static ObjectKeyword = ConstantTypes.Object;
  public static KeyOfKeyword(type: Type) {
    return new KeyOfKeyword(type);
  }
}

export default MantaStyle;
