import { ModalClose, Sheet } from "@mui/joy";
import { Alert, Modal } from "@mui/material";

const MyModel = ({
    openModal,
    setOpenModal,
    title,
    RENDER_COMPONENT

}) => {

    const handleCloseModal = () => setOpenModal(false);

    return (
        <Modal open={openModal} className="flex justify-center items-center">
            <Sheet
                variant="outlined"
                className="w-[60rem] m-auto justify-center items-center"
                sx={{
                    borderRadius: "md",
                    p: 3,
                    boxShadow: "lg",
                }}
            >
                <div className="h-[500px]  flex flex-col gap-2 ">
                    <div>
                        <p className="text-primary font-bold text-2xl text-center pb-2">{title}</p>
                        <hr />
                    </div>
                    <div className="overflow-auto">
                        {
                            RENDER_COMPONENT
                        }
                    </div>


                </div>

                <ModalClose variant="plain" sx={{ m: 1 }} onClick={handleCloseModal} />
            </Sheet>
        </Modal>
    );
};

export default MyModel;
