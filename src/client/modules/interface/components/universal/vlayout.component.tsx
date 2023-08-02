import Roact, { Element } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";

interface LayoutProps extends Roact.JsxInstance<UIListLayout> {}

export function DefaultLayoutOrder(props : LayoutProps) : Element {
    return <uilistlayout
        VerticalAlignment={props.VerticalAlignment || Enum.VerticalAlignment.Top}
        FillDirection={props.FillDirection || Enum.FillDirection.Vertical}
        SortOrder={props.SortOrder || Enum.SortOrder.LayoutOrder}
        Padding={props.Padding}
    />
}

markPureComponent(DefaultLayoutOrder)