import Todo from "../models/todo";
import Joi from "joi";

const createSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("", null),
});

const updateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow("", null),
  isCompleted: Joi.boolean(),
});

export const createTodo = async (req, res) => {
  try {
    const { error } = createSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(400).json({ message: errors });
    }
    const todo = await Todo.create(req.body);
    return res.status(201).json({
      message: "Tạo mới thành công",
      todo,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getListTodos = async (req, res) => {
  const { _limit, _sort, isCompleted } = req.query;
  const query = {};
  if (isCompleted !== undefined) {
    query.isCompleted = isCompleted === "true";
  }
  let limit = 10;
  if (_limit) {
    const parsedLimit = parseInt(_limit);
    if (!isNaN(parsedLimit) && parsedLimit > 0 && parsedLimit <= 100) {
      limit = parsedLimit;
    }
  }
  const options = {
    limit,
    sort: {
      [_sort || "createdAt"]: -1,
    },
  };
  try {
    const todos = await Todo.paginate(query, options);
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getOneTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { error } = updateSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(400).json({ message: errors });
    }
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json({
      message: "Cập nhật thành công",
      todo,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const removeTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json({
      message: "Xóa thành công",
      todo,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
