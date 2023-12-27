import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { Badge, Box, SvgIcon, TextField, Tooltip, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Trello from '~/assets/trello.svg?react'
import Profile from '~/components/AppBar/Menus/Profile'
import Recent from '~/components/AppBar/Menus/Recent'
import Starred from '~/components/AppBar/Menus/Starred'
import Templates from '~/components/AppBar/Menus/Templates'
import Workspaces from '~/components/AppBar/Menus/Workspaces'
import SelectMode from '~/components/SelectMode/SelectMode'

const AppBar = () => {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trelloApp.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color:'primary.main' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={Trello} inheritViewBox fontSize="small" sx={{ color: 'primary.main' }} />
          <Typography variant='span' sx={{ fontSize:'1.2rem', fontWeight:'bold', color: 'primary.main' }}>Trello</Typography>
        </Box>
        <Workspaces />
        <Recent />
        <Starred />
        <Templates />
        <Button variant="outlined">Create</Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField id="outlined-search" label="Search..." type="search" size='small' />
        <SelectMode />
        <Tooltip title='Notifications'>
          <Badge color='secondary' variant='dot' sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>

        <Tooltip title='Help'>
          <Badge color='secondary' sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>

        <Profile />
      </Box>

    </Box>
  )
}

export default AppBar