import Roact, { Element } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";

interface FrameProps extends Roact.JsxInstance<Frame> {}

export function PrimaryHeaderBox(props : FrameProps) : Element {
    const children = props[Roact.Children]

    return <frame
        AnchorPoint={new Vector2(0.5, 0)}
        BackgroundColor3={Color3.fromRGB(0, 0, 0)}

        BackgroundTransparency={0.85}
        BorderColor3={Color3.fromRGB(0, 0, 0)}

        BorderSizePixel={0}

        Position={UDim2.fromScale(0.5, 0)}
        Size={UDim2.fromScale(1, 0.155)}
    > 
    {children}
    </frame>
}

markPureComponent(PrimaryHeaderBox)