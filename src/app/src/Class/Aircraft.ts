export class Aircraft {
    id: number;
    name: String;
    family: String;
    state: AircraftState;
    woInProgress: Boolean;
}

export enum AircraftState {
    Flight,
    TakeOff,
    ReadyForMaintenance,
    TaxiIn
}
