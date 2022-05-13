# GraphQL Fields Projection

This library create field projection from GraphQL query

## Why using this?

There are many libraries can do the same function. However, starting in MongoDB 4.4, the [Path Collision Restrictions](mongodb.com/docs/v4.4/release-notes/4.4-compatibility/#path-collision-restrictions) are introduced . And it is illegal to project an embedded document with any of the embedded document's fields:

```js
db.inventory.find({}, { size: 1, "size.uom": 1 }); // Invalid starting in 4.4
```

- And this library is created to remove the collision.
- This library can work with [dataloader](#example-5-using-with-dataloader) also

## Install

```sh
npm install graphql-fields-projection
```

## How to

Please see the following examples

### Example 1: simplest usecase

Given the following query

```graphql
query user {
  user(id: 123) {
    id
    address
    info {
      firstName
      lastName
    }
  }
}
```

```js
const { createSelectedFields } = require('graphql-fields-projection');

resolve(parent, args, context, info){
  const selectedFields = createSelectedFields(info); // [ 'id', 'address', 'info.firstName', 'info.lastName' ]
}
```

### Example 2: Get more fields

Given the following query

```graphql
query user {
  user(id: 123) {
    id
    address
    info {
      firstName
      lastName
    }
  }
}
```

```js
const { createSelectedFields } = require('graphql-fields-projection');

resolve(parent, args, context, info){
  // Now you like to get more fields for further resolve: `timezone`, and `info` object
  const selectedFields = createSelectedFields(info, { additionalFields: ['info', 'address', 'timezone'] }); // [ 'id', 'info', 'timezone' ]
}
```

### Example 3: Get child path

Given the following query

```graphql
query purchase {
  purchase(id: 123) {
    id
    buyer {
      id
      address
      info {
        firstName
        lastName
      }
    }
    product {
      id
      # ...others
    }
  }
}
```

```js
const { createSelectedFields } = require('graphql-fields-projection');

resolve(parent, args, context, info){
  // Now you like to get selected fields of `buyer`
  const selectedFields = createSelectedFields(info, { path: 'buyer' }); // [ 'id', 'address', 'info.firstName', 'info.lastName' ]

  // OR with additionalFields
const selectedFields2 = createSelectedFields(info, {
  path: 'buyer', additionalFields: ['info', 'address', 'timezone'],
}); // [ 'id', 'info', 'timezone' ]
}
```

### Example 4: returnTypes

By the default the return result will be an array of projected fields. But you can also get the **string** or **object**

```graphql
query user {
  user(id: 123) {
    id
    address
    info {
      firstName
      lastName
    }
  }
}
```

```js
const { createSelectedFields } = require('graphql-fields-projection');

resolve(parent, args, context, info){
  const resultArray1 = createSelectedFields(info); // [ 'id', 'address', 'info.firstName', 'info.lastName' ]
  const resultArray2 = createSelectedFields(info, { returnType : 'array' }); // [ 'id', 'address', 'info.firstName', 'info.lastName' ]
  const resultString = createSelectedFields(info, { returnType : 'string' } ); // 'id address info.firstName info.lastName'
  const resultObject = createSelectedFields(info); // { id: 1, address: 1, 'info.firstName': 1, 'info.lastName': 2 }
}
```

### Example 5: Using with [Dataloader](https://github.com/graphql/dataloader)

```graphql
query purchase {
  purchase(id: 123) {
    id
    buyer {
      id
      address
      info {
        firstName
        lastName
      }
    }
    products {
      id
      sku
      name
      price
    }
  }
}
```

```js
const { createSelectedFields, createMergedSelectedFields } = require('graphql-fields-projection');

// This is an example with Apollo Federation, but you can run with any resolvers
__resolveReference(parent, context, info) {
  const { loaders } = context;
  const selectedFields = createSelectedFields(info);
  return loaders.product.load(JSON.stringify({ id: parent.id, selectedFields }));
}

// The implementation of `loaders.product()`
async function batchProducts(keys) {
  const { ids: productIds, selectedFields } = createMergedSelectedFields(keys);
  const products = await Product.find({ _id: { $in: productIds } })
    .select(selectedFields)
    .lean();

  // Don't forget mapping results
  // ...

  return products;
}
```

The function `createMergedSelectedFields()` supports the following options:

- [additionalFields](#example-2-get-more-fields)
- [returnType](#example-4-returntypes)
