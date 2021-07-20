import React from "react";
import { Flex, FlexProps, Circle } from "@chakra-ui/react";

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
                <Circle
                    key={idx}
                    size="12px"
                    bg={idx == currStage ? currentStageColor : defaultColor}
                />
            ))}
        </Flex>
    );
};
