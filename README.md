# avro-to-typescript [![Build Status](https://travis-ci.org/degordian/avro-to-typescript.svg?branch=master)](https://travis-ci.org/degordian/avro-to-typescript)

avro-to-typescript compiles avro schema files to typescript classes and interfaces.

# Usage
```sh
npm install -g avro-to-typescript

avro-to-typescript --compile [ schema-directory ] [ output-directory ]
```
# Features

  - Compiles `record` type
  - Compiles `enum` type
  - Compiles `primitive` types
  - Compiles `map` type
  - Compiles `array` type
