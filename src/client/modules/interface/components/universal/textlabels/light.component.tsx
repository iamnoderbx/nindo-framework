import Roact, { Element } from "@rbxts/roact"
import { markPureComponent } from "@rbxts/roact-hooked"

interface TextlabelProps extends Roact.JsxInstance<TextLabel> {}

export function TextlabelLight(props : TextlabelProps) : Element {
    const children = props[Roact.Children]
    return (
        <textlabel 
            Key={"textLabel1"}
            FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json")}
            Text={props.Text || "N/A"}
            TextColor3={props.TextColor3 || Color3.fromRGB(255, 255, 255)}
            TextScaled={true}
            TextTransparency={props.TextTransparency || 0}
            TextWrapped={true}
            TextXAlignment={Enum.TextXAlignment.Left}
            AnchorPoint={props.AnchorPoint || new Vector2(0.5, 0.5)}
            BackgroundColor3={Color3.fromRGB(255, 255, 255)}
            BackgroundTransparency={1}
            BorderColor3={Color3.fromRGB(0, 0, 0)}
            BorderSizePixel={0}
            Position={props.Position || UDim2.fromScale(1, 1)}
            Size={props.Size || UDim2.fromScale(1, 1)}
        >
            {children}
        </textlabel>
    )
}

markPureComponent(TextlabelLight)