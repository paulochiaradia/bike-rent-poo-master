import { Bike } from "../../bike";
import { BikeRepo } from "../../ports/bike-repo";
import prisma from "./db";


export class PrismaBikeRepo implements BikeRepo {
    async find(id: string): Promise<Bike> {
        return await prisma.bike.findFirst({
            where: { id: id }
        })
    }

    async add(bike: Bike): Promise<string> {
        const addedBike = await prisma.bike.create({
            data: {
                ...bike,
                imageUrls: {
                    create: bike.imageUrls.map((url) => ({ url: url }))
                },
                location: {
                    create: bike.location
                }
            }
        })
        return addedBike.id
    }
    async remove(id: string): Promise<void> {
        await prisma.Img_Urls.deleteMany({
            where: { bikeId: id },
        });
        await prisma.Location.deleteMany({
            where: { bikeId: id },
        });
        await prisma.bike.delete({
            where: { id },
        });
    }

    async update(id: string, bike: Bike): Promise<void> {
        await prisma.bike.update({
            where: { id: id },
            data: {
                ...bike,
                imageUrls: {
                    create: bike.imageUrls.map((url) => ({ url: url }))
                },
                location: {
                    create: bike.location
                }
            }
        })
    }
    async list(): Promise<Bike[]> {
        return await prisma.bike.findMany()
    }
}