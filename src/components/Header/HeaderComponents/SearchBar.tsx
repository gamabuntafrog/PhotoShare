import React, { HTMLAttributes, useState } from 'react'
import { useDebounce } from 'use-debounce'
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useTheme
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { IUserForSearchBar } from '../../../types/types'
import TuneIcon from '@mui/icons-material/Tune'
import { CustomIconButton } from '../../../library/CustomIconButton'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import SearchIcon from '@mui/icons-material/Search'
import useSx from '../../../hooks/useSx'
import headerStyles from '../headerStyles'
import useShortTranslation from '../../../hooks/useShortTranslation'
import extendedUsersApi from '../../../redux/api/extendedUsersApi'

type queryTypes = 'users' | 'posts' | 'collections'

export default function SearchBar() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)

  const [queryType, setQueryType] = useState<queryTypes>('users')

  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 1000)

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setQuery(e.target.value)

  const handleQueryTypeChange = (event: SelectChangeEvent) => {
    setQueryType(event.target.value as queryTypes)
  }

  const { data: users = [], isLoading } = extendedUsersApi.useGetUsersForSearchBarQuery(
    {
      username: debouncedQuery
    },
    {
      skip: debouncedQuery.length < 2 || queryType !== 'users'
    }
  )

  const navigate = useNavigate()

  const { searchBar: styles } = useSx(headerStyles)

  const t = useShortTranslation({ componentNameKey: 'Header.SearchBar' })

  const autocompleteOptions = queryType === 'users' ? users : []
  const autocompleteOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return

    navigate(`/search/${queryType}?query=${query}`)
    setIsSearchBarOpen(false)
  }

  const renderAutocompleteInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      placeholder={t('inputPlaceholder')}
      inputProps={{
        ...params.inputProps,
        autoComplete: 'off' // disable autocomplete and autofill
      }}
      sx={styles.input}
      variant="standard"
      onChange={handleQueryChange}
    />
  )

  const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: IUserForSearchBar) => (
    <Box
      component="li"
      {...props}
      onClick={(e) => {
        props?.onClick && props.onClick(e)
        navigate(`/${queryType}/${option._id}`)
        setIsSearchBarOpen(false)
      }}
    >
      {option.username}
    </Box>
  )

  return (
    <>
      {isSearchBarOpen && (
        <Box sx={styles.inputWrapper}>
          <Autocomplete
            onKeyDown={autocompleteOnKeyDown}
            loading={isLoading}
            renderInput={renderAutocompleteInput}
            getOptionLabel={(option) => option.username}
            renderOption={renderOption}
            options={autocompleteOptions}
          />
          <FormControl sx={{ mr: 1 }}>
            <InputLabel id="demo-simple-select-label">
              <TuneIcon />
            </InputLabel>

            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={queryType}
              onChange={handleQueryTypeChange}
              defaultValue="users"
            >
              <MenuItem value="users">{t('users')}</MenuItem>
              <MenuItem value="posts">{t('posts')}</MenuItem>
              <MenuItem value="collections">{t('collections')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
      <CustomIconButton
        onClick={() => setIsSearchBarOpen((prev) => !prev)}
        sx={{ color: 'text.primary' }}
      >
        {isSearchBarOpen ? <SearchOffIcon color="error" /> : <SearchIcon color="inherit" />}
      </CustomIconButton>
    </>
  )
}
