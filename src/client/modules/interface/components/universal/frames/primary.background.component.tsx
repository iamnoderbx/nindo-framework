import Roact, { Element } from "@rbxts/roact"
import { IOffset, InterfaceGlobals } from "../../../globals"
import { markPureComponent } from "@rbxts/roact-hooked"

interface CanvasGroupProps extends Roact.JsxInstance<CanvasGroup> {
    Offset?: IOffset
}

export function PrimaryBackgroundFrame(props : CanvasGroupProps) : Element {
    const children = props[Roact.Children]

    const offset = props.Offset
    const posOffset = (offset && UDim2.fromScale(offset?.position.x, offset?.position.y))
    const anchorOffset = (offset && new Vector2(offset.anchor.x, offset.anchor.y))

    return (
        <canvasgroup 
            Size={props.Size || new UDim2(1, 0, 1, 0)}
            AnchorPoint={anchorOffset || props.AnchorPoint || InterfaceGlobals.CenterPoint}

            BackgroundTransparency={props.BackgroundTransparency || InterfaceGlobals.Frame.Primary.BackgroundTransparency}
            BackgroundColor3={props.BackgroundColor3 || InterfaceGlobals.Universal.Primary.BackgroundColor}
            
            GroupTransparency={props.GroupTransparency || 0}

            BorderColor3={Color3.fromRGB(0, 0, 0)}
            BorderSizePixel={0}
            Position={ posOffset || UDim2.fromScale(0.5, 0.5)}
            Visible={(props.Visible === undefined && true) || props.Visible}
            LayoutOrder={props.LayoutOrder}
        >
        {children}
        </canvasgroup>
    )
}

markPureComponent(PrimaryBackgroundFrame)
