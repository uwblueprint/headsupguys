import React, { useState } from "react";
import {
    Box,
    CloseButton,
    Flex,
    Heading,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import Select from "react-select";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from "axios";

import { getIsDesktop } from "src/utils/media/mediaHelpers";

const MoodTrackerModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}): React.ReactElement => {
    const [isDesktop] = getIsDesktop();
    const [mood, setMood] = useState(-1);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const months = [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sep.",
        "Oct.",
        "Nov.",
        "Dec.",
    ];
    const colors = ["#7265E8", "#6B91F7", "#CB3C7D", "#EC6A2C", "#F4B23E"];
    const options = [
        {
            value: 0,
            label: "Shit",
            image: "/icons/shit-mood.svg",
            imageOutline: "/icons/shit-mood-outline.svg",
        },
        {
            value: 1,
            label: "Not Good",
            image: "/icons/not-good-mood.svg",
            imageOutline: "/icons/not-good-mood-outline.svg",
        },
        {
            value: 2,
            label: "Average",
            image: "/icons/average-mood.svg",
            imageOutline: "/icons/average-mood-outline.svg",
        },
        {
            value: 3,
            label: "Good",
            image: "/icons/good-mood.svg",
            imageOutline: "/icons/good-mood-outline.svg",
        },
        {
            value: 4,
            label: "Awesome!",
            image: "/icons/awesome-mood.svg",
            imageOutline: "/icons/awesome-mood-outline.svg",
        },
    ];
    const selectStyles = {
        control: (provided) => ({
            ...provided,
            width: "220px",
            border: "none",
            boxShadow: "none",
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: "black",
            padding: "0px",
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: "none",
        }),
        singleValue: (provided) => ({
            ...provided,
            margin: "0px",
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: "10px 0px",
        }),
    };

    const getCalendar = (month, year) => {
        const moods = new Map();
        let startDate = new Date(year, month + 1, 0);
        const endDate = new Date(year, month, 1);
        const today = new Date();
        if (today < startDate) {
            startDate = today;
        }

        while (startDate >= endDate) {
            moods.set(new Date(startDate), -1);
            startDate.setDate(startDate.getDate() - 1);
        }
        return moods;
    };

    const [moods, setMoods] = useState(getCalendar(month, year));

    const getMoods = async (month, year) => {
        const newMoods = getCalendar(month, year);
        console.log("newMoods:", newMoods);

        try {
            const { data } = await axios({
                method: "GET",
                url: "/api/mood/getInMonth",
                params: {
                    username: "test",
                    month: month,
                    year: year,
                },
            });
            for (const datum of data) {
                newMoods.set(new Date(datum.timestamp), datum.moodScore);
            }
            console.log("data:", data);
            console.log("newMoods:", newMoods);
        } catch (error) {
            console.log("error:", error);
        }
        return newMoods;
    };

    const getDate = (date) => {
        return `${`0${date.getMonth() + 1}`.slice(
            -2,
        )}/${`0${date.getDate()}`.slice(-2)}`;
    };

    const setPrevMonth = async () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
            setMoods(await getMoods(11, year - 1));
        } else {
            setMonth(month - 1);
            setMoods(await getMoods(month - 1, year));
        }
    };

    const setNextMonth = async () => {
        if (
            year < new Date().getFullYear() ||
            (month < new Date().getMonth() && year === new Date().getFullYear())
        ) {
            if (month === 11) {
                setMonth(0);
                setYear(year + 1);
                setMoods(await getMoods(0, year - 1));
            } else {
                setMonth(month + 1);
                setMoods(await getMoods(month + 1, year));
            }
        }
    };

    const handleChange = async (selectedOption) => {
        if (mood !== -1) {
            try {
                const response = await axios({
                    method: "POST",
                    url: "/api/mood/post",
                    data: {
                        username: "test",
                        timestamp: new Date().toISOString(),
                        moodScore: mood,
                    },
                });
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            setMood(selectedOption.value);
            setMoods(await getMoods(month + 1, year));
        }
    };

    return (
        <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            size={isDesktop ? "xl" : "sm"}
        >
            <ModalOverlay />
            <ModalContent
                borderRadius="0px"
                padding={isDesktop ? "10px 5px 20px 5px" : "0px"}
            >
                <ModalHeader paddingBottom="0px">
                    <Flex justify="space-between" width="100%">
                        <Box marginTop="20px">
                            <Text fontSize="sm" color="gray.500">
                                Hi, how are you today?
                            </Text>
                            <Select
                                defaultValue={
                                    mood < 0
                                        ? {
                                              value: -1,
                                              label: "I'm feeling...",
                                          }
                                        : options[mood]
                                }
                                formatOptionLabel={(option) =>
                                    option.value < 0 ? (
                                        <Heading fontSize="3xl">
                                            I'm feeling...
                                        </Heading>
                                    ) : (
                                        <Flex align="center">
                                            {option.value === mood ? (
                                                <Image
                                                    alt={option.label}
                                                    src={option.image}
                                                    height="24px"
                                                    width="24px"
                                                />
                                            ) : (
                                                <Image
                                                    alt={option.label}
                                                    src={option.imageOutline}
                                                    height="16px"
                                                    width="16px"
                                                />
                                            )}
                                            {option.value === mood ? (
                                                <Heading
                                                    fontSize="32px"
                                                    marginLeft="18px"
                                                >
                                                    {option.label}
                                                </Heading>
                                            ) : (
                                                <Text
                                                    fontSize="16px"
                                                    marginLeft="14px"
                                                >
                                                    {option.label}
                                                </Text>
                                            )}
                                        </Flex>
                                    )
                                }
                                hideSelectedOptions={true}
                                isSearchable={false}
                                onChange={handleChange}
                                options={options}
                                styles={selectStyles}
                            />
                        </Box>
                        <CloseButton onClick={onClose} />
                    </Flex>
                </ModalHeader>
                <ModalBody paddingTop="0px">
                    <Flex
                        align="center"
                        fontSize="sm"
                        justify="space-between"
                        marginBottom="10px"
                        width="100%"
                    >
                        <Heading fontSize="sm">Mood Tracker</Heading>
                        <Flex align="center">
                            <IconButton
                                aria-label="Previous month"
                                color="gray.400"
                                icon={<MdChevronLeft size={20} />}
                                onClick={setPrevMonth}
                                variant="ghost"
                            />
                            <Text color="gray.500">
                                {months[month]} {year}
                            </Text>
                            <IconButton
                                aria-label="Next month"
                                color="gray.400"
                                icon={<MdChevronRight size={20} />}
                                onClick={setNextMonth}
                                variant="ghost"
                            />
                        </Flex>
                    </Flex>
                    <Flex
                        padding="0px 16px 30px 50px"
                        justify="space-between"
                        width="100%"
                    >
                        {options.map((option) => (
                            <Flex align="center" direction="column">
                                <Image
                                    alt={option.label}
                                    height={isDesktop ? "24px" : "16px"}
                                    key={`mood-${option.label}`}
                                    src={option.image}
                                    width={isDesktop ? "24px" : "16px"}
                                />
                                <Box
                                    backgroundColor="gray.100"
                                    height={isDesktop ? "514px" : "506px"}
                                    marginTop="40px"
                                    position="absolute"
                                    width={isDesktop ? "2px" : "1px"}
                                    zIndex="-1"
                                ></Box>
                            </Flex>
                        ))}
                    </Flex>
                    <Flex
                        direction="column"
                        height="500px"
                        marginBottom="20px"
                        overflow="auto"
                        paddingRight="20px"
                        width="100%"
                    >
                        {[...moods].map(([date, mood], i) => (
                            <Flex
                                align="center"
                                key={`mood-${i}`}
                                marginBottom="10px"
                                width="100%"
                            >
                                <Text
                                    color={mood < 0 ? "gray.400" : "gray.600"}
                                    fontSize="sm"
                                    marginRight="10px"
                                    width="40px"
                                >
                                    {getDate(date)}
                                </Text>
                                <Box
                                    backgroundColor={
                                        mood < 0 ? "gray.100" : colors[mood]
                                    }
                                    borderRadius="0px 5px 5px 0px"
                                    height="28px"
                                    width={
                                        isDesktop
                                            ? mood < 1
                                                ? "12px"
                                                : `calc(${21.5 * mood}% + 12px)`
                                            : mood < 1
                                            ? "8px"
                                            : `calc(${20.1 * mood}% + 8px)`
                                    }
                                ></Box>
                            </Flex>
                        ))}
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default MoodTrackerModal;