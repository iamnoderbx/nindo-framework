import { Producer, createProducer } from "@rbxts/reflex";
import Roact from "@rbxts/roact";
import { BaseInterface, IBaseInterface } from "../../classes/BaseInterface";
import { selectMenuVisibility } from "./menu.selectors";
import { UserInputService } from "@rbxts/services";


export interface MenuState {
	readonly visible: boolean;
    readonly page: string;
}

const initialState: MenuState = {
	visible: false,
    page: 'inventory',
}

export const producer = createProducer(initialState, {
	setMenuVisibility: (state : MenuState, visible : boolean) => ({
        ...state, visible,
    }),

    setMenuPage: (state : MenuState, page : string) => ({
        ...state, string,
    })
});

export class MenuController extends BaseInterface implements IBaseInterface {
    public name : string = "menu";

    constructor(public element : () => Roact.Element) {
        super(producer)
    };

    onRootProducerCreated(menuProducer : Producer) {
        UserInputService.InputBegan.Connect((input : InputObject) => {
            if(input.KeyCode === Enum.KeyCode.H) {
                menuProducer.setHealthState({max: 100, value: 50})
                return
            };

            const isMenuKeyCode = input.KeyCode === Enum.KeyCode.Tab
            if(!isMenuKeyCode) return;
            
            menuProducer.setMenuVisibility(!selectMenuVisibility(menuProducer.getState()))
        });
    };
};