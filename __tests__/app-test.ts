import "cdktf/lib/testing/adapters/jest"; // Load types for expect matchers
//import { Testing } from "cdktf";
import {
  App,
  RUNTIME_CONTEXT_ENV,
  RUNTIME_CONTEXT_ENV_PREFIX,
  RUNTIME_CONTEXT_FILE_ENV,
} from "../src";
import * as path from "path";

const suite = (app: App, name: string) => {
  it("Reads existing context", () => {
    expect(app.context(name)).toEqual("okidoki");
  });
  it("Is undefined on non-existing context", () => {
    expect(app.context(`${name}xxx`)).toBeUndefined();
  });
  it("Falls back on default on non-existing", () => {
    expect(app.context(`${name}xxx`, "fallback")).toEqual("fallback");
  });
  it("Reads existing, required context", () => {
    expect(app.mustContext(name)).toEqual("okidoki");
  });
  it("Throws exception on non-existing required", () => {
    const t = () => app.mustContext(`${name}xxx`);
    expect(t).toThrowError(`Missing required context key: ${name}xxx`);
  });
};

describe("Contextual App", () => {
  describe("Load context from JSON encoded environment variable", () => {
    process.env[RUNTIME_CONTEXT_ENV] = JSON.stringify({
      foo1: "okidoki",
    });
    const app = new App();
    suite(app, "foo1");
  });

  describe("Load context from prefixed environment variable", () => {
    process.env[`${RUNTIME_CONTEXT_ENV_PREFIX}foo2`] = "okidoki";
    const app = new App();
    suite(app, "foo2");
  });

  describe("Load context from file in environment variable", () => {
    process.env[RUNTIME_CONTEXT_FILE_ENV] = path.join(__dirname, "env.json");
    const app = new App();
    suite(app, "foo3");
  });
});
