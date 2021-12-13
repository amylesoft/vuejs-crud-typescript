import { mount, VueWrapper } from "@vue/test-utils"
import UserList from "@/components/UserList.vue"
import { createStore, Store } from "vuex"
import { Components, Plugins } from "../primevue.stubs"
import { RootState } from "../../../src/store/types"
import { State } from "../../../src/store/modules/types"

const mockState = {
    users: [
        {
            _id: "1",
            firstName: "Jay",
            lastName: "Khant",
            phoneNo: "7567676230"
        }
    ]
}

const mockActions = {
    setUserForm: jest.fn(),
    updateUserDialogStatus: jest.fn()
}

const mockStore = createStore({
    modules: {
        user: {
            namespaced: true,
            state: mockState,
            actions: mockActions
        }
    }
}) as Store<RootState>

function bootstrapWrapper() {
    return mount(UserList, {
        global: {
            plugins: [...Plugins, mockStore],
            components: { ...Components }
        }
    })
}

describe("components/UserList.vue", () => {
    let wrapper: VueWrapper<UserList>
    const state = mockStore.state.user as State

    beforeEach(() => {
        wrapper = bootstrapWrapper()
    })

    it("renders", () => {
        expect(wrapper.exists()).toBe(true)
    })

    it("should display firstName as column one", () => {
        expect(wrapper.find("tr").findAll("th")[0].text()).toBe("First name")
    })

    it("should display lastName as column two", () => {
        expect(wrapper.find("tr").findAll("th")[1].text()).toBe("Last name")
    })

    it("should display phoneNo as column three", () => {
        expect(wrapper.find("tr").findAll("th")[2].text()).toBe("Phone no")
    })

    it("should display firstName in first row", () => {
        expect(wrapper.findAll("tr")[1].findAll("td")[0].text()).toBe(
            mockState.users[0].firstName
        )
    })

    it("should display lastName in first row", () => {
        expect(wrapper.findAll("tr")[1].findAll("td")[1].text()).toBe(
            mockState.users[0].lastName
        )
    })

    it("should display phoneNO in first row", () => {
        expect(wrapper.findAll("tr")[1].findAll("td")[2].text()).toBe(
            mockState.users[0].phoneNo
        )
    })

    it("should work edit user button in first row", async () => {
        await wrapper
            .findAll("tr")[1]
            .findAll("td")[3]
            .findAll("button")[0]
            .trigger("click")
        expect(mockActions.setUserForm).toBeCalled()
        expect(mockActions.updateUserDialogStatus).toBeCalled()
    })

    it("should work delete user button in first row", async () => {
        await wrapper
            .findAll("tr")[1]
            .findAll("td")[3]
            .findAll("button")[1]
            .trigger("click")
        expect(wrapper.vm.tempUserIdForDelete).toBe(state.users[0]._id)
        expect(wrapper.vm.displayConfirmation).toBe(true)
    })
})
