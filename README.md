# Toggle Test

This is the VS Code extension that allows to switch `.only` statements from within the test.
```
it <-> it.only
describe <-> describe.only
```

## Usage

Place your text cursor inside the test and use command `Toggle Test: only` to toggle. You probably want to bind that command to a keyboard shortcut.

## Limitations

As of now, this extension is quite dumb: it's unaware of code structure, ie. doesn't take comments and blocks into account. It simply looks upwards from the cursor for something that resables `it` or `describe` block and replaces it.
