//import { Auth } from "aws-amplify";
import isEmail from "validator/lib/isEmail";

const userExist = async (email) => {
    return await Auth.signIn(email.toLowerCase(), "123")
        .then(() => {
            return false;
        })
        .catch((error) => {
            switch (error.code) {
                case "UserNotFoundException":
                    return false;
                case "NotAuthorizedException":
                    return true;
                case "PasswordResetRequiredException":
                    return true;
                default:
                    return false;
            }
        });
};

const validateEmailHelper = async (email) => {
    if (isEmail(email)) {
        const emailExists = await userExist(email);
        if (!emailExists) {
            return {
                isValidFormat: true,
                accountExists: false,
            };
        } else {
            return {
                isValidFormat: true,
                accountExists: true,
            };
        }
    } else {
        return {
            isValidFormat: false,
            accountExists: false,
        };
    }
};

const isPasswordValid = (password) => {
    const pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$",
    );
    return pattern.test(password);
};

const validatePasswordHelper = (newPassword) => {
    if (newPassword == "") {
        // don't set as error state if it's currently empty
        return { isInvalid: false, reason: "", canContinue: false };
    }
    if (newPassword.length < 8) {
        return {
            isInvalid: true,
            reason: "Password is too short, password must be 8 characters",
            canContinue: false,
        };
    }
    if (!isPasswordValid(newPassword)) {
        return {
            isInvalid: true,
            reason: "Password must contain a special character, capital letter, lowecase letter and number.",
            canContinue: false,
        };
    }
    return {
        isInvalid: false,
        reason: "",
        canContinue: true,
    };
};

export { userExist, validateEmailHelper, validatePasswordHelper };
