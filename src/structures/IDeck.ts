export interface IDeck
{
    name: string;
    children: IDeck.IChild[];
}

export namespace IDeck
{
    export interface IChild
    {
        name: string;
    }
}