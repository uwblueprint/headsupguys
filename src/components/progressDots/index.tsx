import React from "react";
import { Flex, FlexProps, Icon } from "@chakra-ui/react";

const CircleIcon = (props) => (
    <Icon viewBox="0 0 200 200" {...props}>
        <path
            fill="currentColor"
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
        />
    </Icon>
);

interface ProgressDotsProps extends FlexProps {
    numStages: number;
    currStage: number;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({
    numStages,
    currStage,
    ...rest
}) => {
    const dots = new Array(numStages).fill(null);
    const defaultColor = "gray.200";
    const currentStageColor = "gray.500";

    return (
        <Flex direction="row" justifyContent="space-between" w="50%" {...rest}>
            {dots.map((_, idx) => (
                <CircleIcon
                    key={idx}
                    color={idx == currStage ? currentStageColor : defaultColor}
                />
            ))}
        </Flex>
    );
};
