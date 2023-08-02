import Roact, { Element } from "@rbxts/roact"
import { IOffset } from "../../../globals"
import { markPureComponent } from "@rbxts/roact-hooked"

interface FrameProps extends Roact.JsxInstance<Frame> {
    id?: string,
    Offset?: IOffset
}

export function PrimaryHolderFrame(props : FrameProps) : Element {
    const children = props[Roact.Children]

    const offset = props.Offset
    const posOffset = (offset && UDim2.fromScale(offset?.position.x, offset?.position.y))
    const anchorOffset = (offset && new Vector2(offset.anchor.x, offset.anchor.y))

    return <frame
        AnchorPoint={anchorOffset || new Vector2(0.5, 0.5)}
        BackgroundColor3={Color3.fromRGB(0, 0, 0)}
        BackgroundTransparency={1}
        BorderColor3={Color3.fromRGB(0, 0, 0)}
        BorderSizePixel={0}
        Position={posOffset || UDim2.fromScale(0.5, 0.5)}
        Size={props.Size || new UDim2(1, 0, 1, 0)}
        Key={props.id || "holder"}
        Visible={props.Visible || true}
        Event={props.Event || {}}
    >
    {children}
    </frame>
};

markPureComponent(PrimaryHolderFrame);