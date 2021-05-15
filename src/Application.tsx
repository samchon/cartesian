import React from "react";

import { DeckListMovie } from "./movies/DeckListMovie";
import { ResultMovie } from "./movies/ResultMovie";
import { IDeck } from "./structures/IDeck";

export function Application(props: Application.IProps): JSX.Element
{
    const [sequence, setSequence] = React.useState(0);

    function refresh(): void
    {
        setSequence(sequence + 1);
    }

    return <React.Fragment>
        <DeckListMovie 
                refresh={refresh}
                decks={props.decks} />
        <br/>
        <br/>
        <ResultMovie decks={props.decks} />
    </React.Fragment>;
}

export namespace Application
{
    export interface IProps
    {
        decks: IDeck[];
    }
}