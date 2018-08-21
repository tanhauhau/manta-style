export type Annotation = {
  key: string;
  value: string;
};

export default abstract class Type {
  abstract deriveLiteral(parentAnnotations: Annotation[]): Type;
  public mock(): any {
    throw new Error('Literal types should be derived before mock.');
  }
}
