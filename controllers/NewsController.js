import { newsSchema } from "../validations/NewsValidation.js";
import vine, { errors } from "@vinejs/vine";
import prisma from "../DB/db.config.js";

class NewsController {
  static async index(req, res) {
    const news = await prisma.news.findMany({});
    res.json({ status: 200, news: news });
  }

  static async store(req, res) {
    try {
      const user = req.user;
      const body = req.body;
      const validator = vine.compile(newsSchema);
      const payload = await validator.validate(body);
      const newsData = await prisma.news.create({
        data: {
          ...payload,
          user: { connect: { id: user.id } },
        },
      });
      return res.json({
        status: 200,
        message: "news Create successfully",
        newsData,
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "something went wrong please try agin",
        });
      }
    }
  }

  static async show(req, res) {}

  static async update(req, res) {}

  static async destroy(req, res) {}
}

export default NewsController;
