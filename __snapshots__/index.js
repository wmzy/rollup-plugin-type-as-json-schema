exports['rollup-plugin-type-as-json-schema should load type as json schema 1'] = `
const userSchema = {"$schema":"http://json-schema.org/draft-07/schema#","type":"object","properties":{"username":{"type":"string"}},"required":["username"],"additionalProperties":false,"definitions":{}};
const postSchema = {"$schema":"http://json-schema.org/draft-07/schema#","type":"object","properties":{"author":{"$ref":"#/definitions/User"}},"required":["author"],"additionalProperties":false,"definitions":{"User":{"type":"object","properties":{"username":{"type":"string"}},"required":["username"],"additionalProperties":false}}};

export { postSchema, userSchema };

`
