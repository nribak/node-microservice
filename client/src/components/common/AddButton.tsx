import {Fab, Stack} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AddButton({onClick}: {onClick: () => void}) {

    return (
        <Stack direction="row-reverse">
            <Fab color="primary" onClick={onClick} sx={{position: 'absolute', bottom: '24px'}}>
                <AddIcon />
            </Fab>
        </Stack>
    )
}
