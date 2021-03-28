import { Store, createStore, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'

export interface State {
    user: string;
}

export const key: InjectionKey<Store<State>> = Symbol()

// Create a new store instance.
export const store = createStore<State>({
    state: {
        user: ""
    },
    getters: {
        getUser: state => {
            return state.user;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    }
});

export function useStore() {
    return baseUseStore(key)
}
