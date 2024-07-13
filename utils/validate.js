const { ZodError } = require('zod');

exports.validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({ errors: e.errors });
    }
    next(e);
  }
};
