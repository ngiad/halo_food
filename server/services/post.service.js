import postModel from "../models/post.model.js";

export default class PostService {
  constructor() {
    this.model = postModel;
  }

  CreateQuery = (query) => {
    let output = {};
    if(query.tag) output.tag = {$in : query.tag}
    if(query.search) output.namePost = {$regex : query.search}
    if(query.status) output.status = query.status
    return output;
  };

  addToBeginningOfArray = async (postId) => {
    try {
      const post = await this.model.find({_id : postId});
  
      if (!post) {
        throw new Error('Post not found');
      }
      
      post.arrayField.unshift(post); 
      const updatedPost = await post.save();
      return updatedPost;
    } catch (error) {
      throw error;
    }
  };


  updateStutusPost = async(post) => {
    let isNew = true
    let isHot = false
    if((new Date().getTime() - new Date().getTime(post.createdAt)/ 24) > 3){
      isNew = false
    }

    const viewAverage = await this.model.aggregate([
      {
        $group: {
          _id: null,
          average: { $avg: "$view" }
        }
      }
    ])

    let average = viewAverage[0].average

    if(post.view > average) isHot = true

    if(!isNew) post.status = "old"
    if(isHot) post.status = "hot"

    return post
  }

  
  createPost =({ namePost, content, athor, tag }) => {
    return new Promise(async (resolve,reject) => {
      try {
        if (!namePost || !content.length || !athor || !tag)
          throw new Error("Please fill in all required fields");
        await this.model.create({ namePost, content, athor, tag });
        resolve({ complete: true });
      } catch (error) {
        reject(error);
      }
    })
  };

  removePost = async (id) => {
    try {
      console.log("id",id);
      if (!id) throw new Error("id is null!");
      await this.model.findOneAndRemove({ _id: id });
      return { complete: true };
    } catch (error) {
      throw error;
    }
  };

  getPost = ({ size = 12, page = 0, ...query }) => {
    return new Promise(async(resolve,reject) => {
      try {
        if (JSON.stringify(query) !== "{}") {
          query = this.CreateQuery(query);
        }
        resolve(await Promise.all([
          this.model
            .find(query)
            .sort({createdAt : -1})
            .skip(size * page)
            .limit(size),
          this.model.count(query),
        ])) 
      } catch (error) {
        reject(error);
      }
    } )
  };

  updatePost = (id, { namePost, content, athor, tag }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const PostNewUpdate = await this.model.findOneAndUpdate(
          { _id: id },
          { namePost, content, athor, tag },
          { new: true }
        );
        resolve(PostNewUpdate);
      } catch (error) {
        reject(error);
      }
    });
  };

  getParams = (id) => {
    return new Promise(async(resolve, reject) => {
      try {
        const post = await this.model.findById(id)
        if(!post) throw new Error("Post not found!")
        post.view += 1
        await this.updateStutusPost(post)
        post.save()
        resolve(post) 
      } catch (error) {
        reject(error)
      }
    })
  }
}
