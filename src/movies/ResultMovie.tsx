import material from "../modules/material";
import icons from "../modules/icons";
import iconv from "iconv-lite";
import { CartesianProduct } from "cagen";

import { AdvancedDataGrid } from "../components/AdvancedDataGrid";
import { FileSystem } from "../utils/FileSystem";
import { IDeck } from "../structures/IDeck";
import { IGridColumn } from "../components/IGridColumn";

export function ResultMovie
    (props: ResultMovie.IProps): JSX.Element
{
    const data: Record<string, string>[] = combinate(props.decks);

    function download(): void
    {
        if (data.length === 0)
            return;

        const fields: string[] = Object.keys(data[0]);
        const content: string = fields.map(str => `"${str}"`).join(",") 
            + "\n"
            + data.map(record => fields.map(f => `"${record[f]}"`)).join("\n");
        const buffer: Buffer = iconv.encode(content, "euc-kr");
        
        FileSystem.download("cartesian.csv", buffer);
    }

    return <material.Card>
        <material.CardHeader 
                title="Result List"
                subheader={`Number of cases: #${data.length.toLocaleString()}`}>
            
        </material.CardHeader>
        <material.Divider />
        <material.CardContent>
            <AdvancedDataGrid 
                    columns={getColumns(props.decks)}
                    data={data} />
        </material.CardContent>
        <material.CardActions>
            <material.Button fullWidth
                    variant="contained"
                    disabled={data.length === 0}
                    onClick={() => download()}
                    startIcon={ <icons.CloudDownloadOutlined /> }>
                Donwload
            </material.Button>
        </material.CardActions>
    </material.Card>;
}

export namespace ResultMovie
{
    export interface IProps
    {
        decks: IDeck[];
    }
}

function getColumns(deckList: IDeck[]): IGridColumn<Record<string, string>>[]
{
    return deckList.map(deck => IGridColumn.create(deck.name, 
    {
        headerName: deck.name,
        width: 150
    }));
}

function combinate(deckList: IDeck[]): Record<string, string>[]
{
    const counts: number[] = deckList.map(deck => deck.children.length);
    const cartesian: CartesianProduct = new CartesianProduct(...counts);

    const output: Record<string, string>[] = [];
    for (const indexes of cartesian)
    {
        const record: Record<string, string> = {};
        indexes.forEach((col, row) =>
        {
            const deck: IDeck = deckList[row];
            const child: IDeck.IChild = deck.children[col];

            record[deck.name] = child.name;
        });
        output.push(record);
    }
    return output;
}