import { NextPage } from "next";
import { ComponentType } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export type Page<P = {}> = NextPage<P> & {
    layout?: ComponentType;
};
