## Introduction
Example of how to split up a large Swagger spec into smaller files.

### Usage
Install the node tool:

```bash
  npm install -g multi-file-swagger
```

This will resolve every json pointer ($ref) externally or internally and then save it in a json file. Which can then be used for code generation and so on.


You can also output as yaml by using the `--output-format` option

```bash
  cd docs/
```

```bash
  multi-file-swagger -o yaml index.yaml > openapi.yaml
```