import { useMediaQuery } from "@chakra-ui/react";

const getIsDesktop = () => {
    return useMediaQuery("(min-width: 925px)");
};

export { getIsDesktop };
