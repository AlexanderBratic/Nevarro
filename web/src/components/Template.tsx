import * as React from 'react';

import { red } from '@mui/material/colors';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { ReactComponent as DropdownIcon } from '../icons/dropdown.svg';


export default function Template(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [menuHeight, setMenuHeight] = React.useState(0);
	
	
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };
	
  const theme = useTheme();
  const renderDropdown = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
	
	function calcHeight(el) {
		if (menuHeight < 10) {
			const height = el.offsetHeight;
			setMenuHeight(height);
		} else {
			setMenuHeight(0);
		}
	}
	
	let body = (
		<List component="nav">
			<ListItemButton
				selected={selectedIndex === 0}
				onClick={(event) => handleListItemClick(event, 0)}
			>
				<ListItemIcon><InboxIcon /></ListItemIcon>
				<ListItemText primary="Comparison" />
			</ListItemButton>
			<ListItemButton
				selected={selectedIndex === 1}
				onClick={(event) => handleListItemClick(event, 0)}
			>
				<ListItemIcon><InboxIcon /></ListItemIcon>
				<ListItemText primary="Car" />
			</ListItemButton>
			<ListItemButton
				selected={selectedIndex === 2}
				onClick={(event) => handleListItemClick(event, 1)}
			>
				<ListItemIcon><DraftsIcon /></ListItemIcon>
				<ListItemText primary="Plane" />
			</ListItemButton>
			<ListItemButton
				selected={selectedIndex === 3}
				onClick={(event) => handleListItemClick(event, 2)}
			>
				<ListItemIcon><DraftsIcon /></ListItemIcon>
				<ListItemText primary="Public Transport" />
			</ListItemButton>
			<ListItemButton
				selected={selectedIndex === 4}
				onClick={(event) => handleListItemClick(event, 3)}
			>
				<ListItemIcon><DraftsIcon /></ListItemIcon>
				<ListItemText primary="Bicycle" />
			</ListItemButton>
			<ListItemButton
				selected={selectedIndex === 5}
				onClick={(event) => handleListItemClick(event, 4)}
			>
				<ListItemIcon><DraftsIcon /></ListItemIcon>
				<ListItemText primary="Electric Scooter" />
			</ListItemButton>
			<ListItemButton
				selected={selectedIndex === 6}
				onClick={(event) => handleListItemClick(event, 5)}
			>
				<ListItemIcon><DraftsIcon /></ListItemIcon>
				<ListItemText primary="Walking" />
			</ListItemButton>
		</List>
	);
	
	let result;
	if (renderDropdown) {
		result = (
			<Box>
				<Box sx={{
					transition: "height 100ms linear",
					height: menuHeight,
					overflow: "hidden"
				}}>
					{ body }
				</Box>
				<Box>
					<Button 
						variant="contained" 
						onClick={(e) => calcHeight(e.target.parentNode.parentNode)}
					>
						Toggle Dropdown
					</Button>
				</Box>
				<Box>{ props.children }</Box>
			</Box>
		);
	} else {
		result = (
			<Box sx={{
					my: 2,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'top',
				}}>
				<Box>{ props.children }</Box>
				<Box>
					<Box marginLeft="20px">
						<h1>Hello!</h1>
					</Box>
					{ body }
				</Box>
			</Box>
		);
	}
	return result;
}
