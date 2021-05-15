import material from "../modules/material";
import icons from "../modules/icons";
import { AdvancedDataGridBase } from "./internal/AdvancedDataGridBase";

export class ContainerDataGrid<Record extends object>
    extends AdvancedDataGridBase<Record, ContainerDataGrid.IProps<Record>>
{
    /* -----------------------------------------------------------
        ELEMENTS I/O
    ----------------------------------------------------------- */
    private insert(): void
    {
        const newbie: Record = this.props.create();
        this.props.data.push(newbie);

        this.setSelected(newbie);
        if (this.props.onSelect)
            this.props.onSelect(newbie);
        if (this.props.onCreate)
            this.props.onCreate(newbie, this.props.data.length - 1);
    }
    
    private erase(): void
    {
        const previous: Record | null = this.getSelected();
        if (previous === null)
            return;

        const index: number = this.props.data.findIndex(elem => elem === previous);
        if (index === -1)
            return;

        this.props.data.splice(index, 1);
        this.setSelected(null);

        if (this.props.onErase)
            this.props.onErase(previous, index);
        if (this.props.onSelect)
            this.props.onSelect(null);
    }

    /* -----------------------------------------------------------
        RENDERING
    ----------------------------------------------------------- */
    public render(): JSX.Element
    {
        return <material.Card>
            <material.CardHeader 
                    title={this.props.title} 
                    subheader={this.props.subheader} />
            <material.Divider />
            <material.CardContent>
                {super.render()}
            </material.CardContent>
            {!this.props.disableActions && <material.CardActions>
                <material.Button 
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => this.insert()}
                        startIcon={ <icons.AddOutlined /> }>
                    Insert
                </material.Button>
                <material.Button fullWidth
                        variant="contained"
                        color="secondary"
                        disabled={this.getSelected() === null || this.props.disableErase === true}
                        onClick={() => this.erase()}
                        startIcon={ <icons.DeleteOutlineOutlined /> }>
                    Erase
                </material.Button>
            </material.CardActions>}
        </material.Card>;
    }
}

export namespace ContainerDataGrid
{
    export interface IProps<Record extends object>
        extends AdvancedDataGridBase.IProps<Record>
    {
        title: string;
        subheader: string;

        create: () => Record;
        disableActions?: boolean;
        disableErase?: boolean;

        onCreate?: (newbie: Record, index: number) => void;
        onErase?: (oldbiew: Record, index: number) => void;
    }
}