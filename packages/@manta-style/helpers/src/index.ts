import QueryType from './types/QueryType';
import { LazyTypeAliasDeclaration } from '@manta-style/types';

export const Query = new LazyTypeAliasDeclaration('Query', []);
Query.setInitialize((typeFactory) => {
  const T = typeFactory.TypeParameter('T');
  return new QueryType(T);
});
