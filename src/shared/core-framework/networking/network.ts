import { HttpService, ReplicatedStorage } from "@rbxts/services"
import { Initalize } from "../core";

let RemoteEvent : RemoteEvent;

class Network {
    uuid: string;
    
    constructor() {
        this.uuid = HttpService.GenerateGUID(false);
    }

    createRemoteEvent<E>() {
        return this;
	}
}

class NetworkHandler implements Initalize {
    Initalize(): void {
        RemoteEvent = new Instance("RemoteEvent");
        RemoteEvent.Parent = ReplicatedStorage;
    }
};

export default Network