<template>
    <div>
        <div class="p-field p-grid p-mt-3">
            <label class="p-col-fixed" style="width: 100px">Firstname</label>
            <div class="p-col">
                <InputText
                    data-cy="inputFirstName"
                    :class="
                        formValidation.firstName.isEmpty &&
                        formValidation.isSubmited
                            ? 'p-invalid'
                            : ''
                    "
                    :modelValue="userForm.firstName"
                    @input="
                        (value) => {
                            updateUserForm({
                                key: 'firstName',
                                value: value.target.value
                            })
                        }
                    "
                    type="text"
                    placeholder="First name"
                />
                <br />
                <small
                    v-if="
                        formValidation.firstName.isEmpty &&
                        formValidation.isSubmited
                    "
                    class="p-error p-mt-6"
                    >Please enter first name</small
                >
            </div>
        </div>
        <div class="p-field p-grid">
            <label class="p-col-fixed" style="width: 100px">Lastname</label>
            <div class="p-col">
                <InputText
                    data-cy="inputMiddleName"
                    :class="
                        formValidation.lastName.isEmpty &&
                        formValidation.isSubmited
                            ? 'p-invalid'
                            : ''
                    "
                    :modelValue="userForm.lastName"
                    @input="
                        (value) => {
                            updateUserForm({
                                key: 'lastName',
                                value: value.target.value
                            })
                        }
                    "
                    type="text"
                    placeholder="Last name"
                />
                <br />
                <small
                    v-if="
                        formValidation.lastName.isEmpty &&
                        formValidation.isSubmited
                    "
                    class="p-error p-mt-6"
                    >Please enter last name</small
                >
            </div>
        </div>
        <div class="p-field p-grid">
            <label class="p-col-fixed" style="width: 100px">Phoneno</label>
            <div class="p-col">
                <InputText
                    data-cy="inputPhoneNo"
                    :class="
                        (formValidation.phoneNo.isEmpty ||
                            formValidation.phoneNo.isInvalid) &&
                        formValidation.isSubmited
                            ? 'p-invalid'
                            : ''
                    "
                    @keydown.enter="onFormSubmit"
                    :modelValue="userForm.phoneNo"
                    @input="
                        (value) => {
                            updateUserForm({
                                key: 'phoneNo',
                                value: value.target.value
                            })
                        }
                    "
                    type="text"
                    placeholder="Phone no"
                />
                <br />
                <small
                    v-if="
                        (formValidation.phoneNo.isEmpty ||
                            formValidation.phoneNo.isInvalid) &&
                        formValidation.isSubmited
                    "
                    class="p-error p-mt-6"
                    >{{
                        formValidation.phoneNo.isEmpty
                            ? "Please enter phone no"
                            : formValidation.phoneNo.isInvalid
                            ? "Invalid phone no"
                            : ""
                    }}</small
                >
            </div>
        </div>
        <div class="float-end">
            <Button
                data-cy="btnCancle"
                type="button"
                label="Cancle"
                @click.prevent="updateUserDialogStatus(false)"
            />
            <Button
                data-cy="btnSubmit"
                type="button"
                :label="isManageForAdd ? 'Create' : 'Update'"
                class="p-ml-2"
                @click.prevent="onFormSubmit"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { mapActions, mapGetters, mapState } from "vuex"
import { ActionTypes, GettersTypes } from "../store/modules/types"
import { ModuleTypes } from "../store/types"

export default defineComponent({
    name: "UserManageDialog",
    computed: {
        ...mapState(ModuleTypes.USER, ["userForm", "isManageForAdd"]),
        ...mapGetters(ModuleTypes.USER, [GettersTypes.formValidation])
    },
    methods: {
        ...mapActions(ModuleTypes.USER, [
            ActionTypes.updateUserDialogStatus,
            ActionTypes.updateUserForm,
            ActionTypes.addUser,
            ActionTypes.updateUser
        ]),
        onFormSubmit() {
            if (this.isManageForAdd) this.addUser()
            else this.updateUser()
        }
    }
})
</script>
