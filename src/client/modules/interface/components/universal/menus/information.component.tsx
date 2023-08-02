import Roact, { Element } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";

interface FrameProps extends Roact.JsxInstance<Frame> {
    Header: string,
    Body: string,
}

export function TextInformationLabel(props : FrameProps) : Element {
    return <frame
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        BackgroundTransparency={1}
        BorderColor3={Color3.fromRGB(0, 0, 0)}
        BorderSizePixel={0}
        Size={props.Size || UDim2.fromScale(0.5, 1)}
    >
        <textlabel
            FontFace={new Font(
                "rbxasset://fonts/families/SourceSansPro.json",
                Enum.FontWeight.SemiBold,
                Enum.FontStyle.Normal
            )}
            Text={props.Header}
            TextColor3={Color3.fromRGB(157, 157, 157)}
            TextScaled={true}
            TextSize={14}
            TextTransparency={0.25}
            TextWrapped={true}
            TextXAlignment={Enum.TextXAlignment.Left}
            BackgroundColor3={Color3.fromRGB(255, 255, 255)}
            BackgroundTransparency={1}
            BorderColor3={Color3.fromRGB(0, 0, 0)}
            BorderSizePixel={0}
            Position={UDim2.fromScale(0.0549, 0.136)}
            Size={UDim2.fromScale(0.883, 0.241)}
        />

        <textlabel
            FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json")}
            Text={props.Body}
            TextColor3={Color3.fromRGB(157, 157, 157)}
            TextScaled={true}
            TextSize={14}
            TextTransparency={0.5}
            TextWrapped={true}
            TextXAlignment={Enum.TextXAlignment.Left}
            BackgroundColor3={Color3.fromRGB(255, 255, 255)}
            BackgroundTransparency={1}
            BorderColor3={Color3.fromRGB(0, 0, 0)}
            BorderSizePixel={0}
            Position={UDim2.fromScale(0.0549, 0.498)}
            Size={UDim2.fromScale(0.883, 0.241)}
        />
    </frame>
};

markPureComponent(TextInformationLabel);