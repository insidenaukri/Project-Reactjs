import { useReducer } from 'react'
import { createContext, useContext, useContextSelector } from 'use-context-selector'

const ACTION_PREFIX = 'user/'

export const UserActions = {
  USER_SET: `${ACTION_PREFIX}USER_SET`,
}

const initialState = {
  id: '',
  email: '',
  organisationId: '',
}

const UserContext = createContext()

function userReducer(state, { type, payload: { id, email, organisationId } }) {
  switch (type) {
    case UserActions.USER_SET: {
      return {
        id,
        email,
        organisationId,
      }
    }
    default: {
      throw new Error(`Action type unknown: ${type}`)
    }
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState)
  const value = [state, dispatch]

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  console.log(context)
  if (!context) {
    throw new Error(`${useUser.name} requires ${UserContext.name}!`)
  }
  return context
}

// COMMANDS
export const updateUser = (dispatch, id, email, organisationId) => {
  dispatch({ type: UserActions.USER_SET, payload: { id, email, organisationId } })
}

// SELECTORS
export const selectUser = () => useContextSelector(UserContext, (c) => c[0])
export const selectUserId = () => useContextSelector(UserContext, (c) => c[0].id)
export const selectUserEmail = () => useContextSelector(UserContext, (c) => c[0].email)
export const selectOrganisationId = () => useContextSelector(UserContext, (c) => c[0].organisationId)
