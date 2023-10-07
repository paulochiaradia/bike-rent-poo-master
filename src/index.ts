import { FakeBikeRepo } from "../test/doubles/fake-bike-repo";
import { FakeRentRepo } from "../test/doubles/fake-rent-repo";
import { FakeUserRepo } from "../test/doubles/fake-user-repo";
import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import sinon from 'sinon'

let userRepo: FakeUserRepo
let bikeRepo: FakeBikeRepo
let rentRepo: FakeRentRepo

async function main() {
    const clock = sinon.useFakeTimers();
    const app = new App(userRepo, bikeRepo, rentRepo)
    const user1 = new User('Jose', 'jose@mail.com', '1234')
    await app.registerUser(user1)
    const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
    app.registerBike(bike)
    const rent = new Rent(bike, user1, new Date())
    rentRepo.add(rent)
    console.log(app.removeUser(user1.email))
}

main()








