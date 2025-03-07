import { newsSchema } from "../validations/NewsValidation.js";
import vine, { errors } from "@vinejs/vine";
import prisma from "../DB/db.config.js";
import { messages } from "@vinejs/vine/defaults";

class NewsController {
  static async index(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (page <= 0) {
      page = 1;
    }
    if (limit <= 0 || limit > 100) {
      limit = 10;
    }

    const skip = (page - 1) * limit;
    const news = await prisma.news.findMany({
      take: limit,
      skip: skip,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });
    const totalNews = await prisma.news.count();
    const totalPages = Math.ceil(totalNews / limit);
    return res.json({
      status: 200,
      news: news,
      metadata: {
        totalPages,
        courrentPage: page,
        courrentLimit: limit,
      },
    });
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

  static async show(req, res) {
    try {
      const { id } = req.params;
      const news = await prisma.news.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              created_at: true,
              updated_at: true,
            },
          },
        },
      });
      return res.json({ status: 200, news: news });
    } catch (error) {
      return res.status(500).json({ message: "something want wrong try agin" });
    }
  }

  static async update(req, res) {}

  static async destroy(req, res) {}
}

export default NewsController;
