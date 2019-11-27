const searchInput = require('./search_input')
const searchContainer = require('./search_list')
const companyDetail = require('./company_detail')
const multipleSelect = require('./multiple_select')
const massMarkers = require('./mass_markers')
const backButton = require('./back_to_button')

module.exports = [
  ...searchInput,
  massMarkers,
  searchContainer,
  companyDetail,
  multipleSelect,
  backButton,
]
