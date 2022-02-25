import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

const StartModuleSection = ({
    linkedModuleID,
    progress,
    selfCheckGroupID,
    title,
    variant,
}: {
    linkedModuleID: string;
    progress: number;
    selfCheckGroupID: string;
    title: string;
    variant: string;
}): React.ReactElement => {
    return progress === 0 ? (
        variant === "desktop" ? (
            <Flex
                backgroundColor="background.dark"
                color="white"
                direction="column"
                flex="0 0.1 300px"
                height="360px"
                marginLeft="30px"
                minWidth="300px"
                padding="30px 20px"
            >
                <Text>{`Interested in learning more about ${title.toLowerCase()}? Start learning about it now or take the ${title} Self-Check`}</Text>
                <Link href={`/module?id=${linkedModuleID}`}>
                    <Flex
                        align="center"
                        backgroundColor="brand.green"
                        cursor="pointer"
                        height="48px"
                        justify="space-between"
                        marginTop="24px"
                        padding="10px"
                    >
                        <Icon
                            as={MdChevronRight}
                            color="brand.green"
                            height={6}
                            width={6}
                        />
                        <Text>Start Module</Text>
                        <Icon as={MdChevronRight} height={6} width={6} />
                    </Flex>
                </Link>
                <Link href={`/selfCheck?id=${selfCheckGroupID}`}>
                    <Flex
                        align="center"
                        border="1px solid black"
                        cursor="pointer"
                        height="48px"
                        justify="center"
                        marginTop="12px"
                        padding="10px"
                    >
                        <Text fontSize="sm">Take Self-Check</Text>
                    </Flex>
                </Link>
            </Flex>
        ) : (
            <Flex
                backgroundColor="background.dark"
                color="white"
                direction="column"
                padding="30px 20px"
            >
                <Text>{`Interested in learning more about ${title.toLowerCase()}? Start learning about it now or take the ${title} Self-Check`}</Text>
                <Link href={`/module?id=${linkedModuleID}`}>
                    <Flex
                        align="center"
                        backgroundColor="brand.green"
                        cursor="pointer"
                        height="48px"
                        justify="space-between"
                        marginTop="24px"
                        padding="10px"
                    >
                        <Icon
                            as={MdChevronRight}
                            color="brand.green"
                            height={6}
                            width={6}
                        />
                        <Text>Start Module</Text>
                        <Icon as={MdChevronRight} height={6} width={6} />
                    </Flex>
                </Link>
                <Link href={`/selfCheck?id=${selfCheckGroupID}`}>
                    <Flex
                        align="center"
                        border="1px solid black"
                        cursor="pointer"
                        height="48px"
                        justify="center"
                        marginTop="12px"
                        padding="10px"
                    >
                        <Text fontSize="sm">Take Self-Check</Text>
                    </Flex>
                </Link>
            </Flex>
        )
    ) : null;
};

export default StartModuleSection;
