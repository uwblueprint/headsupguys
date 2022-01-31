import React from "react";
import {
    Text,
    Spinner,
    Heading,
    AspectRatio,
} from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";

import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

const fetcher = async (url) => {
    const response = await axios({
        method: "GET",
        url,
    });
    return response.data;
};

const Module: React.FC = () => {
    const router = useRouter();
    const {id} = router.query;
    const variant = useMediaQuery({ query: `(max-width: 925px)` })
        ? "mobile"
        : "desktop";

    const fetchURL = id ? `/api/tool/${id}` : null;
    const { data, error } = useSWR(() => fetchURL, fetcher);
    if (error) return <div>An error has occurred.</div>;
    if (!data) return <Spinner color="brand.lime" size="xl" />;

    return (
        <>
            <Heading> {data.title} </Heading>

            <AspectRatio maxW="100%" maxH={290} ratio={1}>
                <iframe
                    title="Toolkit"
                    src={data.video}
                    allowFullScreen
                />
            </AspectRatio>

            <br />

            <Text textAlign="left">
                {data.description}
            </Text>

            <br />

            {(data.relatedResources ?? []).map((resource) => (
                <div>
                    <p>{String(resource[0])}</p>
                    <a href={resource[1]}>{resource[1]}</a>
                </div>
            ))}
        </>
    )
};

export default Module;