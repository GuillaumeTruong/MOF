export class Aircraft {
    id: number;
    name: String;
    family: String;
    state: AircraftState;
    woInProgress: boolean;
    online: boolean;
}

export enum AircraftState {
    ReadyForMaintenance,
    Cruise,
    Parking,
    Arrival
}
