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
                                    <div>
                                        <ReactPlayer controls url={rest.href} />
                                    </div>
                                </>
                            ) : (
                                <a href={rest.href}>{children}</a>
                            )}
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
