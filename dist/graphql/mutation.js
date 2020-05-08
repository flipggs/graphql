"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_schema_1 = require("./resources/post/post.schema");
const comment_schema_1 = require("./resources/comment/comment.schema");
const Mutation = `
  type Mutation {
    ${comment_schema_1.commentMutations}
    ${post_schema_1.postMutations}
    ${post_schema_1.postMutations}
   }
`;
exports.Mutation = Mutation;
