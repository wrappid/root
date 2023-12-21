import { RegistryElementType } from "../registry/WrappidRegistry";
import { BaseUtils } from "./BaseUtils";

/**
 * @description
 * In this utils class there are some utils function
 * related to Registry
 */
export class RegistryUtils extends BaseUtils {
  /**
   *
   * @param registryEntity
   * @param type
   * @returns
   */
  static isTypeMismatch(registryEntity: any, type: any): boolean {
    try {
      return !(new registryEntity() instanceof type);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param value
   * @returns
   */
  static isRegistryEntityType<T>(registryEntity: any): registryEntity is T {
    console.log(registryEntity);
    // Implement logic to check if registryEntity is of type T
    return true; // Replace with actual type checking logic
  }

  /**
   *
   * @param _registry
   * @param registryEntity
   * @returns boolean | Error
   */
  static ifInstanceExists<T>(
    _registry: Map<string, { registryEntity: any; timestamp: number }>,
    registryEntity: T
  ): boolean {
    try {
      return Array.from(_registry.values())
        .map(
          (eachRegistryEntity: RegistryElementType<any>) =>
            eachRegistryEntity.registryEntity
        )
        .includes(registryEntity);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param _registry
   * @param registryEntityName
   * @returns boolean | Error
   */
  static ifKeyExists<T>(
    _registry: Map<string, { registryEntity: T; timestamp: number }>,
    registryEntityName: string
  ): boolean {
    try {
      return _registry.has(registryEntityName);
    } catch (error) {
      throw error;
    }
  }
}
