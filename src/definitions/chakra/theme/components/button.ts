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
    },
    defaultProps: {
        variant: "default",
    },
};

export { Button };
