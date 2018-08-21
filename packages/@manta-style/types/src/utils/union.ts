import UnionType from '../nodes/UnionType';
import Type from '../nodes/Type';
import { resolveReferencedType } from './referenceTypes';
import { ConstantTypes } from '../constantTypes';

export function normalizeUnion(unionType: UnionType): Type {
  // Filter out all 'never' keyword, since X | never = X
  const types = unionType
    .getTypes()
    .map(resolveReferencedType)
    .map((item) => item.type)
    .filter((type) => type !== ConstantTypes.Never);
  const { length } = types;
  if (length === 0) {
    // No union elements in this union type
    // just return 'never'
    return ConstantTypes.Never;
  } else if (length === 1) {
    // Only one union element found, so UnionType
    // makes no sense, just return that type
    return types[0];
  } else {
    // Return a UnionType without 'never' keywords
    return new UnionType(types);
  }
}
