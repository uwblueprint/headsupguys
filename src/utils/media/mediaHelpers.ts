import { useMediaQuery } from "react-responsive";

const getVariant = () => {
    return useMediaQuery({ query: `(max-width: 925px)` })
        ? "mobile"
        : "desktop";
};

export { getVariant };
