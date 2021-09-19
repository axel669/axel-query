# Axel Query
Library for adding data safety to APIs using data driven descriptors instead of
a flawed type system.

*This beta is to get something into the world that people can try, I am open
to suggestions about features or more built in validators*

## Usage

### Data Descriptors
AQ uses data descriptors instead of types in order to avoid the issues that
come with type systems (type name collissions, shared schema files, etc.).

A descriptor has the following format: `"<nullable?><name><array?>": <validator>`

A nullable argument is an optional argument, a nullable property on the return
value means that property can be null on an object instance.
The array portion tells the engine if the value will be an array, and if its
items are allowed to be null.

The validator is either a string naming the validator to be used, or an object
describing the structure of the value. Descriptor can be nested as much as
needed to describe complex structures.

Built in validators: `int`, `number`, `string`, `bool`

```javascript
//  regular string prop
"name": "string"

//  nullable string
"?name": "string"

//  array of strings
"name[]": "string"
//  array of strings allowing null items
"name[?]": "string"

//  nested object props
"company": {
    "name": "string",
    "founded": "int",
    "ceo": {
        "name": "string"
    }
}

//  array with object items
"employees[]": {
    "name": "string",
    "title": "string"
}
```

### Folder Structure
AQ enforces separation of functions info files by reading a directory structure
to generate the api.

```javascript
/*
    Files:
    +-server.js
    +-handlers
    | +-demo.js
    | +-nested
    |   +-demo.js
*/

import aqEngine from "axel-query"

//  Generates an api with "demo" and "nested.demo" functions
const service = aqEngine(__dirname, "handlers")
```

### Resolver Structure
AQ uses a single export with all necessary information to create and validate
a function.

`args` is the arguments that can be passed into the function.\
`value` is the return value of the function.\
`func` is the function to call.

```javascript
module.exports = {
    "args": {
        "?name": "string",
        "count": "int"
    },
    "value[]": {
        "name": "string",
        "files[]": "string"
    },
    func: () => {}
}
```

### Queries
Queries are just json objects/arrays with the functions, args, and properties to
select from the return value.

Queries that are objects are run in parallel, while queries that are arrays
are run in order.\
Queries will return object with either a `value` property if no errors occured,
or an `error` property if an exception was thrown while running the function.

```javascript
//  client side
import aq from "axel-query/client"

//  parallel
await aq.run({
    "hero:characters.find": {
        args: {
            type: "hero"
        },
        value: {
            name: true,
            age: true
        }
    },
    "villain:characters.find": {
        args: {
            type: "villain"
        },
        value: {
            name: true
        }
    }
})

//  sequential
await aq.run([
    {
        "hero:characters.find": {
            args: {
                type: "hero"
            },
            value: {
                name: true,
                age: true
            }
        }
    },
    {
        "villain:characters.find": {
            args: {
                type: "villain"
            },
            value: {
                name: true
            }
        }
    }
])
```
