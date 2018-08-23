import Type, { Annotation } from './Type';
import { sample } from 'lodash-es';
import { ConstantTypes } from '../constantTypes';
import { resolveReferencedType } from '../utils/referenceTypes';

export default class UnionType extends Type {
  private readonly types: Type[] = [];
  private chosenType?: Type;
  constructor(types: Type[], chosenType?: Type) {
    super();
    this.types = types;
    this.chosenType = chosenType;
  }
  public deriveLiteral(parentAnnotations: Annotation[]) {
    const { chosenType } = this;
    if (chosenType) {
      return chosenType;
    } else {
      const { chosenType } = this.derivePreservedUnionLiteral(
        parentAnnotations,
      );
      if (chosenType) {
        return chosenType;
      }
      throw Error('Something bad happens :(');
    }
  }
  public derivePreservedUnionLiteral(parentAnnotations: Annotation[]) {
    const derivedTypes = this.types
      .map(resolveReferencedType)
      .map((item) => item.type)
      .filter((type) => type !== ConstantTypes.Never)
      .map((type) => type.deriveLiteral(parentAnnotations));
    const chosenType = sample(derivedTypes);
    return new UnionType(derivedTypes, chosenType);
  }
  public mock() {
    const { chosenType } = this;
    if (chosenType) {
      return chosenType.mock();
    }
    throw Error('Something bad happens :(');
  }
  public getTypes(): Type[] {
    return this.types;
  }
}
