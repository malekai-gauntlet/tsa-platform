# State Management

## Local State

- Use useState for component-level state
- Implement useReducer for complex state
- Use useContext for shared state
- Implement state initialization

## Global State

- Use Redux Toolkit for global state
- Use createSlice to define state, reducers, and actions together
- Avoid using createReducer and createAction unless necessary
- Normalize state structure to avoid deeply nested data
- Use selectors to encapsulate state access
- Avoid large, all-encompassing slices; separate concerns by feature
