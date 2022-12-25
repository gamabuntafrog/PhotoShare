import {Box, FormGroup} from "@mui/material";
import * as Yup from "yup";

const postSchema = Yup.object({
    username: Yup.string().min(6, "Min username length is 6 symbols").max(24, "Max username length is 24 symbols").required('Username is a required'),
    title: Yup.string().max(48, "Max title length is 48 symbols"),
    body: Yup.string(),

}).required()

export default function CreatePost() {



    return (
        <Box>
            <FormGroup>

            </FormGroup>
        </Box>
    )
}