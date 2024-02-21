import { Text } from "@chakra-ui/react"

export const DrawerSearch=()=>{return<Text>hello world !</Text>}


// import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Stack, Tab, useDisclosure } from "@chakra-ui/react"
// import { useState } from "react";
// import { useFolder, useFolderList } from "./folder.service";
// import { Link, useParams } from "react-router-dom";

// export const DrawerSearch = () => {
//     const params = useParams();
//     const [searchCriteria, setSearchCriteria] = useState({
//         firstName: "",
//         lastName: "",
//         type: "",
//         phoneNumber: "",
//         email: "",
//         city: "",
//         postalCode: "",
//         quartersAddress: "",
//         registrationNumber: "",
//     });
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const [isContentVisible, setIsContentVisible] = useState(false);
//     const [isOpenForm, setIsOpenForm] = useState(false);
//     const folderId = params.folderId;
//     const { folder,folderList, isLoading: isLoadingFolderDetails } = useFolder({folderId, search: searchCriteria,});
 
//     const handleChange = () => {
//         setIsContentVisible(!isContentVisible);
//         setIsOpenForm(false);
//     }
  
//     const handleInputChange = (field, value) => {
//         setSearchCriteria((prevSearchCriteria) => ({
//             ...prevSearchCriteria,
//             [field]: value,
//         }));
//     };

//     return (
//         <>
//             <Button colorScheme='blue' onClick={onOpen}>
//                 Filter
//             </Button>
//             <Drawer
//                 isOpen={isOpen}
//                 placement='right'
//                 onClose={onClose}
//                 size={'md'}
//             >
//                 <DrawerOverlay />
//                 <DrawerContent>
//                     <DrawerCloseButton />
//                     <DrawerHeader>All Filters</DrawerHeader>

//                     <DrawerBody>
//                         <Stack folderList={folderList}>
//                             <Divider />
//                             <FormLabel>Client Informations</FormLabel>
//                             <Stack direction={'row'} justifyContent={'space-between'} paddingBottom={3}>
//                                 <Input value={searchCriteria.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} htmlSize={8} width='auto' placeholder='firstName' />
//                                 <Input value={searchCriteria.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} htmlSize={8} width='auto' placeholder='lastName' />
//                                 <Input value={searchCriteria.type} onChange={(e) => handleInputChange("type", e.target.value)} htmlSize={8} width='auto' placeholder='type' />
//                             </Stack>
//                             <Stack direction={'row'} justifyContent={'space-between'} paddingBottom={3}>
//                             <Input value={searchCriteria.phoneNumber} onChange={(e) => handleInputChange("phoneNumber", e.target.value)} width='auto' placeholder='phone number' />
//                             <Input value={searchCriteria.email} onChange={(e) => handleInputChange("email", e.target.value)} width='auto' placeholder='Email of client' />
//                             </Stack>
//                             <Stack spacing={3} direction={'row'} >
//                                 <Input value={searchCriteria.city} onChange={(e) => handleInputChange("city", e.target.value)} htmlSize={2} width='auto' placeholder='city' />
//                                 <Input value={searchCriteria.postalCode} onChange={(e) => handleInputChange("postalCode", e.target.value)} htmlSize={8} width='auto' placeholder='postalCode' />
//                                 <Input value={searchCriteria.quartersAddress} onChange={(e) => handleInputChange("quartersAddress", e.target.value)} htmlSize={12} width='auto' placeholder='Quarters Address' />
//                             </Stack>
//                             <Stack>
//                             <Input value={searchCriteria.registrationNumber} onChange={(e) => handleInputChange("registrationNumber", e.target.value)} htmlSize={4} width='auto' placeholder='Registration Number' />
//                             </Stack>
//                             <Divider />
//                             <Stack spacing={3}>
//                                 <FormLabel>Date Of Creation</FormLabel>
//                                 <Input
//                                     placeholder="Select Date and Time"
//                                     size="md"
//                                     type="datetime-local"
//                                 />
//                                 <FormControl>
//                                     <FormLabel>Amount</FormLabel>
//                                     <NumberInput max={50} min={10} >
//                                         <NumberInputField />
//                                         <NumberInputStepper>
//                                             <NumberIncrementStepper />
//                                             <NumberDecrementStepper />
//                                         </NumberInputStepper>
//                                     </NumberInput>
//                                 </FormControl>
//                             </Stack>
//                             <Divider />
//                             <Stack>
//                                 <FormLabel>Sort by</FormLabel>
//                             </Stack>
//                             <Divider />
//                             <Stack spacing={4} direction='column'>
//                                 {folder && folder.category && (
//                                     <>
//                                         <FormLabel>Categories</FormLabel>
//                                         <Stack spacing={2}>
//                                             {folder.category.map(category => (
//                                                 <Box key={category.id.toString()} onClick={() => handleChange()}>
//                                                     {category.categoryName}
//                                                 </Box>
//                                             ))}
//                                         </Stack>
//                                     </>
//                                 )}
//                             </Stack>
//                             <Divider />
//                             <Stack>
//                                 {folder?.category?.map(category => (
//                                     <Box key={category.id.toString()}>
//                                         {!isOpenForm && (
//                                             <Flex direction="column">
//                                                 <Box maxHeight="300px" overflowY="auto" p={2}>
//                                                     {category.sub_category.map(subCategory => (
//                                                         <Stack
//                                                             key={subCategory.id.toString()}
//                                                             pl="1"
//                                                             py="1"
//                                                             bg="white"
//                                                             rounded={8}
//                                                             borderWidth={1}
//                                                             my={2}
//                                                             direction="row"
//                                                             justifyContent="space-between"
//                                                         >
//                                                             <Button as={Link} to={`/admin/folder/input/${subCategory.id}`} size="sm" textColor="#012652" bg="transparent">
//                                                                 {subCategory.subCategoryName}
//                                                             </Button>
//                                                         </Stack>
//                                                     ))}
//                                                 </Box>
//                                             </Flex>
//                                         )}
//                                     </Box>
//                                 ))}

//                             </Stack>
//                         </Stack>
//                     </DrawerBody>
//                     <Divider />
//                     <DrawerFooter>
//                         <Stack flexDirection={'row'}>
//                             <Button colorScheme='blue'>Search</Button>
//                             <Button variant='outline' onClick={onClose}>
//                                 Cancel
//                             </Button>
//                         </Stack>
//                     </DrawerFooter>
//                 </DrawerContent>
//             </Drawer>
//         </>
//     )
// }