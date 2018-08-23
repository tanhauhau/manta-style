import { isAssignable } from './assignable';
import { normalizeUnion } from './union';
import Type from '../nodes/Type';
import UnionType from '../nodes/UnionType';
import TypeLiteral from '../nodes/TypeLiteral';
import { ConstantTypes } from '../constantTypes';

export function intersection(S: Type, T: Type): Type {
  if (S instanceof UnionType) {
    const unionType = new UnionType(
      S.getTypes().map((type) => intersection(type, T)),
    );
    return normalizeUnion(unionType);
  } else {
    const ST = isAssignable(S, T);
    const TS = isAssignable(T, S);
    if (!ST && !TS) {
      return ConstantTypes.Never;
    } else if (ST && TS) {
      if (S instanceof TypeLiteral && T instanceof TypeLiteral) {
        return S.compose(T);
      } else {
        return S;
      }
    } else if (ST) {
      return S;
    } else {
      return T;
    }
  }
}
