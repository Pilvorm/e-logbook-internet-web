import { useState } from 'react'
import AutoComplete from 'src/@core/components/autocomplete'

const AutoCompleteDefaultSuggestions = () => {
  const [suggestions] = useState([
    {
      title: 'React.js'
    },
    {
      title: 'Angular.js'
    },
    {
      title: 'Javascript'
    },
    {
      title: 'Vue.js'
    },
    {
      title: 'HTML'
    },
    {
      title: 'CSS'
    },
    {
      title: 'SCSS'
    },
    {
      title: 'PHP'
    },
    {
      title: 'Laravel'
    }
  ])

  return (
    <AutoComplete
      suggestions={suggestions}
      className='form-control'
      filterKey='title'
      suggestionLimit={4}
      defaultSuggestions={true}
      placeholder="Type 'a'"
    />
  )
}
export default AutoCompleteDefaultSuggestions
