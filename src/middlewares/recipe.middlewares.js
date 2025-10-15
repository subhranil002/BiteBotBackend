import Joi from "joi";

export const validateRecipe = (req, res, next) => {
    try {
        const schema = Joi.object({
            title: Joi.string().trim().min(3).max(100).required(),
            description: Joi.string().trim().min(10).max(1000).required(),

            ingredients: Joi.array()
                .items(
                    Joi.object({
                        name: Joi.string().trim().required(),
                        quantity: Joi.number().positive().required(),
                        unit: Joi.string().trim().required(),
                        marketPrice: Joi.number().positive().required(),
                    })
                )
                .min(1)
                .required(),

            steps: Joi.array()
                .items(
                    Joi.object({
                        stepNo: Joi.number().integer().positive().required(),
                        instruction: Joi.string().trim().required(),
                    })
                )
                .min(1)
                .required(),

            cuisine: Joi.string().trim().required(),

            dietaryLabels: Joi.array()
                .items(
                    Joi.string().valid(
                        "vegetarian",
                        "vegan",
                        "keto",
                        "paleo",
                        "gluten-free",
                        "dairy-free",
                        "low-carb",
                        "high-protein",
                        "sugar-free",
                        "organic",
                        "raw",
                        "mediterranean",
                        "low-fat"
                    )
                )
                .optional(),

            totalCookingTime: Joi.number().positive().required(),
            servings: Joi.number().positive().required(),

            externalMediaLinks: Joi.array()
                .items(
                    Joi.object({
                        name: Joi.string().trim().required(),
                        url: Joi.string().uri().required(),
                    })
                )
                .optional(),

            isPremium: Joi.boolean().default(false),
        });

        const { value, error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            throw new ApiError(400, "Validation failed");
        }

        req.body = value; // setting sanitized data to req.body
        next();
    } catch (error) {
        console.log("Some Error Occured: ", error);
        // If the error is already an instance of ApiError, pass it to the error handler
        if (error instanceof ApiError) {
            return next(error);
        }

        // For all other errors, send a generic error message
        return next(
            new ApiError(500, "Something went wrong during recipe validation")
        );
    }
};
