const Button = {
    // The styles all button have in common
    baseStyle: {},
    // Two sizes: sm and md
    sizes: {},
    // Two variants: outline and solid
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
    // The default size and variant values
    defaultProps: {
        variant: "default",
    },
};

export { Button };
