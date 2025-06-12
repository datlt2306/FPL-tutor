export const validateRequest = (schema, target = "body") => {
    return async (req, res, next) => {
        try {
            const { error } = schema.validate(req[target], {
                abortEarly: false,
            });
            if (error) {
                return res.status(400).json({
                    error: error.details.map((err) => err.message),
                });
            }
            next();
        } catch (error) {
            return res.status(400).json({
                error: error.message,
            });
        }
    };
};
