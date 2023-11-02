import { Bike } from "../../bike";
import { BikeRepo } from "../../ports/bike-repo";
import prisma from "./db";


export class PrismaBikeRepo implements BikeRepo {
    async find(id: string): Promise<Bike> {
        return await prisma.user.findFirst({
            where: { id: id }
        })
    }
    async add(bike: Bike): Promise<string> {
        const addedBike = await prisma.bike.create({
            data: { ...bike }
        })
        return addedBike.id
    }
    remove(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(id: string, bike: Bike): Promise<void> {
        throw new Error("Method not idasdasmplemented.");
    }
    list(): Promise<Bike[]> {
        throw new Error("Method not implemented.");
    }
}