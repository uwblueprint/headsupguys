import React from "react";
import {
    SimpleGrid,
    Box,
    Heading,
    Text,
    InputProps,
    Image,
    Progress,
} from "@chakra-ui/react";
import { Button } from "..";

export interface UserToolCardProps extends InputProps {
    title: string;
    description: string;
    image?: string;
    progressValue?: number;
    onClickTool(event: any): any;
    onSelfCheck(event: any): any;
}

export const UserToolCard: React.FC<UserToolCardProps> = ({
    title,
    description,
    image,
    progressValue,
    onClickTool,
    onSelfCheck,
}) => {
    const styles = {
        card: {
            border: "1px solid #000",
            width: "360px",
            height: "360px",
            borderRadius: 4,
        },
    };

    return (
        <SimpleGrid __css={styles.card}>
            <Box bg="lightgrey" borderRadius="4px 4px 0 0" h="123px">
                {progressValue && progressValue > 0 && (
                    <Progress
                        colorScheme="green"
                        size="lg"
                        value={progressValue}
                    />
                )}
                {image && (
                    <Image
                        src={image}
                        alt={title}
                        w="100%"
                        h="100%"
                        borderRadius={progressValue ? 0 : 4}
                    />
                )}
            </Box>
            <Box alignContent="space-between" py={2}>
                <Box px={4} py={5}>
                    <Heading fontSize={16} fontWeight="700">
                        {title}
                    </Heading>
                    <Text fontSize={14} my={2}>
                        {description}
                    </Text>
                </Box>
                <Box px={4}>
                    <Button w="100%" fontSize={14} my={1} onClick={onClickTool}>
                        {progressValue && progressValue > 0
                            ? "Continue Learning"
                            : "Get Started"}
                    </Button>
                    <Button
                        variant="outlineBlack"
                        w="100%"
                        fontSize={14}
                        my={1}
                        onClick={onSelfCheck}
                    >
                        Take Self Check Quiz
                    </Button>
                </Box>
            </Box>
        </SimpleGrid>
    );
};
