import { Button, Paper, Text, Title } from "@mantine/core"
import './style.css'
import { Link } from "react-router-dom"

function CardComponent({product}) {
    return(
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            style={{backgroundImage: `url(${product.img})`}}
            className="card"
        >
            <div>
                <Text className="category" size="xs">
                    {product.category}
                </Text>
                <Title order={3} className="title">
                    {product.name}
                </Title>
            </div>
            <Button className="card-button" variant="white" color="dark">
                <Link to={`/products/${product.sku}`}>Details</Link>
            </Button>
        </Paper>
    )
}

export default CardComponent