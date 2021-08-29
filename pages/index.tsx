import React, { useState } from "react";
import {
    Box,
    Text,
    Heading,
    Image,
    AspectRatio,
    Alert,
    CloseButton,
} from "@chakra-ui/react";
import { UserToolCard } from "@components/userToolCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Home: React.FC = () => {
    const [showAlert, setShowAlert] = useState(true);
    const handleGetStarted = () => {
        console.log("");
    };
    const handleSelfCheck = () => {
        console.log("");
    };

    return (
        <>
            <Image src="/assets/HUG_Banner_1.png" w="100%" />
            <Box p={4}>
                <Box position="relative" h={50}>
                    <Image
                        src="/icons/heading-highlight.svg"
                        position="absolute"
                        bottom={0}
                    />
                    <Heading fontSize={32} position="absolute">
                        WELCOME TO YOUR TOOLKIT
                    </Heading>
                </Box>

                <br />
                <Box>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Praesent laoreet feugiat velit, ut placerat augue
                        euismod vel. Cras efficitur velit eu diam sodales
                        dignissim. Etiam tempus sapien vel metus elementum, eget
                        ornare metus vulputate. Morbi ullamcorper fringilla
                        nulla volutpat vestibulum. Curabitur ut lobortis purus.
                    </Text>
                </Box>
            </Box>
            <AspectRatio maxW="100%" maxH={290} ratio={1}>
                <iframe
                    title="Toolkit"
                    src="https://www.youtube.com/embed/NAav2ouuLRE"
                    allowFullScreen
                />
            </AspectRatio>
            <br />
            <Box p={4}>
                <Heading
                    fontSize={32}
                    textDecoration="underline"
                    textDecorationColor="brand.lime"
                    textDecorationThickness="2"
                    textUnderlineOffset="6"
                >
                    TOOLS
                </Heading>
                <br />
                <Heading fontSize={24}>Life Problems</Heading>
                <br />
                <Carousel infiniteLoop showIndicators={false}>
                    <UserToolCard
                        title="Anger"
                        description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                        onClickTool={handleGetStarted}
                        onSelfCheck={handleSelfCheck}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                        progressValue={10}
                    />
                    <UserToolCard
                        title="Anxiety"
                        description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                        onClickTool={handleGetStarted}
                        onSelfCheck={handleSelfCheck}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                        progressValue={10}
                    />
                    <UserToolCard
                        title="Depression"
                        description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                        onClickTool={handleGetStarted}
                        onSelfCheck={handleSelfCheck}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                        progressValue={10}
                    />
                </Carousel>
                <Heading fontSize={24}>Skills</Heading>
                <br />
                <Carousel infiniteLoop showIndicators={false}>
                    <UserToolCard
                        title="Anger"
                        description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                        onClickTool={handleGetStarted}
                        onSelfCheck={handleSelfCheck}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                        progressValue={10}
                    />
                    <UserToolCard
                        title="Anxiety"
                        description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                        onClickTool={handleGetStarted}
                        onSelfCheck={handleSelfCheck}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                        progressValue={10}
                    />
                    <UserToolCard
                        title="Depression"
                        description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                        onClickTool={handleGetStarted}
                        onSelfCheck={handleSelfCheck}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                        progressValue={10}
                    />
                </Carousel>
            </Box>
            {showAlert && (
                <Alert status="error" backgroundColor="brand.lime">
                    Need to talk? Find a healthline in your area.
                    <CloseButton
                        position="absolute"
                        right="8px"
                        top="8px"
                        onClick={() => setShowAlert(false)}
                    />
                </Alert>
            )}
        </>
    );
};

export default Home;
