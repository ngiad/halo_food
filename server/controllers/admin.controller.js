import AdminService from "../services/admin.service.js";

export default class AdminController {
    constructor() {
        this.service = new AdminService();
    }

    get = (req, res, next) => {
        try {
            const result = this.service.get();
            res.send(result);
        } catch (error) {
            res.status(500)
            next(error)
        }
    };
}