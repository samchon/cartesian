import grid from "../modules/grid";

export interface IGridColumn<Record extends object, Field extends keyof Record = keyof Record>
    extends Omit<
            grid.GridColDef, 
            "field"|"valueGetter"|"valueFormatter"|"renderCell"|"renderEditCell">
{
    field: Field;
    valueGetter?: (value: Record[Field], record: Record, index: number) => any;
    renderCell?: (value: Record[Field], record: Record, index: number) => any;
    renderEditCell?: (value: Record[Field], record: Record, index: number) => any;

    isCellEditable?: (value: Record[Field], record: Record, index: number) => boolean;
    onChangeCommitted?: (value: any, record: Record) => void;
}

export namespace IGridColumn
{
    export function create<Instance extends object, Key extends keyof Instance>
        (field: Key, options: Omit<IGridColumn<Instance, Key>, "field">): IGridColumn<Instance>
    {
        return {
            ...options,
            field
        } as IGridColumn<Instance>;
    }

    export function convert<Instance extends object, Key extends keyof Instance>
        (column: IGridColumn<Instance, Key>): grid.GridColDef
    {
        const output: grid.GridColDef = {
            ...column,
            field: column.field as string,
            sortable: column.sortable === true
                ? true
                : false
        } as grid.GridColDef;

        if (column.valueGetter)
            output.valueGetter = param => column.valueGetter!(param.value as any, param.row as any, param.rowIndex);
        if (column.renderCell)
            output.renderCell = param => column.renderCell!(param.value as any, param.row as any, param.rowIndex);
        if (column.renderEditCell)
            output.renderEditCell = param => column.renderEditCell!(param.value as any, param.row as any, param.rowIndex);

        return output;
    }
}