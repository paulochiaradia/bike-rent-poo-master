import { Bike } from "../../bike";
import { BikeRepo } from "../../ports/bike-repo";


export class PrismaBikeRepo implements BikeRepo {
    find(id: string): Promise<Bike> {
        throw new Error("Method not implemented.");
    }
    add(bike: Bike): Promise<string> {
        throw new Error("Method not implemented.");
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