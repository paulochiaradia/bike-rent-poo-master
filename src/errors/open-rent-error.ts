export class OpenRentError extends Error {
    public readonly name = 'OpenRentError'

    constructor() {
        super('Open Rent Error.')
    }
}