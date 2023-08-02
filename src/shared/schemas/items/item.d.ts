export type GridCell = { x: number, y : number, obstructed?: boolean, item?: Item }
export type ItemDimensions = { x: number, y: number, cell : GridCell}

export interface ItemContainer {
    contents: Item[],
    name: string,
}

export type Item = {
    name: string,
    uuid: string,

    dimension: ItemDimensions 
};