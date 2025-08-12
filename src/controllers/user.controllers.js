import { ApiResponse, ApiError } from "../utils/index.js";
export const handleRegister = async (req, res, next) => {
    try {
        // get name, email and pw from body
        const { email, password, role } = req.body;
        // validate
        if (!(name && email && password)) {
            throw new ApiError("All field must be passed", 400);
        }

        // check if user have passed empty string in any of the field
        if ([name, email, password].some((field) => field?.trim() === "")) {
            throw new ApiError("All field must be passed", 400);
        }

        // validate if user exists
        let user = await User.findOne({ uEmail: email });
        if (user) {
            throw new ApiError("User already exists with this email", 400);
        }

        // save to db
        user = new User({
            uName: name,
            uEmail: email,
            uPass: password,
        });

        const savedUser = await user.save();
        // send response
        return res.status(201).json(
            new ApiResponse(201, "User Created Successfully", {
                name: savedUser.uName,
                email: savedUser.uEmail,
                role: savedUser.uRole,
            })
        );
    } catch (error) {
        console.log("Some Error Occured: ", error);
        // If the error is already an instance of ApiError, pass it to the error handler
        if (error instanceof ApiError) {
            return next(error);
        }

        // For all other errors, send a generic error message
        return next(
            new ApiError("Something went wrong during registration", 500)
        );
    }
};
export const handleLogin = (req, res) => {
    res.status(200).json();
};
