import { generateToken } from "../services/jwt-service.js";
import User from "../models/user-model.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (user && (await user.isValidPassword(password))) {
      const token = generateToken(user);

      res.json({
        token,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });

    const token = generateToken(user);

    res.status(201).json({
      token,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const store = async (req, res) => {
  try {
    const content = await User.create(req.body);

    res.status(201).json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const index = async (req, res) => {
  try {
    const content = await User.find().exec();

    res.json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const show = async (req, res) => {
  try {
    const content = await User.findById(req.params.id).exec();

    res.json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const content = await User.findByIdAndUpdate(
      req.params.id,
      req.body
    ).exec();

    res.json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const destroy = async (req, res) => {
  try {
    const content = await User.findByIdAndDelete(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const followUnfollow = async (req, res) => {
  try {
    if (!req.user.following.includes(req.params.id)) {
      req.user.following.push(req.params.id);
    } else {
      const index = req.user.following.indexOf(req.params.id);
      req.user.following.splice(index, 1);
    }
    await req.user.save();
    res.json()
  } catch (error) {
    res.status(400).send(error.message);
  }
};
