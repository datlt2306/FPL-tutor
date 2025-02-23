import Blog from "../models/blog";
import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
});

export const createBlog = async (req, res) => {
  try {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(400).json(errors);
    }
    const post = await Blog.create(req.body);
    return res.status(201).json({
      message: "Tạo mới thành công",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const getListBlogs = async (req, res) => {
  const { _limit, _sort } = req.query;
  const options = {
    limit: _limit ? parseInt(_limit) : 10,
    sort: {
      [_sort]: -1,
    },
  };
  try {
    const posts = await Blog.paginate({}, options);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getOneBlog = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json({
      message: "Cập nhật thành công",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const removeBlog = async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json({
      message: "Xóa thành công",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// export {
//     createBlog,
//     getListBlogs,
//     getOneBlog,
//     updateBlog,
//     removeBlog,
// }
