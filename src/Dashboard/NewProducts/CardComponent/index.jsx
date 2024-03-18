import { Button, Paper, Text, Title } from "@mantine/core"
import './style.css'

function CardComponent({product}) {
    return(
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            style={{backgroundImage: `url(${product.image_url})`, width: "300px", height: "230px", objectFit: "cover"}}
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
            <Button variant="white" color="dark">
                Details
            </Button>
        </Paper>
    )
}

export default CardComponent