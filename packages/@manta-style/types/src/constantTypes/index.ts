import NeverKeyword from './NeverKeyword';
import NullKeyword from './NullKeyword';
import UndefinedKeyword from './UndefinedKeyword';
import ObjectKeyword from './ObjectKeyword';
import NumberKeyword from './NumberKeyword';
import StringKeyword from './StringKeyword';
import AnyKeyword from './AnyKeyword';
import BooleanKeyword from './BooleanKeyword';

export const ConstantTypes = {
  Never: new NeverKeyword(),
  Null: new NullKeyword(),
  Undefined: new UndefinedKeyword(),
  String: new StringKeyword(),
  Number: new NumberKeyword(),
  Object: new ObjectKeyword(),
  Any: new AnyKeyword(),
  Boolean: new BooleanKeyword(),
};
