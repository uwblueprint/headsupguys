const Button = {
    baseStyle: {},
    sizes: {},
    variants: {
        default: {
            bg: "background.dark",
            color: "white",
            _hover: { bg: "gray.700" },
            _active: { bg: "gray.600" },
        },
        outline: {
            colorScheme: "black",
        },
        brand: {
            bg: "brand.green",
            color: "white",
            _active: { bg: "brand.lime" },
        },
    },
    defaultProps: {
        variant: "default",
    },
};

export { Button };
