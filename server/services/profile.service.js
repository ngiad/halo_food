import userModel from "../models/user.model.js";
import saveModel from "../models/save.model.js";

export default class ProfileService {
  constructor() {
    this.userModel = userModel;
    this.saveModel = saveModel;
  }

  getSave = async (iduser, {size = 12, page = 0} ) => {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await Promise.all([
            this.saveModel
              .find({iduser})
              .sort({createdAt : -1})
              .skip(size * page)
              .limit(size),
            this.saveModel.count({iduser}),
          ])
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  addSave = ({ iduser, idPost }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const saveExist = await this.saveModel.findOne({ iduser, idPost });
        if(saveExist) {
          await this.saveModel.deleteOne({iduser, idPost})
          resolve({ complete: true,status: false });
        } 
        else {
          await this.saveModel.create({ iduser, idPost });
          resolve({ complete: true,status: true });
        } 
      } catch (error) {
        reject(error);
      }
    });
  };

  saveStatus = ({iduser, idPost}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const saveExist = await this.saveModel.findOne({iduser, idPost})
        if(saveExist) resolve({ status: true });
        else resolve({ status: false });
      } catch (error) {
        reject(error);
      }
    }); 
  }
}
