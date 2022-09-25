import { Modal } from '@mui/material'
import Close from '@mui/icons-material/Close';
import {
    Container,
    Header,
    TitleAndClose,
    Content

} from './style'

export function ModalDefault ({ open, onClose, infoheader, children }) {

    function handleCloseModal () {
        onClose(false);
    }

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            sx={{overflowX:'auto'}}
        >
            <Container>
                <Header>
                    <TitleAndClose>
                        <div>
                            <h2>{infoheader?.title}</h2>
                            <span>{infoheader?.subtitle}</span>
                        </div>
                        <Close onClick={handleCloseModal}/>
                    </TitleAndClose>
                </Header>
                <Content>
                    {children}
                </Content>
            </Container>
        </Modal>
    )
}