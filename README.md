# avro-to-typescript [![Build Status](https://travis-ci.org/degordian/avro-to-typescript.svg?branch=master)](https://travis-ci.org/degordian/avro-to-typescript)

Modules is used to compile avro schemas to typescript interfaces.

# Usage
```sh
node dist/src/index.js --compile [ schema-directory ] [ output-directory ]
```
# Features

  - Compiles `record` type
  - Compiles `enum` type
  - Compiles `primitive` types
  - Compiles `map` type
  - Compiles `array` type
