import ReactMarkdown from "react-markdown";
import React from "react";
import style from "./markdown-renderer.module.css";

interface MarkdownRendererProps {
    children: string;
}
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    children,
}) => {
    return <ReactMarkdown className={style.markdown}>{children}</ReactMarkdown>;
};
