import { QuestionToken } from '@manta-style/consts';
import TypeParameter from '../nodes/TypeParameter';
import { ErrorType } from '../utils/pseudoTypes';
import { Type } from '../utils/baseType';
import Literal from './Literal';
import TypeLiteral from './TypeLiteral';
import { resolveReferencedType } from '../utils/referenceTypes';
import UnionType from './UnionType';
import IndexedAccessType from './IndexedAccessType';

const ErrType = new ErrorType("MappedType hasn't been initialized");

function modifyQuestionMark(
  questionToken: QuestionToken,
  originalValue: boolean = false,
): boolean {
  return questionToken === QuestionToken.QuestionToken
    ? true
    : questionToken === QuestionToken.MinusToken
      ? false
      : originalValue;
}
export default class MappedType extends Type {
  private typeParameter: Type = ErrType;
  private type: Type = ErrType;
  private constraint: Type = ErrType;
  private questionToken: QuestionToken = QuestionToken.None;
  public deriveLiteral() {
    /**
     * type X = {
     *  [typeParameter in constraint]: type
     * }
     */
    const { typeParameter } = this;
    const constraint = resolveReferencedType(this.constraint);
    const type = resolveReferencedType(this.type);
    const newTypeLiteral = new TypeLiteral();
    if (
      (constraint instanceof UnionType || constraint instanceof Literal) &&
      typeParameter instanceof TypeParameter
    ) {
      const unionKeyTypes =
        constraint instanceof UnionType
          ? constraint.derivePreservedUnionLiteral().getTypes()
          : [constraint];

      for (const keyType of unionKeyTypes) {
        let finalTypeForThisProperty: Type = ErrType;
        let originalQuestionMark = false;
        let literalKeyType = keyType.deriveLiteral();
        typeParameter.setActualType(literalKeyType);
        if (type instanceof IndexedAccessType) {
          const property = type.getProperty();
          if (property) {
            originalQuestionMark = property.questionMark;
            finalTypeForThisProperty = property.type;
          } else {
            throw Error(`Property ${literalKeyType.mock()} doesn't exist`);
          }
        } else {
          finalTypeForThisProperty = type;
        }
        newTypeLiteral.property(
          keyType.mock(),
          finalTypeForThisProperty,
          modifyQuestionMark(this.questionToken, originalQuestionMark),
          [],
        );
      }
      return newTypeLiteral.deriveLiteral();
    } else {
      throw Error(
        'Constraint other than UnionType and Literal in MappedType is not supported yet',
      );
    }
  }
  public TypeParameter(name: string) {
    const newTypeParam = new TypeParameter(name);
    this.typeParameter = newTypeParam;
    return newTypeParam;
  }
  public setConstraint(type: Type) {
    this.constraint = type;
  }
  public setType(type: Type) {
    this.type = type;
  }
  public setQuestionToken(token: QuestionToken) {
    this.questionToken = token;
  }
}