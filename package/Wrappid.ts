import { WrappidRegistry } from "./registry/WrappidRegistry";

export class Wrappid {
  private static registries: Map<any, WrappidRegistry<any>> = new Map<
    any,
    WrappidRegistry<any>
  >();

  static createRegistry(type: any): WrappidRegistry<typeof type> {
    let childRegistry = WrappidRegistry<typeof type>;
    let registryInstance = null;

    if (Wrappid.registries.has(type)) {
      registryInstance = Wrappid.registries.get(type);
    } else {
      registryInstance = new childRegistry(type);
      Wrappid.registries.set(type, registryInstance);
    }
    if (registryInstance) {
      return registryInstance;
    } else {
      throw new Error("Registry can not be created.");
    }
  }

  static useRegistry<T extends WrappidRegistry<any>>(registry: T): T {
    return registry;
  }
}
