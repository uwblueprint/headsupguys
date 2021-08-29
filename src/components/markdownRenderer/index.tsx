import ReactMarkdown from "react-markdown";
import React from "react";
import style from "./markdown-renderer.module.css";
import ReactPlayer from "react-player";

interface MarkdownRendererProps {
    children: string;
}
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
    return (
        <>
            {props.children.split("\n").join(",")}
            <ReactMarkdown
                components={{
                    strong: ({ node, className, children, ...rest }) => (
                        <strong>{children}</strong>
                    ),
                    a: ({ node, className, children, ...rest }) => (
                        <>
                            {node.position?.start.offset > 0 &&
                            props.children.split("\n")[
                                node.position?.start.line - 1
                            ][node.position?.start.column - 2] === "$" ? (
                                <>
                                    <ReactPlayer controls url={rest.href} />
                                </>
                            ) : (
                                <a href={rest.href}>{children}</a>
                            )}

                            {JSON.stringify(node)}
                        </>
                    ),
                }}
                className={style.markdown}
            >
                {props.children}
            </ReactMarkdown>
        </>
    );
};
