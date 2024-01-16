import {
  WrappidRegistry,
  WrappidRegistryOptionsType,
} from "./registry/WrappidRegistry";

export class Wrappid {
  private static registries: Map<any, WrappidRegistry<any>> = new Map<
    any,
    WrappidRegistry<any>
  >();

  static createRegistry(
    registryType: any,
    options?: WrappidRegistryOptionsType
  ): WrappidRegistry<typeof registryType> {
    let childRegistry = WrappidRegistry<typeof registryType>;
    let registryInstance = null;

    if (Wrappid.registries.has(registryType)) {
      registryInstance = Wrappid.registries.get(registryType);
    } else {
      registryInstance = new childRegistry(registryType, options);
      Wrappid.registries.set(registryType, registryInstance);
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
