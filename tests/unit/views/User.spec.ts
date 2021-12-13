import { mount, VueWrapper } from "@vue/test-utils"
import User from "@/views/User.vue"
import { Components, Plugins } from "../primevue.stubs"
import { createStore, Store } from "vuex"
import { RootState } from "../../../src/store/types"

describe("components/User.vue", () => {
    let wrapper: VueWrapper<User>

    const mockActions = {
        getAllUser: jest.fn(),
        updateUserDialogStatus: jest.fn()
    }

    const mockStore = createStore({
        modules: {
            user: {
                namespaced: true,
                actions: mockActions
            }
        }
    }) as Store<RootState>

    function bootstrapWrapper() {
        return mount(User, {
            global: {
                plugins: [...Plugins, mockStore],
                components: { ...Components }
            }
        })
    }

    beforeEach(() => {
        wrapper = bootstrapWrapper()
    })

    it("renders", () => {
        expect(wrapper.exists()).toBe(true)
    })

    it("should load all user", () => {
        expect(mockActions.getAllUser).toBeCalled()
    })
    it("should open add user dialog", async () => {
        await wrapper.find("button").trigger("click")
        expect(mockActions.updateUserDialogStatus).toBeCalled()
    })
})
