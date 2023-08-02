import Roact, { Element } from "@rbxts/roact";
import { useSelector } from "@rbxts/roact-reflex";
import { selectMenuPage } from "./menu.selectors";
import { PrimaryHolderFrame } from "../../components/universal/frames/primary.holder.component";

interface FrameProps extends Roact.JsxInstance<Frame> {
    id?: string,
}

export function MenuPageContainer(props: FrameProps) : Element {
    const menuPage : string = useSelector(selectMenuPage);
    const children = props[Roact.Children]

    return <PrimaryHolderFrame Visible={menuPage === props.id}>
        {children}
    </PrimaryHolderFrame>
};