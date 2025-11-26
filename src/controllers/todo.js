import Todo from "../models/todo";
import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  isCompleted: Joi.boolean(),
});

export const createTodo = async (req, res) => {
  try {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(400).json(errors);
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

export const getAllTodos = async (req, res) => {
  const { _limit, _sort } = req.query;
  const options = {
    limit: _limit ? parseInt(_limit) : 10,
    sort: {
      [_sort]: -1,
    },
  };
  try {
    const todos = await Todo.paginate({}, options);
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getTodoById = async (req, res) => {
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

export const deleteTodo = async (req, res) => {
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
