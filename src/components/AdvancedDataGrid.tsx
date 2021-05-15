import { AdvancedDataGridBase } from "./internal/AdvancedDataGridBase";

export class AdvancedDataGrid<Record extends object>
    extends AdvancedDataGridBase<Record, AdvancedDataGrid.IProps<Record>>
{
}

export namespace AdvancedDataGrid
{
    export type IProps<Record extends object>
        = AdvancedDataGridBase.IProps<Record>;
}