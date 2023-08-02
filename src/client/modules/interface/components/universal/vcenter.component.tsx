import Roact, { Element } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";

interface ListProps extends Roact.JsxInstance<UIListLayout> {}

export function VerticalCentered(props : ListProps) : Element {
    return <uilistlayout 
        FillDirection={"Vertical"} 
        HorizontalAlignment={"Center"} 
        VerticalAlignment={"Center"}
        Padding={props.Padding || new UDim(0, 5)}
        SortOrder={Enum.SortOrder.LayoutOrder}
    />
}

markPureComponent(VerticalCentered)