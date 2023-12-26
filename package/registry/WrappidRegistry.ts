import { RegistryUtils } from "../utils/RegistryUtils";

/**
 * @todo
 */
export type RegistryElementType<T> = {
  registryEntity: T;
  timestamp: number;
};

export class WrappidRegistry<T> {
  private type: any;
  private _registry: Map<string, RegistryElementType<T>>;

  constructor(type: any) {
    this.type = type;
    this._registry = new Map<string, RegistryElementType<T>>();
  }

  initialize() {
    /** @todo loop through files */
  }

  register(registryEntityName: string, registryEntity: T): void {
    try {
      /**
       * @todo
       * 1. type checked of registryEntity
       * 2. check duplicate key registryEntityName
       * 3. check duplicate registryEntity
       */
      if (RegistryUtils.isTypeMismatch(registryEntity, this.type)) {
        throw new Error("Invalid registry entity type");
      }

      let duplicateKey = RegistryUtils.ifKeyExists(
        this._registry,
        registryEntityName
      );

      let duplicateInstance = RegistryUtils.ifInstanceExists<T>(
        this._registry,
        registryEntity
      );

      if (duplicateKey) {
        throw new Error(
          `Duplication of  ${registryEntityName} key is not accepted.`
        );
      }

      if (duplicateInstance) {
        /**
         * @todo
         *  Can not write ${registryEntity.name}
         */
        throw new Error(
          `Duplication of ${registryEntity} instance is not accepted.`
        );
      }

      this._registry.set(registryEntityName, {
        registryEntity,
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      /**
       * @todo decision pending
       * weather to throw error or consume it
       */
      //   throw error;
      console.error(error);
    }
  }

  /**
   * @description
   *
   * @param registryEntityName
   * @returns T | undefined
   */
  getRegistryEntity(registryEntityName: string): T {
    try {
      let registryElement = this._registry.get(registryEntityName);
      if (registryElement?.registryEntity) {
        return registryElement.registryEntity;
      } else {
        throw new Error(
          `No registry entity found with ${registryEntityName} key`
        );
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @returns Map<string, RegistryElementType<T>>
   */
  getRegistry(): Map<string, RegistryElementType<T>> {
    return this._registry;
  }
}
