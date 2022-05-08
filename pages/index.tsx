import React, { useEffect, useState } from "react";
import {
    Alert,
    AspectRatio,
    Box,
    Button,
    CloseButton,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Icon,
    IconButton,
    Image,
    Spinner,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { Auth } from "aws-amplify";
import { UserToolCard } from "@components/userToolCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery } from "react-responsive";
import { MdChevronRight } from "react-icons/md";

import MoodTrackerModal from "src/pages/mood-tracker/MoodTrackerModal";

const fetcher = async (url) => {
    const response = await axios({
        method: "GET",
        url,
    });
    return response.data;
};

const Tools: React.FC<{ variant: string }> = ({ variant }) => {
    const { data, error } = useSWR("/api/tool/getAll", fetcher);
    if (error) return <div>An error has occurred.</div>;
    if (!data) return <Spinner color="brand.lime" size="xl" />;

    const router = useRouter();

    return (
        <>
            {variant === "desktop" ? (
                <>
                    <br />
                    <br />
                    <Heading fontSize={24}>Life Problems</Heading>
                    <br />
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                        {data
                            .filter((datum) => datum.type === "Problem")
                            .map(
                                ({
                                    _id,
                                    title,
                                    description,
                                    thumbnail,
                                    selfCheckGroupID,
                                }) => (
                                    <UserToolCard
                                        key={_id}
                                        title={title}
                                        description={description}
                                        onClickTool={() =>
                                            router.push(`/tool/${_id}`)
                                        }
                                        onSelfCheck={() =>
                                            router.push(
                                                `/selfCheck?id=${selfCheckGroupID}`,
                                            )
                                        }
                                        image={thumbnail}
                                        progressValue={10}
                                    />
                                ),
                            )}
                    </Grid>
                    <br />
                    <br />
                    <Heading fontSize={24}>Skills</Heading>
                    <br />
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                        {data
                            .filter((datum) => datum.type === "Skill")
                            .map(
                                ({
                                    _id,
                                    title,
                                    description,
                                    thumbnail,
                                    selfCheckGroupID,
                                }) => (
                                    <UserToolCard
                                        key={_id}
                                        title={title}
                                        description={description}
                                        onClickTool={() =>
                                            router.push(`/tool/${_id}`)
                                        }
                                        onSelfCheck={() =>
                                            router.push(
                                                `/selfCheck?id=${selfCheckGroupID}`,
                                            )
                                        }
                                        image={thumbnail}
                                        progressValue={10}
                                    />
                                ),
                            )}
                    </Grid>
                </>
            ) : (
                <>
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
                        {data
                            .filter((datum) => datum.type === "Problem")
                            .map(
                                ({
                                    _id,
                                    title,
                                    description,
                                    thumbnail,
                                    selfCheckGroupID,
                                }) => (
                                    <UserToolCard
                                        key={_id}
                                        title={title}
                                        description={description}
                                        onClickTool={() =>
                                            router.push(`/tool/${_id}`)
                                        }
                                        onSelfCheck={() =>
                                            router.push(
                                                `/selfCheck?id=${selfCheckGroupID}`,
                                            )
                                        }
                                        image={thumbnail}
                                        progressValue={10}
                                    />
                                ),
                            )}
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
                        {data
                            .filter((datum) => datum.type === "Skill")
                            .map(
                                ({
                                    _id,
                                    title,
                                    description,
                                    thumbnail,
                                    selfCheckGroupID,
                                }) => (
                                    <UserToolCard
                                        key={_id}
                                        title={title}
                                        description={description}
                                        onClickTool={() =>
                                            router.push(`/tool/${_id}`)
                                        }
                                        onSelfCheck={() =>
                                            router.push(
                                                `/selfCheck?id=${selfCheckGroupID}`,
                                            )
                                        }
                                        image={thumbnail}
                                        progressValue={10}
                                    />
                                ),
                            )}
                    </Carousel>
                </>
            )}
        </>
    );
};

const Home: React.FC = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [showAlert, setShowAlert] = useState(true);
    const [user, setUser] = useState<any | null>(null);
    const [showTrackMood, setShowTrackMood] = useState(true);

    const variant = useMediaQuery({ query: `(max-width: 925px)` })
        ? "mobile"
        : "desktop";

    useEffect(() => {
        const getCurrentUser = async () => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser(currentUser);
        };

        getCurrentUser().catch(console.error);
    }, []);

    return (
        <>
            <MoodTrackerModal
                isOpen={isOpen}
                onClose={onClose}
                setShowTrackMood={setShowTrackMood}
                user={user}
            />
            <Image src="/assets/HUG_Banner_1.png" w="100%" />
            {variant === "desktop" ? (
                <>
                    <Container maxW="container.lg" py="50px">
                        <Flex align="center" justify="space-between">
                            <Heading
                                background="linear-gradient(180deg, rgba(255,255,255,0) 50%, #86FC2F 50%)"
                                display="inline"
                                fontSize={32}
                                textTransform="uppercase"
                            >
                                {user
                                    ? `WELCOME TO YOUR TOOLKIT, ${user.attributes.name}`
                                    : `WELCOME TO YOUR TOOLKIT`}
                            </Heading>
                            {user && (
                                <IconButton
                                    aria-label="Track mood"
                                    icon={
                                        <Image
                                            alt="Track mood"
                                            src="/icons/track-mood.svg"
                                            height="24px"
                                            width="24px"
                                        />
                                    }
                                    onClick={onOpen}
                                    variant="ghost"
                                />
                            )}
                        </Flex>
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
                        {user && showTrackMood && (
                            <Box
                                backgroundColor="background.dark"
                                padding="30px"
                            >
                                <Text color="white">
                                    How are you today? Give your mind a HUG -
                                    start tracking your mood today!
                                </Text>
                                <Button
                                    backgroundColor="brand.green"
                                    height="48px"
                                    marginTop="20px"
                                    onClick={onOpen}
                                    padding="10px"
                                    width="300px"
                                >
                                    <Text>Track Mood</Text>
                                    <Box position="absolute" right="10px">
                                        <Icon
                                            as={MdChevronRight}
                                            height={6}
                                            width={6}
                                        />
                                    </Box>
                                </Button>
                            </Box>
                        )}
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
                            <Tools variant={variant} />
                        </Box>
                    </Container>
                </>
            ) : (
                <>
                    <Box>
                        <Flex
                            align="center"
                            justify="space-between"
                            padding="20px"
                        >
                            <Heading
                                background="linear-gradient(180deg, rgba(255,255,255,0) 50%, #86FC2F 50%)"
                                display="inline"
                                fontSize={32}
                                textTransform="uppercase"
                            >
                                {user
                                    ? `WELCOME TO YOUR TOOLKIT, ${user.attributes.name}`
                                    : `WELCOME TO YOUR TOOLKIT`}
                            </Heading>
                            {user && (
                                <IconButton
                                    aria-label="Track mood"
                                    icon={
                                        <Image
                                            alt="Track mood"
                                            src="/icons/track-mood.svg"
                                            height="24px"
                                            width="24px"
                                        />
                                    }
                                    onClick={onOpen}
                                    variant="ghost"
                                />
                            )}
                        </Flex>
                        {user && showTrackMood && (
                            <Box
                                backgroundColor="background.dark"
                                padding="32px 18px"
                            >
                                <Text color="white">
                                    How are you today? Give your mind a HUG -
                                    start tracking your mood today!
                                </Text>
                                <Button
                                    backgroundColor="brand.green"
                                    height="48px"
                                    marginTop="18px"
                                    onClick={onOpen}
                                    padding="10px"
                                    width="100%"
                                >
                                    <Text>Track Mood</Text>
                                    <Box position="absolute" right="10px">
                                        <Icon
                                            as={MdChevronRight}
                                            height={6}
                                            width={6}
                                        />
                                    </Box>
                                </Button>
                            </Box>
                        )}
                        <br />
                        <Box p={4}>
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
                        <Tools variant={variant} />
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
export default Home;
