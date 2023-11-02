import { Bike } from "../../../src/bike"
import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"


describe('PrismaBikeRepo', () => {
    it('should add a bike correctly', async () => {
        const bikeRepo = new PrismaBikeRepo()
        const bikeToBeAdd = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        const bikeId = await bikeRepo.add(bikeToBeAdd)
        expect(bikeId).toBeDefined()
        const bikeAdded = await bikeRepo.find(bikeToBeAdd.name)
        expect(bikeAdded.name).toEqual(bikeToBeAdd.name)
    })

})  