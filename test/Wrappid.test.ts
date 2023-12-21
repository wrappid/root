import { describe, expect, test } from "@jest/globals";
import { Wrappid } from "../package/registry/Wrappid";

function checkType() {
  /**
   * styles class sample
   */
  class Styles {}
  class DefaultStyles extends Styles {}
  class SmallStyles extends Styles {}

  class Test {}
  class DefaultTest extends Test {}
  class SmallTest extends Test {}

  try {
    /**
     * @todo want to use statically
     */
    let StylesRegistry = Wrappid.createRegistry(Styles);
    StylesRegistry.register("DefaultStyle", DefaultStyles);
    console.log(StylesRegistry.getElements());

    let StylesRegistry2 = Wrappid.createRegistry(Styles);
    StylesRegistry2.register("DefaultStyles", SmallStyles);
    StylesRegistry2.register("SmallStyles", SmallStyles);
    console.log(StylesRegistry2.getElements());

    let TestRegistry = Wrappid.createRegistry(Test);
    TestRegistry.register("DefaultTest", DefaultTest);
    console.log(TestRegistry.getElements());

    let TestRegistry2 = Wrappid.createRegistry(Test);
    // TestRegistry2.register("DefaultTest", SmallTest);
    TestRegistry2.register("SmallTest", SmallTest);
    TestRegistry2.register("SmallStyles", SmallStyles);
    console.log(TestRegistry2.getElements());
  } catch (error: Error | any) {
    console.error(error?.message);
  }
}

describe("Wrappid Testcase", () => {
  test("type checked of registryEntity", () => {
    /**
     * @todo
     * 1. type checked of registryEntity
     * 2. check duplicate key registryEntityName
     * 3. check duplicate registryEntity
     */
    expect(checkType()).toBe("");
  });
});
