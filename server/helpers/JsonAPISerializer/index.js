import * as Serializers from './serialModel';

export default class JsonAPISerializer {
  static getSerializer(name) {
    return Serializers[name];
  }
}
