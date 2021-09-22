import React from "react";
import {
    SimpleGrid,
    Box,
    Heading,
    Text,
    InputProps,
    Image,
    Progress,
    Button,
} from "@chakra-ui/react";

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
            maxWidth: "310px",
            maxHeight: "350px",
            borderRadius: 4,
        },
    };

    return (
        <SimpleGrid __css={styles.card}>
            <Box bg="lightgrey" borderRadius="4px 4px 0 0" h="123px">
                {progressValue && progressValue > 0 && (
                    <Box
                        h="17px"
                        backgroundColor="black"
                        borderRadius="inherit"
                    >
                        <Box
                            w={`${progressValue}%`}
                            h="100%"
                            backgroundColor="brand.lime"
                            borderRadius="4px 0 0 0"
                        ></Box>
                    </Box>
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
                <Box p={4} textAlign="left">
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
