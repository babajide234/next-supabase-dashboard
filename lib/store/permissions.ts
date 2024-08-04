import { create } from 'zustand'


interface PermissionsState {
    permissions: any;
}

export const usePermissionsStore = create<PermissionsState>()((set) => ({
    permissions: null
}))