import Type, { Annotation } from './Type';
import Literal from './Literal';
import { resolveReferencedType } from '../utils/referenceTypes';
import TypeLiteral from './TypeLiteral';
import UnionType from './UnionType';
import { ConstantTypes } from '../constantTypes';
export default class IndexedAccessType extends Type {
  private readonly objectType: Type;
  private readonly indexType: Type;
  constructor(objectType: Type, indexType: Type) {
    super();
    this.objectType = objectType;
    this.indexType = indexType;
  }
  public getProperty() {
    const { type: objType } = resolveReferencedType(this.objectType);
    const { type: indexType } = resolveReferencedType(this.indexType);
    const indexName = indexType.deriveLiteral([]).mock();
    if (objType instanceof TypeLiteral) {
      return objType
        ._getProperties()
        .find((property) => property.name === indexName);
    }
  }
  public deriveLiteral(parentAnnotations: Annotation[]) {
    const {
      objectType: maybeReferencedObjectType,
      indexType: maybeReferencedIndexType,
    } = this;
    const objectType = resolveReferencedType(
      maybeReferencedObjectType,
    ).type.deriveLiteral(parentAnnotations);
    const indexType = resolveReferencedType(maybeReferencedIndexType);
    if (objectType instanceof TypeLiteral) {
      if (indexType instanceof Literal) {
        // property index access
        const key = indexType.mock();
        const foundType = objectType
          ._getProperties()
          .find((item) => item.name === key);
        if (foundType) {
          return foundType.questionMark
            ? new UnionType([foundType.type, ConstantTypes.Undefined])
            : foundType.type;
        } else {
          // by right it should return AnyKeyword
          return ConstantTypes.Never;
        }
      } else {
        // search for index signatures
        // TODO: Implement for index signatures
        return new Literal('Unimplemented');
      }
    } else {
      return objectType.deriveLiteral(parentAnnotations);
    }
  }
}
