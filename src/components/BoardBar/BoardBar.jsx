import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FilterList from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import { Box, Toolbar, Tooltip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { capitalizeFirstChar } from '~/utils/Utils'

const MenuStyle = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}

const BoardBar = ({ board }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trelloApp.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        borderTop: '1px solid #1976d2',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Toolbar title={board?.description}>
          <Chip
            sx={MenuStyle}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Toolbar>

        <Chip
          sx={MenuStyle}
          icon={<VpnLockIcon />}
          label={capitalizeFirstChar(board?.type)}
          clickable
        />

        <Chip
          sx={MenuStyle}
          icon={<AddToDriveIcon />}
          label='Add to Drive'
          clickable
        />

        <Chip
          sx={MenuStyle}
          icon={<BoltIcon />}
          label='Automation'
          clickable
        />

        <Chip
          sx={MenuStyle}
          icon={<FilterList />}
          label='Filters'
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant='outlined'
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={2}
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: '16px',
              borderColor: 'transparent',
              cursor: 'pointer'
            }
          }}
        >
          <Tooltip title='Remy Sharp'>
            <Avatar
              alt='Remy Sharp'
              src='https://appdata.chatwork.com/avatar/EMypDoOd7B.rsz.jpg'
            />
          </Tooltip>
          <Tooltip title='Travis Howard'>
            <Avatar
              alt='Travis Howard'
              src='https://appdata.chatwork.com/avatar/1qGl063gAe.rsz.jpg'
            />
          </Tooltip>
          <Tooltip title='Linus Tovar'>
            <Avatar
              alt='Linus Tovar'
              src='https://appdata.chatwork.com/avatar/1qGl063gAe.rsz.jpg'
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
