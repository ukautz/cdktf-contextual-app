# CDKTF: Contextual App

This package contains an **experimental** Terraform CDK App replacement, that derives context from environment variables at execution time.

This is supplemental for my blog.

## Usage

Install via NPM

```shell
$ npm install @ukautz/cdktf-contextual-app
```

Then within the index / main file:

```typescript
import { Stack } from "./lib/stack";
import { App } from "@ukautz/cdktf-contextual-app";

const app = new App();
new Stack(app, "stockering", {
  optional: app.context("name1"),
  somethingWithDefault: app.context("name2", "default"),
  required: app.mustContext("name3"),
});
app.synth();
```

The above context parameters can be set in the environment as follows:

```shell
# set JSONized context in environment variable
$ export CDKTF_RUNTIME_CONTEXT='{"name1": "some value"}'

# set prefixed environment variable(s)
$ export CDKTF_CONTEXT_name2="some value"

# set path to file that contains JSONized context
$ export CDKTF_RUNTIME_CONTEXT_FILE=/tmp/env.json
$ cat /tmp/env.json
{ "name3": "some value" }
```

Assuming the above environment is available at execution time, it will be used during:

```shell
$ cdktf synth
$ cdktf deploy
$ cdktf destroy
$ cdktf <anything>
```
