import { Commit } from "vuex"

export interface User {
    _id: string
    firstName: string
    lastName: string
    phoneNo?: string
}

export interface FormValidation {
    isSubmited: boolean
    firstName: {
        isEmpty: boolean
    }
    lastName: {
        isEmpty: boolean
    }
    phoneNo: {
        isEmpty: boolean
        isInvalid: boolean
    }
}

export interface State {
    users: User[]
    userForm: User
    isUserManageDialogOpen: boolean
    isManageForAdd: boolean
    formValidation: FormValidation
}

export enum MutationTypes {
    SET_USERS = "SET_USERS",
    ADD_USER = "ADD_USER",
    UPDATE_USER = "UPDATE_USER",
    DELETE_USER = "DELETE_USER",
    SET_USER_FORM = "SET_USER_FORM",
    UPDATE_USER_FORM = "UPDATE_USER_FORM",
    UPDATE_USER_DIALOG_STATUS = "UPDATE_USER_DIALOG_STATUS"
}

export type Mutations<State> = {
    [MutationTypes.SET_USERS](state: State, payload: User[]): void
    [MutationTypes.ADD_USER](state: State): void
    [MutationTypes.UPDATE_USER](state: State): void
    [MutationTypes.DELETE_USER](state: State, userId: string): void
    [MutationTypes.SET_USER_FORM](state: State, user: User): void
    [MutationTypes.UPDATE_USER_FORM](
        state: State,
        { key, value }: { key: keyof User; value: string }
    ): void
    [MutationTypes.UPDATE_USER_DIALOG_STATUS](
        state: State,
        {
            isUserManageDialogOpen,
            isManageForAdd
        }: { isUserManageDialogOpen: boolean; isManageForAdd: boolean }
    ): void
}

export enum ActionTypes {
    getAllUser = "getAllUser",
    addUser = "addUser",
    updateUser = "updateUser",
    deleteUser = "deleteUser",
    setUserForm = "setUserForm",
    updateUserForm = "updateUserForm",
    updateUserDialogStatus = "updateUserDialogStatus"
}

export interface Actions {
    [ActionTypes.getAllUser]({ commit }: { commit: Commit }): void
    [ActionTypes.addUser]({
        commit,
        state
    }: {
        commit: Commit
        state: State
    }): void
    [ActionTypes.updateUser](
        { commit }: { commit: Commit; state: State },
        userId: string
    ): void
    [ActionTypes.deleteUser](
        { commit }: { commit: Commit },
        userId: string
    ): void
    [ActionTypes.setUserForm]({ commit }: { commit: Commit }, user: User): void
    [ActionTypes.updateUserForm](
        { commit }: { commit: Commit },
        payload: { key: keyof User; value: string }
    ): void
    [ActionTypes.updateUserDialogStatus](
        { commit }: { commit: Commit },
        {
            isUserManageDialogOpen,
            isManageForAdd
        }: { isUserManageDialogOpen: boolean; isManageForAdd: boolean }
    ): void
}

export enum GettersTypes {
    formValidation = "formValidation"
}

export type Getters = {
    [GettersTypes.formValidation](state: State): FormValidation
}
