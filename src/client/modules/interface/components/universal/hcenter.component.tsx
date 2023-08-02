import Roact, { Element } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";

interface ListProps extends Roact.JsxInstance<UIListLayout> {}

export function HorizontalCentered(props : ListProps) : Element {
    return <uilistlayout 
        FillDirection={"Horizontal"} 
        HorizontalAlignment={"Center"} 
        VerticalAlignment={"Center"}
        Padding={props.Padding || new UDim(0, 5)}
    />
}

markPureComponent(HorizontalCentered)