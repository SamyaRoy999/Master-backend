import { imageValidation } from "../utils/helper.js";

class ProfileController {
  static async index(req, res) {
    try {
      const user = req.user;
      return res.json({ status: 200, user });
    } catch (error) {
      return res.json({ status: 500, message: "something want worng!" });
    }
  }
  static async store() {}
  static async show() {}
  static async update(req, res) {
    const { id } = req.params.id;
    const auhtuser = req.user;

    if (!req.files || object.key(req.files).length === 0) {
      return res.json({ status: 400, message: "profile image is required" });
    }

    const profile = req.files.profile;
    const message = imageValidation(profile?.size, profile.minetype);
    if (message == null) {
      return res.status(400).json({
        errors: {
          profile: message,
        },
      });
    }
    return res.json({
      name: profile.name,
      size: profile?.size,
      mine: profile?.minetype,
    });
  }
  static async destroy() {}
}

export default ProfileController;
