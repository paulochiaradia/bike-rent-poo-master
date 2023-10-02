export class RentNotFoundError extends Error {
    public readonly name = 'RentNotFound'

    constructor() {
        super('Rent Not Found.')
    }
}