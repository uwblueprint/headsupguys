import React from "react";
import { Button, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ToolCard = ({
    description,
    linkedModuleID,
    selfCheckGroupID,
    thumbnail,
    title,
    variant,
}: {
    description: string;
    linkedModuleID: string;
    selfCheckGroupID: string;
    thumbnail: string;
    title: string;
    variant: string;
}): React.ReactElement => {
    const router = useRouter();

    return variant === "desktop" ? (
        <Flex
            backgroundColor="white"
            color="black"
            direction="column"
            flexGrow="1"
            height="400px"
            justify="space-between"
            margin="12px"
            textAlign="left"
            width="200px"
        >
            <Image
                src={thumbnail}
                alt={title}
                w="100%"
                h="120px"
                objectFit="cover"
            />
            <Flex direction="column" padding="30px 20px">
                <Text
                    as="u"
                    fontSize="xl"
                    textDecorationColor="brand.green"
                    textDecorationThickness="2px"
                    textUnderlineOffset="6px"
                >
                    {title}
                </Text>
                <Text fontSize="sm" marginTop="10px">
                    {description}
                </Text>
                <Button
                    marginTop="10px"
                    onClick={() => router.push(`/module?id=${linkedModuleID}`)}
                    width="100%"
                >
                    Start Module
                </Button>
                <Button
                    marginTop="10px"
                    onClick={() =>
                        router.push(`/selfCheck?id=${selfCheckGroupID}`)
                    }
                    variant="outlineBlack"
                    width="100%"
                >
                    Take Self-Check
                </Button>
            </Flex>
        </Flex>
    ) : (
        <Flex
            backgroundColor="white"
            color="black"
            direction="column"
            height="400px"
            marginRight="20px"
            textAlign="left"
        >
            <Image
                src={thumbnail}
                alt={title}
                w="100%"
                h="120px"
                objectFit="cover"
            />
            <Spacer />
            <Flex direction="column" padding="30px 20px">
                <Text
                    as="u"
                    fontSize="xl"
                    textDecorationColor="brand.green"
                    textDecorationThickness="2px"
                    textUnderlineOffset="6px"
                >
                    {title}
                </Text>
                <Text fontSize="sm" marginTop="10px">
                    {description}
                </Text>
                <Button
                    marginTop="10px"
                    onClick={() => router.push(`/module?id=${linkedModuleID}`)}
                    width="100%"
                >
                    Start Module
                </Button>
                <Button
                    marginTop="10px"
                    onClick={() =>
                        router.push(`/selfCheck?id=${selfCheckGroupID}`)
                    }
                    variant="outlineBlack"
                    width="100%"
                >
                    Take Self-Check
                </Button>
            </Flex>
        </Flex>
    );
};

export default ToolCard;
