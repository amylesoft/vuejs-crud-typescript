<template>
    <div>
        <Dialog
            header="Confirmation"
            :visible="displayConfirmation"
            :style="{ width: '350px' }"
            :modal="true"
        >
            <ConfirmationDeleteDialog
                @onCancel="onCancel"
                @onConfirm="onConfirm"
            />
        </Dialog>

        <DataTable :value="users" responsiveLayout="scroll">
            <Column field="firstName" header="First name"></Column>
            <Column field="lastName" header="Last name"></Column>
            <Column field="phoneNo" header="Phone no"></Column>
            <Column header="Action">
                <template #body="slotProps">
                    <Button
                        :data-cy="`btnEdit${slotProps.index}`"
                        icon="pi pi-pencil"
                        @click="onUserEdit(slotProps.data)"
                        class="p-button-rounded p-button-sm p-button-warning"
                    />
                    <Button
                        :data-cy="`btnDelete${slotProps.index}`"
                        icon="pi pi-trash"
                        class="
                            p-button-rounded p-button-sm p-button-danger p-ml-2
                        "
                        @click="onUserDelete(slotProps.data._id)"
                    />
                </template>
            </Column>
            <template #empty>
                <div style="text-align: center">No user found</div>
            </template>
        </DataTable>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import { mapActions, mapState } from "vuex"
import { ActionTypes, User } from "../store/modules/types"
import { ModuleTypes } from "../store/types"

export default defineComponent({
    name: "UserList",
    data() {
        return {
            displayConfirmation: false,
            tempUserIdForDelete: ""
        }
    },
    computed: mapState(ModuleTypes.USER, ["users"]),
    methods: {
        ...mapActions(ModuleTypes.USER, [
            ActionTypes.deleteUser,
            ActionTypes.updateUserDialogStatus,
            ActionTypes.setUserForm
        ]),
        onUserDelete(userId: string): void {
            this.displayConfirmation = true
            this.tempUserIdForDelete = userId
        },
        onCancel() {
            this.displayConfirmation = false
        },
        onConfirm() {
            this.displayConfirmation = false
            this.deleteUser(this.tempUserIdForDelete)
        },
        onUserEdit(user: User) {
            this.setUserForm(user)
            this.updateUserDialogStatus({
                isUserManageDialogOpen: true,
                isManageForAdd: false
            })
        }
    }
})
</script>
