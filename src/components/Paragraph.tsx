import React from "react";
import material from "../modules/material";

import { ArrayUtil } from "../utils/ArrayUtil";

export function Paragraph(props: Paragraph.IProps): JSX.Element
{
    const index: number = Number(props.variant.substr(1));

    return <React.Fragment>
        <material.Typography variant={`h${index + 3}` as "h1"}>
            {props.title}
        </material.Typography>
        {index <= 2
            ? <material.Divider />
            : null
        }
        <br/>
        {props.children}
        {ArrayUtil.repeat(index <= 2 ? 4 : 2, () => <br/>)}
    </React.Fragment>;
}

export namespace Paragraph
{
    export interface IProps
    {
        variant: `h${number}`;
        title: string;
        children: React.ReactNode;
    }
}