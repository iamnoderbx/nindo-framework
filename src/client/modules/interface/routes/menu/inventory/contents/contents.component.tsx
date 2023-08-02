import Roact, { Element } from "@rbxts/roact";
import { useSelector } from "@rbxts/roact-reflex";
import { GridCellComponent, GridLayoutComponent } from "client/modules/interface/components/menu/inventory/grid.component";
import { PrimaryHolderFrame } from "client/modules/interface/components/universal/frames/primary.holder.component";
import { DefaultLayoutOrder } from "client/modules/interface/components/universal/vlayout.component";
import { selectInventoryContents } from "./contents.selectors";
import { ItemContainer } from "shared/schemas/items/item";

export function ContentGridComponent(items : ItemContainer[]) : Element[] {
    const cells : Element[] = [];

    for (const x of $range(1, 10)) {
        for (const y of $range(1, 5)) {
            cells.push(<GridCellComponent cell={{x: x, y: y}}/>)
        }
    }

    return cells
}
 
export function ContentsComponent() : Element {
    const items : ItemContainer[] = useSelector(selectInventoryContents);
    print(items)

    return (
        <PrimaryHolderFrame Size={UDim2.fromScale(1, 0.525)}  >
            <uicorner />
            <DefaultLayoutOrder />

            {/* Item Contents */}
            <PrimaryHolderFrame Size={UDim2.fromScale(1, 1)}>
                {/* Item renders go within this frame. */}
                <PrimaryHolderFrame />    

                {/* Grid Generation */}
                <PrimaryHolderFrame>
                    <uicorner />
                    <GridLayoutComponent />

                    { /* Generates a Content Grid (50 cells) */ }
                    { ContentGridComponent(items) }

                </PrimaryHolderFrame>
            </PrimaryHolderFrame>
        </PrimaryHolderFrame>
    )
}