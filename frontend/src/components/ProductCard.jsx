import { Box, useColorModeValue, Image, Heading, Text, 
    HStack, VStack, IconButton, useToast, Modal, 
    ModalBody, ModalCloseButton, ModalContent, ModalFooter, Input, 
    ModalHeader, ModalOverlay, useDisclosure, Button } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {

    // Background and textColor for both light modes
    const bg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue('gray.500', 'gray.200');

    // Extracting deleteProduct from global state hook
    const { deleteProduct, updateProduct } = useProductStore();

    // Getting toast (pop-up notifications from chakra)
    const toast = useToast();

    // Modal functions
    const { isOpen, onOpen, onClose } = useDisclosure();

    // State for updated product
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: product.price,
        image: product.image
    });

    const handleDeleteProduct = async (productId) => {
        const { success, message } = await deleteProduct(productId);
        if (!success) {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

	const handleUpdateProduct = async (productId, updatedProduct) => {
		const { success, message } = await updateProduct(productId, updatedProduct);
		onClose();
		if (success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w="full" objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />}
                        colorScheme='blue'
                        onClick={onOpen} />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteProduct(product._id)}
                        colorScheme='red'
                    />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                    <Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;