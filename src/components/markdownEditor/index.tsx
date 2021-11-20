import React from "react";
import Image from "next/image";
import { Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import MDEditor, {
    commands,
    ICommand,
    TextState,
    TextAreaTextApi,
    selectWord,
} from "@uiw/react-md-editor";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";

const underlineCommand: ICommand = {
    name: "underline",
    keyCommand: "underline",
    shortcuts: "ctrlcmd+u",
    buttonProps: { "aria-label": "Add underline text" },
    icon: (
        <Image
            src="/icons/underline.svg"
            height="12px"
            width="12px"
            layout="fixed"
        />
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({
            text: state.text,
            selection: state.selection,
        });
        const state1 = api.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the italic mark up
        const state2 = api.replaceSelection(`__${state1.selectedText}__`); // convention to notate underline: double underscore
        // Adjust the selection to not contain the __
        api.setSelectionRange({
            start: state2.selection.end - 2 - state1.selectedText.length,
            end: state2.selection.end - 2,
        });
    },
};

const videoCommand: ICommand = {
    name: "video",
    keyCommand: "video",
    shortcuts: "ctrlcmd+y",
    buttonProps: { "aria-label": "Add video", title: "Add video" },
    icon: (
        <Image
            src="/icons/videocam.svg"
            height="12px"
            width="12px"
            layout="fixed"
        />
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
        // Select everything
        const newSelectionRange = selectWord({
            text: state.text,
            selection: state.selection,
        });
        const state1 = api.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the video
        const videoTemplate =
            state1.selectedText || "https://youtube.com/your-video-link";
        api.replaceSelection(`$[](${videoTemplate})`); // convention: video links are prepended with "$" instead of "!"
        // Adjust the selection to not contain the **
        api.setSelectionRange({
            start: 4 + state1.selection.start,
            end: 4 + state1.selection.start + videoTemplate.length,
        });
    },
};

const injectCommand: ICommand = {
    name: "inject",
    keyCommand: "inject",
    shortcuts: "ctrlcmd+j",
    buttonProps: { "aria-label": "Inject variable", title: "Inject variable" },
    icon: (
        <Image
            src="/icons/syringe.svg"
            height="12px"
            width="12px"
            layout="fixed"
        />
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
        // Select everything
        const newSelectionRange = selectWord({
            text: state.text,
            selection: state.selection,
        });
        const state1 = api.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the injection string
        const variable = state1.selectedText || "";
        api.replaceSelection(`<>[](${variable})`); // prepend injections with <>
        // Adjust the selection to not contain the <>[]( or )
        api.setSelectionRange({
            start: 5 + state1.selection.start,
            end: 5 + state1.selection.start + variable.length,
        });
    },
};

const indentCommand: ICommand = {
    name: "indent",
    keyCommand: "indent",
    shortcuts: "ctrlcmd+m",
    buttonProps: { "aria-label": "Indent text", title: "Indent" },
    icon: (
        <Image
            src="/icons/indent.svg"
            height="12px"
            width="12px"
            layout="fixed"
        />
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
        let modifyText = `\` \` ${state.selectedText}\n`; // convention: notate indent with $
        if (!state.selectedText) {
            modifyText = `\` \` `;
        }
        api.replaceSelection(modifyText);
    },
};

const rightAlignCommand: ICommand = {
    name: "right-align",
    keyCommand: "right-align",
    shortcuts: "ctrlcmd+r",
    buttonProps: { "aria-label": "Add right aligned text" },
    icon: (
        <Image
            src="/icons/right-align.svg"
            height="12px"
            width="12px"
            layout="fixed"
        />
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({
            text: state.text,
            selection: state.selection,
        });
        const state1 = api.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the left align mark up
        const state2 = api.replaceSelection(`//${state1.selectedText}//`); // convention: right align is double //
        // Adjust the selection to not contain the **
        api.setSelectionRange({
            start: state2.selection.end - 2 - state1.selectedText.length,
            end: state2.selection.end - 2,
        });
    },
};

const centerAlignCommand: ICommand = {
    name: "center-align",
    keyCommand: "center-align",
    shortcuts: "ctrlcmd+e",
    buttonProps: { "aria-label": "Add center aligned text" },
    icon: (
        <Image
            src="/icons/center-align.svg"
            height="12px"
            width="12px"
            layout="fixed"
        />
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({
            text: state.text,
            selection: state.selection,
        });
        const state1 = api.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the center align mark up
        const state2 = api.replaceSelection(`||${state1.selectedText}||`); // convention: center align is double ||
        // Adjust the selection to not contain the **
        api.setSelectionRange({
            start: state2.selection.end - 2 - state1.selectedText.length,
            end: state2.selection.end - 2,
        });
    },
};

const leftAlignCommand: ICommand = {
    name: "left-align",
    keyCommand: "left-align",
    shortcuts: "ctrlcmd+l",
    buttonProps: { "aria-label": "Add left aligned text" },
    icon: (
        <Image
            src="/icons/left-align.svg"
            height="12px"
            width="12px"
            layout="fixed"
        />
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({
            text: state.text,
            selection: state.selection,
        });
        const state1 = api.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the center align mark up
        const state2 = api.replaceSelection(`\\\\${state1.selectedText}\\\\`); // convention: left align is double \\
        // Adjust the selection to not contain the **
        api.setSelectionRange({
            start: state2.selection.end - 2 - state1.selectedText.length,
            end: state2.selection.end - 2,
        });
    },
};

commands.image.shortcuts = "ctrl+shift+i"; // update shortcut for image to not collide with italics

interface MarkdownEditorProps {
    value: string;
    setValue: (e) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
    value,
    setValue,
}) => {
    return (
        <MDEditor
            value={value}
            onChange={setValue}
            preview="edit"
            commands={[
                commands.group(
                    [
                        commands.title1,
                        commands.title2,
                        commands.title3,
                        commands.title4,
                        commands.title5,
                        commands.title6,
                    ],
                    {
                        name: "title",
                        groupName: "title",
                        buttonProps: { "aria-label": "Insert title" },
                        icon: (
                            <>
                                <Text as="b">Text type</Text>
                                <ChevronDownIcon ml={1} />
                            </>
                        ),
                    },
                ),
                commands.bold,
                commands.italic,
                underlineCommand,
                commands.divider,
                commands.quote,
                indentCommand,
                commands.link,
                commands.unorderedListCommand,
                commands.orderedListCommand,
                commands.divider,
                leftAlignCommand,
                centerAlignCommand,
                rightAlignCommand,
                commands.divider,
                commands.image,
                videoCommand,
                injectCommand,
            ]}
            extraCommands={[]}
        />
    );
};
