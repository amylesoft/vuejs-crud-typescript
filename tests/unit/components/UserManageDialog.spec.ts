import { mount, VueWrapper } from "@vue/test-utils"
import UserManageDialog from "@/components/UserManageDialog.vue"
import { Components, Plugins } from "../primevue.stubs"
import { createStore, Store } from "vuex"
import { userStore } from "../../../src/store/modules/user"
import { RootState } from "../../../src/store/types"

const mockState = {
    userForm: {
        _id: "1",
        firstName: "Jay",
        lastName: "Khant",
        phoneNo: "7567676230"
    },
    formValidation: {
        isSubmited: false,
        firstName: {
            isEmpty: false
        },
        lastName: {
            isEmpty: false
        },
        phoneNo: {
            isEmpty: false,
            isInvalid: false
        }
    },
    isUserManageDialogOpen: false,
    isManageForAdd: false
}

const mockActions = {
    addUser: jest.fn(),
    updateUser: jest.fn()
}

const mockStore = createStore({
    modules: {
        user: {
            namespaced: true,
            state: mockState,
            actions: mockActions,
            getters: userStore.getters
        }
    }
}) as Store<RootState>

function bootstrapWrapper() {
    return mount(UserManageDialog, {
        global: {
            plugins: [...Plugins, mockStore],
            components: { ...Components }
        }
    })
}

describe("components/UserManageDialog.vue", () => {
    let wrapper: VueWrapper<UserManageDialog>

    beforeEach(() => {
        wrapper = bootstrapWrapper()
    })

    it("renders", () => {
        expect(wrapper.exists()).toBe(true)
    })

    it("should set firstName in input", async () => {
        const input = wrapper.findAll("input")[0]
        expect(input.element.value).toBe(mockState.userForm.firstName)
    })

    it("should set lastName in input", async () => {
        const input = wrapper.findAll("input")[1]
        expect(input.element.value).toBe(mockState.userForm.lastName)
    })

    it("should set phoneNo in input", async () => {
        const input = wrapper.findAll("input")[2]
        expect(input.element.value).toBe(mockState.userForm.phoneNo)
    })

    it("should set dialog submit button text to Create", async () => {
        mockState.isManageForAdd = true
        wrapper = bootstrapWrapper()

        const button = wrapper.findAll("button")[1]
        expect(button.text()).toBe("Create")
    })

    it("should set dialog submit button text to Update", async () => {
        mockState.isManageForAdd = false
        wrapper = bootstrapWrapper()

        const button = wrapper.findAll("button")[1]
        expect(button.text()).toBe("Update")
    })

    it("should call create function on create button click", async () => {
        mockState.isManageForAdd = true
        wrapper = bootstrapWrapper()

        await wrapper.findAll("button")[1].trigger("click")
        expect(mockActions.addUser).toBeCalled()
    })

    it("should call update function on update button click", async () => {
        mockState.isManageForAdd = false
        wrapper = bootstrapWrapper()

        await wrapper.findAll("button")[1].trigger("click")
        expect(mockActions.updateUser).toBeCalled()
    })
})
