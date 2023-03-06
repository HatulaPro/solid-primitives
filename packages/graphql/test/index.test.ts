import { makeMultipartBody } from "../src";
import { describe, test, expect } from "vitest";

describe("makeMultipartBody", () => {
  test("top-level and nested blobs are correctly replaced", () => {
    const form = makeMultipartBody("", {
      file: new Blob([""], { type: "text/plain" }),
      description: "An empty file",
      nested: {
        file: new File(["DATADATADATA"], "data.jpg"),
      },
    });
    expect(form.get("operations")).toEqual(
      '{"query":"","variables":{"file":null,"description":"An empty file","nested":{"file":null}}}',
    );
    expect(form.get("map")).toEqual('{"0":"variables.file","1":"variables.nested.file"}');
    // We cannot extract the Blob/File objects from the FormData instance
    // but we can check they were added.
    expect([...form.keys()]).toEqual(["operations", "map", "0", "1"]);
  });
  test("blobs arrays are correctly replaced", () => {
    const form = makeMultipartBody("", {
      files: [new Blob([""], { type: "text/plain" }), new Blob([""], { type: "text/plain" })],
      description: "An array of empty files",
    });
    expect(form.get("operations")).toEqual(
      '{"query":"","variables":{"files":[null,null],"description":"An array of empty files"}}',
    );
    expect(form.get("map")).toEqual('{"0":"variables.files.0","1":"variables.files.1"}');
    // We cannot extract the Blob/File objects from the FormData instance
    // but we can check they were added.
    expect([...form.keys()]).toEqual(["operations", "map", "0", "1"]);
  });
});
