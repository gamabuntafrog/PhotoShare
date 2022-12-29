import {Container} from "@mui/material";
import {useParams} from "react-router-dom";


export default function Collection() {
    const {id = ''} = useParams<{ id: string }>()!



    return (
        <Container>
            <h1>Collection {id}</h1>
        </Container>
    )
}