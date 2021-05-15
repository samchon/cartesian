import React from "react";
import material from "../modules/material";
import { get_uid } from "tstl/functional/uid";

import { ArrayUtil } from "../utils/ArrayUtil";
import { StringUtil } from "../utils/StringUtil";

import { IDeck as IDeck } from "../structures/IDeck";
import { IGridColumn } from "../components/IGridColumn";
import { ContainerDataGrid } from "../components/ContainerDataGrid";

import { ChildrenMovie } from "./ChildrenMovie";

export function DeckListMovie(props: DeckListMovie.IProps)
{
    const [selected, setSelected] = React.useState<IDeck | null>(props.decks.length !== 0 ? props.decks[0] : null);
    const [sequence, setSequence] = React.useState(0);

    function refresh(): void
    {
        setSequence(sequence + 1);
        props.refresh();
    }

    return <material.Grid container spacing={2}>
        <material.Grid item xs>
            <ContainerDataGrid
                    title="Deck List"
                    subheader="Select a deck to edit children items"
                    disableErase={props.decks.length <= 1}
                    columns={getColumns(refresh)}
                    data={props.decks} 
                    create={create_random_deck}
                    selected={selected}
                    onSelect={setSelected}
                    onCreate={refresh} />
        </material.Grid>
        <material.Grid item xs>
        {selected !== null
            ? <ChildrenMovie key={get_uid(selected)}
                    children={selected.children} 
                    refresh={refresh} />
            : null
        }
        </material.Grid>
    </material.Grid>
}
export namespace DeckListMovie
{
    export interface IProps
    {
        refresh: () => void;
        decks: IDeck[];
    }
}

function getColumns(refresh: () => void): IGridColumn<IDeck>[]
{
    return [
        {
            field: "no" as any,
            headerName: "No",
            width: 60,
            valueGetter: (_v, _i, index) => (index+1).toString()
        },
        IGridColumn.create("name", {
            headerName: "Deck Name",
            flex: 1000,
            editable: true,
            onChangeCommitted: (value, record) => 
            {
                record.name = value;
                refresh();
            }
        }),
        IGridColumn.create("children", {
            headerName: "Children",
            width: 70,
            valueGetter: children => "#" + children.length
        })
    ];
}

function create_random_deck(): IDeck
{
    return {
        name: StringUtil.random(8),
        children: ArrayUtil.repeat(3, index => ({
            name: (index + 1).toString()
        }))
    };
}