import { Container, VStack, Text, SimpleGrid} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard'

const HomePage = () => {
    const {getProducts, products} = useProductStore();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    //Logging to see if products has been populated
    console.log("products:", products)

    return(
        <Container maxW='container.x1' py={12}>
            <VStack spacing={8}>
            <Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products 🚀
				</Text>

                <SimpleGrid
                    columns={{
                       base:1,
                       md:2,
                       lg:3 
                    }}
                    spacing={10}
                    w={"full"}>
                        {products.map((product) => {
                           return <ProductCard key={product._id} product={product}/> 
                        })} 
                </SimpleGrid>

                <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
					</Text>

            </VStack>
        </Container>
    )
}

export default HomePage;