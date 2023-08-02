import Roact, { Element } from "@rbxts/roact";
import { GridCell } from "shared/schemas/items/item";

interface CellProps extends Roact.JsxInstance<Frame> {
    cell: GridCell
}

export function GridCellComponent(props : CellProps) : Element {
    return <frame
        BackgroundColor3={Color3.fromRGB(9, 10, 13)}
        BackgroundTransparency={0.55}
        BorderColor3={Color3.fromRGB(0, 0, 0)}
        BorderSizePixel={0}
        Size={UDim2.fromOffset(100, 100)}
    >
        <uistroke Color={Color3.fromRGB(34, 46, 62)} Transparency={0.95}/>
        <uicorner CornerRadius={new UDim(0.1, 0)}/>
    </frame>
}

export function GridLayoutComponent() : Element {
    return <uigridlayout
        Key={"uIGridLayout"}
        CellPadding={UDim2.fromOffset(1, 1)}
        CellSize={new UDim2(0.1, -1, 0.2, -1)}
        SortOrder={Enum.SortOrder.LayoutOrder}
    />
}