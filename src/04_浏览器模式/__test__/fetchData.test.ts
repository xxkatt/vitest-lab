import {describe, expect, it} from "vitest";
import {fetchData} from "../ts/tools";

describe("测试fetch", () => {
  it("测试接口是否正常", async () => {
    const res = await fetchData()
    expect(res).toEqual(expect.any(Array))
  })
})
