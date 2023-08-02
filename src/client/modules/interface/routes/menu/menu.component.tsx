import { Spring } from "@rbxts/flipper";
import { useMotor } from "@rbxts/pretty-roact-hooks";
import Roact, { Element } from "@rbxts/roact";
import { useSelector } from "@rbxts/roact-reflex";
import { PrimaryBodyBox } from "../../components/menu/root/body.component";
import { PrimaryHeaderBox } from "../../components/menu/root/header.component";
import { ButtonListHolder } from "../../components/menu/root/list.component";
import { LogoImageComponent } from "../../components/menu/root/logo.component";
import { RootBackgroundFrame } from "../../components/menu/root/root.component";
import { HeaderTextLabel, SecondaryTextLabel } from "../../components/menu/root/text.component";
import { VignetteViewShading } from "../../components/menu/root/view.component";
import { PrimaryBackgroundFrame } from "../../components/universal/frames/primary.background.component";
import { PrimaryShadowComponent } from "../../components/universal/frames/shadow.component";
import { DefaultLayoutOrder } from "../../components/universal/vlayout.component";
import { MenuPageContainer } from "./menu.page";
import { selectMenuVisibility } from "./menu.selectors";
import { InventoryPageMenu } from "./inventory/inventory.component";
import { HeaderButtonLabel } from "../../components/menu/root/button.component";

export function MenuHeaderComponent() : Element {
    return <PrimaryHeaderBox>
        <HeaderTextLabel/>
        <SecondaryTextLabel />

        <ButtonListHolder>
            {/* {MenuPages.map((page: MenuPageButton) => {
                return page.button();
            })} */}
            <HeaderButtonLabel icon="rbxassetid://7108861158" name="Inventory"/>
        </ButtonListHolder>

        <LogoImageComponent/>
        <PrimaryShadowComponent />
    </ PrimaryHeaderBox>
};

export function Menu() : Element {
    const isMenuVisible : boolean = useSelector(selectMenuVisibility);
    
    // Handle Menu Visibility
    const [ transparency, setTransparency ] = useMotor(0);
    setTransparency(new Spring((isMenuVisible && 1) || 0))

    // Draw the Menu
    return (
        <RootBackgroundFrame transparency={transparency}>
            <PrimaryBackgroundFrame BackgroundTransparency={1}>
                <DefaultLayoutOrder />
                <MenuHeaderComponent />

                <PrimaryBodyBox>
                    
                    {/* Menu Pages */}
                    <MenuPageContainer id="inventory">
                        <InventoryPageMenu />
                    </MenuPageContainer>

                </PrimaryBodyBox>
            </PrimaryBackgroundFrame>
            <VignetteViewShading ImageTransparency={0.76} />
        </RootBackgroundFrame>
    )
}