export class Aircraft {
    id: number;
    name: String;
    family: String;
    state: AircraftState;
    woInProgress: boolean;
}

export enum AircraftState {
    Flight,
    TakeOff,
    ReadyForMaintenance,
    TaxiIn
}
