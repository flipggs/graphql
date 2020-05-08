import { UserModel } from "../models/UserModel";
import { PostModel } from "../models/Postmode";
import { CommentModel } from "../models/CommentMode";

export interface ModelsInterface { 

  User: UserModel;
  Post: PostModel;
  Comment: CommentModel;
}