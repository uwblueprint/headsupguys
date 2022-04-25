import { Box, Flex, Link } from "@chakra-ui/react";
import React, { FC } from "react";

interface ModuleHeaderProps {
    links: {
        name: string;
        url: string;
    }[];
    overrideClick?: () => void;
}

export const ModuleHeader: FC<ModuleHeaderProps> = ({
    links,
    overrideClick,
}) => {
    return (
        <Box w="100%" marginY={"15px"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Box color={"brand.green"} onClick={overrideClick}>
                    {links.map(({ name, url }, i) => (
                        <>
                            <Link href={!overrideClick ? url : undefined}>
                                {name}
                            </Link>
                            {i !== links.length - 1 && " > "}
                        </>
                    ))}
                </Box>
                <Box onClick={overrideClick}>
                    <Link
                        disabled={!!overrideClick}
                        href={!overrideClick ? links[1].url : undefined}
                    >
                        Exit and Save Progress {JSON.stringify(overrideClick)}
                    </Link>
                </Box>
            </Flex>
        </Box>
    );
};
