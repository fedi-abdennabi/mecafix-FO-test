import { Button,  Text, useDisclosure } from "@chakra-ui/react"
export const TasksCompleted=()=>{
    const {onOpen:onOpenFile,onClose:onCloseFile,isOpen:isOpenFile}=useDisclosure();
    return(
        <>
        <Button onClick={onOpenFile} bg='transparent' textColor={'grayAlpha.800'} flexDirection={'column'} gap='2'>
        <Text fontSize={'sm'}>Tasks Completed</Text>
        {/* <Divider orientation="horizontal" variant='solid' w={'sm'}/> */}
        </Button>
        {/* {isOpenFile&&<Text>hello world !</Text>} */}
        </>
    )}