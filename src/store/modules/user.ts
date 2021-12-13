import _ from "lodash"
import { ActionTree, GetterTree, Module, MutationTree } from "vuex"
import { RootState } from "../types"
import {
    Actions,
    ActionTypes,
    Getters,
    GettersTypes,
    Mutations,
    MutationTypes,
    State,
    User
} from "./types"
import UserService from "../../service/UserService"
import { ErrorWrapper } from "../../service/util"

const userService = new UserService()

const state: State = {
    users: [],
    userForm: {
        _id: "",
        firstName: "",
        lastName: "",
        phoneNo: ""
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

const mutations: MutationTree<State> & Mutations<State> = {
    [MutationTypes.SET_USERS](state: State, users: User[]) {
        state.users = users
    },
    [MutationTypes.ADD_USER](state) {
        state.users.push(state.userForm)
        state.isUserManageDialogOpen = false
    },
    [MutationTypes.UPDATE_USER](state) {
        const index = state.users.findIndex(
            (user: User) => user._id == state.userForm._id
        )
        state.users[index] = state.userForm
        state.isUserManageDialogOpen = false
    },
    [MutationTypes.DELETE_USER](state, userId) {
        const index = state.users.findIndex((user: User) => user._id == userId)
        state.users.splice(index, 1)
    },

    //for user form
    [MutationTypes.SET_USER_FORM](state, user) {
        state.isManageForAdd = false
        state.userForm = _.cloneDeep(user)
    },
    [MutationTypes.UPDATE_USER_FORM](state, { key, value }) {
        state.userForm[key] = value
    },
    [MutationTypes.UPDATE_USER_DIALOG_STATUS](
        state,
        {
            isUserManageDialogOpen,
            isManageForAdd
        }: { isUserManageDialogOpen: boolean; isManageForAdd: boolean }
    ) {
        if (isManageForAdd)
            state.userForm = {
                _id: "",
                firstName: "",
                lastName: "",
                phoneNo: ""
            }
        state.formValidation.isSubmited = false
        state.isUserManageDialogOpen = isUserManageDialogOpen
        state.isManageForAdd = isManageForAdd
    }
}

const actions: ActionTree<State, RootState> & Actions = {
    [ActionTypes.getAllUser]({ commit }) {
        userService
            .findAll()
            .then((users) => {
                commit(MutationTypes.SET_USERS, users)
            })
            .catch((error: ErrorWrapper) => {
                console.log("res", error.statusCode, error.message)
            })
    },
    [ActionTypes.addUser]({ commit, state }) {
        state.formValidation.isSubmited = true
        if (
            !state.formValidation.firstName.isEmpty &&
            !state.formValidation.lastName.isEmpty &&
            !state.formValidation.phoneNo.isEmpty &&
            !state.formValidation.phoneNo.isInvalid
        )
            userService
                .create({
                    firstName: state.userForm.firstName,
                    lastName: state.userForm.lastName,
                    phoneNo: state.userForm.phoneNo
                })
                .then((user) => {
                    commit(MutationTypes.UPDATE_USER_FORM, {
                        key: "_id",
                        value: user._id
                    })
                    commit(MutationTypes.ADD_USER)
                })
                .catch((err) => {
                    console.log("res", err)
                })
    },
    [ActionTypes.updateUser]({ commit, state }) {
        state.formValidation.isSubmited = true
        if (
            !state.formValidation.firstName.isEmpty &&
            !state.formValidation.lastName.isEmpty &&
            !state.formValidation.phoneNo.isEmpty &&
            !state.formValidation.phoneNo.isInvalid
        )
            userService
                .update(state.userForm._id, state.userForm)
                .then(() => {
                    commit(MutationTypes.UPDATE_USER)
                })
                .catch((err) => {
                    console.log("res", err)
                })
    },
    [ActionTypes.deleteUser]({ commit }, userId: string) {
        userService
            .delete(userId)
            .then((user) => {
                commit(MutationTypes.DELETE_USER, user._id)
            })
            .catch((err) => {
                console.log("res", err)
            })
    },

    // for user form
    [ActionTypes.setUserForm]({ commit }, user) {
        commit(MutationTypes.SET_USER_FORM, user)
    },
    [ActionTypes.updateUserForm]({ commit }, payload) {
        commit(MutationTypes.UPDATE_USER_FORM, payload)
    },
    [ActionTypes.updateUserDialogStatus](
        { commit },
        payload: { isUserManageDialogOpen: boolean; isManageForAdd: boolean }
    ) {
        commit(MutationTypes.UPDATE_USER_DIALOG_STATUS, payload)
    }
}

export const getters: GetterTree<State, RootState> & Getters = {
    [GettersTypes.formValidation]: (state) => {
        state.formValidation.firstName.isEmpty = state.userForm.firstName == ""
        state.formValidation.lastName.isEmpty = state.userForm.lastName == ""
        state.formValidation.phoneNo.isEmpty = state.userForm.phoneNo == ""
        state.formValidation.phoneNo.isInvalid =
            state.userForm.phoneNo?.length != 10 ||
            !/^\d+$/.test(state.userForm.phoneNo ? state.userForm.phoneNo : "")

        return state.formValidation
    }
}

export const userStore: Module<State, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
