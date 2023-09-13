import commnentSerrvice from "../services/comment.service.js";

export default class commentController {
  constructor() {
    this.service = new commnentSerrvice();
  }

  get = async (req, res, next) => {
    try {
      res
        .status(200)
        .json(await this.service.get(req.params.idPost, req.query.page));
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      res
        .status(200)
        .json(await this.service.update(req.params.id, req.body.comment));
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      res.status(200).json(await this.service.create(req.params.idPost,req.body));
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      res.status(200).json(await this.service.remove(req.params.id));
    } catch (error) {
      res.status(400);
      next(error);
    }
  };
}
