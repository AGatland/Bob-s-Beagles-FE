import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import CardComponent from './CardComponent';

function NewProducts({products}) {
    return(
        <>
            <h3>New arrivals</h3>
            <Carousel 
                withIndicators 
                slideSize="1%"
                slideGap={{ base: 0, sm: 2 }}
                align="start"
                slidesToScroll={1}
                >
                {products.map((product, index) => 
                    <Carousel.Slide key={index}>
                        <CardComponent product={product}></CardComponent>
                    </Carousel.Slide>
                )}
            </Carousel>
        </>
    )
}

export default NewProducts