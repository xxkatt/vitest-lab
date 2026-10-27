import {describe, expect, it} from "vitest";
import {getSearchObj} from "../ts/tools";

describe("测试getSearchObj", () => {
  it("测试是否正常返回对象", () => {
    const originalUrl = window.location.href
    const originalState = window.history.state

    try {
      window.history.replaceState(originalState, "", "?a=1&b=2")
      expect(getSearchObj()).toEqual({a: "1", b: "2"})
    } finally {
      window.history.replaceState(originalState, "", originalUrl)
    }
  })
})
