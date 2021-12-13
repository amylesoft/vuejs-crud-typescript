import Vuex, { Store } from "vuex"
import _ from "lodash"
import {
    ActionTypes,
    GettersTypes,
    State,
    User
} from "../../../src/store/modules/types"
import { userStore } from "../../../src/store/modules/user"
import { ModuleTypes, RootState } from "../../../src/store/types"

const mockUser = {
    _id: "1",
    firstName: "Jay",
    lastName: "Khant",
    phoneNo: "7567676230"
}

jest.mock("../../../src/service/UserService", () => {
    return jest.fn().mockImplementation(() => {
        return {
            findAll: jest.fn().mockImplementation((): Promise<User[]> => {
                return Promise.resolve([mockUser])
            }),
            create: jest.fn().mockImplementation((): Promise<User> => {
                return Promise.resolve(mockUser)
            }),
            update: jest.fn().mockImplementation((): Promise<User> => {
                return Promise.resolve(mockUser)
            }),
            delete: jest.fn().mockImplementation((): Promise<User> => {
                return Promise.resolve(mockUser)
            })
        }
    })
})

describe("store/user", () => {
    let store: Store<RootState>
    let state: State

    beforeEach(() => {
        ;(userStore.state as State).users = [mockUser]
        store = new Vuex.Store({
            modules: {
                user: userStore
            }
        })
        state = store.state.user as State
    })

    it("should getAllUser", async () => {
        await store.dispatch(`${ModuleTypes.USER}/${ActionTypes.getAllUser}`)
        expect(state.users).toStrictEqual([mockUser])
    })

    it("should addUser", async () => {
        const user = _.cloneDeep(mockUser)
        user.firstName = "Aidan"
        user.lastName = "Butler"
        user.phoneNo = "7567676230"
        await store.dispatch(
            `${ModuleTypes.USER}/${ActionTypes.setUserForm}`,
            user
        )
        await store.dispatch(`${ModuleTypes.USER}/${ActionTypes.addUser}`, {
            mockUser
        })
        expect(state.users).toStrictEqual([mockUser, user])
    })

    it("should updateUser", async () => {
        const user = _.cloneDeep(mockUser)
        user.firstName = "John"
        user.lastName = "Deo"
        user.phoneNo = "7567676230"
        await store.dispatch(
            `${ModuleTypes.USER}/${ActionTypes.setUserForm}`,
            user
        )
        await store.dispatch(`${ModuleTypes.USER}/${ActionTypes.updateUser}`)
        expect(state.users).toStrictEqual([user])
    })

    it("should deleteUser", async () => {
        await store.dispatch(
            `${ModuleTypes.USER}/${ActionTypes.deleteUser}`,
            mockUser._id
        )
        expect(state.users).toStrictEqual([])
    })

    it("should update user form", async () => {
        const firstName = "John"
        await store.dispatch(
            `${ModuleTypes.USER}/${ActionTypes.updateUserForm}`,
            { key: "firstName", value: firstName }
        )
        const lastName = "Deo"
        await store.dispatch(
            `${ModuleTypes.USER}/${ActionTypes.updateUserForm}`,
            { key: "lastName", value: lastName }
        )
        const phoneNo = "7567676230"
        await store.dispatch(
            `${ModuleTypes.USER}/${ActionTypes.updateUserForm}`,
            { key: "phoneNo", value: phoneNo }
        )
        expect(state.userForm.firstName).toStrictEqual(firstName)
        expect(state.userForm.lastName).toStrictEqual(lastName)
        expect(state.userForm.phoneNo).toStrictEqual(phoneNo)
    })

    it("should update user dialog status", async () => {
        await store.dispatch(
            `${ModuleTypes.USER}/${ActionTypes.updateUserDialogStatus}`,
            { isUserManageDialogOpen: true, isManageForAdd: true }
        )
        expect(state.isManageForAdd).toEqual(true)
        expect(state.isUserManageDialogOpen).toEqual(true)

        await store.dispatch(
            `${ModuleTypes.USER}/${ActionTypes.updateUserDialogStatus}`,
            { isUserManageDialogOpen: false, isManageForAdd: false }
        )
        expect(state.isManageForAdd).toEqual(false)
        expect(state.isUserManageDialogOpen).toEqual(false)
    })

    it("should throw error for empty first name", async () => {
        const firstName = ""
        await store.dispatch(
            `${ModuleTypes.USER}/${ActionTypes.updateUserForm}`,
            { key: "firstName", value: firstName }
        )
        const formValidation =
            store.getters[`${ModuleTypes.USER}/${GettersTypes.formValidation}`]
        expect(formValidation.firstName.isEmpty).toEqual(true)
    })

    it("should throw error for empty last name", async () => {
        const lastName = ""
        await store.dispatch(
            `${ModuleTypes.USER}/${ActionTypes.updateUserForm}`,
            { key: "lastName", value: lastName }
        )
        const formValidation =
            store.getters[`${ModuleTypes.USER}/${GettersTypes.formValidation}`]
        expect(formValidation.lastName.isEmpty).toEqual(true)
    })

    it("should throw error for empty phone no", async () => {
        const phoneNo = ""
        await store.dispatch(
            `${ModuleTypes.USER}/${ActionTypes.updateUserForm}`,
            { key: "phoneNo", value: phoneNo }
        )
        const formValidation =
            store.getters[`${ModuleTypes.USER}/${GettersTypes.formValidation}`]
        expect(formValidation.phoneNo.isEmpty).toEqual(true)
    })

    it("should throw error for invalid phone no", async () => {
        const phoneNo = "123456" // required 10 length
        await store.dispatch(
            `${ModuleTypes.USER}/${ActionTypes.updateUserForm}`,
            { key: "phoneNo", value: phoneNo }
        )
        const formValidation =
            store.getters[`${ModuleTypes.USER}/${GettersTypes.formValidation}`]
        expect(formValidation.phoneNo.isInvalid).toEqual(true)
    })
})
