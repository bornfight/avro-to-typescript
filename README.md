# avro-to-typescript [![Build Status](https://travis-ci.org/degordian/avro-to-typescript.svg?branch=master)](https://travis-ci.org/degordian/avro-to-typescript)

avro-to-typescript compiles avro schema files to typescript classes and interfaces.

Take note that you need **BaseAvroRecord** class in the output directory.

## Usage
```sh
npm install -g avro-to-typescript

avro-to-typescript --compile [ schema-directory ] [ output-directory ]
```

```
npm install avro-to-typescript @dapp/avro-schemas

----

const compiler = new AvroToTypescriptCompiler();
const avroSchema = JSON.parse(data);

compiler.compile(avroSchema).then((info: any) => {
    fs.writeFileSync(
        `${avroClassDirectory}/BaseAvroRecord.ts`,
        "export { BaseAvroRecord } from \"@dapp/avro-schemas\";\n",
    );
}).catch((err: any) => {
    console.log(err);
});
```

## Features

  - Compiles `record` type
  - Compiles `enum` type
  - Compiles `primitive` types
  - Compiles `map` type
  - Compiles `array` type
