import { lerp } from "@rbxts/pretty-roact-hooks"
import Roact, { Element } from "@rbxts/roact"
import { markPureComponent } from "@rbxts/roact-hooked"
import { updateLightingEffects } from "client/modules/effects/menu/lighting.effects"
import { InterfaceGlobals } from "client/modules/interface/globals"

interface CanvasGroupProps extends Roact.JsxInstance<CanvasGroup> {
    transparency: Roact.Binding<number>
}

export function RootBackgroundFrame(props : CanvasGroupProps) : Element {
    const children = props[Roact.Children]

    return (
        <canvasgroup 
            Size={props.Size || new UDim2(1, 0, 1, 0)}
            AnchorPoint={props.AnchorPoint || InterfaceGlobals.CenterPoint}

            BackgroundTransparency={0.15}
            BackgroundColor3={props.BackgroundColor3 || Color3.fromRGB(0, 0, 0)}
            
            GroupTransparency = {props.transparency.map((t) => {
                updateLightingEffects(t);
                return lerp(1, 0, t)
            })}

            BorderColor3={Color3.fromRGB(0, 0, 0)}
            BorderSizePixel={0}
            Position={UDim2.fromScale(0.5, 0.5)}
            Visible={true}
        >
        {children}
        </canvasgroup>
    )
}

markPureComponent(RootBackgroundFrame)