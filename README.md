# avro-to-typescript [![Build Status](https://travis-ci.org/degordian/avro-to-typescript.svg?branch=master)](https://travis-ci.org/degordian/avro-to-typescript)

Modules is used to compile avro schemas to typescript interfaces.

# Usage
```sh
npm install avro-to-typescript
```
```Typescript
import {AvroToTypescriptCompiler} from "@degordian/avro-to-typescript";
const avroToTypescriptCompiler = new AvroToTypescriptCompiler();
const avroPath = path.resolve( __dirname, `./avscData`);
const tsCompiledPath = path.resolve( __dirname, `./tsCompiled`);

avroToTypescriptCompiler.tsSchemaPath = path.resolve( tsCompiledPath, `user.ts`);
avroToTypescriptCompiler.avroSchemaPath = path.resolve( avroPath, `user.avsc`);

avroToTypescriptCompiler.compile().catch( (error: string) => {
    console.log("Error:", error);
});
```
# Features

  - Compiles `record` type
  - Compiles `enum` type
  - Compiles `primitive` types
  - Compiles `map` type
  - Compiles `array` type
