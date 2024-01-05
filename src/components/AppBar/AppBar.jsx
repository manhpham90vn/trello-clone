import AppsIcon from '@mui/icons-material/Apps'
import CloseIcon from '@mui/icons-material/Close'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SearchIcon from '@mui/icons-material/Search'
import {
  Badge,
  Box,
  InputAdornment,
  SvgIcon,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import Trello from '~/assets/trello.svg?react'
import Profile from '~/components/AppBar/Menus/Profile'
import Recent from '~/components/AppBar/Menus/Recent'
import Starred from '~/components/AppBar/Menus/Starred'
import Templates from '~/components/AppBar/Menus/Templates'
import Workspaces from '~/components/AppBar/Menus/Workspaces'
import SelectMode from '~/components/SelectMode/SelectMode'

const AppBar = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trelloApp.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={Trello}
            inheritViewBox
            fontSize='small'
            sx={{ color: 'white' }}
          />
          <Typography
            variant='span'
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            variant='outlined'
            startIcon={<LibraryAddIcon />}
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': { border: 'none' }
            }}
          >
            Create
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id='outlined-search'
          label='Search...'
          type='text'
          size='small'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{
            minWidth: '120px',
            maxWidth: '170px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <InputAdornment position='end'>
                <CloseIcon
                  fontSize='small'
                  sx={{ color: 'white', cursor: 'pointer' }}
                  onClick={() => setSearchValue('')}
                />
              </InputAdornment>
            )
          }}
        />
        <SelectMode />
        <Tooltip title='Notifications'>
          <Badge
            color='secondary'
            variant='dot'
            sx={{ cursor: 'pointer' }}
          >
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>

        <Tooltip title='Help'>
          <Badge
            color='secondary'
            sx={{ cursor: 'pointer' }}
          >
            <HelpOutlineIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
