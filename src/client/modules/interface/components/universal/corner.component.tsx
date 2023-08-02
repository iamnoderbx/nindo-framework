import Roact, { Element } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";

export enum CornerSize {
    SMALL=0.085,
    MEDIUM=0.3,
    HALF=0.5,
    LARGE=0.7,
    FULL=1,
}

export function UICorner(props: {size: CornerSize}) : Element {
    return <uicorner CornerRadius={new UDim(props.size, 0)} />
}

markPureComponent(UICorner)