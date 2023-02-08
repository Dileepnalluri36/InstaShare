import React from 'react'

const CartContext = React.createContext({
  searchText: '',
  isSearchButtonClicked: false,
  setLoading: false,
  isFailure: false,
  resetFailure: () => {},
  setFailure: () => {},
  setSearchButton: () => {},
  updateLoading: () => {},
  upDateSearchText: () => {},
  resetSearchButton: () => {},
  postsData: [],
  setPostsData: () => {},
})

export default CartContext
