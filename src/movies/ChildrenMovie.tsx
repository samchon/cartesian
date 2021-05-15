import { ContainerDataGrid } from "../components/ContainerDataGrid";
import { IGridColumn } from "../components/IGridColumn";
import { IDeck } from "../structures/IDeck";

export function ChildrenMovie(props: ChildrenMovie.IProps): JSX.Element
{
    function create(): IDeck.IChild
    {
        return {
            name: (props.children.length + 1).toString()
        };
    }

    return <ContainerDataGrid
            title="Children List"
            subheader="Edit child item name through double-click"
            columns={getColumns(props.refresh)}
            data={props.children}
            create={create}
            onCreate={props.refresh}
            onErase={props.refresh}
            disableErase={props.children.length <= 1} />;
}

export namespace ChildrenMovie
{
    export interface IProps
    {
        refresh: () => void;
        children: IDeck.IChild[];
    }
}

function getColumns(refresh: () => void): IGridColumn<IDeck.IChild>[]
{
    return [
        {
            headerName: "No",
            field: "no" as any,
            width: 60,
            valueGetter: (_v, _i, index) => (index+1).toString()
        },
        IGridColumn.create("name", {
            headerName: "Item Name",
            flex: 1000,
            editable: true,
            onChangeCommitted: (value, record) => 
            {
                record.name = value;
                refresh();
            }
        })
    ];
}