import { PrismaUserRepo } from "../../../src/external/database/prisma-user-repo"
import prisma from "../../../src/external/database/db"
import { User } from "../../../src/user"

describe('PrismaUserRepo', () => {

    beforeAll(async () => {
        await prisma.user.deleteMany()
    })

    afterAll(async () => {
        await prisma.user.deleteMany()
    })

    it('should add a user correctly', async () => {
        const userRepo = new PrismaUserRepo()
        const userToBeAdd = new User('Jose', 'jose@gmail.com', '1234')
        const userId = await userRepo.add(userToBeAdd)
        expect(userId).toBeDefined()
        const userAdded = await userRepo.find(userToBeAdd.email)
        expect(userAdded.name).toEqual(userToBeAdd.name)
    })

    it('removes a user correctly', async () => {
        const userRepo = new PrismaUserRepo()
        const userToBeAdd = new User('Jose', 'jose@test.com', '1234')
        userRepo.add(userToBeAdd)
        await userRepo.remove(userToBeAdd.email)
        const removedUser = await userRepo.find(userToBeAdd.email)
        expect(removedUser).toBeNull()
    })

    it('lists all users correctly', async () => {
        const user1 = new User('user1', 'user1@mail.com', '1234')
        const user2 = new User('user2', 'user2@mail.com', '1234')
        const repo = new PrismaUserRepo()
        await repo.add(user1)
        await repo.add(user2)
        const userList = await repo.list()
        expect(userList.length).toBeGreaterThan(1)
    })
})