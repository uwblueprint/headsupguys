import React, { useState } from "react";
import {
    Box,
    Text,
    Heading,
    Image,
    AspectRatio,
    Alert,
    CloseButton,
    Container,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { UserToolCard } from "@components/userToolCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery } from "react-responsive";

const Home: React.FC = () => {
    const [showAlert, setShowAlert] = useState(true);
    const handleClickTool = () => {
        console.log("");
    };
    const handleSelfCheck = () => {
        console.log("");
    };
    const variant = useMediaQuery({ query: `(max-width: 925px)` })
        ? "mobile"
        : "desktop";

    return (
        <>
            <Image src="/assets/HUG_Banner_1.png" w="100%" />
            {variant === "desktop" ? (
                <>
                    <Container maxW="container.lg" py="50px">
                        <Box h={50}>
                            <Heading
                                fontSize={32}
                                background="linear-gradient(180deg, rgba(255,255,255,0) 50%, #86FC2F 50%)"
                                display="inline"
                            >
                                WELCOME TO YOUR TOOLKIT
                            </Heading>
                        </Box>
                        <Grid
                            py="50px"
                            templateColumns="repeat(6, 1fr)"
                            gap={10}
                        >
                            <GridItem colSpan={2}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </GridItem>
                            <GridItem colSpan={4}>
                                <AspectRatio
                                    maxW="100%"
                                    maxH={450}
                                    ratio={16 / 9}
                                >
                                    <iframe
                                        title="Toolkit"
                                        src="https://www.youtube.com/embed/NAav2ouuLRE"
                                        allowFullScreen
                                    />
                                </AspectRatio>
                            </GridItem>
                        </Grid>
                        <br />
                        <Box p={4}>
                            <Heading
                                fontSize={32}
                                textDecoration="underline"
                                textDecorationColor="brand.lime"
                                textDecorationThickness="2px"
                                textUnderlineOffset="6px"
                            >
                                TOOLS
                            </Heading>
                            <br /> <br />
                            <Heading fontSize={24}>Life Problems</Heading>
                            <br />
                            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                <UserToolCard
                                    title="Anger"
                                    description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                    onClickTool={handleClickTool}
                                    onSelfCheck={handleSelfCheck}
                                    image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                    progressValue={10}
                                />
                                <UserToolCard
                                    title="Anxiety"
                                    description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                    onClickTool={handleClickTool}
                                    onSelfCheck={handleSelfCheck}
                                    image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                    progressValue={10}
                                />
                                <UserToolCard
                                    title="Depression"
                                    description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                    onClickTool={handleClickTool}
                                    onSelfCheck={handleSelfCheck}
                                    image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                    progressValue={10}
                                />
                                <UserToolCard
                                    title="Anger"
                                    description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                    onClickTool={handleClickTool}
                                    onSelfCheck={handleSelfCheck}
                                    image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                    progressValue={10}
                                />
                                <UserToolCard
                                    title="Anxiety"
                                    description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                    onClickTool={handleClickTool}
                                    onSelfCheck={handleSelfCheck}
                                    image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                    progressValue={10}
                                />
                                <UserToolCard
                                    title="Depression"
                                    description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                    onClickTool={handleClickTool}
                                    onSelfCheck={handleSelfCheck}
                                    image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                    progressValue={10}
                                />
                            </Grid>
                            <br />
                            <br />
                            <Heading fontSize={24}>Skills</Heading>
                            <br />
                            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                <UserToolCard
                                    title="Anger"
                                    description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                    onClickTool={handleClickTool}
                                    onSelfCheck={handleSelfCheck}
                                    image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                    progressValue={10}
                                />
                                <UserToolCard
                                    title="Anxiety"
                                    description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                    onClickTool={handleClickTool}
                                    onSelfCheck={handleSelfCheck}
                                    image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                    progressValue={10}
                                />
                                <UserToolCard
                                    title="Depression"
                                    description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                    onClickTool={handleClickTool}
                                    onSelfCheck={handleSelfCheck}
                                    image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                    progressValue={10}
                                />
                                <UserToolCard
                                    title="Anger"
                                    description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                    onClickTool={handleClickTool}
                                    onSelfCheck={handleSelfCheck}
                                    image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                    progressValue={10}
                                />
                                <UserToolCard
                                    title="Anxiety"
                                    description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                    onClickTool={handleClickTool}
                                    onSelfCheck={handleSelfCheck}
                                    image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                    progressValue={10}
                                />
                                <UserToolCard
                                    title="Depression"
                                    description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                    onClickTool={handleClickTool}
                                    onSelfCheck={handleSelfCheck}
                                    image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                    progressValue={10}
                                />
                            </Grid>
                        </Box>
                    </Container>
                </>
            ) : (
                <>
                    <Box p={4}>
                        <Box>
                            <Heading
                                fontSize={32}
                                background="linear-gradient(180deg, rgba(255,255,255,0) 50%, #86FC2F 50%)"
                                display="inline"
                            >
                                WELCOME TO YOUR TOOLKIT
                            </Heading>
                        </Box>
                        <br />
                        <Box>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Praesent laoreet feugiat velit,
                                ut placerat augue euismod vel. Cras efficitur
                                velit eu diam sodales dignissim. Etiam tempus
                                sapien vel metus elementum, eget ornare metus
                                vulputate. Morbi ullamcorper fringilla nulla
                                volutpat vestibulum. Curabitur ut lobortis
                                purus.
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
                            textDecorationThickness="2px"
                            textUnderlineOffset="6px"
                        >
                            TOOLS
                        </Heading>
                        <br />
                        <Heading fontSize={24}>Life Problems</Heading>
                        <br />
                        <Carousel
                            infiniteLoop
                            showIndicators={false}
                            showArrows={false}
                            showStatus={false}
                            centerMode
                            centerSlidePercentage={85}
                        >
                            <UserToolCard
                                title="Anger"
                                description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                onClickTool={handleClickTool}
                                onSelfCheck={handleSelfCheck}
                                image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                progressValue={10}
                            />
                            <UserToolCard
                                title="Anxiety"
                                description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                onClickTool={handleClickTool}
                                onSelfCheck={handleSelfCheck}
                                image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                progressValue={10}
                            />
                            <UserToolCard
                                title="Depression"
                                description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                onClickTool={handleClickTool}
                                onSelfCheck={handleSelfCheck}
                                image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                progressValue={10}
                            />
                        </Carousel>
                        <Heading fontSize={24}>Skills</Heading>
                        <br />
                        <Carousel
                            infiniteLoop
                            showIndicators={false}
                            showArrows={false}
                            showStatus={false}
                            centerMode
                            centerSlidePercentage={85}
                        >
                            <UserToolCard
                                title="Anger"
                                description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                onClickTool={handleClickTool}
                                onSelfCheck={handleSelfCheck}
                                image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                progressValue={10}
                            />
                            <UserToolCard
                                title="Anxiety"
                                description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                onClickTool={handleClickTool}
                                onSelfCheck={handleSelfCheck}
                                image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                progressValue={10}
                            />
                            <UserToolCard
                                title="Depression"
                                description="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent laoreet feugiat"
                                onClickTool={handleClickTool}
                                onSelfCheck={handleSelfCheck}
                                image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-flower-blooming-outdoors-royalty-free-image-739387273-1544039749.jpg"
                                progressValue={10}
                            />
                        </Carousel>
                    </Box>
                </>
            )}
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
Home.layout = AdminLayout;
export default Home;
