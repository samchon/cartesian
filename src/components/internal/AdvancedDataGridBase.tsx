import grid from "../../modules/grid";
import React from "react";
import { get_uid } from "tstl/functional/uid";

import { EmptyRecord } from "../EmptyRecord";
import { IGridColumn } from "../IGridColumn";

export class AdvancedDataGridBase<Record extends object, Props extends AdvancedDataGridBase.IProps<Record>>
    extends React.Component<Props>
{
    private selection_model_: number[];
    private readonly is_cell_editable_?: (params: grid.GridCellParams) => boolean;
    private readonly on_edit_cell_change_committed_?: (params: grid.GridEditCellPropsParams) => void;

    public constructor(props: Props)
    {
        super(props);
        this.selection_model_ = props.selected
            ? [get_uid(props.selected)]
            : [];

        const editables: Map<keyof Record, CellEditable<Record, keyof Record>> = new Map();
        const commits: Map<keyof Record, EditCellChangeCommitted<Record>> = new Map();

        for (const column of props.columns)
        {
            if (column.isCellEditable)
                editables.set(column.field, column.isCellEditable);
            if (column.onChangeCommitted)
                commits.set(column.field, column.onChangeCommitted);
        }

        if (editables.size !== 0)
            this.is_cell_editable_ = params =>
            {
                const field: keyof Record = params.field as keyof Record;
                if (editables.has(field))
                    return editables.get(field)!
                    (
                        params.value as any, 
                        params.row as Record, 
                        params.rowIndex
                    );
                else
                    return true;
            };
        if (commits.size !== 0)
            this.on_edit_cell_change_committed_ = params =>
            {
                const record: Record | undefined = this.props.data.find(elem => get_uid(elem) === params.id);
                if (record === undefined)
                    return;

                const closure: EditCellChangeCommitted<Record> | undefined = commits.get(params.field as keyof Record);
                if (closure !== undefined)
                    closure(params.props.value as any, record);
                
                this.setSelected(record);
            };
    }

    /* -----------------------------------------------------------
        SELECTION
    ----------------------------------------------------------- */
    protected getSelected(): Record | null
    {
        if (this.selection_model_.length === 0)
            return null;
        else
        {
            const record: Record | undefined = this.props.data.find(elem => get_uid(elem) === this.selection_model_[0]);
            return record || null;
        }
    }

    protected setSelected(child: Record | null): void
    {
        this.selection_model_ = child !== null
            ? [get_uid(child)]
            : [];
        this.setState({});
    }

    private handleChange(param: grid.GridSelectionModelChangeParams): void
    {
        this.selection_model_ = param.selectionModel as number[];
        this.setState({}, () =>
        {
            if (this.props.onSelect)
                this.props.onSelect(this.getSelected()!);
        });
    }

    /* -----------------------------------------------------------
        RENDERING
    ----------------------------------------------------------- */
    public render(): JSX.Element
    {
        return <grid.DataGrid {...DEFAULT_PROPS}
            // DATA
            columns={this.props.columns.map(col => IGridColumn.convert(col))}
            rows={this.props.data.map(row => row)}

            // EDITOR
            isCellEditable={this.is_cell_editable_}
            onEditCellChangeCommitted={this.on_edit_cell_change_committed_}

            // SELECTION
            onSelectionModelChange={param => this.handleChange(param)}
            selectionModel={this.selection_model_} />
    }
}

export namespace AdvancedDataGridBase
{
    export interface IProps<Record extends object>
        extends Omit<grid.DataGridProps,
            "rows"|"columns"|"getRowId"|
            "isCellEditable"|"onEditCellChangeCommitted"|
            "onSelectionModelChange"|"selectionModel">
    {
        data: Record[];
        columns: IGridColumn<Record, keyof Record>[];
        onSelect?: (selected: Record | null) => void;
        selected?: Record | null;
    }
}
const DEFAULT_PROPS =
{
    getRowId: (row: object) => get_uid(row),
    autoHeight: true,
    density: "compact" as const,
    disableColumnMenu: true,
    hideFooterPagination: true,
    hideFooterSelectedRowCount: true,
    components: {
        NoRowsOverlay: EmptyRecord
    }
}

type CellEditable<Record extends object, Field extends keyof Record> = (value: Record[Field], record: Record, index: number) => boolean;
type EditCellChangeCommitted<Record extends object> = (value: any, record: Record) => void;