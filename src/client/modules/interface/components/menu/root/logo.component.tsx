import Roact, { Element } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";

interface ImageProps extends Roact.JsxInstance<ImageLabel> {}

export function LogoImageComponent(props : ImageProps) : Element {
    return <imagelabel
        Key={"logo"}
        Image={"rbxassetid://14239574352"}
        ImageTransparency={props.ImageTransparency || 0.82}
        AnchorPoint={new Vector2(0.5, 0.5)}
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        BackgroundTransparency={1}
        BorderColor3={Color3.fromRGB(0, 0, 0)}
        BorderSizePixel={0}
        Position={props.Position || UDim2.fromScale(0.0821, 0.48)}
        Size={props.Size || UDim2.fromScale(0.0533, 0.646)}
    />
}

markPureComponent(LogoImageComponent)