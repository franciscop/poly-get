import get from "./index.js";

describe("get()", () => {
  it("can place a GET request and parse the json", async () => {
    const todo = await get("https://jsonplaceholder.typicode.com/todos/1");
    expect(typeof todo).toBe("object");
    console.log(todo);
  });

  it("throws on a 404", async () => {
    await expect(
      get("https://jsonplaceholder.typicode.com/todos/10000")
    ).rejects.toEqual(
      new Error(
        "Error 404 retrieving https://jsonplaceholder.typicode.com/todos/10000"
      )
    );
  });
});
