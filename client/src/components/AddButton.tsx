import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AddButton({onClick}: {onClick: () => void}) {

    return (
        <Fab color="primary" onClick={onClick} sx={{position: 'absolute', bottom: '24px', right: '24px'}}>
            <AddIcon />
        </Fab>
    )
}
