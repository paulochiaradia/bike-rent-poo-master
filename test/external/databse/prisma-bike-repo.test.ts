import { Bike } from "../../../src/bike"
import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"
import prisma from "../../../src/external/database/db"

describe('PrismaBikeRepo', () => {
    const imgUrls = ["google.com", "facebook.com"]
    const location = { latitude: 1234, longitude: 1234 }

    beforeAll(async () => {
        const bikes = await prisma.bike.findMany()
        for (const bike of bikes) {
            await prisma.Img_Urls.deleteMany({})
            await prisma.Location.deleteMany({})
        }
        await prisma.bike.deleteMany({})
    }, 10000)

    it('should add a bike correctly', async () => {
        const bikeRepo = new PrismaBikeRepo()
        const bikeToBeAdd = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, imgUrls, true, location)
        const bikeId = await bikeRepo.add(bikeToBeAdd)
        expect(bikeId).toBeDefined()
        const bike = await bikeRepo.find(bikeId)
        expect(bike.name).toBe('caloi mountainbike')
    })

    it('lists all bikes correctly', async () => {
        const bikeRepo = new PrismaBikeRepo()
        const bikeToBeAdd1 = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike 1', 5, imgUrls, true, location)
        await bikeRepo.add(bikeToBeAdd1)
        const bikeToBeAdd2 = new Bike('caloi speedbike', 'speed bike',
            4321, 4321, 150.0, 'My bike 2', 4, imgUrls, true, location)
        await bikeRepo.add(bikeToBeAdd2)
        const bikeList = await bikeRepo.list()
        expect(bikeList.length).toBeGreaterThan(1)
    })

    it('should remove a bike correctly', async () => {
        const bikeRepo = new PrismaBikeRepo()
        const bikeToBeAdd = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, imgUrls, true, location)
        const bikeId = await bikeRepo.add(bikeToBeAdd)
        await bikeRepo.remove(bikeId)
        const bike = await bikeRepo.find(bikeId)
        expect(bike).toBeNull()
    })

    it('should update a bike correctly', async () => {
        const bikeRepo = new PrismaBikeRepo()
        const bikeToBeAdd = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, imgUrls, true, location)
        const bikeId = await bikeRepo.add(bikeToBeAdd)
        const bikeToBeUpdate = new Bike('caloi speedbike', 'speed bike',
            4321, 4321, 150.0, 'My bike 2', 4, imgUrls, true, location)
        await bikeRepo.update(bikeId, bikeToBeUpdate)
        const bike = await bikeRepo.find(bikeId)
        expect(bike.name).toBe('caloi speedbike')
    })
})  