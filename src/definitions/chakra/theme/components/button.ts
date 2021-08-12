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
        outlineBlack: {
            borderColor: "black",
            borderWidth: "1px",
            bg: "transparent",
            _hover: {
                bg: "gray.100",
            },
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
